/**
 * =============================================
 * DASHBOARD SUPER ADMIN
 * =============================================
 * 
 * Komponen: SuperAdminDashboard
 * File: /frontend/src/pages/super-admin/Dashboard.jsx
 * 
 * Deskripsi:
 * Halaman dashboard utama untuk Super Admin (Yayasan/Pengembang).
 * Menampilkan ringkasan statistik sekolah, keuangan, dan aktivitas terbaru.
 * 
 * Fitur:
 * - Kartu statistik (Total Sekolah, Siswa, Pemasukan, Pertumbuhan)
 * - Grafik Pemasukan vs Pengeluaran
 * - Statistik Sekolah
 * - Feed aktivitas terbaru
 * 
 * Role: Super Admin only
 * Route: /super-admin
 */

import { useContext } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Data kartu statistik untuk ditampilkan di dashboard
 * 
 * @constant {Array<Object>}
 * @property {string} title - Judul statistik
 * @property {string} value - Nilai statistik
 * @property {React.ReactNode} icon - Icon Material-UI
 * @property {string} color - Warna background icon
 */
const statsCards = [
  { title: 'Total Sekolah', value: '12', icon: <SchoolIcon />, color: '#1976d2' },
  { title: 'Total Siswa', value: '3,450', icon: <PeopleIcon />, color: '#2e7d32' },
  { title: 'Pemasukan Bulan Ini', value: 'Rp 450.000.000', icon: <AccountBalanceIcon />, color: '#9c27b0' },
  { title: 'Pertumbuhan', value: '+15%', icon: <TrendingUpIcon />, color: '#ed6c02' },
]

/**
 * Komponen Dashboard Super Admin
 * 
 * @component
 * @returns {JSX.Element} Halaman dashboard super admin
 */
export default function SuperAdminDashboard() {
  // Mengambil data user dari context authentication
  const { user } = useAuth()

  // Mengambil tema untuk styling responsive
  const theme = useTheme()

  // Mengecek apakah layar mobile (breakpoint 900px)
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    // Container utama dengan width penuh dan overflow terkontrol
    <Box sx={{
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Judul halaman Dashboard */}
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Dashboard Super Admin
      </Typography>

      {/* Salam selamat datang untuk user yang login */}
      <Typography
        variant="body1"
        color="text.secondary"
        gutterBottom
        sx={{ mb: 4, fontSize: { xs: '0.875rem', sm: '1rem' } }}
      >
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      {/* Container 1: Kartu Statistik - Layout Horizontal */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          mb: { xs: 3, md: 4 },
          width: '100%',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        {/* Loop melalui setiap data statistik */}
        {statsCards.map((stat, index) => (
          // Grid item untuk setiap kartu
          // Responsive: 12 col mobile, 6 tablet, 3 desktop
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            {/* Card dengan height penuh */}
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Konten card dengan padding responsive */}
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                {/* Layout horizontal: teks di kiri, icon di kanan */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}>
                  {/* Bagian teks (label dan value) */}
                  <Box sx={{ flexGrow: 1 }}>
                    {/* Label statistik */}
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    {/* Value statistik dengan font besar */}
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  {/* Icon box dengan background berwarna */}
                  <Box
                    sx={{
                      width: { xs: 50, sm: 56 },
                      height: { xs: 50, sm: 56 },
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: stat.color,
                      color: 'white',
                      flexShrink: 0,
                      boxShadow: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Container 2: Grafik dan Aktivitas */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Grafik Pemasukan vs Pengeluaran (50% width di desktop) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, height: { xs: 250, sm: 300 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Grafik Pemasukan vs Pengeluaran
            </Typography>
            {/* Placeholder untuk grafik */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '80%', 
              color: 'text.secondary' 
            }}>
              [Grafik akan ditampilkan di sini]
            </Box>
          </Paper>
        </Grid>

        {/* Statistik Sekolah (50% width di desktop) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, height: { xs: 250, sm: 300 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Statistik Sekolah
            </Typography>
            {/* Placeholder untuk chart statistik */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '80%', 
              color: 'text.secondary' 
            }}>
              [Chart statistik sekolah akan ditampilkan di sini]
            </Box>
          </Paper>
        </Grid>

        {/* Aktivitas Terbaru (100% width - full row) */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Aktivitas Terbaru
            </Typography>
            
            {/* List aktivitas terbaru */}
            <Box sx={{ mt: 2 }}>
              {[
                { text: 'SMA Negeri 1 Jakarta menambahkan 50 siswa baru', time: '5 menit yang lalu' },
                { text: 'Pembayaran SPP dari SMK Merdeka senilai Rp 25.000.000', time: '15 menit yang lalu' },
                { text: 'Guru baru ditambahkan di SMP Harapan Bangsa', time: '1 jam yang lalu' },
                { text: 'Laporan bulanan berhasil digenerate', time: '2 jam yang lalu' },
              ].map((activity, index) => (
                // Item aktivitas dengan border separator
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: index < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 0.5, sm: 0 },
                  }}
                >
                  {/* Deskripsi aktivitas */}
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {activity.text}
                  </Typography>
                  {/* Waktu aktivitas */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  >
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
