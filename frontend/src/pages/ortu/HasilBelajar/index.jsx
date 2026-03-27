import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// New Icons
import TimelineIcon from '@mui/icons-material/Timeline'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MenuBookIcon from '@mui/icons-material/MenuBook'

const nilaiData = [
  { mapel: 'Matematika', nilaiHarian: 85, uts: 88, uas: 90, rata: 87.7, predikat: 'B' },
  { mapel: 'Bahasa Indonesia', nilaiHarian: 90, uts: 92, uas: 88, rata: 90, predikat: 'A' },
  { mapel: 'Bahasa Inggris', nilaiHarian: 82, uts: 85, uas: 87, rata: 84.7, predikat: 'B' },
  { mapel: 'IPA', nilaiHarian: 78, uts: 80, uas: 82, rata: 80, predikat: 'B' },
  { mapel: 'IPS', nilaiHarian: 88, uts: 90, uas: 85, rata: 87.7, predikat: 'B' },
  { mapel: 'PKn', nilaiHarian: 95, uts: 93, uas: 95, rata: 94.3, predikat: 'A' },
  { mapel: 'Seni Budaya', nilaiHarian: 92, uts: 90, uas: 94, rata: 92, predikat: 'A' },
  { mapel: 'PJOK', nilaiHarian: 88, uts: 90, uas: 92, rata: 90, predikat: 'A' },
]

const raporData = [
  { semester: 'Ganjil 2025/2026', tanggal: '15 Jan 2026', status: 'Tersedia' },
  { semester: 'Genap 2024/2025', tanggal: '15 Jul 2025', status: 'Tersedia' },
]

