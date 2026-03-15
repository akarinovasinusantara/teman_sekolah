import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Pengumuman = sequelize.define('Pengumuman', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
    type: DataTypes.ENUM('Pengumuman', 'Undangan', 'Keuangan', 'Akademik'),
    defaultValue: 'Pengumuman'
  },
  prioritas: {
    type: DataTypes.ENUM('Normal', 'Penting', 'Segera'),
    defaultValue: 'Normal'
  },
  guru_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  is_global: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tanggal_publikasi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tanggal_kadaluarsa: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

export default Pengumuman
