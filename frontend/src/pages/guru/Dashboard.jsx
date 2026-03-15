/**
 * =============================================
 * DASHBOARD GURU
 * =============================================
 * 
 * Komponen: GuruDashboard
 * File: /frontend/src/pages/guru/Dashboard.jsx
 * 
 * Deskripsi:
 * Halaman dashboard utama untuk Guru.
 * Menampilkan ringkasan kelas yang diampu, jadwal mengajar,
 * dan statistik aktivitas mengajar.
 * 
 * Fitur:
 * - Statistik (Total Kelas, Total Siswa, Jurnal Terisi)
 * - Jadwal mengajar hari ini
 * - Quick access ke Absensi, Input Nilai, E-Rapor
 * - Pengumuman yang telah dibuat
 * 
 * Role: Guru
 * Route: /guru
 */

import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ClassIcon from '@mui/icons-material/Class'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EventIcon from '@mui/icons-material/Event'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Data kartu statistik untuk dashboard Guru
 * 
 * @constant {Array<Object>}
 */
const statsCards = [
  { title: 'Total Kelas Diampu', value: '6', icon: <ClassIcon />, color: '#1976d2' },
  { title: 'Total Siswa', value: '180', icon: <PeopleIcon />, color: '#2e7d32' },
  { title: 'Jurnal Terisi', value: '18/24', icon: <AssignmentIcon />, color: '#9c27b0' },
]

/**
 * Data jadwal mengajar hari ini (dummy)
 * 
 * @constant {Array<Object>}
 */
const todaySchedule = [
  { jam: '07:00 - 08:30', kelas: 'X-A', mapel: 'Matematika' },
  { jam: '08:30 - 10:00', kelas: 'XI-IPA-1', mapel: 'Matematika' },
  { jam: '10:30 - 12:00', kelas: 'XII-IPS-2', mapel: 'Matematika' },
]

/**
 * Komponen Dashboard Guru
 * 
 * @component
 * @returns {JSX.Element} Halaman dashboard guru
 */
export default function GuruDashboard() {
  const { user } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Guru
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      {/* Kartu Statistik */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statsCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
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

      {/* Jadwal & Quick Actions */}
      <Grid container spacing={2}>
        {/* Jadwal Mengajar Hari Ini */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventIcon /> Jadwal Hari Ini
            </Typography>
            <Box sx={{ mt: 2 }}>
              {todaySchedule.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {item.jam}
                  </Typography>
                  <Typography variant="body2">
                    {item.kelas} - {item.mapel}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Aksi Cepat
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid size={{ xs: 6 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  sx={{ py: 2 }}
                  href="/guru/absensi"
                >
                  Input Absensi
                </Button>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  sx={{ py: 2 }}
                  href="/guru/nilai"
                >
                  Input Nilai
                </Button>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ py: 2 }}
                  href="/guru/rapor"
                >
                  E-Rapor
                </Button>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ py: 2 }}
                  href="/guru/pengumuman"
                >
                  Pengumuman
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
