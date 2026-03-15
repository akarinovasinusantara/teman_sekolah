import express from 'express'
import { Keuangan, Siswa, User } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN KEUANGAN
 * =============================================
 * 
 * Endpoint untuk mengelola data keuangan siswa:
 * - GET /api/keuangan - Mendapatkan semua transaksi (Super Admin & TU)
 * - GET /api/keuangan/siswa/:siswaId - Mendapatkan transaksi per siswa
 * - GET /api/keuangan/summary/total - Ringkasan total keuangan
 * - POST /api/keuangan - Membuat transaksi baru
 * - PUT /api/keuangan/:id - Update transaksi (konfirmasi pembayaran)
 * - DELETE /api/keuangan/:id - Hapus transaksi
 * 
 * Authorization:
 * - GET /: Super Admin dan TU only
 * - GET /siswa/:siswaId: Semua role terautentikasi
 * - GET /summary/total: Super Admin dan TU only
 * - POST: TU only
 * - PUT: TU only
 * - DELETE: TU only
 * 
 * Fitur:
 * - Jenis: SPP, Uang_Pangkal, Kegiatan, Buku, Lainnya
 * - Status: Belum_Bayar, Lunas, Dibatalkan
 * - Metode: QRIS, VA, Tunai, Transfer
 * - Verifikasi oleh TU
 */

/**
 * @route   GET /api/keuangan
 * @desc    Mendapatkan semua data transaksi keuangan dengan filter
 * @access  Private (Super Admin dan TU only)
 * 
 * Query parameters:
 * - siswa_id: Filter berdasarkan ID siswa
 * - status: Filter berdasarkan status (Belum_Bayar, Lunas, Dibatalkan)
 * - jenis: Filter berdasarkan jenis (SPP, Uang_Pangkal, dll)
 * - bulan: Filter berdasarkan bulan
 * - tahun: Filter berdasarkan tahun
 */
router.get('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const { siswa_id, status, jenis, bulan, tahun } = req.query
    const where = {}

    if (siswa_id) where.siswa_id = siswa_id
    if (status) where.status = status
    if (jenis) where.jenis = jenis
    if (bulan) where.bulan = bulan
    if (tahun) where.tahun = tahun

    const transactions = await Keuangan.findAll({
      where,
      include: [
        { model: Siswa, as: 'siswa', attributes: ['id', 'nis', 'nama_lengkap'] },
        { model: User, as: 'verifikator', attributes: ['id', 'nama_lengkap'] }
      ],
      order: [['tahun', 'DESC'], ['bulan', 'DESC']]
    })
    res.json({ success: true, data: transactions })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/keuangan/siswa/:siswaId
 * @desc    Mendapatkan semua transaksi seorang siswa
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} siswaId - ID siswa
 * @returns {Array} Daftar transaksi keuangan siswa
 */
router.get('/siswa/:siswaId', protect, async (req, res) => {
  try {
    const transactions = await Keuangan.findAll({
      where: { siswa_id: req.params.siswaId },
      order: [['tahun', 'DESC'], ['bulan', 'DESC']]
    })
    res.json({ success: true, data: transactions })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/keuangan/summary/total
 * @desc    Mendapatkan ringkasan total keuangan
 * @access  Private (Super Admin dan TU only)
 * 
 * Query parameters:
 * - tahun: Filter berdasarkan tahun
 * - bulan: Filter berdasarkan bulan
 * 
 * @returns {Object} Summary: total, lunas, belum_bayar
 */
router.get('/summary/total', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const { tahun, bulan } = req.query
    const where = {}

    if (tahun) where.tahun = tahun
    if (bulan) where.bulan = bulan

    const total = await Keuangan.sum('jumlah', { where })
    const lunas = await Keuangan.sum('jumlah', { where: { ...where, status: 'Lunas' } })
    const belumBayar = await Keuangan.sum('jumlah', { where: { ...where, status: 'Belum_Bayar' } })

    res.json({
      success: true,
      data: {
        total: total || 0,
        lunas: lunas || 0,
        belum_bayar: belumBayar || 0
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/keuangan
 * @desc    Membuat transaksi keuangan baru
 * @access  Private (TU only)
 * 
 * @body {UUID} siswa_id - ID siswa
 * @body {string} jenis - Jenis: SPP, Uang_Pangkal, Kegiatan, Buku, Lainnya
 * @body {string} bulan - Bulan (untuk SPP)
 * @body {number} tahun - Tahun
 * @body {number} jumlah - Jumlah tagihan
 * @body {string} status - Status: Belum_Bayar, Lunas, Dibatalkan
 * @body {Date} jatuh_tempo - Tanggal jatuh tempo
 * @body {string} keterangan - Keterangan
 */
router.post('/', protect, authorize('tu'), async (req, res) => {
  try {
    const transaction = await Keuangan.create(req.body)
    res.status(201).json({ success: true, message: 'Transaksi berhasil dibuat', data: transaction })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/keuangan/:id
 * @desc    Update transaksi (konfirmasi pembayaran)
 * @access  Private (TU only)
 * 
 * Fitur khusus:
 * - Jika status diubah menjadi 'Lunas', otomatis set:
 *   - tanggal_bayar = sekarang
 *   - diverifikasi_oleh = user yang login
 * 
 * @param {string} id - ID transaksi yang akan diupdate
 * @body {Object} Data transaksi yang akan diupdate
 */
router.put('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const transaction = await Keuangan.findByPk(req.params.id)
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' })
    }

    // Jika status berubah menjadi Lunas, set tanggal bayar dan verifikator
    if (req.body.status === 'Lunas' && transaction.status !== 'Lunas') {
      req.body.tanggal_bayar = new Date()
      req.body.diverifikasi_oleh = req.user.id
    }

    await transaction.update(req.body)
    res.json({ success: true, message: 'Transaksi berhasil diupdate', data: transaction })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/keuangan/:id
 * @desc    Hapus transaksi keuangan
 * @access  Private (TU only)
 * 
 * @param {string} id - ID transaksi yang akan dihapus
 */
router.delete('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const transaction = await Keuangan.findByPk(req.params.id)
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' })
    }
    await transaction.destroy()
    res.json({ success: true, message: 'Transaksi berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
