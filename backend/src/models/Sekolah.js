import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Sekolah - Merepresentasikan data sekolah yang menggunakan sistem
 * 
 * Digunakan oleh Super Admin untuk mengelola multiple sekolah:
 * - Informasi identitas sekolah (nama, NPSN, alamat)
 * - Informasi kontak (telepon, email, website)
 * - Manajemen langganan (tanggal berlangganan, expired, biaya)
 * 
 * @typedef {Object} Sekolah
 * @property {UUID} id - ID unik sekolah (primary key)
 * @property {string} nama - Nama lengkap sekolah (wajib)
 * @property {string} npsn - Nomor Pokok Sekolah Nasional (unik, wajib)
 * @property {string} alamat - Alamat lengkap sekolah (wajib)
 * @property {string} kota - Kota/kabupaten sekolah
 * @property {string} provinsi - Provinsi sekolah
 * @property {string} telepon - Nomor telepon sekolah
 * @property {string} email - Email sekolah
 * @property {string} website - Website sekolah
 * @property {string} status - Status sekolah: 'Aktif' atau 'Non-Aktif'
 * @property {Date} tanggal_berlangganan - Tanggal mulai berlangganan
 * @property {Date} tanggal_expired - Tanggal expired langganan
 * @property {number} biaya_langganan - Biaya langganan aplikasi
 */
const Sekolah = sequelize.define('Sekolah', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik sekolah (UUID)'
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama lengkap sekolah'
  },
  npsn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'Nomor Pokok Sekolah Nasional - identifier unik sekolah'
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Alamat lengkap sekolah'
  },
  kota: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Kota/kabupaten lokasi sekolah'
  },
  provinsi: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Provinsi lokasi sekolah'
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon sekolah'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Alamat email sekolah'
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Alamat website sekolah'
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Non-Aktif'),
    defaultValue: 'Aktif',
    comment: 'Status sekolah: Aktif atau Non-Aktif'
  },
  tanggal_berlangganan: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Tanggal mulai berlangganan aplikasi'
  },
  tanggal_expired: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Tanggal expired langganan aplikasi'
  },
  biaya_langganan: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    comment: 'Biaya langganan aplikasi (dalam Rupiah)'
  }
})

export default Sekolah
