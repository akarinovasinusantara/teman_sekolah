import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

const router = express.Router()

/**
 * =============================================
 * ROUTE AUTHENTIKASI
 * =============================================
 * 
 * Endpoint untuk mengelola autentikasi user:
 * - POST /login - Login user dan generate token JWT
 * - POST /register - Register user baru (hanya super_admin)
 * - GET /me - Mendapatkan data user yang sedang login
 * 
 * @route POST /api/auth/login
 * @access Public
 * @body {string} username - Username user
 * @body {string} password - Password user
 * @returns {Object} Token JWT dan data user
 */

/**
 * @route   POST /api/auth/login
 * @desc    Login user dan mendapatkan token JWT
 * @access  Public
 * 
 * Proses login:
 * 1. Validasi username dan password dari request body
 * 2. Cari user berdasarkan username di database
 * 3. Cek apakah user aktif
 * 4. Validasi password menggunakan bcrypt
 * 5. Update last_login user
 * 6. Generate token JWT dengan payload id dan role user
 * 7. Return token dan data user (tanpa password)
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password harus diisi'
      })
    }

    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    // Cek apakah user aktif
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda tidak aktif. Hubungi administrator.'
      })
    }

    // Validasi password
    const isPasswordValid = await user.validatePassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    // Update last login
    user.last_login = new Date()
    await user.save()

    // Generate token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )

    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user.id,
          user_id: user.user_id,
          username: user.username,
          role: user.role,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          no_telepon: user.no_telepon
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    })
  }
})

/**
 * @route   POST /api/auth/register
 * @desc    Register user baru (hanya untuk super_admin)
 * @access  Private (Super Admin only)
 * 
 * Proses register:
 * 1. Ambil data user dari request body
 * 2. Cek apakah username sudah digunakan
 * 3. Buat user baru dengan password ter-hash
 * 4. Return data user yang dibuat
 * 
 * @body {string} username - Username untuk login
 * @body {string} password - Password user
 * @body {string} role - Role user (super_admin, tu, guru, ortu, siswa)
 * @body {string} nama_lengkap - Nama lengkap user
 * @body {string} email - Email user
 * @body {string} no_telepon - Nomor telepon user
 * @body {string} user_id - ID user unik (opsional, auto-generate jika kosong)
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, nama_lengkap, email, no_telepon, user_id } = req.body

    // Cek apakah username sudah digunakan
    const existingUser = await User.findOne({
      where: {
        username
      }
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah digunakan'
      })
    }

    // Buat user baru
    const user = await User.create({
      user_id: user_id || `USR${Date.now()}`,
      username,
      password,
      role,
      nama_lengkap,
      email,
      no_telepon
    })

    res.status(201).json({
      success: true,
      message: 'User berhasil dibuat',
      data: {
        id: user.id,
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        nama_lengkap: user.nama_lengkap
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    })
  }
})

/**
 * @route   GET /api/auth/me
 * @desc    Mendapatkan data user yang sedang login
 * @access  Private (semua role)
 * 
 * Proses:
 * 1. Ambil token dari Authorization header
 * 2. Decode token JWT
 * 3. Cari user berdasarkan id dari token
 * 4. Return data user (tanpa password)
 * 
 * @header {string} Authorization - Bearer <token>
 * @returns {Object} Data user yang sedang login
 */
router.get('/me', async (req, res) => {
  try {
    // Ambil token dari header
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan'
      })
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Cari user berdasarkan id dari token
    const user = await User.findByPk(decoded.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      })
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        no_telepon: user.no_telepon
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    })
  }
})

export default router
