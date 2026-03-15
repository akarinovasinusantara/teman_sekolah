import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Nilai - Merepresentasikan data nilai siswa
 * 
 * Digunakan oleh guru untuk:
 * - Input nilai harian, UTS, dan UAS
 * - Memberikan deskripsi capaian siswa
 * - Menyimpan nilai per semester dan tahun ajaran
 * 
 * @typedef {Object} Nilai
 * @property {UUID} id - ID unik nilai (primary key)
 * @property {UUID} siswa_id - ID siswa pemilik nilai
 * @property {UUID} mata_pelajaran_id - ID mata pelajaran
 * @property {UUID} guru_id - ID guru yang memberi nilai
 * @property {UUID} kelas_id - ID kelas siswa
 * @property {string} jenis - Jenis nilai: 'Harian', 'UTS', 'UAS'
 * @property {number} nilai_angka - Nilai dalam bentuk angka (0-100)
 * @property {string} deskripsi - Deskripsi capaian siswa
 * @property {string} semester - Semester (1 atau 2)
 * @property {string} tahun_ajaran - Tahun ajaran (contoh: 2024/2025)
 */
const Nilai = sequelize.define('Nilai', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik记录 nilai (UUID)'
  },
  siswa_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID siswa pemilik nilai (foreign key ke Siswa)'
  },
  mata_pelajaran_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID mata pelajaran (foreign key ke MataPelajaran)'
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID guru yang memberi nilai (foreign key ke Guru)'
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID kelas siswa (foreign key ke Kelas)'
  },
  jenis: {
    type: DataTypes.ENUM('Harian', 'UTS', 'UAS'),
    allowNull: false,
    comment: 'Jenis penilaian: Harian (ulangan harian), UTS (Ujian Tengah Semester), UAS (Ujian Akhir Semester)'
  },
  nilai_angka: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Nilai dalam bentuk angka (skala 0-100)'
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Deskripsi capaian kompetensi siswa'
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Semester penilaian (1 = Ganjil, 2 = Genap)'
  },
  tahun_ajaran: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Tahun ajaran (contoh: 2024/2025)'
  }
})

export default Nilai
