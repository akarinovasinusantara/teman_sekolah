import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const MataPelajaran = sequelize.define('MataPelajaran', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  kode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kelompok: {
    type: DataTypes.ENUM('Wajib', 'Peminatan', 'Lintas_Minat'),
    defaultValue: 'Wajib'
  },
  kkm: {
    type: DataTypes.INTEGER,
    defaultValue: 70
  },
  jam_per_minggu: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
})

export default MataPelajaran
