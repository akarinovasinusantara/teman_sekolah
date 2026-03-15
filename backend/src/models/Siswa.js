import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Siswa - Merepresentasikan data siswa dalam sistem
 * 
 * Digunakan untuk menyimpan informasi lengkap siswa termasuk:
 * - Data pribadi (nama, tempat/tanggal lahir, jenis kelamin)
 * - Data kontak (alamat, telepon, email)
 * - Data orang tua (nama ayah, ibu, telepon)
 * - Status akademik (NIS, NISN, status, tahun masuk)
 * 
 * @typedef {Object} Siswa
 * @property {UUID} id - ID unik siswa (primary key)
 * @property {string} nis - Nomor Induk Siswa (unik, wajib)
 * @property {string} nisn - Nomor Induk Siswa Nasional (unik, opsional)
 * @property {string} nama_lengkap - Nama lengkap siswa (wajib)
 * @property {string} tempat_lahir - Tempat lahir siswa
 * @property {Date} tanggal_lahir - Tanggal lahir siswa
 * @property {string} jenis_kelamin - 'L' (Laki-laki) atau 'P' (Perempuan)
 * @property {string} agama - Agama siswa
 * @property {string} alamat - Alamat lengkap siswa
 * @property {string} telepon - Nomor telepon siswa
 * @property {string} email - Email siswa
 * @property {string} nama_ayah - Nama ayah siswa
 * @property {string} nama_ibu - Nama ibu siswa
 * @property {string} telepon_ortu - Nomor telepon orang tua
 * @property {string} status - Status siswa: 'Aktif', 'Lulus', 'Pindah', 'Dropout'
 * @property {number} tahun_masuk - Tahun masuk siswa
 */
const Siswa = sequelize.define('Siswa', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik siswa (UUID)'
  },
  nis: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'Nomor Induk Siswa - identifier unik untuk setiap siswa'
  },
  nisn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: 'Nomor Induk Siswa Nasional'
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama lengkap siswa'
  },
  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Tempat lahir siswa'
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Tanggal lahir siswa'
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('L', 'P'),
    allowNull: true,
    comment: 'Jenis kelamin: L (Laki-laki), P (Perempuan)'
  },
  agama: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Agama siswa'
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Alamat lengkap siswa'
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon siswa'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Alamat email siswa'
  },
  nama_ayah: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nama lengkap ayah siswa'
  },
  nama_ibu: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nama lengkap ibu siswa'
  },
  telepon_ortu: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon orang tua/wali'
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Lulus', 'Pindah', 'Dropout'),
    defaultValue: 'Aktif',
    comment: 'Status akademik siswa: Aktif, Lulus, Pindah, atau Dropout'
  },
  tahun_masuk: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Tahun masuk siswa (contoh: 2024)'
  }
})

export default Siswa
