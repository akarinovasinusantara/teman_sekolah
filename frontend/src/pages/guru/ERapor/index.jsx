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
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

const siswaData = [
  { nis: '12345', nama: 'Ahmad Rizky', kelas: 'X-A' },
  { nis: '12346', nama: 'Siti Nurhaliza', kelas: 'X-A' },
  { nis: '12347', nama: 'Budi Pratama', kelas: 'X-A' },
  { nis: '12348', nama: 'Dewi Lestari', kelas: 'X-A' },
  { nis: '12349', nama: 'Fatimah Azzahra', kelas: 'X-A' },
]

export default function ERapor() {
  const [deskripsi, setDeskripsi] = useState({})
  const [editing, setEditing] = useState(null)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setEditing(null)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        E-Rapor - Deskripsi Perkembangan Siswa
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Deskripsi rapor berhasil disimpan!
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField select SelectProps={{ native: true }} label="Semester" defaultValue="Ganjil 2025/2026">
            <option value="Ganjil 2025/2026">Ganjil 2025/2026</option>
            <option value="Genap 2025/2026">Genap 2025/2026</option>
          </TextField>
          <TextField select SelectProps={{ native: true }} label="Kelas" defaultValue="X-A">
            <option value="X-A">X-A</option>
            <option value="X-B">X-B</option>
            <option value="XI-A">XI-A</option>
            <option value="XI-B">XI-B</option>
          </TextField>
        </Box>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="50">No</TableCell>
                <TableCell>NIS</TableCell>
                <TableCell>Nama Siswa</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell>Deskripsi Perkembangan</TableCell>
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswaData.map((siswa, index) => (
                <TableRow key={siswa.nis}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{siswa.nis}</TableCell>
                  <TableCell>{siswa.nama}</TableCell>
                  <TableCell>{siswa.kelas}</TableCell>
                  <TableCell>
                    {editing === siswa.nis ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={deskripsi[siswa.nis] || ''}
                        onChange={(e) => setDeskripsi({ ...deskripsi, [siswa.nis]: e.target.value })}
                        placeholder="Masukkan deskripsi perkembangan siswa..."
                      />
                    ) : (
                      <Typography variant="body2" color={deskripsi[siswa.nis] ? 'text.primary' : 'text.secondary'}>
                        {deskripsi[siswa.nis] || 'Belum diisi'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setEditing(editing === siswa.nis ? null : siswa.nis)}
                    >
                      <EditIcon />
                    </IconButton>
                    {editing === siswa.nis && (
                      <IconButton size="small" color="success" onClick={handleSave}>
                        <SaveIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          💡 Tips Menulis Deskripsi:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Fokus pada perkembangan akademik dan karakter siswa
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Gunakan bahasa yang positif dan membangun
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Sertakan pencapaian dan area yang perlu ditingkatkan
        </Typography>
      </Box>
    </Box>
  )
}
