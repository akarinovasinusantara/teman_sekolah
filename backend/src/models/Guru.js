import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Guru = sequelize.define('Guru', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nip: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('L', 'P'),
    allowNull: true
  },
  agama: {
    type: DataTypes.STRING,
    allowNull: true
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pendidikan_terakhir: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jurusan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Non-Aktif'),
    defaultValue: 'Aktif'
  },
  tanggal_bergabung: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  total_jurnal: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  jurnal_tepat_waktu: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export default Guru
