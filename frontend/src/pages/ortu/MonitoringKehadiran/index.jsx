import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import HelpIcon from '@mui/icons-material/Help'
import AssessmentIcon from '@mui/icons-material/Assessment'

const absensiData = [
  { tanggal: '15 Mar 2026', hari: 'Senin', status: 'Hadir', jam: '06:45', keterangan: '-' },
  { tanggal: '14 Mar 2026', hari: 'Jumat', status: 'Hadir', jam: '06:50', keterangan: '-' },
  { tanggal: '13 Mar 2026', hari: 'Kamis', status: 'Sakit', jam: '-', keterangan: 'Demam' },
  { tanggal: '12 Mar 2026', hari: 'Rabu', status: 'Hadir', jam: '06:55', keterangan: '-' },
  { tanggal: '11 Mar 2026', hari: 'Selasa', status: 'Hadir', jam: '06:48', keterangan: '-' },
  { tanggal: '10 Mar 2026', hari: 'Senin', status: 'Hadir', jam: '06:45', keterangan: '-' },
  { tanggal: '07 Mar 2026', hari: 'Jumat', status: 'Izin', jam: '-', keterangan: 'Acara Keluarga' },
  { tanggal: '06 Mar 2026', hari: 'Kamis', status: 'Hadir', jam: '06:52', keterangan: '-' },
]

const MiniStatCard = ({ title, value, icon, color }) => (
  <Card sx={{
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: `0 12px 24px -10px ${color}60`
    }
  }}>
    <Box sx={{
      position: 'absolute', right: -20, bottom: -20, width: 80, height: 80,
      borderRadius: '50%', backgroundColor: color, opacity: 0.08, filter: 'blur(15px)', zIndex: 0
    }} />
    <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ color: color, display: 'flex' }}>{icon}</Box>
      </Box>
      <Typography variant="h4" fontWeight="800" sx={{ color: 'text.primary', mt: 'auto' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
)

export default function MonitoringKehadiran() {
  const totalHadir = absensiData.filter(a => a.status === 'Hadir').length
  const totalSakit = absensiData.filter(a => a.status === 'Sakit').length
  const totalIzin = absensiData.filter(a => a.status === 'Izin').length
  const totalAlpa = absensiData.filter(a => a.status === 'Alpa').length
  const totalDays = absensiData.length
  const persentase = totalDays > 0 ? Math.round((totalHadir / totalDays) * 100) : 0

  const summaryCards = [
    { title: 'Hadir', count: totalHadir, icon: <CheckCircleIcon />, color: '#2E7D32' },
    { title: 'Sakit', count: totalSakit, icon: <HelpIcon />, color: '#E65100' },
    { title: 'Izin', count: totalIzin, icon: <HelpIcon />, color: '#1565C0' },
    { title: 'Alpa', count: totalAlpa, icon: <CancelIcon />, color: '#C62828' },
    { title: 'Persentase', count: `${persentase}%`, icon: <AssessmentIcon />, color: '#6A1B9A' },
  ]

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
            Monitoring Kehadiran
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Riwayat kehadiran Ahmad Rizky - <Box component="span" sx={{ fontWeight: 700 }}>Kelas X-A</Box>
          </Typography>
        </Box>
        {/* Background Decorative Icon */}
        <CheckCircleIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-5deg)'
        }} />
      </Box>

      {/* Summary Cards with CSS Grid for perfect 5 columns */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }, 
          gap: 3, 
          mb: 4 
        }}
      >
        {summaryCards.map((card, index) => (
          <MiniStatCard key={index} title={card.title} value={card.count} icon={card.icon} color={card.color} />
        ))}
      </Box>

      {/* Table Data */}
      <Paper elevation={0} sx={{ 
        borderRadius: 3, 
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}>
        <TableContainer sx={{ p: { xs: 0, md: 1 } }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Tanggal</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Hari</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Jam Masuk</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absensiData.map((row, index) => {
                let statusColor = '';
                let statusBg = '';
                let borderColor = '';
                let StatusIcon = null;

                if (row.status === 'Hadir') { statusColor = 'success.700'; statusBg = 'success.50'; borderColor = 'success.200'; StatusIcon = CheckCircleIcon; }
                else if (row.status === 'Sakit') { statusColor = 'warning.800'; statusBg = 'warning.50'; borderColor = 'warning.200'; StatusIcon = HelpIcon; }
                else if (row.status === 'Izin') { statusColor = 'info.700'; statusBg = 'info.50'; borderColor = 'info.200'; StatusIcon = HelpIcon; }
                else { statusColor = 'error.700'; statusBg = 'error.50'; borderColor = 'error.200'; StatusIcon = CancelIcon; }

                return (
                  <TableRow 
                    key={index} 
                    hover 
                    sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{row.tanggal}</TableCell>
                    <TableCell>{row.hari}</TableCell>
                    <TableCell>
                      <Box sx={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 1, 
                        bgcolor: statusBg, px: 1.5, py: 0.5, borderRadius: '50px',
                        border: '1px solid', borderColor: borderColor,
                        minWidth: 80, justifyContent: 'center'
                      }}>
                        <StatusIcon sx={{ fontSize: 16, color: statusColor }} />
                        <Typography variant="caption" fontWeight="800" sx={{ color: statusColor }}>
                          {row.status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>{row.jam}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontStyle: row.keterangan === '-' ? 'italic' : 'normal' }}>
                      {row.keterangan}
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
