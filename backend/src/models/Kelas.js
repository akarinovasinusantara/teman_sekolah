import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Kelas = sequelize.define('Kelas', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tingkat: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wali_kelas_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  tahun_ajaran: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kapasitas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  jumlah_siswa: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export default Kelas
