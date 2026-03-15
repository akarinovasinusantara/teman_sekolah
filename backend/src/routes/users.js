import express from 'express'
import { User } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN USER
 * =============================================
 * 
 * Endpoint untuk mengelola data user:
 * - GET /api/users - Mendapatkan semua user
 * - GET /api/users/:id - Mendapatkan user berdasarkan ID
 * - PUT /api/users/:id - Update data user
 * - DELETE /api/users/:id - Hapus user
 * 
 * Authorization:
 * - GET /: Super Admin dan TU only
 * - GET /:id: Semua role terautentikasi
 * - PUT: Super Admin dan TU only
 * - DELETE: Super Admin only
 * 
 * Catatan:
 * - Password di-exclude dari response untuk keamanan
 * - Hanya Super Admin yang bisa menghapus user
 */

/**
 * @route   GET /api/users
 * @desc    Mendapatkan semua data user
 * @access  Private (Super Admin dan TU only)
 * 
 * @returns {Array} Daftar semua user (tanpa password)
 */
router.get('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }  // Exclude password dari response
    })
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   GET /api/users/:id
 * @desc    Mendapatkan data user berdasarkan ID
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} id - ID user (UUID)
 * @returns {Object} Data user lengkap (tanpa password)
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' })
    }
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/users/:id
 * @desc    Update data user
 * @access  Private (Super Admin dan TU only)
 * 
 * Field yang bisa diupdate:
 * - nama_lengkap: Nama lengkap user
 * - email: Alamat email
 * - no_telepon: Nomor telepon
 * - is_active: Status aktif/non-aktif
 * 
 * @param {string} id - ID user yang akan diupdate
 * @body {string} nama_lengkap - Nama lengkap baru
 * @body {string} email - Email baru
 * @body {string} no_telepon - Nomor telepon baru
 * @body {boolean} is_active - Status aktif/non-aktif
 */
router.put('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' })
    }

    const { nama_lengkap, email, no_telepon, is_active } = req.body
    await user.update({ nama_lengkap, email, no_telepon, is_active })

    res.json({ success: true, message: 'User berhasil diupdate', data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   DELETE /api/users/:id
 * @desc    Hapus user
 * @access  Private (Super Admin only)
 * 
 * Hanya Super Admin yang dapat menghapus user
 * 
 * @param {string} id - ID user yang akan dihapus
 */
router.delete('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' })
    }
    await user.destroy()
    res.json({ success: true, message: 'User berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
