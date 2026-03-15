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

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Teman Sekolah API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database terhubung')
    
    // Sync database (untuk development)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
    console.log('✅ Database disinkronkan')
    
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