const StatCard = ({ title, value, subtitle, icon, color }) => (
  <Card sx={{
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 14px 28px -10px ${color}60`
    }
  }}>
    {/* Decorative blur circle in background */}
    <Box sx={{
      position: 'absolute',
      right: -20,
      bottom: -20,
      width: 100,
      height: 100,
      borderRadius: '50%',
      backgroundColor: color,
      opacity: 0.05,
      filter: 'blur(20px)',
      zIndex: 0
    }} />

    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, maxWidth: '75%' }}>
          {title}
        </Typography>
        <Box sx={{ 
          width: 48, 
          height: 48, 
          borderRadius: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: `${color}15`, 
          color: color,
          flexShrink: 0
        }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h3" fontWeight="800" sx={{ color: 'text.primary', mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 'auto' }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
)

export default function HasilBelajar() {
  const [tabValue, setTabValue] = useState(0)
  const [openRapor, setOpenRapor] = useState(false)
  const rataRata = (nilaiData.reduce((acc, curr) => acc + curr.rata, 0) / nilaiData.length).toFixed(1)

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Graduate/Premium Header */}
      <Box sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        color: 'white',
        boxShadow: '0 10px 30px -10px rgba(21, 101, 192, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" fontWeight="800" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Hasil Belajar
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Ringkasan nilai dan rapor Ahmad Rizky - <Box component="span" sx={{ fontWeight: 700 }}>Kelas X-A</Box>
          </Typography>
        </Box>
        {/* Background Decorative Icon */}
        <MenuBookIcon sx={{ 
          position: 'absolute', 
          right: -30, 
          top: -20, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-15deg)'
        }} />
      </Box>

      {/* Dynamic Stat Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Rata-rata Semester Ini" 
            value={rataRata} 
            subtitle="dari skala 100" 
            icon={<TimelineIcon fontSize="medium" />} 
            color="#3700b3" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Ranking Kelas" 
            value="5" 
            subtitle="dari 32 siswa" 
            icon={<EmojiEventsIcon fontSize="medium" />} 
            color="#059669" 
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <StatCard 
            title="Total Mata Pelajaran" 
            value={nilaiData.length} 
            subtitle="yang telah dinilai" 
            icon={<MenuBookIcon fontSize="medium" />} 
            color="#ea580c" 
          />
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Paper elevation={0} sx={{ 
        borderRadius: 3, 
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)} 
          sx={{ 
            px: { xs: 2, md: 4 }, 
            pt: 2,
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: '0.95rem',
              textTransform: 'none',
              minWidth: 120,
              py: 2,
            }
          }}
        >
          <Tab label="Detail Nilai" />
          <Tab label="Rapor Digital" />
        </Tabs>

        {tabValue === 0 && (
          <TableContainer sx={{ p: { xs: 0, md: 1 } }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'transparent' }}>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Mata Pelajaran</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nilai Harian</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>UTS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>UAS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800, color: 'text.primary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Rata-rata</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Predikat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nilaiData.map((row, index) => (
                  <TableRow 
                    key={index} 
                    hover 
                    sx={{ 
                      '&:last-child td': { border: 0 }, 
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{row.mapel}</TableCell>
                    <TableCell align="center">{row.nilaiHarian}</TableCell>
                    <TableCell align="center">{row.uts}</TableCell>
                    <TableCell align="center">{row.uas}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.05rem' }}>
                      {row.rata}
                    </TableCell>
                    <TableCell align="center">
                      <Box component="span" sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 32,
                        minHeight: 32,
                        px: 1.5, 
                        py: 0.5, 
                        borderRadius: '50px', // Perfect pill shape
                        bgcolor: row.predikat === 'A' ? 'success.50' : 'info.50', 
                        color: row.predikat === 'A' ? 'success.700' : 'info.700', 
                        fontSize: '0.85rem', 
                        fontWeight: 800,
                        border: '1px solid',
                        borderColor: row.predikat === 'A' ? 'success.200' : 'info.200', 
                      }}>
                        {row.predikat}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 1 && (
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              {raporData.map((rapor, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(55,0,179,0.08)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <Box>
                      <Typography variant="h6" fontWeight="700" sx={{ mb: 0.5 }}>
                        {rapor.semester}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        Diterbitkan: <Box component="span" sx={{ fontWeight: 500 }}>{rapor.tanggal}</Box>
                      </Typography>
                      <Box component="span" sx={{ 
                        px: 1.5, py: 0.5, borderRadius: '50px', 
                        bgcolor: 'success.50', color: 'success.700', 
                        fontSize: '0.75rem', fontWeight: 700,
                        border: '1px solid', borderColor: 'success.200'
                      }}>
                        {rapor.status}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton color="primary" onClick={() => setOpenRapor(true)} sx={{ bgcolor: 'rgba(55,0,179,0.05)', '&:hover': { bgcolor: 'rgba(55,0,179,0.1)' } }}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary" sx={{ bgcolor: 'rgba(55,0,179,0.05)', '&:hover': { bgcolor: 'rgba(55,0,179,0.1)' } }}>
                        <DownloadIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Rapor Preview Dialog */}
      <Dialog 
        open={openRapor} 
        onClose={() => setOpenRapor(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          Preview Rapor - Ganjil 2025/2026
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 1 }}>
              RAPOR PESERTA DIDIK
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              SMA NEGERI 1 JAKARTA
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mb: 4, bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Nama Siswa</Typography>
              <Typography variant="body1" fontWeight="600">Ahmad Rizky</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
               <Typography variant="body2" color="text.secondary">NIS</Typography>
               <Typography variant="body1" fontWeight="600">12345</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
               <Typography variant="body2" color="text.secondary">Kelas</Typography>
               <Typography variant="body1" fontWeight="600">X-A</Typography>
            </Grid>
          </Grid>
          <Paper sx={{ p: 6, bgcolor: 'grey.100', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, border: '1px dashed', borderColor: 'grey.400' }}>
            <Typography variant="body1" color="text.secondary" fontWeight="500">
              [Preview Rapor Lengkap Akan Ditampilkan Di Sini]
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenRapor(false)} sx={{ fontWeight: 600 }}>Tutup</Button>
          <Button variant="contained" startIcon={<DownloadIcon />} sx={{ borderRadius: 2, fontWeight: 600 }}>
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
