import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model MataPelajaran - Merepresentasikan data mata pelajaran
 * 
 * Digunakan untuk mengelola:
 * - Daftar mata pelajaran yang tersedia
 * - Kelompok mata pelajaran (Wajib, Peminatan, Lintas Minat)
 * - Kriteria Ketuntasan Minimal (KKM)
 * - Beban jam per minggu
 * 
 * @typedef {Object} MataPelajaran
 * @property {UUID} id - ID unik mata pelajaran (primary key)
 * @property {string} kode - Kode mata pelajaran (unik, contoh: MTK, BHS_IND)
 * @property {string} nama - Nama mata pelajaran (wajib)
 * @property {string} kelompok - Kelompok: 'Wajib', 'Peminatan', 'Lintas_Minat'
 * @property {number} kkm - Kriteria Ketuntasan Minimal (default: 70)
 * @property {number} jam_per_minggu - Jumlah jam pelajaran per minggu
 */
const MataPelajaran = sequelize.define('MataPelajaran', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik mata pelajaran (UUID)'
  },
  kode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    comment: 'Kode mata pelajaran (contoh: MTK, BHS_IND, FISIKA)'
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama mata pelajaran'
  },
  kelompok: {
    type: DataTypes.ENUM('Wajib', 'Peminatan', 'Lintas_Minat'),
    defaultValue: 'Wajib',
    comment: 'Kelompok mata pelajaran: Wajib, Peminatan, atau Lintas Minat'
  },
  kkm: {
    type: DataTypes.INTEGER,
    defaultValue: 70,
    comment: 'Kriteria Ketuntasan Minimal (KKM) - nilai minimum untuk lulus'
  },
  jam_per_minggu: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Beban jam pelajaran per minggu'
  }
})

export default MataPelajaran
