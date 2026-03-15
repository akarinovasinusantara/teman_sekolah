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

export default function HasilBelajar() {
  const [tabValue, setTabValue] = useState(0)
  const [openRapor, setOpenRapor] = useState(false)
  const rataRata = (nilaiData.reduce((acc, curr) => acc + curr.rata, 0) / nilaiData.length).toFixed(1)

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Hasil Belajar
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Nilai dan rapor Ahmad Rizky - Kelas X-A
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Rata-rata Nilai Semester Ini
              </Typography>
              <Typography variant="h2" color="primary.main" fontWeight="bold">
                {rataRata}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                dari 100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Ranking Kelas
              </Typography>
              <Typography variant="h2" color="success.main" fontWeight="bold">
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                dari 32 siswa
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Mata Pelajaran
              </Typography>
              <Typography variant="h2" color="warning.main" fontWeight="bold">
                {nilaiData.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                mata pelajaran
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Detail Nilai" />
          <Tab label="Rapor Digital" />
        </Tabs>

        {tabValue === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mata Pelajaran</TableCell>
                  <TableCell align="center">Nilai Harian</TableCell>
                  <TableCell align="center">UTS</TableCell>
                  <TableCell align="center">UAS</TableCell>
                  <TableCell align="center">Rata-rata</TableCell>
                  <TableCell align="center">Predikat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nilaiData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.mapel}</TableCell>
                    <TableCell align="center">{row.nilaiHarian}</TableCell>
                    <TableCell align="center">{row.uts}</TableCell>
                    <TableCell align="center">{row.uas}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.rata}</TableCell>
                    <TableCell align="center">
                      <Box component="span" sx={{ 
                        px: 1.5, py: 0.5, borderRadius: 1, 
                        bgcolor: row.predikat === 'A' ? 'success.light' : 'info.light', 
                        color: row.predikat === 'A' ? 'success.dark' : 'info.dark', 
                        fontSize: '0.75rem', fontWeight: 'bold' 
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
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {raporData.map((rapor, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6">{rapor.semester}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Diterbitkan: {rapor.tanggal}
                      </Typography>
                      <Box component="span" sx={{ 
                        px: 1.5, py: 0.5, borderRadius: 1, 
                        bgcolor: 'success.light', color: 'success.dark', 
                        fontSize: '0.75rem', fontWeight: 'bold' 
                      }}>
                        {rapor.status}
                      </Box>
                    </Box>
                    <Box>
                      <IconButton color="primary" onClick={() => setOpenRapor(true)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary">
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

      <Dialog open={openRapor} onClose={() => setOpenRapor(false)} maxWidth="md" fullWidth>
        <DialogTitle>Preview Rapor - Ganjil 2025/2026</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              RAPOR PESERTA DIDIK
            </Typography>
            <Typography variant="body2">
              SMA NEGERI 1 JAKARTA
            </Typography>
            <Box sx={{ my: 3 }}>
              <Typography variant="body2">Nama: Ahmad Rizky</Typography>
              <Typography variant="body2">NIS: 12345</Typography>
              <Typography variant="body2">Kelas: X-A</Typography>
            </Box>
            <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Typography variant="body2" color="text.secondary">
                [Preview Rapor Lengkap]
              </Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRapor(false)}>Tutup</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
