import express from 'express'
import { Pengumuman, Guru, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN PENGUMUMAN
 * =============================================
 * 
 * Endpoint untuk mengelola pengumuman dari guru:
 * - GET /api/pengumuman - Mendapatkan semua pengumuman
 * - GET /api/pengumuman/:id - Mendapatkan pengumuman berdasarkan ID
 * - POST /api/pengumuman - Membuat pengumuman baru
 * - PUT /api/pengumuman/:id - Update pengumuman
 * - DELETE /api/pengumuman/:id - Hapus pengumuman
 * 
 * Authorization:
 * - GET: Semua role terautentikasi
 * - POST/PUT/DELETE: Guru, TU, dan Super Admin
 * 
 * Fitur:
 * - Kategori: Pengumuman, Undangan, Keuangan, Akademik
 * - Prioritas: Normal, Penting, Segera
 * - Pengumuman per kelas atau global
 * - Tanggal publikasi dan kadaluarsa
 */

/**
 * @route   GET /api/pengumuman
 * @desc    Mendapatkan semua pengumuman dengan filter opsional
 * @access  Private (semua role terautentikasi)
 * 
 * Query parameters:
 * - kelas_id: Filter berdasarkan ID kelas
 * - is_global: Filter pengumuman global (true/false)
 * - kategori: Filter berdasarkan kategori
 */
router.get('/', protect, async (req, res) => {
  try {
    const { kelas_id, is_global, kategori } = req.query
    const where = { is_active: true }

    if (kelas_id) where.kelas_id = kelas_id
    if (is_global !== undefined) where.is_global = is_global === 'true'
    if (kategori) where.kategori = kategori

    const announcements = await Pengumuman.findAll({
      where,
      include: [
        { model: Guru, as: 'guruPembuat', attributes: ['id', 'nama_lengkap'] },
        { model: Kelas, as: 'kelas', attributes: ['id', 'nama'] }
      ],
      order: [['tanggal_publikasi', 'DESC']]
    })
    res.json({ success: true, data: announcements })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/pengumuman/:id
 * @desc    Mendapatkan pengumuman berdasarkan ID
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} id - ID pengumuman (UUID)
 * @returns {Object} Data pengumuman lengkap
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const announcement = await Pengumuman.findByPk(req.params.id, {
      include: [
        { model: Guru, as: 'guruPembuat' },
        { model: Kelas, as: 'kelas' }
      ]
    })
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Pengumuman tidak ditemukan' })
    }
    res.json({ success: true, data: announcement })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/pengumuman
 * @desc    Membuat pengumuman baru
 * @access  Private (Guru, TU, Super Admin only)
 * 
 * Catatan: guru_id otomatis diisi dari user yang login
 * 
 * @body {string} judul - Judul pengumuman
 * @body {string} isi - Isi pengumuman
 * @body {string} kategori - Kategori: Pengumuman, Undangan, Keuangan, Akademik
 * @body {string} prioritas - Prioritas: Normal, Penting, Segera
 * @body {UUID} kelas_id - ID kelas tujuan (opsional, null = global)
 * @body {boolean} is_global - true jika untuk semua kelas
 * @body {Date} tanggal_kadaluarsa - Tanggal kadaluarsa (opsional)
 */
router.post('/', protect, authorize('guru', 'tu', 'super_admin'), async (req, res) => {
  try {
    const announcement = await Pengumuman.create({
      ...req.body,
      guru_id: req.user.id  // Guru yang membuat pengumuman
    })
    res.status(201).json({ success: true, message: 'Pengumuman berhasil dibuat', data: announcement })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/pengumuman/:id
 * @desc    Update pengumuman
 * @access  Private (Guru, TU, Super Admin only)
 * 
 * @param {string} id - ID pengumuman yang akan diupdate
 * @body {Object} Data pengumuman yang akan diupdate
 */
router.put('/:id', protect, authorize('guru', 'tu', 'super_admin'), async (req, res) => {
  try {
    const announcement = await Pengumuman.findByPk(req.params.id)
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Pengumuman tidak ditemukan' })
    }
    await announcement.update(req.body)
    res.json({ success: true, message: 'Pengumuman berhasil diupdate', data: announcement })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/pengumuman/:id
 * @desc    Hapus pengumuman
 * @access  Private (Guru, TU, Super Admin only)
 * 
 * @param {string} id - ID pengumuman yang akan dihapus
 */
router.delete('/:id', protect, authorize('guru', 'tu', 'super_admin'), async (req, res) => {
  try {
    const announcement = await Pengumuman.findByPk(req.params.id)
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Pengumuman tidak ditemukan' })
    }
    await announcement.destroy()
    res.json({ success: true, message: 'Pengumuman berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
