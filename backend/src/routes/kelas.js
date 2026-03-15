import express from 'express'
import { Kelas, Guru } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all classes
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

// Get class by ID
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

// Create class
router.post('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const kelas = await Kelas.create(req.body)
    res.status(201).json({ success: true, message: 'Kelas berhasil dibuat', data: kelas })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update class
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

// Delete class
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
