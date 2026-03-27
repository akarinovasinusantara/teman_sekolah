import { useContext } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import PaymentIcon from '@mui/icons-material/Payment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'

export default function OrtuDashboard() {
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
            color: '#6A1B9A',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {user?.nama_lengkap?.charAt(0) || 'O'}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Halo, {user?.nama_lengkap}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Pantau perkembangan dan informasi akademik anak Anda di sini.
          </Typography>
        </Box>
      </Box>

      {/* Informasi Anak */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
          <ContactEmergencyIcon color="primary" /> Profil Anak
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Nama Siswa</Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>Ahmad Rizky</Typography>
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
              <Typography variant="body2" color="text.secondary" fontWeight="500">Wali Kelas</Typography>
              <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ mt: 0.5 }}>Budi Santoso, S.Pd</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Access */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
          Layanan & Informasi
        </Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Tagihan SPP', desc: 'Lihat dan bayar tagihan SPP', icon: <PaymentIcon fontSize="large" />, color: '#1565C0', bg: '#E3F2FD', link: '/ortu/pembayaran' },
            { title: 'Kehadiran', desc: 'Monitoring kehadiran harian', icon: <CheckCircleIcon fontSize="large" />, color: '#2E7D32', bg: '#E8F5E9', link: '/ortu/kehadiran' },
            { title: 'Hasil Belajar', desc: 'Lihat nilai dan rapor siswa', icon: <AssessmentIcon fontSize="large" />, color: '#E65100', bg: '#FFF3E0', link: '/ortu/hasil-belajar' },
          ].map((menu, index) => (
            <Grid item xs={12} sm={4} key={index}>
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
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {menu.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {menu.desc}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
