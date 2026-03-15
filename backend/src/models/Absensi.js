import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Absensi = sequelize.define('Absensi', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  siswa_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  mata_pelajaran_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Hadir', 'Sakit', 'Izin', 'Alpa'),
    allowNull: false,
    defaultValue: 'Hadir'
  },
  jam_masuk: {
    type: DataTypes.TIME,
    allowNull: true
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  }
})

export default Absensi
