import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const PPDB = sequelize.define('PPDB', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  no_pendaftaran: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nisn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
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
  asal_sekolah: {
    type: DataTypes.STRING,
    allowNull: false
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
    type: DataTypes.ENUM('Baru', 'Proses', 'Diterima', 'Ditolak'),
    defaultValue: 'Baru'
  },
  tanggal_daftar: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tanggal_diproses: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tanggal_diterima: {
    type: DataTypes.DATE,
    allowNull: true
  },
  catatan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diverifikasi_oleh: {
    type: DataTypes.UUID,
    allowNull: true
  }
})

export default PPDB
