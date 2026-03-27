/**
 * =============================================
 * DASHBOARD TU (TATA USAHA)
 * =============================================
 * 
 * Komponen: TU_Dashboard
 * File: /frontend/src/pages/tu/Dashboard.jsx
 * 
 * Deskripsi:
 * Halaman dashboard utama untuk staf Tata Usaha (TU).
 * Menampilkan ringkasan aktivitas administrasi sekolah.
 * 
 * Fitur:
 * - Statistik (Total Siswa, Guru, Kelas, Keuangan)
 * - Grafik kehadiran
 * - Aktivitas terbaru
 * - Quick access menu
 * 
 * Role: TU (Tata Usaha)
 * Route: /tu
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
import ClassIcon from '@mui/icons-material/Class'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Data kartu statistik untuk dashboard TU
 * 
 * @constant {Array<Object>}
 */
const statsCards = [
  { title: 'Total Siswa', value: '850', icon: <PeopleIcon />, color: '#1976d2' },
  { title: 'Total Guru', value: '52', icon: <SchoolIcon />, color: '#2e7d32' },
  { title: 'Total Kelas', value: '24', icon: <ClassIcon />, color: '#9c27b0' },
  { title: 'Keuangan Bulan Ini', value: 'Rp 125.000.000', icon: <AccountBalanceIcon />, color: '#ed6c02' },
]

/**
 * Komponen Dashboard TU
 * 
 * @component
 * @returns {JSX.Element} Halaman dashboard TU
 */
export default function TU_Dashboard() {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Tata Usaha
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      {/* Kartu Statistik */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statsCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 2,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: stat.color,
                    color: 'white' 
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Konten tambahan */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Statistik PPDB</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
              [Grafik PPDB akan ditampilkan di sini]
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Keuangan SPP</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
              [Grafik Keuangan akan ditampilkan di sini]
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
