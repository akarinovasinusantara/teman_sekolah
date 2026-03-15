import User from './User.js'
import Sekolah from './Sekolah.js'
import Siswa from './Siswa.js'
import Guru from './Guru.js'
import Kelas from './Kelas.js'
import MataPelajaran from './MataPelajaran.js'
import JadwalPelajaran from './JadwalPelajaran.js'
import Absensi from './Absensi.js'
import Nilai from './Nilai.js'
import Keuangan from './Keuangan.js'
import Pengumuman from './Pengumuman.js'
import SuratEdaran from './SuratEdaran.js'
import PPDB from './PPDB.js'

/**
 * =============================================
 * DEFINISI RELASI ANTAR MODEL
 * =============================================
 * 
 * File ini mendefinisikan semua relasi database antara model-model:
 * 
 * 1. RELASI USER
 *    - User → Guru (1:N) - User bisa memiliki data guru
 *    - User → Siswa (1:N) - User bisa memiliki data siswa
 *    - Sekolah → User (1:N) - Sekolah memiliki banyak user
 * 
 * 2. RELASI KELAS
 *    - Guru → Kelas (1:N) - Guru bisa menjadi wali kelas
 *    - Kelas → Siswa (1:N) - Kelas memiliki banyak siswa
 * 
 * 3. RELASI JADWAL PELAJARAN
 *    - Kelas → JadwalPelajaran (1:N)
 *    - MataPelajaran → JadwalPelajaran (1:N)
 *    - Guru → JadwalPelajaran (1:N)
 * 
 * 4. RELASI ABSENSI
 *    - Siswa → Absensi (1:N)
 *    - Kelas → Absensi (1:N)
 *    - Guru → Absensi (1:N)
 *    - MataPelajaran → Absensi (1:N)
 * 
 * 5. RELASI NILAI
 *    - Siswa → Nilai (1:N)
 *    - MataPelajaran → Nilai (1:N)
 *    - Guru → Nilai (1:N)
 *    - Kelas → Nilai (1:N)
 * 
 * 6. RELASI KEUANGAN
 *    - Siswa → Keuangan (1:N)
 *    - User → Keuangan (1:N) - User (TU) yang verifikasi
 * 
 * 7. RELASI PENGUMUMAN
 *    - Guru → Pengumuman (1:N)
 *    - Kelas → Pengumuman (1:N)
 * 
 * 8. RELASI SURAT EDARAN
 *    - User → SuratEdaran (1:N)
 * 
 * 9. RELASI PPDB
 *    - User → PPDB (1:N) - User (TU) yang verifikasi
 */

// ==========================================
// RELASI USER
// ==========================================

/**
 * Relasi User dengan Guru
 * Seorang user dapat memiliki data guru (jika role = guru)
 */
User.hasMany(Guru, { foreignKey: 'user_id', as: 'guru' })
Guru.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

/**
 * Relasi User dengan Siswa
 * Seorang user dapat memiliki data siswa (jika role = siswa/ortu)
 */
User.hasMany(Siswa, { foreignKey: 'user_id', as: 'siswa' })
Siswa.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

// ==========================================
// RELASI SEKOLAH - USER
// ==========================================

/**
 * Relasi Sekolah dengan User
 * Sebuah sekolah memiliki banyak user (guru, siswa, tu, dll)
 */
Sekolah.hasMany(User, { foreignKey: 'sekolah_id', as: 'users' })
User.belongsTo(Sekolah, { foreignKey: 'sekolah_id', as: 'sekolah' })

// ==========================================
// RELASI KELAS
// ==========================================

/**
 * Relasi Guru dengan Kelas (Wali Kelas)
 * Seorang guru dapat menjadi wali kelas untuk beberapa kelas
 */
Kelas.belongsTo(Guru, { foreignKey: 'wali_kelas_id', as: 'waliKelas' })
Guru.hasMany(Kelas, { foreignKey: 'wali_kelas_id', as: 'kelasDiwali' })

/**
 * Relasi Kelas dengan Siswa
 * Sebuah kelas memiliki banyak siswa
 */
Kelas.hasMany(Siswa, { foreignKey: 'kelas_id', as: 'siswa' })
Siswa.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

// ==========================================
// RELASI JADWAL PELAJARAN
// ==========================================

/**
 * Relasi Kelas dengan Jadwal Pelajaran
 * Sebuah kelas memiliki banyak jadwal pelajaran
 */
Kelas.hasMany(JadwalPelajaran, { foreignKey: 'kelas_id', as: 'jadwal' })
JadwalPelajaran.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

/**
 * Relasi Mata Pelajaran dengan Jadwal
 * Sebuah mata pelajaran dapat dijadwalkan di beberapa kelas
 */
MataPelajaran.hasMany(JadwalPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'jadwal' })
JadwalPelajaran.belongsTo(MataPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'mataPelajaran' })

/**
 * Relasi Guru dengan Jadwal Mengajar
 * Seorang guru memiliki banyak jadwal mengajar
 */
