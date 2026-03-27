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
import HandshakeIcon from '@mui/icons-material/Handshake'

export default function KinerjaGuru() {
  const summaryCards = [
    { title: 'Pegawai Guru Aktif', count: '156', icon: <PeopleIcon fontSize="large" />, color: '#3B82F6', bg: '#EFF6FF' },
    { title: 'Indeks Kepatuhan', count: '89%', icon: <CheckCircleIcon fontSize="large" />, color: '#10B981', bg: '#F0FDF4' },
    { title: 'Teguran Keterlambatan', count: '12', icon: <AccessTimeFilledIcon fontSize="large" />, color: '#F59E0B', bg: '#FFFBEB' },
    { title: 'Insubordinasi Tugas', count: '5', icon: <CancelIcon fontSize="large" />, color: '#EF4444', bg: '#FEF2F2' },
  ]

  const guruData = [
    { nama: 'Dra. Siti Aminah, M.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 24, tepat: '95%', rating: 5 },
    { nama: 'Budi Santoso, S.Pd', sekolah: 'SMP Harapan Bangsa', jurnal: 23, tepat: '92%', rating: 4.5 },
    { nama: 'Rina Wati, S.Pd', sekolah: 'SMK Merdeka', jurnal: 22, tepat: '88%', rating: 4 },
    { nama: 'Ahmad Fauzi, S.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 20, tepat: '85%', rating: 4 },
    { nama: 'Dewi Lestari, S.Pd', sekolah: 'SD Tunas Muda', jurnal: 18, tepat: '80%', rating: 3.5 },
  ]

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Premium Dark Slate Header */}
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
            Supervisi & Monitoring Kinerja Guru
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 500 }}>
            Audit kepatuhan pengisian jurnal kelas, kehadiran mengajar, dan tracking kedisiplinan sentral
          </Typography>
        </Box>
        <HandshakeIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.05,
          transform: 'rotate(-5deg)'
        }} />
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Card 
            key={index} elevation={0}
            sx={{ 
              borderRadius: 3, border: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', p: 3,
              transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.05)', borderColor: card.color }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: card.bg, color: card.color, width: 56, height: 56 }}>{card.icon}</Avatar>
            </Box>
            <Typography variant="h3" fontWeight="800" color="#0F172A" sx={{ mb: 0.5 }}>{card.count}</Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="700">{card.title}</Typography>
          </Card>
        ))}
      </Box>

      {/* Table Ranking */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
          <Typography variant="h6" fontWeight="800" color="#0F172A">Leaderboard Integritas Guru Nasional</Typography>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
             <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent' }}>
                 <TableCell width="80" align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Rank</TableCell>
                 <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Identitas Pegawai Terverifikasi</TableCell>
                 <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Satelit Kerja (Afiliasi Cabang)</TableCell>
                 <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Target Penyelesaian Jurnal</TableCell>
                 <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Indeks Ketepatan</TableCell>
                 <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Skor Mutu SDM</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {guruData.map((guru, index) => {
                let rankBg = 'transparent'
                let rankColor = '#64748b'
                let rankBorder = '1px dashed #cbd5e1'
                
                if (index === 0) { rankBg = '#FEF3C7'; rankColor = '#D97706'; rankBorder = '1px solid #FDE68A' } // Gold
                else if (index === 1) { rankBg = '#F1F5F9'; rankColor = '#475569'; rankBorder = '1px solid #E2E8F0' } // Silver
                else if (index === 2) { rankBg = '#FFEDD5'; rankColor = '#C2410C'; rankBorder = '1px solid #FED7AA' } // Bronze

                const tepatColor = parseInt(guru.tepat) >= 90 ? '#10B981' : parseInt(guru.tepat) >= 80 ? '#F59E0B' : '#EF4444'

                return (
                  <TableRow key={index} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                    <TableCell align="center">
                      <Box sx={{ width: 36, height: 36, borderRadius: '50%', mx: 'auto', bgcolor: rankBg, color: rankColor, border: rankBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', boxShadow: index < 3 ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
                        {index + 1}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ fontWeight: 800, color: '#0F172A' }}>{guru.nama}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{guru.sekolah}</TableCell>

                    <TableCell sx={{ minWidth: 200, pr: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(guru.jurnal / 24) * 100}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#0F172A' } }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', minWidth: 40 }}>
                          {guru.jurnal}/24
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      <Box component="span" sx={{ color: tepatColor, bgcolor: tepatColor + '15', px: 2, py: 0.5, borderRadius: '50px', fontWeight: '800', fontSize: '0.85rem', border: `1px solid ${tepatColor}40` }}>
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
