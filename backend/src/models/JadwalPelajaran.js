import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model JadwalPelajaran - Merepresentasikan jadwal mata pelajaran per kelas
 * 
 * Digunakan untuk mengelola:
 * - Jadwal pelajaran mingguan per kelas
 * - Penugasan guru per mata pelajaran
 * - Alokasi waktu dan ruang
 * 
 * @typedef {Object} JadwalPelajaran
 * @property {UUID} id - ID unik jadwal (primary key)
 * @property {UUID} kelas_id - ID kelas yang dijadwalkan
 * @property {UUID} mata_pelajaran_id - ID mata pelajaran
 * @property {UUID} guru_id - ID guru pengampu
 * @property {string} hari - Hari: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu
 * @property {Time} jam_mulai - Jam mulai pelajaran (format: HH:MM:SS)
 * @property {Time} jam_selesai - Jam selesai pelajaran (format: HH:MM:SS)
 * @property {string} ruang - Ruang/lokasi pelajaran
 */
const JadwalPelajaran = sequelize.define('JadwalPelajaran', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik jadwal pelajaran (UUID)'
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID kelas yang dijadwalkan (foreign key ke Kelas)'
  },
  mata_pelajaran_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID mata pelajaran yang dijadwalkan (foreign key ke MataPelajaran)'
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID guru pengampu mata pelajaran (foreign key ke Guru)'
  },
  hari: {
    type: DataTypes.ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'),
    allowNull: false,
    comment: 'Hari pelaksanaan pelajaran'
  },
  jam_mulai: {
    type: DataTypes.TIME,
    allowNull: false,
    comment: 'Jam mulai pelajaran (format: HH:MM:SS)'
  },
  jam_selesai: {
    type: DataTypes.TIME,
    allowNull: false,
    comment: 'Jam selesai pelajaran (format: HH:MM:SS)'
  },
  ruang: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ruang/lokasi pelaksanaan pelajaran'
  }
})

export default JadwalPelajaran
