import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PaymentIcon from '@mui/icons-material/Payment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AssessmentIcon from '@mui/icons-material/Assessment'
import MailIcon from '@mui/icons-material/Mail'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const menuCards = [
  { title: 'Pembayaran', desc: 'Lihat tagihan & bayar SPP', icon: <PaymentIcon />, color: '#2e7d32', path: '/ortu/pembayaran' },
  { title: 'Monitoring Kehadiran', desc: 'Cek absensi anak', icon: <VisibilityIcon />, color: '#1976d2', path: '/ortu/kehadiran' },
  { title: 'Hasil Belajar', desc: 'Lihat nilai & rapor', icon: <AssessmentIcon />, color: '#9c27b0', path: '/ortu/hasil-belajar' },
  { title: 'Informasi & Surat', desc: 'Surat edaran dari sekolah', icon: <MailIcon />, color: '#ed6c02', path: '/ortu/informasi' },
]

export default function OrtuDashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box>
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3,
          fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }}
      >
        📢 <strong>Pengumuman:</strong> Pembayaran SPP bulan April sudah dapat dilakukan.
      </Alert>

      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Dashboard Orang Tua / Siswa
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Informasi Siswa
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: 'Nama', value: 'Ahmad Rizky' },
                { label: 'NIS', value: '12345' },
                { label: 'Kelas', value: 'X-A' },
                { label: 'Wali Kelas', value: 'Dra. Siti Aminah, M.Pd' },
              ].map((item, index) => (
                <Box 
                  key={item.label}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5, 
                    borderBottom: index < 3 ? 1 : 'none', 
                    borderColor: 'divider',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 0.5, sm: 0 },
                  }}
                >
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {item.label}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Ringkasan
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { label: 'Kehadiran', value: '95%', color: 'success' },
                { label: 'Tagihan', value: '1', color: 'warning', suffix: 'Belum Dibayar' },
                { label: 'Rata-rata Nilai', value: '85.5', color: 'info' },
                { label: 'Pengumuman', value: '3', color: 'primary', suffix: 'Baru' },
              ].map((item, index) => (
                <Grid size={{ xs: 6, sm: 6 }} key={item.label}>
                  <Box 
                    textAlign="center" 
                    sx={{ 
                      p: { xs: 1.5, sm: 2 }, 
                      bgcolor: `${item.color}.lighter`, 
                      borderRadius: 1 
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      color={`${item.color}.main`} 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                    >
                      {item.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                    >
                      {item.label}{item.suffix && ` - ${item.suffix}`}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {menuCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => navigate(card.path)}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 4 }}>
                  <Box
                    sx={{
                      width: { xs: 56, sm: 64 },
                      height: { xs: 56, sm: 64 },
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: card.color,
                      color: 'white',
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
                  >
                    {card.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {card.desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
