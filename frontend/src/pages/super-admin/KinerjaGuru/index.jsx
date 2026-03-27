import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Rating from '@mui/material/Rating'
import LinearProgress from '@mui/material/LinearProgress'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'

// Icons
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import CancelIcon from '@mui/icons-material/Cancel'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

export default function KinerjaGuru() {
  const summaryCards = [
    { title: 'Total Guru Aktif', count: '156', icon: <PeopleIcon />, color: '#1565C0', bg: '#E3F2FD' },
    { title: 'Rata-rata Pengisian', count: '89%', icon: <CheckCircleIcon />, color: '#2E7D32', bg: '#E8F5E9' },
    { title: 'Guru Terlambat Input', count: '12', icon: <AccessTimeFilledIcon />, color: '#E65100', bg: '#FFF3E0' },
    { title: 'Guru Tidak Input Jurnal', count: '5', icon: <CancelIcon />, color: '#C62828', bg: '#FFEBEE' },
  ]

  const guruData = [
    { nama: 'Dra. Siti Aminah, M.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 24, tepat: '95%', rating: 5 },
    { nama: 'Budi Santoso, S.Pd', sekolah: 'SMP Harapan Bangsa', jurnal: 23, tepat: '92%', rating: 4.5 },
    { nama: 'Rina Wati, S.Pd', sekolah: 'SMK Merdeka', jurnal: 22, tepat: '88%', rating: 4 },
    { nama: 'Ahmad Fauzi, S.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 20, tepat: '85%', rating: 4 },
    { nama: 'Dewi Lestari, S.Pd', sekolah: 'SD Tunas Muda', jurnal: 18, tepat: '80%', rating: 3.5 },
  ]

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="800" gutterBottom sx={{ color: '#1565C0' }}>
        Kinerja Guru
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
        Monitoring kinerja guru dalam mengisi jurnal dan aktivitas mengajar
      </Typography>

      {/* Summary Cards */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
          gap: 2, 
          mb: 4 
        }}
      >
        {summaryCards.map((card, index) => (
          <Card 
            key={index} 
            elevation={0}
            sx={{ 
              borderRadius: 3, 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              p: 2.5,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                borderColor: card.color
              }
            }}
          >
            <Avatar sx={{ bgcolor: card.bg, color: card.color, width: 56, height: 56, mr: 2 }}>
              {card.icon}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="800" color={card.color}>
                {card.count}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ lineHeight: 1.2 }}>
                {card.title}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Table Ranking */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
          <Typography variant="h6" fontWeight="700" color="#334155">
            Ranking Kinerja Guru Bulan Ini
          </Typography>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#64748b' }}>Peringkat</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#64748b' }}>Nama Guru</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#64748b' }}>Sekolah</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#64748b' }}>Jurnal Terisi</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#64748b' }}>Ketepatan Waktu</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#64748b' }}>Rating</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {guruData.map((guru, index) => {
                // Determine rank colors: Gold, Silver, Bronze
                let rankBg = 'transparent'
                let rankColor = '#64748b'
                let rankBorder = '1px solid #e2e8f0'
                
                if (index === 0) { rankBg = '#F59E0B'; rankColor = '#fff'; rankBorder = 'none' } // Gold
                else if (index === 1) { rankBg = '#94A3B8'; rankColor = '#fff'; rankBorder = 'none' } // Silver
                else if (index === 2) { rankBg = '#B45309'; rankColor = '#fff'; rankBorder = 'none' } // Bronze

                const tepatColor = parseInt(guru.tepat) >= 90 ? '#10B981' : parseInt(guru.tepat) >= 80 ? '#F59E0B' : '#EF4444'

                return (
                  <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box
                        sx={{
                          width: 32, height: 32, borderRadius: '50%',
                          bgcolor: rankBg, color: rankColor, border: rankBorder,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '800', fontSize: '0.9rem'
                        }}
                      >
                        {index + 1}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{guru.nama}</TableCell>
                    <TableCell sx={{ color: '#475569' }}>{guru.sekolah}</TableCell>

                    <TableCell sx={{ minWidth: 200 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(guru.jurnal / 24) * 100}
                          sx={{ 
                            flexGrow: 1, height: 8, borderRadius: 4,
                            bgcolor: '#f1f5f9',
                            '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#3B82F6' }
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#3B82F6', minWidth: 40 }}>
                          {guru.jurnal}/24
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        component="span"
                        sx={{
                          color: tepatColor,
                          bgcolor: tepatColor + '15',
                          px: 1.5, py: 0.5, borderRadius: 2,
                          fontWeight: 'bold', fontSize: '0.85rem',
                          border: `1px solid ${tepatColor}40`
                        }}
                      >
                        {guru.tepat}
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Rating value={guru.rating} precision={0.5} readOnly size="small" sx={{ color: '#F59E0B' }} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
