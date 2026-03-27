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
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import AssessmentIcon from '@mui/icons-material/Assessment'
import EventIcon from '@mui/icons-material/Event'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import PaymentIcon from '@mui/icons-material/Payment'
import EmailIcon from '@mui/icons-material/Email'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'

const todaySchedule = [
  { jam: '07:00 - 08:30', mapel: 'Matematika' },
  { jam: '08:30 - 10:00', mapel: 'Bahasa Indonesia' },
  { jam: '10:30 - 12:00', mapel: 'Bahasa Inggris' },
]

export default function SiswaDashboard() {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Welcome Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          mb: 4,
          color: 'white',
          boxShadow: '0 8px 32px rgba(21, 101, 192, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Avatar
          sx={{
            width: { xs: 64, md: 80 },
            height: { xs: 64, md: 80 },
            bgcolor: 'white',
            color: '#1565C0',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {user?.nama_lengkap?.charAt(0) || 'S'}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Halo, {user?.nama_lengkap || 'Ahmad Rizky'}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Semoga hari belajarmu menyenangkan dan penuh semangat.
          </Typography>
        </Box>
      </Box>

      {/* Informasi Siswa */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
          <ContactEmergencyIcon color="primary" /> Informasi Pribadi
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Nama Lengkap</Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>{user?.nama_lengkap || 'Ahmad Rizky'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Kelas</Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>X-A</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="500">NIS</Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>12345</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="500">NISN</Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>0012345678</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Jadwal Pelajaran */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EventIcon sx={{ color: '#E65100' }} /> Jadwal Hari Ini
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {todaySchedule.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      borderLeft: '4px solid #1565C0',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(4px)' }
                    }}
                  >
                    <Box sx={{ minWidth: 100, borderRight: '1px solid', borderColor: 'divider', pr: 2, mr: 2 }}>
                      <Typography variant="body2" fontWeight="700" color="primary.main">
                        {item.jam.split(' - ')[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {item.jam.split(' - ')[1]}
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="600" color="text.primary">
                      {item.mapel}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pengumuman */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AnnouncementIcon sx={{ color: '#2E7D32' }} /> Pengumuman Terbaru
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { judul: 'Libur Hari Raya Idul Fitri', tanggal: '15 Mar 2026', type: 'info' },
                  { judul: 'Ujian Tengah Semester', tanggal: '20 Mar 2026', type: 'warning' },
                  { judul: 'Kegiatan Ekstrakurikuler Ditiadakan', tanggal: '25 Mar 2026', type: 'error' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: item.type === 'info' ? '#E3F2FD' : item.type === 'warning' ? '#FFF3E0' : '#FFEBEE',
                      border: '1px solid',
                      borderColor: item.type === 'info' ? '#BBDEFB' : item.type === 'warning' ? '#FFE0B2' : '#FFCDD2',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: item.type === 'info' ? '#0D47A1' : item.type === 'warning' ? '#E65100' : '#C62828' }}>
                        {item.judul}
                      </Typography>
                      <Typography variant="caption" sx={{ bgcolor: 'white', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold', color: 'text.secondary', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        {item.tanggal}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Access */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
          Akses Cepat
        </Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Pembayaran SPP', icon: <PaymentIcon fontSize="large" />, color: '#1565C0', bg: '#E3F2FD', link: '/siswa/pembayaran' },
            { title: 'Data Kehadiran', icon: <AssessmentIcon fontSize="large" />, color: '#2E7D32', bg: '#E8F5E9', link: '/siswa/kehadiran' },
            { title: 'Hasil Belajar', icon: <AssessmentIcon fontSize="large" />, color: '#E65100', bg: '#FFF3E0', link: '/siswa/hasil-belajar' },
            { title: 'Surat Edaran', icon: <EmailIcon fontSize="large" />, color: '#6A1B9A', bg: '#F3E5F5', link: '/siswa/informasi' },
          ].map((menu, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: menu.color
                  }
                }}
              >
                <CardActionArea href={menu.link} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: menu.bg, color: menu.color }}>
                    {menu.icon}
                  </Avatar>
                  <Typography variant="body1" fontWeight="bold" textAlign="center">
                    {menu.title}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
