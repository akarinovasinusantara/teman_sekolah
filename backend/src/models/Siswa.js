import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Siswa = sequelize.define('Siswa', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nis: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nisn: {
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
  nama_ayah: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nama_ibu: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telepon_ortu: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Lulus', 'Pindah', 'Dropout'),
    defaultValue: 'Aktif'
  },
  tahun_masuk: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
})

export default Siswa
