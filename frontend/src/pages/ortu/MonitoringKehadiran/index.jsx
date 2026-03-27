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
import Avatar from '@mui/material/Avatar'
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

export default function MonitoringKehadiran() {
  const totalHadir = absensiData.filter(a => a.status === 'Hadir').length
  const totalSakit = absensiData.filter(a => a.status === 'Sakit').length
  const totalIzin = absensiData.filter(a => a.status === 'Izin').length
  const totalAlpa = absensiData.filter(a => a.status === 'Alpa').length
  const totalDays = absensiData.length
  const persentase = totalDays > 0 ? Math.round((totalHadir / totalDays) * 100) : 0

  const summaryCards = [
    { title: 'Hadir', count: totalHadir, icon: <CheckCircleIcon />, color: '#2E7D32', bg: '#E8F5E9' },
    { title: 'Sakit', count: totalSakit, icon: <HelpIcon />, color: '#E65100', bg: '#FFF3E0' },
    { title: 'Izin', count: totalIzin, icon: <HelpIcon />, color: '#1565C0', bg: '#E3F2FD' },
    { title: 'Alpa', count: totalAlpa, icon: <CancelIcon />, color: '#C62828', bg: '#FFEBEE' },
    { title: 'Persentase', count: `${persentase}%`, icon: <AssessmentIcon />, color: '#6A1B9A', bg: '#F3E5F5', isPercent: true },
  ]

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" fontWeight="800" gutterBottom sx={{ color: '#1565C0' }}>
        Monitoring Kehadiran
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
        Riwayat kehadiran Ahmad Rizky - Kelas X-A
      </Typography>

      {/* Summary Cards with CSS Grid for perfect 5 columns */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, 
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
              flexDirection: card.isPercent ? 'column' : 'row',
              justifyContent: 'center',
              p: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                borderColor: card.color
              }
            }}
          >
            <Avatar sx={{ bgcolor: card.bg, color: card.color, width: 48, height: 48, mr: card.isPercent ? 0 : 2, mb: card.isPercent ? 1 : 0 }}>
              {card.icon}
            </Avatar>
            <Box sx={{ textAlign: card.isPercent ? 'center' : 'left' }}>
              <Typography variant="h5" fontWeight="800" color={card.color}>
                {card.count}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600">
                {card.title}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Table Data */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#4b5563' }}>Tanggal</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#4b5563' }}>Hari</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#4b5563' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#4b5563' }}>Jam Masuk</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#4b5563' }}>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absensiData.map((row, index) => {
                let statusColor = '';
                let statusBg = '';
                let StatusIcon = null;

                if (row.status === 'Hadir') { statusColor = '#2E7D32'; statusBg = '#E8F5E9'; StatusIcon = CheckCircleIcon; }
                else if (row.status === 'Sakit') { statusColor = '#E65100'; statusBg = '#FFF3E0'; StatusIcon = HelpIcon; }
                else if (row.status === 'Izin') { statusColor = '#1565C0'; statusBg = '#E3F2FD'; StatusIcon = HelpIcon; }
                else { statusColor = '#C62828'; statusBg = '#FFEBEE'; StatusIcon = CancelIcon; }

                return (
                  <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ fontWeight: 500 }}>{row.tanggal}</TableCell>
                    <TableCell>{row.hari}</TableCell>
                    <TableCell>
                      <Box sx={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 1, 
                        bgcolor: statusBg, px: 1.5, py: 0.5, borderRadius: 2,
                        border: '1px solid', borderColor: statusColor + '40'
                      }}>
                        <StatusIcon sx={{ fontSize: 16, color: statusColor }} />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: statusColor }}>
                          {row.status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{row.jam}</TableCell>
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
