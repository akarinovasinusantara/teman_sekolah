import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SchoolIcon from '@mui/icons-material/School'
import PaymentIcon from '@mui/icons-material/Payment'
import EventIcon from '@mui/icons-material/Event'
import DescriptionIcon from '@mui/icons-material/Description'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const menuCards = [
  { title: 'PPDB', desc: 'Kelola pendaftaran siswa baru', icon: <SchoolIcon />, color: '#1976d2', path: '/tu/ppdb' },
  { title: 'Keuangan SPP', desc: 'Kelola tagihan dan pembayaran', icon: <PaymentIcon />, color: '#2e7d32', path: '/tu/keuangan' },
  { title: 'Jadwal Pelajaran', desc: 'Atur jadwal dan kelas', icon: <EventIcon />, color: '#9c27b0', path: '/tu/jadwal' },
  { title: 'Surat Menyurat', desc: 'Cetak surat administratif', icon: <DescriptionIcon />, color: '#ed6c02', path: '/tu/surat' },
]

export default function TU_Dashboard() {
  const { user } = useContext(AuthContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box>
      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Dashboard Tata Usaha
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

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Statistik PPDB
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 4 }}>
                <Box textAlign="center">
                  <Typography 
                    variant="h4" 
                    color="primary.main" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                  >
                    150
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    Pendaftar
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Box textAlign="center">
                  <Typography 
                    variant="h4" 
                    color="success.main" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                  >
                    85
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    Diterima
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Box textAlign="center">
                  <Typography 
                    variant="h4" 
                    color="warning.main" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                  >
                    65
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    Proses
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Statistik Keuangan
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 6 }}>
                <Box textAlign="center">
                  <Typography 
                    variant="h4" 
                    color="success.main" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                  >
                    Rp 125jt
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    Lunas
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box textAlign="center">
                  <Typography 
                    variant="h4" 
                    color="error.main" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                  >
                    Rp 35jt
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    Belum Bayar
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {menuCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 3 }}>
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
