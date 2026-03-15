import express from 'express'
import { Pengumuman, Guru, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all announcements
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

// Get announcement by ID
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

// Create announcement
router.post('/', protect, authorize('guru', 'tu', 'super_admin'), async (req, res) => {
  try {
    const announcement = await Pengumuman.create({
      ...req.body,
      guru_id: req.user.id
    })
    res.status(201).json({ success: true, message: 'Pengumuman berhasil dibuat', data: announcement })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update announcement
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

// Delete announcement
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
