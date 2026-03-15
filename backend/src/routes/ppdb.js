import express from 'express'
import { PPDB, User } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE PPDB (Pendaftaran Peserta Didik Baru)
 * =============================================
 * 
 * Endpoint untuk mengelola pendaftaran siswa baru:
 * - GET /api/ppdb - Mendapatkan semua pendaftaran (Super Admin & TU)
 * - GET /api/ppdb/:id - Mendapatkan pendaftaran berdasarkan ID
 * - POST /api/ppdb - Membuat pendaftaran baru (Public)
 * - PUT /api/ppdb/:id - Update status pendaftaran (TU only)
 * - DELETE /api/ppdb/:id - Hapus pendaftaran (TU only)
 * 
 * Authorization:
 * - GET: Super Admin dan TU only
 * - POST: Public (tanpa autentikasi)
 * - PUT: TU only
 * - DELETE: TU only
 * 
 * Status Pendaftaran:
 * - Baru: Pendaftaran baru masuk
 * - Proses: Sedang diverifikasi/diproses
 * - Diterima: Dinyatakan diterima
 * - Ditolak: Dinyatakan ditolak
 */

/**
 * @route   GET /api/ppdb
 * @desc    Mendapatkan semua pendaftaran PPDB dengan filter
 * @access  Private (Super Admin dan TU only)
 * 
 * Query parameters:
 * - status: Filter berdasarkan status (Baru, Proses, Diterima, Ditolak)
 * - tahun: Filter berdasarkan tahun
 */
router.get('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const { status, tahun } = req.query
    const where = {}

    if (status) where.status = status

    const registrations = await PPDB.findAll({
      where,
      include: [{ model: User, as: 'verifikator', attributes: ['id', 'nama_lengkap'] }],
      order: [['tanggal_daftar', 'DESC']]
    })
    res.json({ success: true, data: registrations })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/ppdb/:id
 * @desc    Mendapatkan data pendaftaran berdasarkan ID
 * @access  Private (Super Admin dan TU only)
 * 
 * @param {string} id - ID pendaftaran (UUID)
 * @returns {Object} Data pendaftaran lengkap
 */
router.get('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const registration = await PPDB.findByPk(req.params.id, {
      include: [{ model: User, as: 'verifikator' }]
    })
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' })
    }
    res.json({ success: true, data: registration })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/ppdb
 * @desc    Membuat pendaftaran PPDB baru (Formulir online)
 * @access  Public (tanpa autentikasi)
 * 
 * Auto-generate nomor pendaftaran dengan format:
 * PPDB{YYYY}{MM}{####}
 * Contoh: PPDB2024010001
 * 
 * @body {string} nama_lengkap - Nama lengkap calon siswa
 * @body {string} nisn - NISN (opsional)
 * @body {string} tempat_lahir - Tempat lahir
 * @body {Date} tanggal_lahir - Tanggal lahir
 * @body {string} jenis_kelamin - 'L' atau 'P'
 * @body {string} agama - Agama
 * @body {string} alamat - Alamat lengkap
 * @body {string} telepon - Nomor telepon
 * @body {string} email - Email
 * @body {string} asal_sekolah - Asal sekolah sebelumnya
 * @body {string} nama_ayah - Nama ayah
 * @body {string} nama_ibu - Nama ibu
 * @body {string} telepon_ortu - Nomor telepon orang tua
 */
router.post('/', async (req, res) => {
  try {
    // Generate nomor pendaftaran otomatis
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = await PPDB.count() + 1
    const no_pendaftaran = `PPDB${year}${month}${String(count).padStart(4, '0')}`

    const registration = await PPDB.create({
      ...req.body,
      no_pendaftaran
    })
    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil dibuat',
      data: registration
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/ppdb/:id
 * @desc    Update status pendaftaran (Proses, Diterima, Ditolak)
 * @access  Private (TU only)
 * 
 * Fitur khusus:
 * - Jika status = 'Diterima': set tanggal_diterima dan diverifikasi_oleh
 * - Jika status = 'Proses': set tanggal_diproses dan diverifikasi_oleh
 * 
 * @param {string} id - ID pendaftaran yang akan diupdate
 * @body {Object} Data pendaftaran yang akan diupdate
 * @body {string} status - Status baru
 * @body {string} catatan - Catatan dari verifier
 */
router.put('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const registration = await PPDB.findByPk(req.params.id)
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' })
    }

    // Jika status berubah menjadi Diterima, set tanggal diterima
    if (req.body.status === 'Diterima' && registration.status !== 'Diterima') {
      req.body.tanggal_diterima = new Date()
      req.body.diverifikasi_oleh = req.user.id
    }

    // Jika status berubah menjadi Proses, set tanggal diproses
    if (req.body.status === 'Proses' && registration.status !== 'Proses') {
      req.body.tanggal_diproses = new Date()
      req.body.diverifikasi_oleh = req.user.id
    }

    await registration.update(req.body)
    res.json({ success: true, message: 'Pendaftaran berhasil diupdate', data: registration })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/ppdb/:id
 * @desc    Hapus pendaftaran
 * @access  Private (TU only)
 * 
 * @param {string} id - ID pendaftaran yang akan dihapus
 */
router.delete('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const registration = await PPDB.findByPk(req.params.id)
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' })
    }
    await registration.destroy()
    res.json({ success: true, message: 'Pendaftaran berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
