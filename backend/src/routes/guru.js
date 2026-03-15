import express from 'express'
import { Guru } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all teachers
router.get('/', protect, authorize('super_admin', 'tu', 'guru'), async (req, res) => {
  try {
    const teachers = await Guru.findAll()
    res.json({ success: true, data: teachers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get teacher by ID
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

// Create teacher
router.post('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const teacher = await Guru.create(req.body)
    res.status(201).json({ success: true, message: 'Guru berhasil dibuat', data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update teacher
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

// Delete teacher
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
