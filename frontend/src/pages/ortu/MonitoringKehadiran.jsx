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

const getStatusIcon = (status) => {
  switch (status) {
    case 'Hadir':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />
    case 'Sakit':
      return <HelpIcon sx={{ color: 'warning.main' }} />
    case 'Izin':
      return <HelpIcon sx={{ color: 'info.main' }} />
    case 'Alpa':
      return <CancelIcon sx={{ color: 'error.main' }} />
    default:
      return null
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Hadir':
      return 'success.light'
    case 'Sakit':
      return 'warning.light'
    case 'Izin':
      return 'info.light'
    case 'Alpa':
      return 'error.light'
    default:
      return 'grey.100'
  }
}

export default function MonitoringKehadiran() {
  const totalHadir = absensiData.filter(a => a.status === 'Hadir').length
  const totalSakit = absensiData.filter(a => a.status === 'Sakit').length
  const totalIzin = absensiData.filter(a => a.status === 'Izin').length
  const totalAlpa = absensiData.filter(a => a.status === 'Alpa').length
  const persentase = Math.round((totalHadir / absensiData.length) * 100)

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Monitoring Kehadiran
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Riwayat kehadiran Ahmad Rizky - Kelas X-A
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ color: 'success.main', mb: 1 }}>{getStatusIcon('Hadir')}</Box>
              <Typography variant="h4" color="success.main" fontWeight="bold">{totalHadir}</Typography>
              <Typography variant="body2" color="text.secondary">Hadir</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ color: 'warning.main', mb: 1 }}>{getStatusIcon('Sakit')}</Box>
              <Typography variant="h4" color="warning.main" fontWeight="bold">{totalSakit}</Typography>
              <Typography variant="body2" color="text.secondary">Sakit</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ color: 'info.main', mb: 1 }}>{getStatusIcon('Izin')}</Box>
              <Typography variant="h4" color="info.main" fontWeight="bold">{totalIzin}</Typography>
              <Typography variant="body2" color="text.secondary">Izin</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ color: 'error.main', mb: 1 }}>{getStatusIcon('Alpa')}</Box>
              <Typography variant="h4" color="error.main" fontWeight="bold">{totalAlpa}</Typography>
              <Typography variant="body2" color="text.secondary">Alpa</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">{persentase}%</Typography>
              <Typography variant="body2" color="text.secondary">Persentase Kehadiran</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tanggal</TableCell>
                <TableCell>Hari</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Jam Masuk</TableCell>
                <TableCell>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absensiData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.tanggal}</TableCell>
                  <TableCell>{row.hari}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(row.status)}
                      <Box component="span" sx={{ 
                        px: 1.5, py: 0.5, borderRadius: 1, 
                        bgcolor: getStatusColor(row.status), 
                        fontSize: '0.75rem', fontWeight: 'bold' 
                      }}>
                        {row.status}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.jam}</TableCell>
                  <TableCell>{row.keterangan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
