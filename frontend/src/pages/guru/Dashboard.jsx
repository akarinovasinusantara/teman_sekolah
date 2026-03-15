import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GradeIcon from '@mui/icons-material/Grade'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const menuCards = [
  { title: 'Absensi Siswa', desc: 'Isi kehadiran siswa per kelas', icon: <CheckCircleIcon />, color: '#2e7d32', path: '/guru/absensi' },
  { title: 'Input Nilai', desc: 'Input nilai harian, UTS, UAS', icon: <GradeIcon />, color: '#1976d2', path: '/guru/nilai' },
  { title: 'E-Rapor', desc: 'Isi deskripsi rapor siswa', icon: <MenuBookIcon />, color: '#9c27b0', path: '/guru/rapor' },
  { title: 'Pengumuman Kelas', desc: 'Kirim pengumuman untuk kelas', icon: <AnnouncementIcon />, color: '#ed6c02', path: '/guru/pengumuman' },
]

export default function GuruDashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
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
        Dashboard Guru
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
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Jadwal Hari Ini
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { jam: '07:00 - 08:30', mapel: 'Matematika', kelas: 'X-A' },
                { jam: '08:30 - 10:00', mapel: 'Matematika', kelas: 'X-B' },
                { jam: '10:30 - 12:00', mapel: 'Matematika', kelas: 'XI-A' },
              ].map((jadwal, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1.5,
                    borderBottom: index < 2 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 0.5, sm: 0 },
                  }}
                >
                  <Box>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}
                    >
                      {jadwal.mapel}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                    >
                      {jadwal.kelas}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    {jadwal.jam}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Statistik Pengisian
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Absensi</Typography>
                  <Typography variant="body2" color="success.main" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>85%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', height: 8, borderRadius: 1 }}>
                  <Box sx={{ width: '85%', bgcolor: 'success.main', height: '100%', borderRadius: 1 }} />
                </Box>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Nilai</Typography>
                  <Typography variant="body2" color="primary.main" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>60%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', height: 8, borderRadius: 1 }}>
                  <Box sx={{ width: '60%', bgcolor: 'primary.main', height: '100%', borderRadius: 1 }} />
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>E-Rapor</Typography>
                  <Typography variant="body2" color="warning.main" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>40%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', height: 8, borderRadius: 1 }}>
                  <Box sx={{ width: '40%', bgcolor: 'warning.main', height: '100%', borderRadius: 1 }} />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Pengumuman Terbaru
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { text: 'Rapat guru hari Jumat, 20 Maret 2026', time: '2 hari lagi' },
                { text: 'Deadline input nilai UTS: 25 Maret', time: '1 minggu lagi' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1.5,
                    bgcolor: index === 0 ? 'warning.light' : 'info.light',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {item.text}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              ))}
            </Box>
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
