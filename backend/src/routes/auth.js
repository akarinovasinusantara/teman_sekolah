import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password harus diisi'
      })
    }

    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah'
      })
    }

    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda tidak aktif. Hubungi administrator.'
      })
    }

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

    // Generate token
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

// Register (hanya untuk super_admin)
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, nama_lengkap, email, no_telepon, user_id } = req.body

    // Check if user exists
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

    // Create user
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

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
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
