import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

/**
 * =============================================
 * AUTHENTICATION MIDDLEWARE
 * =============================================
 * 
 * Middleware untuk mengamankan route dan mengotorisasi user
 * berdasarkan role.
 * 
 * Fungsi:
 * - protect: Verifikasi token JWT dan attach user ke request
 * - authorize: Cek apakah user memiliki role yang diizinkan
 * 
 * Flow Autentikasi:
 * 1. User login dengan username & password
 * 2. Server generate JWT token
 * 3. Client simpan token dan kirim via Authorization header
 * 4. Middleware verify token dan attach user data ke req.user
 */

/**
 * Middleware protect - Melindungi route dengan JWT
 * 
 * Cara kerja:
 * 1. Ambil token dari Authorization header (format: Bearer <token>)
 * 2. Verify token menggunakan JWT_SECRET
 * 3. Cari user berdasarkan ID dari token
 * 4. Attach user ke req.user untuk digunakan di route
 * 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * @returns {Object} Response 401 jika token tidak valid
 * 
 * @example
 * // Penggunaan di route
 * router.get('/protected', protect, async (req, res) => {
 *   // req.user tersedia di sini
 * })
 */
export const protect = async (req, res, next) => {
  try {
    let token

    // Ambil token dari Authorization header
    // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Cek apakah token ada
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak ditemukan.'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Cari user berdasarkan ID dari token
    const user = await User.findByPk(decoded.id)

    // Cek apakah user ada dan aktif
    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan atau tidak aktif'
      })
    }

    // Attach user ke request object
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid'
    })
  }
}

/**
 * Middleware authorize - Otorisasi berdasarkan role
 * 
 * Cara kerja:
 * 1. Terima array role yang diizinkan
 * 2. Cek apakah req.user.role termasuk dalam array
 * 3. Lanjutkan ke next middleware jika authorized
 * 
 * @function
 * @param  {...string} roles - Array role yang diizinkan
 * @returns {Function} Middleware function
 * 
 * @example
 * // Hanya super_admin dan tu yang bisa akses
 * router.post('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
 *   // ...
 * })
 * 
 * @example
 * // Hanya guru yang bisa input nilai
 * router.post('/nilai', protect, authorize('guru'), async (req, res) => {
 *   // ...
 * })
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Cek apakah role user termasuk dalam daftar yang diizinkan
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} tidak memiliki akses ke resource ini`
      })
    }
    next()
  }
}
