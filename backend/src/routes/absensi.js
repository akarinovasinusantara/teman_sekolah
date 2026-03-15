import express from 'express'
import { Absensi, Siswa, Guru, MataPelajaran, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all attendance
router.get('/', protect, async (req, res) => {
  try {
    const { tanggal, kelas_id, siswa_id } = req.query
    const where = {}
    
    if (tanggal) where.tanggal = tanggal
    if (kelas_id) where.kelas_id = kelas_id
    if (siswa_id) where.siswa_id = siswa_id

    const attendance = await Absensi.findAll({
      where,
      include: [
        { model: Siswa, as: 'siswa', attributes: ['id', 'nis', 'nama_lengkap'] },
        { model: Guru, as: 'guruPencatat', attributes: ['id', 'nama_lengkap'] },
        { model: Kelas, as: 'kelas', attributes: ['id', 'nama'] },
        { model: MataPelajaran, as: 'mataPelajaran', attributes: ['id', 'nama'] }
      ],
      order: [['tanggal', 'DESC']]
    })
    res.json({ success: true, data: attendance })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create attendance
router.post('/', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const attendance = await Absensi.create(req.body)
    res.status(201).json({ success: true, message: 'Absensi berhasil dibuat', data: attendance })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update attendance
router.put('/:id', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const attendance = await Absensi.findByPk(req.params.id)
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Absensi tidak ditemukan' })
    }
    await attendance.update(req.body)
    res.json({ success: true, message: 'Absensi berhasil diupdate', data: attendance })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete attendance
router.delete('/:id', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const attendance = await Absensi.findByPk(req.params.id)
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Absensi tidak ditemukan' })
    }
    await attendance.destroy()
    res.json({ success: true, message: 'Absensi berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
