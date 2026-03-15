import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Guru - Merepresentasikan data guru/staf pengajar dalam sistem
 * 
 * Digunakan untuk menyimpan informasi lengkap guru termasuk:
 * - Data pribadi (nama, tempat/tanggal lahir, jenis kelamin)
 * - Data kontak (alamat, telepon, email)
 * - Data profesional (NIP, pendidikan terakhir, jurusan)
 * - Kinerja (total jurnal, jurnal tepat waktu)
 * 
 * @typedef {Object} Guru
 * @property {UUID} id - ID unik guru (primary key)
 * @property {string} nip - Nomor Induk Pegawai (unik, opsional)
 * @property {string} nama_lengkap - Nama lengkap guru (wajib)
 * @property {string} tempat_lahir - Tempat lahir guru
 * @property {Date} tanggal_lahir - Tanggal lahir guru
 * @property {string} jenis_kelamin - 'L' (Laki-laki) atau 'P' (Perempuan)
 * @property {string} agama - Agama guru
 * @property {string} alamat - Alamat lengkap guru
 * @property {string} telepon - Nomor telepon guru
 * @property {string} email - Email guru
 * @property {string} pendidikan_terakhir - Pendidikan terakhir (contoh: S1, S2)
 * @property {string} jurusan - Jurusan pendidikan
 * @property {string} status - Status guru: 'Aktif' atau 'Non-Aktif'
 * @property {Date} tanggal_bergabung - Tanggal bergabung sebagai guru
 * @property {number} total_jurnal - Total jurnal mengajar yang diisi
 * @property {number} jurnal_tepat_waktu - Jumlah jurnal yang diisi tepat waktu
 */
const Guru = sequelize.define('Guru', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik guru (UUID)'
  },
  nip: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    comment: 'Nomor Induk Pegawai - identifier unik untuk guru'
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nama lengkap guru'
  },
  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Tempat lahir guru'
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Tanggal lahir guru'
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('L', 'P'),
    allowNull: true,
    comment: 'Jenis kelamin: L (Laki-laki), P (Perempuan)'
  },
  agama: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Agama guru'
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Alamat lengkap guru'
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nomor telepon guru'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Alamat email guru'
  },
  pendidikan_terakhir: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Pendidikan terakhir guru (contoh: S1 Pendidikan Matematika)'
  },
  jurusan: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Jurusan pendidikan guru'
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Non-Aktif'),
    defaultValue: 'Aktif',
    comment: 'Status kepegawaian: Aktif atau Non-Aktif'
  },
  tanggal_bergabung: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Tanggal guru bergabung dengan sekolah'
  },
  total_jurnal: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Total jumlah jurnal mengajar yang telah diisi guru'
  },
  jurnal_tepat_waktu: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Jumlah jurnal yang diisi tepat waktu (untuk monitoring kinerja)'
  }
})

export default Guru
