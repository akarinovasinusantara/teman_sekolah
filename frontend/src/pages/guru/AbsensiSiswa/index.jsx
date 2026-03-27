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
import FormLabel from '@mui/material/FormLabel'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

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
    <Box>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Absensi Siswa
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Absensi berhasil disimpan!
        </Alert>
      )}

      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="Tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Kelas" 
              defaultValue="X-A"
              fullWidth
            >
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="XI-A">XI-A</option>
              <option value="XI-B">XI-B</option>
              <option value="XII-A">XII-A</option>
              <option value="XII-B">XII-B</option>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Mata Pelajaran" 
              defaultValue="Matematika"
              fullWidth
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

      {!isMobile ? (
        // Desktop: Table View
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="50" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>No</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>NIS</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Nama Siswa</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Kelas</TableCell>
                  <TableCell align="center" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Kehadiran</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Keterangan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {siswaData.map((siswa, index) => (
                  <TableRow key={siswa.nis} hover>
                    <TableCell sx={{ fontSize: '0.875rem' }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>{siswa.nis}</TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>{siswa.nama}</TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>{siswa.kelas}</TableCell>
                    <TableCell align="center">
                      <RadioGroup
                        row
                        value={absensi[siswa.nis] || 'H'}
                        onChange={(e) => setAbsensi({ ...absensi, [siswa.nis]: e.target.value })}
                        sx={{ justifyContent: 'center' }}
                      >
                        <FormControlLabel 
                          value="H" 
                          control={<Radio size="small" />} 
                          label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>H</Typography>} 
                          sx={{ mr: 0.5 }}
                        />
                        <FormControlLabel 
                          value="S" 
                          control={<Radio size="small" />} 
                          label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>S</Typography>} 
                          sx={{ mr: 0.5 }}
                        />
                        <FormControlLabel 
                          value="I" 
                          control={<Radio size="small" />} 
                          label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>I</Typography>} 
                          sx={{ mr: 0.5 }}
                        />
                        <FormControlLabel 
                          value="A" 
                          control={<Radio size="small" />} 
                          label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }} color="error">A</Typography>} 
                        />
                      </RadioGroup>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        placeholder="Catatan (opsional)"
                        fullWidth
                        disabled={absensi[siswa.nis] === 'H' || !absensi[siswa.nis]}
                        sx={{ fontSize: '0.875rem' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />} 
              onClick={handleSave} 
              size="large"
              sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Simpan Absensi
            </Button>
          </Box>
        </Paper>
      ) : (
        // Mobile: Card View
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {siswaData.map((siswa, index) => (
            <Card key={siswa.nis} sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {siswa.nama}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {siswa.kelas}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  NIS: {siswa.nis}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
                  Kehadiran:
                </Typography>
                <RadioGroup
                  row
                  value={absensi[siswa.nis] || 'H'}
                  onChange={(e) => setAbsensi({ ...absensi, [siswa.nis]: e.target.value })}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <FormControlLabel 
                    value="H" 
                    control={<Radio size="small" />} 
                    label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Hadir</Typography>} 
                  />
                  <FormControlLabel 
                    value="S" 
                    control={<Radio size="small" />} 
                    label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Sakit</Typography>} 
                  />
                  <FormControlLabel 
                    value="I" 
                    control={<Radio size="small" />} 
                    label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Izin</Typography>} 
                  />
                  <FormControlLabel 
                    value="A" 
                    control={<Radio size="small" />} 
                    label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }} color="error">Alpa</Typography>} 
                  />
                </RadioGroup>
                <TextField
                  size="small"
                  placeholder="Catatan (opsional)"
                  fullWidth
                  disabled={absensi[siswa.nis] === 'H' || !absensi[siswa.nis]}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          ))}
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />} 
            onClick={handleSave} 
            size="large"
            fullWidth
          >
            Simpan Absensi
          </Button>
        </Box>
      )}
    </Box>
  )
}
