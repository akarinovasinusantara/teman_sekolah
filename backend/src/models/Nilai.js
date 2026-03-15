import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Nilai = sequelize.define('Nilai', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  siswa_id: {
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
  kelas_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  jenis: {
    type: DataTypes.ENUM('Harian', 'UTS', 'UAS'),
    allowNull: false
  },
  nilai_angka: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tahun_ajaran: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Nilai
