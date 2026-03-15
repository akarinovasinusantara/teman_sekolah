import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model PPDB - Pendaftaran Peserta Didik Baru
 * 
 * Digunakan oleh TU (Tata Usaha) untuk mengelola:
 * - Pendaftaran siswa baru online
 * - Status pendaftaran (Baru, Proses, Diterima, Ditolak)
 * - Verifikasi berkas pendaftaran
 * - Data calon siswa dan orang tua
 * 
 * @typedef {Object} PPDB
 * @property {UUID} id - ID unik pendaftaran (primary key)
 * @property {string} no_pendaftaran - Nomor pendaftaran (unik)
 * @property {string} nama_lengkap - Nama lengkap calon siswa
 * @property {string} nisn - NISN calon siswa
 * @property {string} tempat_lahir - Tempat lahir
 * @property {Date} tanggal_lahir - Tanggal lahir
 * @property {string} jenis_kelamin - 'L' (Laki-laki) atau 'P' (Perempuan)
 * @property {string} agama - Agama
 * @property {string} alamat - Alamat lengkap
 * @property {string} telepon - Nomor telepon
 * @property {string} email - Email
 * @property {string} asal_sekolah - Asal sekolah sebelumnya
 * @property {string} nama_ayah - Nama ayah
 * @property {string} nama_ibu - Nama ibu
 * @property {string} telepon_ortu - Nomor telepon orang tua
 * @property {string} status - Status: 'Baru', 'Proses', 'Diterima', 'Ditolak'
 * @property {Date} tanggal_daftar - Tanggal pendaftaran
 * @property {Date} tanggal_diproses - tanggal mulai diproses
 * @property {Date} tanggal_diterima - Tanggal diterima
 * @property {string} catatan - Catatan dari verifier
 * @property {UUID} diverifikasi_oleh - ID user yang memverifikasi (TU)
 */
const PPDB = sequelize.define('PPDB', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik pendaftaran PPDB (UUID)'
  },
  no_pendaftaran: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'Nomor pendaftaran (contoh: PPDB-2024-001)'
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama lengkap calon siswa'
  },
  nisn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: 'Nomor Induk Siswa Nasional'
  },
  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Tempat lahir calon siswa'
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Tanggal lahir calon siswa'
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('L', 'P'),
    allowNull: true,
    comment: 'Jenis kelamin: L (Laki-laki), P (Perempuan)'
  },
  agama: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Agama calon siswa'
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Alamat lengkap calon siswa'
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon calon siswa/kontak'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Alamat email calon siswa'
  },
  asal_sekolah: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Asal sekolah sebelumnya (contoh: SMP Negeri 1 Kota X)'
  },
  nama_ayah: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nama lengkap ayah'
  },
  nama_ibu: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nama lengkap ibu'
  },
  telepon_ortu: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon orang tua/wali'
  },
  status: {
    type: DataTypes.ENUM('Baru', 'Proses', 'Diterima', 'Ditolak'),
    defaultValue: 'Baru',
    comment: 'Status pendaftaran: Baru, Proses, Diterima, atau Ditolak'
  },
  tanggal_daftar: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Tanggal dan waktu pendaftaran'
  },
  tanggal_diproses: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Tanggal pendaftaran mulai diproses oleh TU'
  },
  tanggal_diterima: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Tanggal calon siswa diterima'
  },
  catatan: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Catatan dari verifier tentang pendaftaran ini'
  },
  diverifikasi_oleh: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID user (TU) yang memverifikasi pendaftaran (foreign key ke User)'
  }
})

export default PPDB
