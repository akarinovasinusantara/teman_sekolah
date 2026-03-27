import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Grid from '@mui/material/Grid'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const siswaData = [
  { nis: '12345', nama: 'Ahmad Rizky', kelas: 'X-A' },
  { nis: '12346', nama: 'Siti Nurhaliza', kelas: 'X-A' },
  { nis: '12347', nama: 'Budi Pratama', kelas: 'X-A' },
  { nis: '12348', nama: 'Dewi Lestari', kelas: 'X-A' },
  { nis: '12349', nama: 'Fatimah Azzahra', kelas: 'X-A' },
]

export default function InputNilai() {
  const [tabValue, setTabValue] = useState(0)
  const [nilai, setNilai] = useState({})
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const jenisNilai = ['Harian', 'UTS', 'UAS']

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Premium Header */}
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
            Input Nilai Siswa
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Kelola dan evaluasi hasil pembelajaran kelas Anda
          </Typography>
        </Box>
        <LibraryBooksIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(15deg)'
        }} />
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 4, borderRadius: 2, fontWeight: 500 }}>
          Data nilai berhasil disinkronisasi ke server!
        </Alert>
      )}

      {/* Filter Paper */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Pilih Kelas" 
              defaultValue="X-A"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="XI-A">XI-A</option>
              <option value="XI-B">XI-B</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Mata Pelajaran" 
              defaultValue="Matematika"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="IPA">IPA</option>
              <option value="IPS">IPS</option>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            bgcolor: '#f8fafc',
            '& .MuiTab-root': { py: 2, fontWeight: 600, textTransform: 'none', fontSize: '1rem' },
          }}
        >
          {jenisNilai.map((jenis) => (
            <Tab key={jenis} label={`Penilaian ${jenis}`} />
          ))}
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent' }}>
                <TableCell width="50" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>NIS</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nama Siswa</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Kelas</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nilai Angka</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Predikat Mutu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswaData.map((siswa, index) => {
                const nilaiAngka = nilai[siswa.nis] || ''
                const num = Number(nilaiAngka);
                const predikat = num >= 90 ? 'A (Sangat Baik)' : num >= 80 ? 'B (Baik)' : num >= 70 ? 'C (Cukup)' : num > 0 ? 'D (Kurang)' : '';
                
                return (
                  <TableRow key={siswa.nis} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                    <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{siswa.nis}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{siswa.nama}</TableCell>
                    <TableCell>
                      <Box sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {siswa.kelas}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        placeholder="0-100"
                        inputProps={{ min: 0, max: 100, style: { textAlign: 'center', fontWeight: 'bold' } }}
                        sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                        value={nilai[siswa.nis] || ''}
                        onChange={(e) => setNilai({ ...nilai, [siswa.nis]: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      {predikat ? (
                        <Box sx={{ 
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          px: 2, py: 0.5, borderRadius: '50px',
                          bgcolor: predikat.includes('A') ? 'success.50' : predikat.includes('B') ? 'info.50' : predikat.includes('C') ? 'warning.50' : 'error.50',
                          color: predikat.includes('A') ? 'success.700' : predikat.includes('B') ? 'info.700' : predikat.includes('C') ? 'warning.800' : 'error.700',
                          border: '1px solid',
                          borderColor: predikat.includes('A') ? 'success.200' : predikat.includes('B') ? 'info.200' : predikat.includes('C') ? 'warning.200' : 'error.200',
                          fontWeight: 'bold', fontSize: '0.75rem', minWidth: 100
                        }}>
                          {predikat}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">-</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', bgcolor: '#f8fafc' }}>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />} 
            onClick={handleSave} 
            size="large"
            sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1.5, minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Simpan Nilai
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
