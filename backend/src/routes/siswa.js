import express from 'express'
import { Siswa, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN SISWA
 * =============================================
 * 
 * Endpoint untuk mengelola data siswa:
 * - GET /api/siswa - Mendapatkan semua data siswa
 * - GET /api/siswa/:id - Mendapatkan data siswa berdasarkan ID
 * - POST /api/siswa - Membuat data siswa baru
 * - PUT /api/siswa/:id - Update data siswa
 * - DELETE /api/siswa/:id - Hapus data siswa
 * 
 * Authorization:
 * - GET: Semua role yang terautentikasi
 * - POST/PUT/DELETE: Hanya TU dan Super Admin
 */

/**
 * @route   GET /api/siswa
 * @desc    Mendapatkan semua data siswa
 * @access  Private (semua role terautentikasi)
 * 
 * Mengembalikan daftar semua siswa dengan informasi kelas
 */
router.get('/', protect, async (req, res) => {
  try {
    const students = await Siswa.findAll({
      include: [{ model: Kelas, as: 'kelas', attributes: ['nama'] }]
    })
    res.json({ success: true, data: students })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/siswa/:id
 * @desc    Mendapatkan data siswa berdasarkan ID
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} id - ID siswa (UUID)
 * @returns {Object} Data siswa lengkap dengan informasi kelas
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Siswa.findByPk(req.params.id, {
      include: [{ model: Kelas, as: 'kelas' }]
    })
    if (!student) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' })
    }
    res.json({ success: true, data: student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/siswa
 * @desc    Membuat data siswa baru
 * @access  Private (TU dan Super Admin only)
 * 
 * @body {string} nis - Nomor Induk Siswa
 * @body {string} nisn - Nomor Induk Siswa Nasional
 * @body {string} nama_lengkap - Nama lengkap siswa
 * @body {string} tempat_lahir - Tempat lahir
 * @body {Date} tanggal_lahir - Tanggal lahir
 * @body {string} jenis_kelamin - 'L' atau 'P'
 * @body {string} agama - Agama
 * @body {string} alamat - Alamat lengkap
 * @body {string} telepon - Nomor telepon
 * @body {string} email - Email
 * @body {string} nama_ayah - Nama ayah
 * @body {string} nama_ibu - Nama ibu
 * @body {string} telepon_ortu - Nomor telepon orang tua
 * @body {string} status - Status: Aktif, Lulus, Pindah, Dropout
 * @body {number} tahun_masuk - Tahun masuk
 */
router.post('/', protect, authorize('tu', 'super_admin'), async (req, res) => {
  try {
    const student = await Siswa.create(req.body)
    res.status(201).json({ success: true, message: 'Siswa berhasil dibuat', data: student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/siswa/:id
 * @desc    Update data siswa
 * @access  Private (TU dan Super Admin only)
 * 
 * @param {string} id - ID siswa yang akan diupdate
 * @body {Object} Data siswa yang akan diupdate
 */
router.put('/:id', protect, authorize('tu', 'super_admin'), async (req, res) => {
  try {
    const student = await Siswa.findByPk(req.params.id)
    if (!student) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' })
    }
    await student.update(req.body)
    res.json({ success: true, message: 'Siswa berhasil diupdate', data: student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/siswa/:id
 * @desc    Hapus data siswa
 * @access  Private (TU dan Super Admin only)
 * 
 * @param {string} id - ID siswa yang akan dihapus
 */
router.delete('/:id', protect, authorize('tu', 'super_admin'), async (req, res) => {
  try {
    const student = await Siswa.findByPk(req.params.id)
    if (!student) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' })
    }
    await student.destroy()
    res.json({ success: true, message: 'Siswa berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