Guru.hasMany(JadwalPelajaran, { foreignKey: 'guru_id', as: 'jadwalMengajar' })
JadwalPelajaran.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guru' })

// ==========================================
// RELASI ABSENSI
// ==========================================

/**
 * Relasi Siswa dengan Absensi
 * Seorang siswa memiliki banyak record absensi
 */
Siswa.hasMany(Absensi, { foreignKey: 'siswa_id', as: 'absensi' })
Absensi.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' })

/**
 * Relasi Kelas dengan Absensi
 * Sebuah kelas memiliki banyak record absensi
 */
Kelas.hasMany(Absensi, { foreignKey: 'kelas_id', as: 'absensi' })
Absensi.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

/**
 * Relasi Guru dengan Absensi
 * Seorang guru memiliki banyak record absensi yang dibuat
 */
Guru.hasMany(Absensi, { foreignKey: 'guru_id', as: 'absensiDibuat' })
Absensi.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guruPencatat' })

/**
 * Relasi Mata Pelajaran dengan Absensi
 * Absensi dapat dikaitkan dengan mata pelajaran tertentu
 */
MataPelajaran.hasMany(Absensi, { foreignKey: 'mata_pelajaran_id', as: 'absensi' })
Absensi.belongsTo(MataPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'mataPelajaran' })

// ==========================================
// RELASI NILAI
// ==========================================

/**
 * Relasi Siswa dengan Nilai
 * Seorang siswa memiliki banyak record nilai
 */
Siswa.hasMany(Nilai, { foreignKey: 'siswa_id', as: 'nilai' })
Nilai.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' })

/**
 * Relasi Mata Pelajaran dengan Nilai
 * Sebuah mata pelajaran memiliki banyak record nilai
 */
MataPelajaran.hasMany(Nilai, { foreignKey: 'mata_pelajaran_id', as: 'nilai' })
Nilai.belongsTo(MataPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'mataPelajaran' })

/**
 * Relasi Guru dengan Nilai
 * Seorang guru memiliki banyak record nilai yang dibuat
 */
Guru.hasMany(Nilai, { foreignKey: 'guru_id', as: 'nilaiDibuat' })
Nilai.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guruPenilai' })

/**
 * Relasi Kelas dengan Nilai
 * Sebuah kelas memiliki banyak record nilai
 */
Kelas.hasMany(Nilai, { foreignKey: 'kelas_id', as: 'nilai' })
Nilai.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

// ==========================================
// RELASI KEUANGAN
// ==========================================

/**
 * Relasi Siswa dengan Keuangan
 * Seorang siswa memiliki banyak record transaksi keuangan
 */
Siswa.hasMany(Keuangan, { foreignKey: 'siswa_id', as: 'keuangan' })
Keuangan.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' })

/**
 * Relasi User dengan Keuangan (Verifikator)
 * User (TU) dapat memverifikasi banyak transaksi keuangan
 */
User.hasMany(Keuangan, { foreignKey: 'diverifikasi_oleh', as: 'keuanganDiverifikasi' })
Keuangan.belongsTo(User, { foreignKey: 'diverifikasi_oleh', as: 'verifikator' })

// ==========================================
// RELASI PENGUMUMAN
// ==========================================

/**
 * Relasi Guru dengan Pengumuman
 * Seorang guru dapat membuat banyak pengumuman
 */
Guru.hasMany(Pengumuman, { foreignKey: 'guru_id', as: 'pengumuman' })
Pengumuman.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guruPembuat' })

/**
 * Relasi Kelas dengan Pengumuman
 * Sebuah kelas dapat menerima banyak pengumuman
 */
Kelas.hasMany(Pengumuman, { foreignKey: 'kelas_id', as: 'pengumuman' })
Pengumuman.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

// ==========================================
// RELASI SURAT EDARAN
// ==========================================

/**
 * Relasi User dengan Surat Edaran
 * User dapat membuat banyak surat edaran
 */
User.hasMany(SuratEdaran, { foreignKey: 'dibuat_oleh', as: 'suratDibuat' })
SuratEdaran.belongsTo(User, { foreignKey: 'dibuat_oleh', as: 'pembuat' })

// ==========================================
// RELASI PPDB
// ==========================================

/**
 * Relasi User dengan PPDB (Verifikator)
 * User (TU) dapat memverifikasi banyak pendaftaran PPDB
 */
User.hasMany(PPDB, { foreignKey: 'diverifikasi_oleh', as: 'ppdbDiverifikasi' })
PPDB.belongsTo(User, { foreignKey: 'diverifikasi_oleh', as: 'verifikator' })

/**
 * Export semua model untuk digunakan di file lain
 */
export {
  User,
  Sekolah,
  Siswa,
  Guru,
  Kelas,
  MataPelajaran,
  JadwalPelajaran,
  Absensi,
  Nilai,
  Keuangan,
  Pengumuman,
  SuratEdaran,
  PPDB
}
