import { useContext } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import ShieldIcon from '@mui/icons-material/Shield'

const statsCards = [
  { title: 'Total Sekolah', value: '12', icon: <SchoolIcon fontSize="large" />, color: '#3A86FF', bg: '#EFF5FF' },
  { title: 'Total Siswa', value: '3,450', icon: <PeopleIcon fontSize="large" />, color: '#38B000', bg: '#F1F9EE' },
  { title: 'Total Pemasukan', value: 'Rp 450 Juta', icon: <AccountBalanceIcon fontSize="large" />, color: '#8338EC', bg: '#F6F0FE' },
  { title: 'Pertumbuhan', value: '+15%', icon: <TrendingUpIcon fontSize="large" />, color: '#FF006E', bg: '#FFECF3' },
]

export default function SuperAdminDashboard() {
  const { user } = useAuth()

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
          boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            sx={{
              width: { xs: 64, md: 80 },
              height: { xs: 64, md: 80 },
              bgcolor: 'white',
              color: '#0F172A',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: '800',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            {user?.nama_lengkap?.charAt(0) || 'S'}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' }, letterSpacing: '-0.5px' }}>
              Super Admin Area
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 400, color: '#94A3B8' }}>
              Selamat datang kembali, <Box component="span" fontWeight="700" color="white">{user?.nama_lengkap}</Box>
            </Typography>
          </Box>
        </Box>
        {/* Background Decorative Icon */}
        <ShieldIcon sx={{ 
          position: 'absolute', 
          right: -20, 
          top: -30, 
          fontSize: 240, 
          opacity: 0.05,
          color: 'white',
          transform: 'rotate(10deg)'
        }} />
      </Box>

      {/* Kartu Statistik */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                p: { xs: 2.5, md: 3 },
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                  borderColor: stat.color
                }
              }}
            >
              <Avatar sx={{ bgcolor: stat.bg, color: stat.color, width: 64, height: 64, mr: 2 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="800" sx={{ color: 'text.primary', lineHeight: 1.2 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ mt: 0.5 }}>
                  {stat.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Grafik dan Aktivitas */}
      <Grid container spacing={4}>
        {/* Grafik Pemasukan vs Pengeluaran */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Paper elevation={0} sx={{ p: 3, height: 320, borderRadius: 3, border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShowChartIcon color="primary" /> Revenue Dynamics
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', borderRadius: 2, mt: 1, border: '1px dashed', borderColor: 'grey.300' }}>
                <Typography variant="body2" color="text.secondary" fontWeight="500">
                  [Grafik Arus Kas Seluruh Cabang Sekolah Akan Tampil Di Sini]
                </Typography>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, height: 320, borderRadius: 3, border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchoolIcon sx={{ color: '#8338EC' }} /> Top Performing Schools
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', borderRadius: 2, mt: 1, border: '1px dashed', borderColor: 'grey.300' }}>
                <Typography variant="body2" color="text.secondary" fontWeight="500">
                  [Tabel atau Chart Cabang Sekolah Resolusi Tinggi Akan Tampil Di Sini]
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Aktivitas Terbaru */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%', minHeight: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              History Aktivitas Sistem
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { title: 'SMA Negeri 1 Jakarta menambahkan 50 siswa baru', time: '5 mnt lalu', type: 'info' },
                { title: 'Pembayaran SPP dari SMK Merdeka senilai Rp 25Jt', time: '15 mnt lalu', type: 'success' },
                { title: 'Guru baru diregistrasi di SMP Harapan Bangsa', time: '1 jam lalu', type: 'info' },
                { title: 'Laporan keuangan bulanan berhasil dicetak', time: '2 jam lalu', type: 'default' },
                { title: 'Sistem mengalami backup otomatis', time: '5 jam lalu', type: 'warning' },
                { title: 'Admin TU SMA N 1 mengupdate struktur SPP', time: '1 hari lalu', type: 'info' },
              ].map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'grey.400' }
                  }}
                >
                  <Box sx={{ 
                    width: 8, height: 8, borderRadius: '50%', mt: 0.75, mr: 2, flexShrink: 0,
                    bgcolor: activity.type === 'info' ? 'primary.main' : 
                             activity.type === 'success' ? 'success.main' :
                             activity.type === 'warning' ? 'warning.main' : 'grey.400'
                  }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600" color="text.primary" sx={{ mb: 0.5, lineHeight: 1.4 }}>
                      {activity.title}
                    </Typography>
                    <Typography variant="caption" fontWeight="500" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
