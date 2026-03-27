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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import FactCheckIcon from '@mui/icons-material/FactCheck'

const siswaData = [
  { nis: '12345', nama: 'Ahmad Rizky', kelas: 'X-A' },
  { nis: '12346', nama: 'Siti Nurhaliza', kelas: 'X-A' },
  { nis: '12347', nama: 'Budi Pratama', kelas: 'X-A' },
  { nis: '12348', nama: 'Dewi Lestari', kelas: 'X-A' },
  { nis: '12349', nama: 'Fatimah Azzahra', kelas: 'X-A' },
  { nis: '12350', nama: 'Muhammad Fikri', kelas: 'X-A' },
]

export default function AbsensiSiswa() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])
  const [absensi, setAbsensi] = useState({})
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

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
            Input Absensi Siswa
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Catat kehadiran harian siswa di kelas Anda
          </Typography>
        </Box>
        <FactCheckIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-5deg)'
        }} />
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 4, borderRadius: 2, fontWeight: 500 }}>
          Data absensi siswa berhasil disimpan ke sistem!
        </Alert>
      )}

      {/* Filter Paper */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Kelas" 
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
          <Grid item xs={12} sm={12} md={4}>
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
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        {!isMobile ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'transparent' }}>
                  <TableCell width="50" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>NIS</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nama Siswa</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Kelas</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Kehadiran</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Keterangan Khusus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {siswaData.map((siswa, index) => (
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
                      <RadioGroup
                        row
                        value={absensi[siswa.nis] || 'H'}
                        onChange={(e) => setAbsensi({ ...absensi, [siswa.nis]: e.target.value })}
                        sx={{ justifyContent: 'center', gap: 1 }}
                      >
                        <FormControlLabel value="H" control={<Radio size="small" color="success" />} label={<Typography variant="body2" fontWeight="600" color="success.main">H</Typography>} sx={{ m: 0 }} />
                        <FormControlLabel value="S" control={<Radio size="small" color="warning" />} label={<Typography variant="body2" fontWeight="600" color="warning.main">S</Typography>} sx={{ m: 0 }} />
                        <FormControlLabel value="I" control={<Radio size="small" color="info" />} label={<Typography variant="body2" fontWeight="600" color="info.main">I</Typography>} sx={{ m: 0 }} />
                        <FormControlLabel value="A" control={<Radio size="small" color="error" />} label={<Typography variant="body2" fontWeight="600" color="error.main">A</Typography>} sx={{ m: 0 }} />
                      </RadioGroup>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Opsional..."
                        fullWidth
                        disabled={absensi[siswa.nis] === 'H' || !absensi[siswa.nis]}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {siswaData.map((siswa) => (
              <Card key={siswa.nis} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{siswa.nama}</Typography>
                    <Typography variant="caption" sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>{siswa.kelas}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>NIS: {siswa.nis}</Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>Status Kehadiran:</Typography>
                  <RadioGroup
                    row
                    value={absensi[siswa.nis] || 'H'}
                    onChange={(e) => setAbsensi({ ...absensi, [siswa.nis]: e.target.value })}
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <FormControlLabel value="H" control={<Radio size="small" color="success" />} label={<Typography variant="body2" fontWeight="700" color="success.main">H</Typography>} />
                    <FormControlLabel value="S" control={<Radio size="small" color="warning" />} label={<Typography variant="body2" fontWeight="700" color="warning.main">S</Typography>} />
                    <FormControlLabel value="I" control={<Radio size="small" color="info" />} label={<Typography variant="body2" fontWeight="700" color="info.main">I</Typography>} />
                    <FormControlLabel value="A" control={<Radio size="small" color="error" />} label={<Typography variant="body2" fontWeight="700" color="error.main">A</Typography>} />
                  </RadioGroup>
                  <TextField
                    size="small"
                    placeholder="Catatan..."
                    fullWidth
                    disabled={absensi[siswa.nis] === 'H' || !absensi[siswa.nis]}
                    sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', bgcolor: '#f8fafc' }}>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />} 
            onClick={handleSave} 
            size="large"
            sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1.5, minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Simpan Absensi
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
