import express from 'express'
import { Nilai, Siswa, Guru, MataPelajaran, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN NILAI
 * =============================================
 * 
 * Endpoint untuk mengelola data nilai siswa:
 * - GET /api/nilai - Mendapatkan semua data nilai (dengan filter)
 * - GET /api/nilai/siswa/:siswaId - Mendapatkan nilai per siswa
 * - POST /api/nilai - Membuat data nilai baru
 * - PUT /api/nilai/:id - Update data nilai
 * - DELETE /api/nilai/:id - Hapus data nilai
 * 
 * Authorization:
 * - GET: Semua role terautentikasi
 * - POST/PUT/DELETE: Hanya Guru dan TU
 * 
 * Fitur:
 * - Filter berdasarkan kelas, siswa, mata pelajaran, jenis, semester
 * - Input nilai Harian, UTS, UAS
 * - Deskripsi capaian siswa
 */

/**
 * @route   GET /api/nilai
 * @desc    Mendapatkan semua data nilai dengan filter opsional
 * @access  Private (semua role terautentikasi)
 * 
 * Query parameters:
 * - kelas_id: Filter berdasarkan ID kelas
 * - siswa_id: Filter berdasarkan ID siswa
 * - mata_pelajaran_id: Filter berdasarkan ID mata pelajaran
 * - jenis: Filter berdasarkan jenis (Harian, UTS, UAS)
 * - semester: Filter berdasarkan semester (1, 2)
 */
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

/**
 * @route   GET /api/nilai/siswa/:siswaId
 * @desc    Mendapatkan semua nilai seorang siswa
 * @access  Private (semua role terautentikasi)
 * 
 * @param {string} siswaId - ID siswa
 * @returns {Array} Daftar nilai siswa lengkap dengan mata pelajaran dan kelas
 */
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

/**
 * @route   POST /api/nilai
 * @desc    Membuat data nilai baru (Input nilai)
 * @access  Private (Guru dan TU only)
 * 
 * @body {UUID} siswa_id - ID siswa
 * @body {UUID} mata_pelajaran_id - ID mata pelajaran
 * @body {UUID} guru_id - ID guru yang memberi nilai
 * @body {UUID} kelas_id - ID kelas
 * @body {string} jenis - Jenis nilai: Harian, UTS, UAS
 * @body {number} nilai_angka - Nilai (0-100)
 * @body {string} deskripsi - Deskripsi capaian (opsional)
 * @body {string} semester - Semester (1 atau 2)
 * @body {string} tahun_ajaran - Tahun ajaran (contoh: 2024/2025)
 */
router.post('/', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const grade = await Nilai.create(req.body)
    res.status(201).json({ success: true, message: 'Nilai berhasil dibuat', data: grade })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/nilai/:id
 * @desc    Update data nilai
 * @access  Private (Guru dan TU only)
 * 
 * @param {string} id - ID nilai yang akan diupdate
 * @body {Object} Data nilai yang akan diupdate
 */
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

/**
 * @route   DELETE /api/nilai/:id
 * @desc    Hapus data nilai
 * @access  Private (Guru dan TU only)
 * 
 * @param {string} id - ID nilai yang akan dihapus
 */
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
