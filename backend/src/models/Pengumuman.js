import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Pengumuman - Merepresentasikan pengumuman dari guru ke siswa
 * 
 * Digunakan oleh guru untuk:
 * - Mengirim pengumuman ke kelas
 * - Mengirim undangan atau informasi keuangan
 * - Menentukan prioritas dan tanggal publikasi
 * 
 * @typedef {Object} Pengumuman
 * @property {UUID} id - ID unik pengumuman (primary key)
 * @property {string} judul - Judul pengumuman
 * @property {string} isi - Isi pengumuman
 * @property {string} kategori - Kategori: 'Pengumuman', 'Undangan', 'Keuangan', 'Akademik'
 * @property {string} prioritas - Prioritas: 'Normal', 'Penting', 'Segera'
 * @property {UUID} guru_id - ID guru yang membuat pengumuman
 * @property {UUID} kelas_id - ID kelas tujuan (null = semua kelas)
 * @property {boolean} is_global - true jika pengumuman untuk semua kelas
 * @property {Date} tanggal_publikasi - Tanggal pengumuman dipublikasikan
 * @property {Date} tanggal_kadaluarsa - Tanggal pengumuman kadaluarsa
 * @property {boolean} is_active - Status aktif pengumuman
 */
const Pengumuman = sequelize.define('Pengumuman', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik pengumuman (UUID)'
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Judul pengumuman'
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Isi lengkap pengumuman'
  },
  kategori: {
    type: DataTypes.ENUM('Pengumuman', 'Undangan', 'Keuangan', 'Akademik'),
    defaultValue: 'Pengumuman',
    comment: 'Kategori pengumuman: Pengumuman umum, Undangan, Keuangan, atau Akademik'
  },
  prioritas: {
    type: DataTypes.ENUM('Normal', 'Penting', 'Segera'),
    defaultValue: 'Normal',
    comment: 'Tingkat prioritas: Normal, Penting, atau Segera (urgent)'
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID guru yang membuat pengumuman (foreign key ke Guru)'
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID kelas tujuan pengumuman (null jika untuk semua kelas)'
  },
  is_global: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'true jika pengumuman untuk semua kelas, false jika untuk kelas tertentu'
  },
  tanggal_publikasi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Tanggal dan waktu pengumuman dipublikasikan'
  },
  tanggal_kadaluarsa: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Tanggal pengumuman kadaluarsa/tidak ditampilkan lagi'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Status aktif pengumuman: true (aktif), false (non-aktif)'
  }
})

export default Pengumuman
