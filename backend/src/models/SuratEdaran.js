import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const SuratEdaran = sequelize.define('SuratEdaran', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nomor_surat: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  kategori: {
    type: DataTypes.ENUM('Pengumuman', 'Undangan', 'Keuangan', 'Akademik', 'Lainnya'),
    defaultValue: 'Pengumuman'
  },
  lampiran: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tanggal_surat: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tanggal_publikasi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dibuat_oleh: {
    type: DataTypes.UUID,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

export default SuratEdaran
