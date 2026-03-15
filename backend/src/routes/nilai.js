import express from 'express'
import { Nilai, Siswa, Guru, MataPelajaran, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all grades
router.get('/', protect, async (req, res) => {
  try {
    const { kelas_id, siswa_id, mata_pelajaran_id, jenis, semester } = req.query
    const where = {}
    
    if (kelas_id) where.kelas_id = kelas_id
    if (siswa_id) where.siswa_id = siswa_id
    if (mata_pelajaran_id) where.mata_pelajaran_id = mata_pelajaran_id
    if (jenis) where.jenis = jenis
    if (semester) where.semester = semester

    const grades = await Nilai.findAll({
      where,
      include: [
        { model: Siswa, as: 'siswa', attributes: ['id', 'nis', 'nama_lengkap'] },
        { model: Guru, as: 'guruPenilai', attributes: ['id', 'nama_lengkap'] },
        { model: MataPelajaran, as: 'mataPelajaran', attributes: ['id', 'nama'] },
        { model: Kelas, as: 'kelas', attributes: ['id', 'nama'] }
      ],
      order: [['createdAt', 'DESC']]
    })
    res.json({ success: true, data: grades })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get grades by student
router.get('/siswa/:siswaId', protect, async (req, res) => {
  try {
    const grades = await Nilai.findAll({
      where: { siswa_id: req.params.siswaId },
      include: [
        { model: MataPelajaran, as: 'mataPelajaran' },
        { model: Kelas, as: 'kelas' }
      ],
      order: [['semester', 'DESC'], ['jenis', 'ASC']]
    })
    res.json({ success: true, data: grades })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create grade
router.post('/', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const grade = await Nilai.create(req.body)
    res.status(201).json({ success: true, message: 'Nilai berhasil dibuat', data: grade })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update grade
router.put('/:id', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const grade = await Nilai.findByPk(req.params.id)
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Nilai tidak ditemukan' })
    }
    await grade.update(req.body)
    res.json({ success: true, message: 'Nilai berhasil diupdate', data: grade })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete grade
router.delete('/:id', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const grade = await Nilai.findByPk(req.params.id)
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Nilai tidak ditemukan' })
    }
    await grade.destroy()
    res.json({ success: true, message: 'Nilai berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
