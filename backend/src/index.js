import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './config/database.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import sekolahRoutes from './routes/sekolah.js'
import siswaRoutes from './routes/siswa.js'
import guruRoutes from './routes/guru.js'
import kelasRoutes from './routes/kelas.js'
import absensiRoutes from './routes/absensi.js'
import nilaiRoutes from './routes/nilai.js'
import keuanganRoutes from './routes/keuangan.js'
import pengumumanRoutes from './routes/pengumuman.js'
import ppdbRoutes from './routes/ppdb.js'

/**
 * =============================================
 * TEMAN SEKOLAH - BACKEND API
 * =============================================
 * 
 * Sistem Manajemen Sekolah Digital
 * 
 * Fitur Utama:
 * - Manajemen Siswa, Guru, dan Kelas
 * - Absensi Digital
 * - Input dan Monitoring Nilai
 * - Keuangan & SPP
 * - PPDB Online
 * - Pengumuman Digital
 * - Multi-sekolah (Super Admin)
 * 
 * Role Pengguna:
 * - super_admin: Yayasan/pengembang, akses penuh
 * - tu: Staf tata usaha, administrasi sekolah
 * - guru: Pengajar, jurnal & nilai
 * - ortu: Orang tua, monitoring anak
 * - siswa: Siswa, informasi pribadi
 * 
 * Tech Stack:
 * - Express.js (Node.js)
 * - Sequelize ORM
 * - SQLite Database
 * - JWT Authentication
 */

// Load environment variables dari file .env
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ==========================================
// MIDDLEWARE
// ==========================================

/**
 * CORS - Cross Origin Resource Sharing
 * Mengizinkan request dari domain lain
 */
app.use(cors())

/**
 * Parse JSON request body
 */
app.use(express.json())

/**
 * Parse URL-encoded request body
 */
app.use(express.urlencoded({ extended: true }))

// ==========================================
// ROUTES / API ENDPOINTS
// ==========================================

/**
 * Daftar semua endpoint API:
 * 
 * POST   /api/auth/login       - Login user
 * POST   /api/auth/register    - Register user baru
 * GET    /api/auth/me          - Get user yang sedang login
 * 
 * GET    /api/users            - Get all users
 * GET    /api/users/:id        - Get user by ID
 * PUT    /api/users/:id        - Update user
 * DELETE /api/users/:id        - Delete user
 * 
 * GET    /api/sekolah          - Get all schools
 * GET    /api/sekolah/:id      - Get school by ID
 * POST   /api/sekolah          - Create school
 * PUT    /api/sekolah/:id      - Update school
 * DELETE /api/sekolah/:id      - Delete school
 * 
 * GET    /api/siswa            - Get all students
 * GET    /api/siswa/:id        - Get student by ID
 * POST   /api/siswa            - Create student
 * PUT    /api/siswa/:id        - Update student
 * DELETE /api/siswa/:id        - Delete student
 * 
 * GET    /api/guru             - Get all teachers
 * GET    /api/guru/:id         - Get teacher by ID
 * POST   /api/guru             - Create teacher
 * PUT    /api/guru/:id         - Update teacher
 * DELETE /api/guru/:id         - Delete teacher
 * 
 * GET    /api/kelas            - Get all classes
 * GET    /api/kelas/:id        - Get class by ID
 * POST   /api/kelas            - Create class
 * PUT    /api/kelas/:id        - Update class
 * DELETE /api/kelas/:id        - Delete class
 * 
 * GET    /api/absensi          - Get all attendance
 * POST   /api/absensi          - Create attendance
 * PUT    /api/absensi/:id      - Update attendance
 * DELETE /api/absensi/:id      - Delete attendance
 * 
 * GET    /api/nilai            - Get all grades
 * POST   /api/nilai            - Create grade
 * PUT    /api/nilai/:id        - Update grade
 * DELETE /api/nilai/:id        - Delete grade
 * 
 * GET    /api/keuangan         - Get all transactions
 * GET    /api/keuangan/siswa/:id - Get student transactions
 * GET    /api/keuangan/summary/total - Financial summary
 * POST   /api/keuangan         - Create transaction
 * PUT    /api/keuangan/:id     - Update transaction
 * DELETE /api/keuangan/:id     - Delete transaction
 * 
 * GET    /api/pengumuman       - Get all announcements
 * GET    /api/pengumuman/:id   - Get announcement by ID
 * POST   /api/pengumuman       - Create announcement
 * PUT    /api/pengumuman/:id   - Update announcement
 * DELETE /api/pengumuman/:id   - Delete announcement
 * 
 * GET    /api/ppdb             - Get all PPDB registrations
 * GET    /api/ppdb/:id         - Get registration by ID
 * POST   /api/ppdb             - Create PPDB registration
 * PUT    /api/ppdb/:id         - Update registration
 * DELETE /api/ppdb/:id         - Delete registration
 */

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sekolah', sekolahRoutes)
app.use('/api/siswa', siswaRoutes)
app.use('/api/guru', guruRoutes)
app.use('/api/kelas', kelasRoutes)
app.use('/api/absensi', absensiRoutes)
app.use('/api/nilai', nilaiRoutes)
app.use('/api/keuangan', keuanganRoutes)
app.use('/api/pengumuman', pengumumanRoutes)
app.use('/api/ppdb', ppdbRoutes)

// ==========================================
// HEALTH CHECK ENDPOINT
// ==========================================

/**
 * @route   GET /api/health
 * @desc    Cek kesehatan server/API
 * @access  Public
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Teman Sekolah API is running' })
})

// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================

/**
 * Global error handler
 * Menangkap semua error yang tidak tertangkap
 */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// ==========================================
// START SERVER
// ==========================================

/**
 * Fungsi untuk memulai server
 * 1. Test koneksi database
 * 2. Sync database (auto create tables)
 * 3. Start Express server
 */
const startServer = async () => {
  try {
    // Test koneksi ke database
    await sequelize.authenticate()
    console.log('✅ Database terhubung')

    // Sync database - buat/update tabel
    // alter: true hanya di development
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
    console.log('✅ Database disinkronkan')

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
      console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('❌ Gagal memulai server:', error)
    process.exit(1)
  }
}

startServer()
