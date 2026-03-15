import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model SuratEdaran - Merepresentasikan surat edaran digital dari sekolah
 * 
 * Digunakan untuk:
 * - Mengirim surat edaran resmi dari sekolah
 * - Menyimpan arsip surat dengan nomor surat
 * - Melampirkan file dokumen
 * - Mengelola publikasi surat ke orang tua/siswa
 * 
 * @typedef {Object} SuratEdaran
 * @property {UUID} id - ID unik surat edaran (primary key)
 * @property {string} nomor_surat - Nomor surat resmi (unik)
 * @property {string} judul - Judul surat edaran
 * @property {string} isi - Isi lengkap surat
 * @property {string} kategori - Kategori: Pengumuman, Undangan, Keuangan, Akademik, Lainnya
 * @property {string} lampiran - Path/file lampiran surat (PDF, DOC, dll)
 * @property {Date} tanggal_surat - Tanggal surat dibuat
 * @property {Date} tanggal_publikasi - Tanggal surat dipublikasikan
 * @property {UUID} dibuat_oleh - ID user yang membuat surat
 * @property {boolean} is_active - Status aktif surat
 */
const SuratEdaran = sequelize.define('SuratEdaran', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik surat edaran (UUID)'
  },
  nomor_surat: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'Nomor surat resmi (contoh: 001/SE/2024)'
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Judul surat edaran'
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Isi lengkap surat edaran'
  },
  kategori: {
    type: DataTypes.ENUM('Pengumuman', 'Undangan', 'Keuangan', 'Akademik', 'Lainnya'),
    defaultValue: 'Pengumuman',
    comment: 'Kategori surat: Pengumuman, Undangan, Keuangan, Akademik, atau Lainnya'
  },
  lampiran: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Path/file lampiran surat (PDF, DOC, atau format lainnya)'
  },
  tanggal_surat: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Tanggal surat dibuat'
  },
  tanggal_publikasi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Tanggal dan waktu surat dipublikasikan ke sistem'
  },
  dibuat_oleh: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID user yang membuat surat (foreign key ke User)'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Status aktif surat: true (aktif), false (non-aktif)'
  }
})

export default SuratEdaran
