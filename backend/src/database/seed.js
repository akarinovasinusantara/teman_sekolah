import sequelize from '../config/database.js'
import { User, Sekolah, Guru, MataPelajaran, Kelas } from '../models/index.js'

/**
 * =============================================
 * DATABASE SEEDER
 * =============================================
 * 
 * Script untuk mengisi database dengan data awal (seed data)
 * 
 * Digunakan untuk:
 * - Development: Memudahkan testing tanpa input manual
 * - Demo: Menampilkan fungsionalitas aplikasi
 * 
 * Data yang di-seed:
 * 1. Users (Super Admin, TU, Guru, Ortu, Siswa)
 * 2. Sekolah
 * 3. Guru (data profil)
 * 4. Mata Pelajaran (8 mapel wajib)
 * 5. Kelas (6 kelas: X, XI, XII masing-masing 2 kelas)
 * 
 * CARA MENGGUNAKAN:
 * 
 * 1. Hapus database lama (opsional):
 *    - Hapus file database.sqlite
 * 
 * 2. Jalankan seed:
 *    npm run seed
 * 
 * AKUN YANG DIBUAT:
 * 
 * | Role        | Username           | Password  |
 * |-------------|-------------------|-----------|
 * | super_admin | yayasan_sejahtera | admin123  |
 * | tu          | tu_admin          | tu123     |
 * | guru        | guru_budi         | guru123   |
 * | ortu        | ortu_ahmad        | ortu123   |
 * | siswa       | siswa_ahmad       | siswa123  |
 */

