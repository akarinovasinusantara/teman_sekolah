import express from 'express'
import { Keuangan, Siswa, User } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all transactions
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

// Get transactions by student (for parents)
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

// Get summary
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

// Create transaction
router.post('/', protect, authorize('tu'), async (req, res) => {
  try {
    const transaction = await Keuangan.create(req.body)
    res.status(201).json({ success: true, message: 'Transaksi berhasil dibuat', data: transaction })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update transaction (payment confirmation)
router.put('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const transaction = await Keuangan.findByPk(req.params.id)
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' })
    }
    
    // If status changed to Lunas, set payment date and verifier
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

// Delete transaction
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
