import express from 'express'
import { User } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all users (super_admin & tu only)
router.get('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get user by ID
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

// Update user
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

// Delete user
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
