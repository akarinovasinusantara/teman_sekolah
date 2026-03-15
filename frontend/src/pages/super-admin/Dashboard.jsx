import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Icon from '@mui/material/Icon'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const statsCards = [
  { title: 'Total Sekolah', value: '12', icon: <SchoolIcon />, color: '#1976d2' },
  { title: 'Total Siswa', value: '3,450', icon: <PeopleIcon />, color: '#2e7d32' },
  { title: 'Pemasukan Bulan Ini', value: 'Rp 450.000.000', icon: <AccountBalanceIcon />, color: '#9c27b0' },
  { title: 'Pertumbuhan', value: '+15%', icon: <TrendingUpIcon />, color: '#ed6c02' },
]

export default function SuperAdminDashboard() {
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
        Dashboard Super Admin
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        gutterBottom 
        sx={{ mb: 4, fontSize: { xs: '0.875rem', sm: '1rem' } }}
      >
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {statsCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography 
                      color="text.secondary" 
                      variant="body2" 
                      gutterBottom
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: stat.color,
                      color: 'white',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, height: { xs: 250, sm: 300 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Grafik Pemasukan vs Pengeluaran
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', color: 'text.secondary' }}>
              [Grafik akan ditampilkan di sini]
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, height: { xs: 250, sm: 300 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Statistik Sekolah
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', color: 'text.secondary' }}>
              [Chart statistik sekolah akan ditampilkan di sini]
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
            >
              Aktivitas Terbaru
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { text: 'SMA Negeri 1 Jakarta menambahkan 50 siswa baru', time: '5 menit yang lalu' },
                { text: 'Pembayaran SPP dari SMK Merdeka senilai Rp 25.000.000', time: '15 menit yang lalu' },
                { text: 'Guru baru ditambahkan di SMP Harapan Bangsa', time: '1 jam yang lalu' },
                { text: 'Laporan bulanan berhasil digenerate', time: '2 jam yang lalu' },
              ].map((activity, index) => (
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
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {activity.text}
                  </Typography>
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
