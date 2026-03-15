import express from 'express'
import { Sekolah } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all schools
router.get('/', protect, authorize('super_admin'), async (req, res) => {
  try {
    const schools = await Sekolah.findAll()
    res.json({ success: true, data: schools })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get school by ID
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

// Create school
router.post('/', protect, authorize('super_admin'), async (req, res) => {
  try {
    const school = await Sekolah.create(req.body)
    res.status(201).json({ success: true, message: 'Sekolah berhasil dibuat', data: school })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update school
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

// Delete school
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
