import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Sekolah = sequelize.define('Sekolah', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  npsn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  kota: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provinsi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Non-Aktif'),
    defaultValue: 'Aktif'
  },
  tanggal_berlangganan: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tanggal_expired: {
    type: DataTypes.DATE,
    allowNull: true
  },
  biaya_langganan: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  }
})

export default Sekolah