const seedDatabase = async () => {
  try {
    console.log('🌱 Mulai seeding database...')

    // Sync database dengan force: true
    // Ini akan DROP dan CREATE ulang semua tabel
    await sequelize.sync({ force: true })
    console.log('✅ Tabel database dibuat')

    // ==========================================
    // CREATE USERS
    // ==========================================

    /**
     * Super Admin - Yayasan/Pengembang
     * Akses: Full access ke semua fitur dan sekolah
     */
    const superAdmin = await User.create({
      user_id: '001',
      username: 'yayasan_sejahtera',
      password: 'admin123',
      role: 'super_admin',
      nama_lengkap: 'Yayasan Sejahtera',
      email: 'admin@temansekolah.com',
      no_telepon: '081234567890'
    })
    console.log('✅ Super Admin dibuat')

    /**
     * TU (Tata Usaha) - Staf Administrasi
     * Akses: PPDB, Keuangan, Manajemen Siswa/Guru/Kelas
     */
    const tuUser = await User.create({
      user_id: '002',
      username: 'tu_admin',
      password: 'tu123',
      role: 'tu',
      nama_lengkap: 'Staf Tata Usaha',
      email: 'tu@sekolah.com',
      no_telepon: '081234567891'
    })
    console.log('✅ TU User dibuat')

    /**
     * Guru - Pengajar
     * Akses: Input absensi, nilai, pengumuman kelas
     */
    const guruUser = await User.create({
      user_id: '003',
      username: 'guru_budi',
      password: 'guru123',
      role: 'guru',
      nama_lengkap: 'Budi Santoso, S.Pd',
      email: 'budi@sekolah.com',
      no_telepon: '081234567892'
    })
    console.log('✅ Guru User dibuat')

    /**
     * Ortu - Orang Tua Siswa
     * Akses: Monitoring anak (keuangan, absensi, nilai)
     */
    const ortuUser = await User.create({
      user_id: '004',
      username: 'ortu_ahmad',
      password: 'ortu123',
      role: 'ortu',
      nama_lengkap: 'Orang Tua Ahmad',
      email: 'ortu@example.com',
      no_telepon: '081234567893'
    })
    console.log('✅ Ortu User dibuat')

    /**
     * Siswa - Siswa
     * Akses: Lihat informasi pribadi
     */
    const siswaUser = await User.create({
      user_id: '005',
      username: 'siswa_ahmad',
      password: 'siswa123',
      role: 'siswa',
      nama_lengkap: 'Ahmad Rizky',
      email: 'ahmad@example.com',
      no_telepon: '081234567894'
    })
    console.log('✅ Siswa User dibuat')

    // ==========================================
    // CREATE SEKOLAH
    // ==========================================

    /**
     * Data sekolah contoh
     */
    const sekolah = await Sekolah.create({
      nama: 'SMA Negeri 1 Jakarta',
      npsn: '10101010',
      alamat: 'Jl. Pendidikan No. 1',
      kota: 'Jakarta Pusat',
      provinsi: 'DKI Jakarta',
      telepon: '021-1234567',
      email: 'info@smanj1.sch.id',
      website: 'www.smanj1.sch.id',
      status: 'Aktif',
      biaya_langganan: 5000000
    })
    console.log('✅ Sekolah dibuat')

    // ==========================================
    // CREATE GURU (DATA PROFIL)
    // ==========================================

    /**
     * Data profil guru
     * Terhubung dengan user guru_budi
     */
    const guru = await Guru.create({
      nip: '198501012010011001',
      nama_lengkap: 'Budi Santoso, S.Pd',
      tempat_lahir: 'Jakarta',
      tanggal_lahir: '1985-01-01',
      jenis_kelamin: 'L',
      agama: 'Islam',
      alamat: 'Jl. Guru No. 123, Jakarta',
      telepon: '081234567892',
      email: 'budi@sekolah.com',
      pendidikan_terakhir: 'S1 Pendidikan Matematika',
      jurusan: 'Pendidikan Matematika',
      status: 'Aktif',
      tanggal_bergabung: '2010-01-01'
    })
    console.log('✅ Data Guru dibuat')

    // ==========================================
    // CREATE MATA PELAJARAN
    // ==========================================

    /**
     * Daftar mata pelajaran wajib SMA
     */
    const mapelList = [
      { kode: 'MTK', nama: 'Matematika', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 5 },
      { kode: 'BIN', nama: 'Bahasa Indonesia', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 4 },
      { kode: 'BIG', nama: 'Bahasa Inggris', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 4 },
      { kode: 'IPA', nama: 'Ilmu Pengetahuan Alam', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 4 },
      { kode: 'IPS', nama: 'Ilmu Pengetahuan Sosial', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 3 },
      { kode: 'PKN', nama: 'Pendidikan Kewarganegaraan', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 2 },
      { kode: 'SENBI', nama: 'Seni Budaya', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 2 },
      { kode: 'PJOK', nama: 'PJOK', kelompok: 'Wajib', kkm: 75, jam_per_minggu: 2 }
    ]

    for (const mapel of mapelList) {
      await MataPelajaran.create(mapel)
    }
    console.log('✅ Mata Pelajaran dibuat')

    // ==========================================
    // CREATE KELAS
    // ==========================================

    /**
     * Daftar kelas untuk 3 tingkat (X, XI, XII)
     * Masing-masing 2 kelas paralel
     */
    const kelasList = [
      { nama: 'X-A', tingkat: 10, tahun_ajaran: '2025/2026', kapasitas: 32 },
      { nama: 'X-B', tingkat: 10, tahun_ajaran: '2025/2026', kapasitas: 32 },
      { nama: 'XI-A', tingkat: 11, tahun_ajaran: '2025/2026', kapasitas: 32 },
      { nama: 'XI-B', tingkat: 11, tahun_ajaran: '2025/2026', kapasitas: 32 },
      { nama: 'XII-A', tingkat: 12, tahun_ajaran: '2025/2026', kapasitas: 32 },
      { nama: 'XII-B', tingkat: 12, tahun_ajaran: '2025/2026', kapasitas: 32 }
    ]

    for (const kelas of kelasList) {
      await Kelas.create(kelas)
    }
    console.log('✅ Kelas dibuat')

    // ==========================================
    // SUMMARY
    // ==========================================

    console.log('\n✅ Seeding selesai!')
    console.log('\n📋 Akun yang dibuat:')
    console.log('  Super Admin: yayasan_sejahtera / admin123')
    console.log('  TU: tu_admin / tu123')
    console.log('  Guru: guru_budi / guru123')
    console.log('  Ortu: ortu_ahmad / ortu123')
    console.log('  Siswa: siswa_ahmad / siswa123')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding:', error)
    process.exit(1)
  }
}

seedDatabase()
