/**
 * =============================================
 * DASHBOARD SISWA
 * =============================================
 * 
 * Komponen: SiswaDashboard
 * File: /frontend/src/pages/siswa/Dashboard.jsx
 * 
 * Deskripsi:
 * Halaman dashboard utama untuk Siswa.
 * Menampilkan ringkasan informasi pribadi, jadwal, dan nilai.
 * 
 * Fitur:
 * - Informasi pribadi siswa
 * - Jadwal pelajaran hari ini
 * - Pengumuman terbaru
 * - Quick access menu
 * 
 * Role: Siswa
 * Route: /siswa
 */

import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import EventIcon from '@mui/icons-material/Event'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import PaymentIcon from '@mui/icons-material/Payment'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Data jadwal pelajaran hari ini (dummy)
 * 
 * @constant {Array<Object>}
 */
const todaySchedule = [
  { jam: '07:00 - 08:30', mapel: 'Matematika' },
  { jam: '08:30 - 10:00', mapel: 'Bahasa Indonesia' },
  { jam: '10:30 - 12:00', mapel: 'Bahasa Inggris' },
]

/**
 * Komponen Dashboard Siswa
 * 
 * @component
 * @returns {JSX.Element} Halaman dashboard siswa
 */
export default function SiswaDashboard() {
  const { user } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Siswa
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      {/* Informasi Siswa */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informasi Pribadi
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Nama
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Ahmad Rizky
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Kelas
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              X-A
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              NIS
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              12345
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              NISN
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              0012345678
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Jadwal & Pengumuman */}
      <Grid container spacing={2}>
        {/* Jadwal Pelajaran */}
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
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {item.jam}
                  </Typography>
                  <Typography variant="body2">
                    {item.mapel}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Pengumuman */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AnnouncementIcon /> Pengumuman
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { judul: 'Libur Hari Raya', tanggal: '15 Mar 2026' },
                { judul: 'Ujian Tengah Semester', tanggal: '20 Mar 2026' },
                { judul: 'Kegiatan Ekstrakurikuler', tanggal: '25 Mar 2026' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {item.judul}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.tanggal}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Access */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Menu Cepat
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="contained" href="/siswa/pembayaran">
              Pembayaran
            </Button>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="outlined" href="/siswa/kehadiran">
              Kehadiran
            </Button>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="outlined" href="/siswa/hasil-belajar">
              Nilai
            </Button>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Button fullWidth variant="outlined" href="/siswa/informasi">
              Informasi
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
