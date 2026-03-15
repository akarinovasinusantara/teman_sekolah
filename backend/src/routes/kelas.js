import express from 'express'
import { Kelas, Guru } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN KELAS
 * =============================================
 * 
 * Endpoint untuk mengelola data kelas:
 * - GET /api/kelas - Mendapatkan semua data kelas
 * - GET /api/kelas/:id - Mendapatkan data kelas berdasarkan ID
 * - POST /api/kelas - Membuat data kelas baru
 * - PUT /api/kelas/:id - Update data kelas
 * - DELETE /api/kelas/:id - Hapus data kelas
 * 
 * Authorization:
 * - GET: Semua role terautentikasi
 * - POST/PUT/DELETE: Hanya Super Admin dan TU
 */

/**
 * @route   GET /api/kelas
 * @desc    Mendapatkan semua data kelas dengan informasi wali kelas
 * @access  Private (semua role terautentikasi)
 * 
 * Mengembalikan daftar semua kelas dengan detail wali kelas
 */
router.get('/', protect, async (req, res) => {
  try {
    const classes = await Kelas.findAll({
      include: [{ model: Guru, as: 'waliKelas', attributes: ['id', 'nama_lengkap'] }]
    })
    res.json({ success: true, data: classes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/kelas/:id
 * @desc    Mendapatkan data kelas berdasarkan ID
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} id - ID kelas (UUID)
 * @returns {Object} Data kelas lengkap dengan wali kelas
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id, {
      include: [{ model: Guru, as: 'waliKelas' }]
    })
    if (!kelas) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' })
    }
    res.json({ success: true, data: kelas })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/kelas
 * @desc    Membuat data kelas baru
 * @access  Private (Super Admin dan TU only)
 * 
 * @body {string} nama - Nama kelas (contoh: X-A, XI-IPA-1)
 * @body {number} tingkat - Tingkat kelas (10, 11, 12)
 * @body {UUID} wali_kelas_id - ID guru yang menjadi wali kelas
 * @body {string} tahun_ajaran - Tahun ajaran (contoh: 2024/2025)
 * @body {number} kapasitas - Kapasitas maksimal siswa
 */
router.post('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const kelas = await Kelas.create(req.body)
    res.status(201).json({ success: true, message: 'Kelas berhasil dibuat', data: kelas })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/kelas/:id
 * @desc    Update data kelas
 * @access  Private (Super Admin dan TU only)
 * 
 * @param {string} id - ID kelas yang akan diupdate
 * @body {Object} Data kelas yang akan diupdate
 */
router.put('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id)
    if (!kelas) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' })
    }
    await kelas.update(req.body)
    res.json({ success: true, message: 'Kelas berhasil diupdate', data: kelas })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/kelas/:id
 * @desc    Hapus data kelas
 * @access  Private (Super Admin dan TU only)
 * 
 * @param {string} id - ID kelas yang akan dihapus
 */
router.delete('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const kelas = await Kelas.findByPk(req.params.id)
    if (!kelas) {
      return res.status(404).json({ success: false, message: 'Kelas tidak ditemukan' })
    }
    await kelas.destroy()
    res.json({ success: true, message: 'Kelas berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
