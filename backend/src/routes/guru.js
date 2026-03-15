import express from 'express'
import { Guru } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN GURU
 * =============================================
 * 
 * Endpoint untuk mengelola data guru:
 * - GET /api/guru - Mendapatkan semua data guru
 * - GET /api/guru/:id - Mendapatkan data guru berdasarkan ID
 * - POST /api/guru - Membuat data guru baru
 * - PUT /api/guru/:id - Update data guru
 * - DELETE /api/guru/:id - Hapus data guru
 * 
 * Authorization:
 * - GET: Super Admin, TU, dan Guru
 * - POST/PUT/DELETE: Hanya Super Admin dan TU
 */

/**
 * @route   GET /api/guru
 * @desc    Mendapatkan semua data guru
 * @access  Private (Super Admin, TU, Guru only)
 * 
 * Mengembalikan daftar semua guru dengan informasi kinerja
 * (total_jurnal, jurnal_tepat_waktu)
 */
router.get('/', protect, authorize('super_admin', 'tu', 'guru'), async (req, res) => {
  try {
    const teachers = await Guru.findAll()
    res.json({ success: true, data: teachers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/guru/:id
 * @desc    Mendapatkan data guru berdasarkan ID
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} id - ID guru (UUID)
 * @returns {Object} Data guru lengkap
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const teacher = await Guru.findByPk(req.params.id)
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Guru tidak ditemukan' })
    }
    res.json({ success: true, data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/guru
 * @desc    Membuat data guru baru
 * @access  Private (Super Admin dan TU only)
 * 
 * @body {string} nip - Nomor Induk Pegawai
 * @body {string} nama_lengkap - Nama lengkap guru
 * @body {string} tempat_lahir - Tempat lahir
 * @body {Date} tanggal_lahir - Tanggal lahir
 * @body {string} jenis_kelamin - 'L' atau 'P'
 * @body {string} agama - Agama
 * @body {string} alamat - Alamat lengkap
 * @body {string} telepon - Nomor telepon
 * @body {string} email - Email
 * @body {string} pendidikan_terakhir - Pendidikan terakhir
 * @body {string} jurusan - Jurusan
 * @body {string} status - Status: Aktif, Non-Aktif
 * @body {Date} tanggal_bergabung - Tanggal bergabung
 */
router.post('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const teacher = await Guru.create(req.body)
    res.status(201).json({ success: true, message: 'Guru berhasil dibuat', data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/guru/:id
 * @desc    Update data guru
 * @access  Private (Super Admin dan TU only)
 * 
 * @param {string} id - ID guru yang akan diupdate
 * @body {Object} Data guru yang akan diupdate
 */
router.put('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const teacher = await Guru.findByPk(req.params.id)
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Guru tidak ditemukan' })
    }
    await teacher.update(req.body)
    res.json({ success: true, message: 'Guru berhasil diupdate', data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/guru/:id
 * @desc    Hapus data guru
 * @access  Private (Super Admin dan TU only)
 * 
 * @param {string} id - ID guru yang akan dihapus
 */
router.delete('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const teacher = await Guru.findByPk(req.params.id)
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Guru tidak ditemukan' })
    }
    await teacher.destroy()
    res.json({ success: true, message: 'Guru berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
