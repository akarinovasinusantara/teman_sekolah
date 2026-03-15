import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const JadwalPelajaran = sequelize.define('JadwalPelajaran', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  mata_pelajaran_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  hari: {
    type: DataTypes.ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'),
    allowNull: false
  },
  jam_mulai: {
    type: DataTypes.TIME,
    allowNull: false
  },
  jam_selesai: {
    type: DataTypes.TIME,
    allowNull: false
  },
  ruang: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

export default JadwalPelajaran
