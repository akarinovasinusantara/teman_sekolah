import express from 'express'
import { Sekolah } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN SEKOLAH
 * =============================================
 * 
 * Endpoint untuk mengelola data sekolah:
 * - GET /api/sekolah - Mendapatkan semua sekolah
 * - GET /api/sekolah/:id - Mendapatkan sekolah berdasarkan ID
 * - POST /api/sekolah - Membuat sekolah baru
 * - PUT /api/sekolah/:id - Update data sekolah
 * - DELETE /api/sekolah/:id - Hapus sekolah
 * 
 * Authorization:
 * - SEMUA ROUTE: Super Admin only
 * 
 * Catatan:
 * - Hanya Super Admin (Yayasan/Pengembang) yang dapat
 *   mengelola data sekolah
 * - Digunakan untuk sistem multi-sekolah
 */

/**
 * @route   GET /api/sekolah
 * @desc    Mendapatkan semua data sekolah
 * @access  Private (Super Admin only)
 * 
 * @returns {Array} Daftar semua sekolah
 */
router.get('/', protect, authorize('super_admin'), async (req, res) => {
  try {
    const schools = await Sekolah.findAll()
    res.json({ success: true, data: schools })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/sekolah/:id
 * @desc    Mendapatkan data sekolah berdasarkan ID
 * @access  Private (Super Admin only)
 * 
 * @param {string} id - ID sekolah (UUID)
 * @returns {Object} Data sekolah lengkap
 */
router.get('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const school = await Sekolah.findByPk(req.params.id)
    if (!school) {
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan' })
    }
    res.json({ success: true, data: school })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   POST /api/sekolah
 * @desc    Membuat data sekolah baru
 * @access  Private (Super Admin only)
 * 
 * @body {string} nama - Nama lengkap sekolah
 * @body {string} npsn - NPSN (Nomor Pokok Sekolah Nasional)
 * @body {string} alamat - Alamat lengkap sekolah
 * @body {string} kota - Kota/kabupaten
 * @body {string} provinsi - Provinsi
 * @body {string} telepon - Nomor telepon sekolah
 * @body {string} email - Email sekolah
 * @body {string} website - Website sekolah
 * @body {string} status - Status: Aktif, Non-Aktif
 * @body {Date} tanggal_berlangganan - Tanggal mulai berlangganan
 * @body {Date} tanggal_expired - Tanggal expired langganan
 * @body {number} biaya_langganan - Biaya langganan
 */
router.post('/', protect, authorize('super_admin'), async (req, res) => {
  try {
    const school = await Sekolah.create(req.body)
    res.status(201).json({ success: true, message: 'Sekolah berhasil dibuat', data: school })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/sekolah/:id
 * @desc    Update data sekolah
 * @access  Private (Super Admin only)
 * 
 * @param {string} id - ID sekolah yang akan diupdate
 * @body {Object} Data sekolah yang akan diupdate
 */
router.put('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const school = await Sekolah.findByPk(req.params.id)
    if (!school) {
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan' })
    }
    await school.update(req.body)
    res.json({ success: true, message: 'Sekolah berhasil diupdate', data: school })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/sekolah/:id
 * @desc    Hapus data sekolah
 * @access  Private (Super Admin only)
 * 
 * @param {string} id - ID sekolah yang akan dihapus
 */
router.delete('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const school = await Sekolah.findByPk(req.params.id)
    if (!school) {
      return res.status(404).json({ success: false, message: 'Sekolah tidak ditemukan' })
    }
    await school.destroy()
    res.json({ success: true, message: 'Sekolah berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
