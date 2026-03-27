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
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Input Nilai Siswa
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Nilai berhasil disimpan!
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField select SelectProps={{ native: true }} label="Kelas" defaultValue="X-A">
            <option value="X-A">X-A</option>
            <option value="X-B">X-B</option>
            <option value="XI-A">XI-A</option>
            <option value="XI-B">XI-B</option>
          </TextField>
          <TextField select SelectProps={{ native: true }} label="Mata Pelajaran" defaultValue="Matematika">
            <option value="Matematika">Matematika</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
            <option value="IPA">IPA</option>
            <option value="IPS">IPS</option>
          </TextField>
        </Box>

        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {jenisNilai.map((jenis) => (
            <Tab key={jenis} label={`Nilai ${jenis}`} />
          ))}
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="50">No</TableCell>
                <TableCell>NIS</TableCell>
                <TableCell>Nama Siswa</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell align="center">Nilai Angka (0-100)</TableCell>
                <TableCell>Predikat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswaData.map((siswa, index) => {
                const nilaiAngka = nilai[siswa.nis] || ''
                const predikat = nilaiAngka >= 90 ? 'A (Sangat Baik)' : nilaiAngka >= 80 ? 'B (Baik)' : nilaiAngka >= 70 ? 'C (Cukup)' : nilaiAngka >= 60 ? 'D (Kurang)' : 'E (Sangat Kurang)'
                
                return (
                  <TableRow key={siswa.nis}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{siswa.nis}</TableCell>
                    <TableCell>{siswa.nama}</TableCell>
                    <TableCell>{siswa.kelas}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        inputProps={{ min: 0, max: 100, style: { textAlign: 'center' } }}
                        sx={{ width: 100 }}
                        value={nilai[siswa.nis] || ''}
                        onChange={(e) => setNilai({ ...nilai, [siswa.nis]: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      {nilaiAngka && (
                        <Box component="span" sx={{ 
                          px: 1.5, py: 0.5, borderRadius: 1, 
                          bgcolor: predikat.includes('A') ? 'success.light' : predikat.includes('B') ? 'info.light' : predikat.includes('C') ? 'warning.light' : 'error.light',
                          color: predikat.includes('A') || predikat.includes('B') ? 'success.dark' : 'error.dark',
                          fontSize: '0.75rem', fontWeight: 'bold'
                        }}>
                          {predikat}
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} size="large">
            Simpan Nilai
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
