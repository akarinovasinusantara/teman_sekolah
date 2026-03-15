import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Layout
import MainLayout from './components/layout/MainLayout'

// Pages - Super Admin
import SuperAdminDashboard from './pages/super-admin/Dashboard'
import ManajemenSekolah from './pages/super-admin/ManajemenSekolah'
import LaporanKeuangan from './pages/super-admin/LaporanKeuangan'
import KinerjaGuru from './pages/super-admin/KinerjaGuru'

// Pages - Staf Administrasi (TU)
import TU_Dashboard from './pages/tu/Dashboard'
import PPDB from './pages/tu/PPDB'
import KeuanganSPP from './pages/tu/KeuanganSPP'
import JadwalPelajaran from './pages/tu/JadwalPelajaran'
import SuratMenyurat from './pages/tu/SuratMenyurat'

// Pages - Guru
import GuruDashboard from './pages/guru/Dashboard'
import AbsensiSiswa from './pages/guru/AbsensiSiswa'
import InputNilai from './pages/guru/InputNilai'
import ERapor from './pages/guru/ERapor'
import PengumumanKelas from './pages/guru/PengumumanKelas'

// Pages - Orang Tua
import OrtuDashboard from './pages/ortu/Dashboard'
import Pembayaran from './pages/ortu/Pembayaran'
import MonitoringKehadiran from './pages/ortu/MonitoringKehadiran'
import HasilBelajar from './pages/ortu/HasilBelajar'
import InformasiSurat from './pages/ortu/InformasiSurat'

// Pages - Siswa
import SiswaDashboard from './pages/siswa/Dashboard'

/**
 * =============================================
 * AUTH CONTEXT
 * =============================================
 * 
 * Context untuk mengelola state autentikasi user
 * 
 * Digunakan untuk:
 * - Menyimpan data user yang sedang login
 * - Menyediakan fungsi login & logout ke semua komponen
 * - Proteksi route berdasarkan status login
 * 
 * @type {React.Context}
 */
export const AuthContext = createContext(null)

/**
 * =============================================
 * KOMPONEN UTAMA APLIKASI
 * =============================================
 * 
 * Komponen: App
 * File: /frontend/src/App.jsx
 * 
 * Deskripsi:
 * Root component aplikasi Teman Sekolah.
 * Mengelola routing dan autentikasi untuk semua halaman.
 * 
 * Fitur Utama:
 * - Routing berdasarkan role user
 * - Auth context provider
 * - Protected routes
 * - Redirect otomatis ke dashboard sesuai role
 * 
 * Struktur Menu per Role:
 * 
 * 1. SUPER ADMIN (Yayasan):
 *    - Dashboard
 *    - Manajemen Sekolah
 *    - Laporan Keuangan
 *    - Kinerja Guru
 * 
 * 2. TU (Tata Usaha):
 *    - Dashboard
 *    - PPDB (Pendaftaran Siswa Baru)
 *    - Keuangan & SPP
 *    - Jadwal Pelajaran
 *    - Surat Menyurat
 * 
 * 3. GURU:
 *    - Dashboard
 *    - Absensi Siswa
 *    - Input Nilai
 *    - E-Rapor
 *    - Pengumuman Kelas
 * 
 * 4. ORANG TUA:
 *    - Dashboard
 *    - Pembayaran
 *    - Monitoring Kehadiran
 *    - Hasil Belajar
 *    - Informasi Surat
 * 
 * 5. SISWA:
 *    - Dashboard
 *    - Pembayaran
 *    - Kehadiran
 *    - Hasil Belajar
 *    - Informasi
 */
function App() {
  // State untuk menyimpan data user yang sedang login
  const [user, setUser] = useState(null)

  /**
   * Fungsi Login
   * 
   * Menyimpan data user ke state dan localStorage
   * agar tetap login saat refresh page
   * 
   * @param {Object} userData - Data user dari hasil login
   * @param {string} userData.user_id - ID user
   * @param {string} userData.username - Username
   * @param {string} userData.role - Role user
   * @param {string} userData.nama_lengkap - Nama lengkap
   */
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  /**
   * Fungsi Logout
   * 
   * Menghapus data user dari state dan localStorage
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Render aplikasi dengan routing
  return (
    <BrowserRouter>
      {/* AuthContext Provider - menyediakan user, login, logout ke semua komponen */}
      <AuthContext.Provider value={{ user, login, logout }}>
        <Routes>
          {/* Route Login - halaman publik */}
          <Route path="/login" element={<Login />} />

          {/* ==========================================
              SUPER ADMIN ROUTES
              ========================================== */}
          <Route path="/super-admin" element={<MainLayout><SuperAdminDashboard /></MainLayout>} />
          <Route path="/super-admin/sekolah" element={<MainLayout><ManajemenSekolah /></MainLayout>} />
          <Route path="/super-admin/keuangan" element={<MainLayout><LaporanKeuangan /></MainLayout>} />
          <Route path="/super-admin/kinerja" element={<MainLayout><KinerjaGuru /></MainLayout>} />

          {/* ==========================================
              TU (TATA USAHA) ROUTES
              ========================================== */}
          <Route path="/tu" element={<MainLayout><TU_Dashboard /></MainLayout>} />
          <Route path="/tu/ppdb" element={<MainLayout><PPDB /></MainLayout>} />
          <Route path="/tu/keuangan" element={<MainLayout><KeuanganSPP /></MainLayout>} />
          <Route path="/tu/jadwal" element={<MainLayout><JadwalPelajaran /></MainLayout>} />
          <Route path="/tu/surat" element={<MainLayout><SuratMenyurat /></MainLayout>} />

          {/* ==========================================
              GURU ROUTES
              ========================================== */}
          <Route path="/guru" element={<MainLayout><GuruDashboard /></MainLayout>} />
          <Route path="/guru/absensi" element={<MainLayout><AbsensiSiswa /></MainLayout>} />
          <Route path="/guru/nilai" element={<MainLayout><InputNilai /></MainLayout>} />
          <Route path="/guru/rapor" element={<MainLayout><ERapor /></MainLayout>} />
          <Route path="/guru/pengumuman" element={<MainLayout><PengumumanKelas /></MainLayout>} />

          {/* ==========================================
              ORANG TUA ROUTES
              ========================================== */}
          <Route path="/ortu" element={<MainLayout><OrtuDashboard /></MainLayout>} />
          <Route path="/ortu/pembayaran" element={<MainLayout><Pembayaran /></MainLayout>} />
          <Route path="/ortu/kehadiran" element={<MainLayout><MonitoringKehadiran /></MainLayout>} />
          <Route path="/ortu/hasil-belajar" element={<MainLayout><HasilBelajar /></MainLayout>} />
          <Route path="/ortu/informasi" element={<MainLayout><InformasiSurat /></MainLayout>} />

          {/* ==========================================
              SISWA ROUTES
              ========================================== */}
          <Route path="/siswa" element={<MainLayout><SiswaDashboard /></MainLayout>} />
          <Route path="/siswa/pembayaran" element={<MainLayout><Pembayaran /></MainLayout>} />
          <Route path="/siswa/kehadiran" element={<MainLayout><MonitoringKehadiran /></MainLayout>} />
          <Route path="/siswa/hasil-belajar" element={<MainLayout><HasilBelajar /></MainLayout>} />
          <Route path="/siswa/informasi" element={<MainLayout><InformasiSurat /></MainLayout>} />

          {/* Redirect root ke login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 - Redirect ke login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
