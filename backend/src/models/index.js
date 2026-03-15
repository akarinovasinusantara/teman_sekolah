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

// Relasi User
User.hasMany(Guru, { foreignKey: 'user_id', as: 'guru' })
Guru.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(Siswa, { foreignKey: 'user_id', as: 'siswa' })
Siswa.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

// Relasi Sekolah - User (Super Admin manages schools)
Sekolah.hasMany(User, { foreignKey: 'sekolah_id', as: 'users' })
User.belongsTo(Sekolah, { foreignKey: 'sekolah_id', as: 'sekolah' })

// Relasi Kelas
Kelas.belongsTo(Guru, { foreignKey: 'wali_kelas_id', as: 'waliKelas' })
Guru.hasMany(Kelas, { foreignKey: 'wali_kelas_id', as: 'kelasDiwali' })

Kelas.hasMany(Siswa, { foreignKey: 'kelas_id', as: 'siswa' })
Siswa.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

// Relasi Jadwal Pelajaran
Kelas.hasMany(JadwalPelajaran, { foreignKey: 'kelas_id', as: 'jadwal' })
JadwalPelajaran.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

MataPelajaran.hasMany(JadwalPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'jadwal' })
JadwalPelajaran.belongsTo(MataPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'mataPelajaran' })

Guru.hasMany(JadwalPelajaran, { foreignKey: 'guru_id', as: 'jadwalMengajar' })
JadwalPelajaran.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guru' })

// Relasi Absensi
Siswa.hasMany(Absensi, { foreignKey: 'siswa_id', as: 'absensi' })
Absensi.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' })

Kelas.hasMany(Absensi, { foreignKey: 'kelas_id', as: 'absensi' })
Absensi.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

Guru.hasMany(Absensi, { foreignKey: 'guru_id', as: 'absensiDibuat' })
Absensi.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guruPencatat' })

MataPelajaran.hasMany(Absensi, { foreignKey: 'mata_pelajaran_id', as: 'absensi' })
Absensi.belongsTo(MataPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'mataPelajaran' })

// Relasi Nilai
Siswa.hasMany(Nilai, { foreignKey: 'siswa_id', as: 'nilai' })
Nilai.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' })

MataPelajaran.hasMany(Nilai, { foreignKey: 'mata_pelajaran_id', as: 'nilai' })
Nilai.belongsTo(MataPelajaran, { foreignKey: 'mata_pelajaran_id', as: 'mataPelajaran' })

Guru.hasMany(Nilai, { foreignKey: 'guru_id', as: 'nilaiDibuat' })
Nilai.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guruPenilai' })

Kelas.hasMany(Nilai, { foreignKey: 'kelas_id', as: 'nilai' })
Nilai.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

// Relasi Keuangan
Siswa.hasMany(Keuangan, { foreignKey: 'siswa_id', as: 'keuangan' })
Keuangan.belongsTo(Siswa, { foreignKey: 'siswa_id', as: 'siswa' })

User.hasMany(Keuangan, { foreignKey: 'diverifikasi_oleh', as: 'keuanganDiverifikasi' })
Keuangan.belongsTo(User, { foreignKey: 'diverifikasi_oleh', as: 'verifikator' })

// Relasi Pengumuman
Guru.hasMany(Pengumuman, { foreignKey: 'guru_id', as: 'pengumuman' })
Pengumuman.belongsTo(Guru, { foreignKey: 'guru_id', as: 'guruPembuat' })

Kelas.hasMany(Pengumuman, { foreignKey: 'kelas_id', as: 'pengumuman' })
Pengumuman.belongsTo(Kelas, { foreignKey: 'kelas_id', as: 'kelas' })

// Relasi Surat Edaran
User.hasMany(SuratEdaran, { foreignKey: 'dibuat_oleh', as: 'suratDibuat' })
SuratEdaran.belongsTo(User, { foreignKey: 'dibuat_oleh', as: 'pembuat' })

// Relasi PPDB
User.hasMany(PPDB, { foreignKey: 'diverifikasi_oleh', as: 'ppdbDiverifikasi' })
PPDB.belongsTo(User, { foreignKey: 'diverifikasi_oleh', as: 'verifikator' })

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
