import express from 'express'
import { Absensi, Siswa, Guru, MataPelajaran, Kelas } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE MANAJEMEN ABSENSI
 * =============================================
 * 
 * Endpoint untuk mengelola data absensi siswa:
 * - GET /api/absensi - Mendapatkan semua data absensi (dengan filter)
 * - POST /api/absensi - Membuat data absensi baru
 * - PUT /api/absensi/:id - Update data absensi
 * - DELETE /api/absensi/:id - Hapus data absensi
 * 
 * Authorization:
 * - GET: Semua role terautentikasi
 * - POST/PUT/DELETE: Hanya Guru dan TU
 * 
 * Fitur:
 * - Filter berdasarkan tanggal, kelas, siswa
 * - Status: Hadir, Sakit, Izin, Alpa
 * - Catat jam masuk dan keterangan
 */

/**
 * @route   GET /api/absensi
 * @desc    Mendapatkan semua data absensi dengan filter opsional
 * @access  Private (semua role terautentikasi)
 * 
 * Query parameters:
 * - tanggal: Filter berdasarkan tanggal (YYYY-MM-DD)
 * - kelas_id: Filter berdasarkan ID kelas
 * - siswa_id: Filter berdasarkan ID siswa
 */
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

/**
 * @route   POST /api/absensi
 * @desc    Membuat data absensi baru (Input absensi)
 * @access  Private (Guru dan TU only)
 * 
 * @body {UUID} siswa_id - ID siswa
 * @body {UUID} kelas_id - ID kelas
 * @body {UUID} guru_id - ID guru yang mencatat
 * @body {UUID} mata_pelajaran_id - ID mata pelajaran (opsional)
 * @body {Date} tanggal - Tanggal absensi
 * @body {string} status - Status: Hadir, Sakit, Izin, Alpa
 * @body {Time} jam_masuk - Jam masuk (opsional)
 * @body {string} keterangan - Keterangan (opsional)
 */
router.post('/', protect, authorize('guru', 'tu'), async (req, res) => {
  try {
    const attendance = await Absensi.create(req.body)
    res.status(201).json({ success: true, message: 'Absensi berhasil dibuat', data: attendance })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

/**
 * @route   PUT /api/absensi/:id
 * @desc    Update data absensi
 * @access  Private (Guru dan TU only)
 * 
 * @param {string} id - ID absensi yang akan diupdate
 * @body {Object} Data absensi yang akan diupdate
 */
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

/**
 * @route   DELETE /api/absensi/:id
 * @desc    Hapus data absensi
 * @access  Private (Guru dan TU only)
 * 
 * @param {string} id - ID absensi yang akan dihapus
 */
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
