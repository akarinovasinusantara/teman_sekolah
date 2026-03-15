import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Kelas - Merepresentasikan data kelas dalam sekolah
 * 
 * Digunakan untuk mengelola:
 * - Informasi kelas (nama, tingkat, kapasitas)
 * - Wali kelas (guru yang ditunjuk)
 * - Tahun ajaran
 * - Jumlah siswa dalam kelas
 * 
 * @typedef {Object} Kelas
 * @property {UUID} id - ID unik kelas (primary key)
 * @property {string} nama - Nama kelas (contoh: X-A, XI-IPA-1)
 * @property {number} tingkat - Tingkat kelas (10, 11, 12)
 * @property {UUID} wali_kelas_id - ID guru yang menjadi wali kelas
 * @property {string} tahun_ajaran - Tahun ajaran (contoh: 2024/2025)
 * @property {number} kapasitas - Kapasitas maksimal siswa
 * @property {number} jumlah_siswa - Jumlah siswa saat ini
 */
const Kelas = sequelize.define('Kelas', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik kelas (UUID)'
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama kelas (contoh: X-A, XI-IPA-1, XII-IPS-2)'
  },
  tingkat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Tingkat kelas (10 = SMA kelas 1, 11 = SMA kelas 2, 12 = SMA kelas 3)'
  },
  wali_kelas_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID guru yang ditunjuk sebagai wali kelas'
  },
  tahun_ajaran: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Tahun ajaran aktif (contoh: 2024/2025)'
  },
  kapasitas: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Kapasitas maksimal siswa dalam kelas'
  },
  jumlah_siswa: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Jumlah siswa yang terdaftar di kelas ini'
  }
})

export default Kelas
