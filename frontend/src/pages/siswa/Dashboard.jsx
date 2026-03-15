import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SchoolIcon from '@mui/icons-material/School'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EventIcon from '@mui/icons-material/Event'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Alert from '@mui/material/Alert'

const menuCards = [
  { title: 'Jadwal Pelajaran', desc: 'Lihat jadwal kelas kamu', icon: <EventIcon />, color: '#1976d2', path: '/siswa/jadwal' },
  { title: 'Nilai & Rapor', desc: 'Lihat nilai dan rapor', icon: <AssessmentIcon />, color: '#9c27b0', path: '/siswa/nilai' },
  { title: 'Kehadiran', desc: 'Riwayat absensi kamu', icon: <VisibilityIcon />, color: '#2e7d32', path: '/siswa/kehadiran' },
  { title: 'Tugas & PR', desc: 'Lihat tugas yang diberikan', icon: <SchoolIcon />, color: '#ed6c02', path: '/siswa/tugas' },
]

export default function SiswaDashboard() {
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
        📢 <strong>Pengumuman:</strong> Ujian Tengah Semester (UTS) akan dilaksanakan minggu depan. Siapkan dirimu!
      </Alert>

      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Dashboard Siswa
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
        {/* Informasi Siswa */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Informasi Kamu
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: 'Nama', value: 'Ahmad Rizky' },
                { label: 'NIS', value: '12345' },
                { label: 'NISN', value: '0012345678' },
                { label: 'Kelas', value: 'X-A' },
                { label: 'Wali Kelas', value: 'Dra. Siti Aminah, M.Pd' },
              ].map((item, index) => (
                <Box 
                  key={item.label}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5, 
                    borderBottom: index < 4 ? 1 : 'none', 
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

        {/* Ringkasan */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Ringkasan Akademik
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { label: 'Kehadiran', value: '95%', color: 'success', suffix: 'Hadir' },
                { label: 'Rata-rata Nilai', value: '85.5', color: 'info' },
                { label: 'Tugas', value: '12', color: 'warning', suffix: 'Selesai' },
                { label: 'Penghargaan', value: '2', color: 'primary', suffix: 'Diterima' },
              ].map((item) => (
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

        {/* Jadwal Hari Ini */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Jadwal Pelajaran Hari Ini
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { jam: '07:00 - 08:30', mapel: 'Matematika', guru: 'Dra. Siti Aminah, M.Pd', ruang: 'R.101' },
                { jam: '08:30 - 10:00', mapel: 'Bahasa Indonesia', guru: 'Budi Santoso, S.Pd', ruang: 'R.101' },
                { jam: '10:30 - 12:00', mapel: 'Bahasa Inggris', guru: 'Rina Wati, S.Pd', ruang: 'R.102' },
                { jam: '13:00 - 14:30', mapel: 'IPA', guru: 'Ahmad Fauzi, S.Pd', ruang: 'Lab IPA' },
              ].map((jadwal, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < 3 ? 1 : 'none',
                    borderColor: 'divider',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  <Box 
                    sx={{ 
                      minWidth: { xs: '100%', sm: '120px' },
                      textAlign: { xs: 'left', sm: 'left' },
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      fontWeight="bold"
                      color="primary.main"
                      sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}
                    >
                      {jadwal.jam}
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="body1" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '0.9375rem', sm: '1rem' } }}
                    >
                      {jadwal.mapel}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    >
                      {jadwal.guru} • {jadwal.ruang}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Menu Cards */}
        {menuCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => navigate(card.path)}>
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
