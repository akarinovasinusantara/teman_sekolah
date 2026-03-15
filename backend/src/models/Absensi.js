import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Absensi - Merepresentasikan data kehadiran siswa
 * 
 * Digunakan oleh guru untuk:
 * - Mencatat kehadiran siswa per pertemuan
 * - Menandai status: Hadir, Sakit, Izin, Alpa
 * - Mencatat jam masuk dan keterangan
 * 
 * @typedef {Object} Absensi
 * @property {UUID} id - ID unik absensi (primary key)
 * @property {UUID} siswa_id - ID siswa yang hadir
 * @property {UUID} kelas_id - ID kelas tempat absensi
 * @property {UUID} guru_id - ID guru yang mencatat absensi
 * @property {UUID} mata_pelajaran_id - ID mata pelajaran
 * @property {Date} tanggal - Tanggal absensi
 * @property {string} status - Status: 'Hadir', 'Sakit', 'Izin', 'Alpa'
 * @property {Time} jam_masuk - Jam masuk siswa
 * @property {string} keterangan - Keterangan tambahan (alasan sakit/izin)
 */
const Absensi = sequelize.define('Absensi', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik记录 absensi (UUID)'
  },
  siswa_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID siswa yang hadir (foreign key ke Siswa)'
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID kelas tempat absensi dilakukan (foreign key ke Kelas)'
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID guru yang mencatat absensi (foreign key ke Guru)'
  },
  mata_pelajaran_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID mata pelajaran saat absensi (foreign key ke MataPelajaran)'
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Tanggal pelaksanaan absensi'
  },
  status: {
    type: DataTypes.ENUM('Hadir', 'Sakit', 'Izin', 'Alpa'),
    allowNull: false,
    defaultValue: 'Hadir',
    comment: 'Status kehadiran: Hadir, Sakit, Izin, atau Alpa'
  },
  jam_masuk: {
    type: DataTypes.TIME,
    allowNull: true,
    comment: 'Jam masuk siswa ke kelas'
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Keterangan tambahan (alasan sakit/izin/alpa)'
  }
})

export default Absensi
