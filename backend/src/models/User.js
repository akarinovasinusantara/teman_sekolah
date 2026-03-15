import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import bcrypt from 'bcryptjs'

/**
 * Model User - Merepresentasikan pengguna sistem dengan sistem autentikasi
 * 
 * Digunakan untuk mengelola akses pengguna ke sistem dengan berbagai role:
 * - super_admin: Yayasan/pengembang, akses penuh ke semua sekolah
 * - tu: Staf tata usaha, mengelola administrasi sekolah
 * - guru: Pengajar, mengelola jurnal, nilai, absensi
 * - ortu: Orang tua siswa, monitoring anak
 * - siswa: Siswa, melihat informasi pribadi
 * 
 * Fitur keamanan:
 * - Password di-hash menggunakan bcrypt sebelum disimpan
 * - Token JWT untuk autentikasi
 * - Soft delete password saat JSON serialization
 * 
 * @typedef {Object} User
 * @property {UUID} id - ID unik user (primary key)
 * @property {string} user_id - ID user unik (contoh: 001, 002)
 * @property {string} username - Username untuk login (unik)
 * @property {string} password - Password terenkripsi
 * @property {string} role - Role user: super_admin, tu, guru, ortu, siswa
 * @property {string} nama_lengkap - Nama lengkap user
 * @property {string} email - Email user (unik)
 * @property {string} no_telepon - Nomor telepon user
 * @property {boolean} is_active - Status aktif/non-aktif user
 * @property {Date} last_login - Waktu login terakhir
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik user (UUID)'
  },
  user_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'ID user unik untuk identifikasi (contoh: 001, 002)'
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'Username untuk login ke sistem'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Password terenkripsi (bcrypt)'
  },
  role: {
    type: DataTypes.ENUM('super_admin', 'tu', 'guru', 'ortu', 'siswa'),
    allowNull: false,
    comment: 'Role/otoritas user dalam sistem'
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama lengkap user'
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: 'Alamat email user'
  },
  no_telepon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon yang bisa dihubungi'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Status user: true (aktif), false (non-aktif)'
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Waktu login terakhir user'
  }
}, {
  // Hooks untuk enkripsi password otomatis
  hooks: {
    /**
     * Hook beforeCreate - Hash password sebelum user baru dibuat
     * @param {User} user - Instance user yang akan dibuat
     */
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
      }
    },
    /**
     * Hook beforeUpdate - Hash password jika diubah
     * @param {User} user - Instance user yang akan diupdate
     */
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10)
      }
    }
  }
})

/**
 * Method untuk validasi password
 * Membandingkan password input dengan password ter-hash di database
 * 
 * @param {string} password - Password yang akan divalidasi
 * @returns {Promise<boolean>} - true jika password cocok, false jika tidak
 */
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

/**
 * Override toJSON untuk menghapus password dari output
 * Mencegah password ter-ekspos saat user di-serialize ke JSON
 * 
 * @returns {Object} - Object user tanpa password
 */
User.prototype.toJSON = function() {
  const values = { ...this.get() }
  delete values.password
  return values
}

export default User
