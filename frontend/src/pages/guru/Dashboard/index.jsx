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
import ClassIcon from '@mui/icons-material/Class'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EventIcon from '@mui/icons-material/Event'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import CampaignIcon from '@mui/icons-material/Campaign'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const statsCards = [
  { title: 'Total Kelas Diampu', value: '6', icon: <ClassIcon fontSize="large" />, color: '#1565C0', bg: '#E3F2FD' },
  { title: 'Total Siswa', value: '180', icon: <PeopleIcon fontSize="large" />, color: '#E65100', bg: '#FFF3E0' },
  { title: 'Jurnal Terisi', value: '18/24', icon: <AssignmentIcon fontSize="large" />, color: '#6A1B9A', bg: '#F3E5F5' },
]

const todaySchedule = [
  { jam: '07:00 - 08:30', kelas: 'X-A', mapel: 'Matematika' },
  { jam: '08:30 - 10:00', kelas: 'XI-IPA-1', mapel: 'Matematika' },
  { jam: '10:30 - 12:00', kelas: 'XII-IPS-2', mapel: 'Matematika' },
]

export default function GuruDashboard() {
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
          gap: 3
        }}
      >
        <Avatar
          sx={{
            width: { xs: 64, md: 80 },
            height: { xs: 64, md: 80 },
            bgcolor: 'white',
            color: '#2E7D32',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {user?.nama_lengkap?.charAt(0) || 'G'}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Halo, {user?.nama_lengkap}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Semangat mengabdi dan mendidik generasi penerus bangsa.
          </Typography>
        </Box>
      </Box>

      {/* Kartu Statistik */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                p: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                  borderColor: stat.color
                }
              }}
            >
              <Avatar sx={{ bgcolor: stat.bg, color: stat.color, width: 64, height: 64, mr: 3 }}>
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

      <Grid container spacing={4}>
        {/* Jadwal Pelajaran */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Box sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EventIcon sx={{ color: '#2E7D32' }} /> Jadwal Mengajar Hari Ini
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
                      bgcolor: '#f8fafc',
                      borderLeft: '4px solid #2E7D32',
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: '#f1f5f9' }
                    }}
                  >
                    <Box sx={{ minWidth: 100, borderRight: '1px solid', borderColor: 'divider', pr: 2, mr: 2 }}>
                      <Typography variant="body2" fontWeight="800" color="primary.main">
                        {item.jam.split(' - ')[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {item.jam.split(' - ')[1]}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="700" color="text.primary">
                        {item.mapel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kelas <Box component="span" fontWeight="600">{item.kelas}</Box>
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Quick Access */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Aksi Cepat
            </Typography>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              {[
                { title: 'Input Absensi', icon: <FactCheckIcon fontSize="large" />, color: '#1565C0', bg: '#E3F2FD', link: '/guru/absensi' },
                { title: 'Input Nilai', icon: <LibraryBooksIcon fontSize="large" />, color: '#E65100', bg: '#FFF3E0', link: '/guru/nilai' },
                { title: 'E-Rapor', icon: <AssignmentIcon fontSize="large" />, color: '#6A1B9A', bg: '#F3E5F5', link: '/guru/rapor' },
                { title: 'Pengumuman', icon: <CampaignIcon fontSize="large" />, color: '#00838F', bg: '#E0F7FA', link: '/guru/pengumuman' },
              ].map((menu, index) => (
                <Grid item xs={6} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
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
        </Grid>
      </Grid>
    </Box>
  )
}
