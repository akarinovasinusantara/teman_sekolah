import express from 'express'
import { Siswa, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all students
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

// Get student by ID
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

// Create student
router.post('/', protect, authorize('tu', 'super_admin'), async (req, res) => {
  try {
    const student = await Siswa.create(req.body)
    res.status(201).json({ success: true, message: 'Siswa berhasil dibuat', data: student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update student
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

// Delete student
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
