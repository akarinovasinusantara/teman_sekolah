import { useContext } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import ClassIcon from '@mui/icons-material/Class'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'

const statsCards = [
  { title: 'Total Siswa Aktif', value: '850', icon: <PeopleIcon fontSize="large" />, color: '#1565C0', bg: '#E3F2FD' },
  { title: 'Tenaga Pengajar', value: '52', icon: <SchoolIcon fontSize="large" />, color: '#2E7D32', bg: '#E8F5E9' },
  { title: 'Total Rombel', value: '24', icon: <ClassIcon fontSize="large" />, color: '#6A1B9A', bg: '#F3E5F5' },
  { title: 'Pemasukan SPP', value: 'Rp 125Jt', icon: <AccountBalanceIcon fontSize="large" />, color: '#E65100', bg: '#FFF3E0' },
]

export default function TU_Dashboard() {
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
          boxShadow: '0 8px 32px rgba(21, 101, 192, 0.2)',
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
              color: '#E65100',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {user?.nama_lengkap?.charAt(0) || 'T'}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Halo, {user?.nama_lengkap}! 👋
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Pusat kendali administrasi dan operasional sekolah.
            </Typography>
          </Box>
        </Box>
        {/* Background Decorative Icon */}
        <AccountBalanceIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -20, 
          fontSize: 200, 
          opacity: 0.1,
          transform: 'rotate(-10deg)'
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
              <Avatar sx={{ bgcolor: stat.bg, color: stat.color, width: 64, height: 64, mr: 2.5 }}>
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

      {/* Konten tambahan (Grafik) */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, height: 320, borderRadius: 3, border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChartIcon color="primary" /> Statistik PPDB
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', borderRadius: 2, mt: 2, border: '1px dashed', borderColor: 'grey.300' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="500">
                [Grafik Pendaftaran Siswa Baru Akan Tampil Di Sini]
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, height: 320, borderRadius: 3, border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PieChartIcon color="warning" /> Realisasi Keuangan SPP
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', borderRadius: 2, mt: 2, border: '1px dashed', borderColor: 'grey.300' }}>
               <Typography variant="body2" color="text.secondary" fontWeight="500">
                [Grafik Arus Kas Akan Tampil Di Sini]
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
