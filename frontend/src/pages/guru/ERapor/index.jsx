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
import Grid from '@mui/material/Grid'
import AssignmentIcon from '@mui/icons-material/Assignment'

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
            E-Rapor Guru
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Tulis deskripsi perkembangan dan catatan wali kelas
          </Typography>
        </Box>
        <AssignmentIcon sx={{ 
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
          Deskripsi rapor berhasil disimpan dan dikunci!
        </Alert>
      )}

      {/* Filter Paper */}
      <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Tahun Akademik & Semester" 
              defaultValue="Ganjil 2025/2026"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <option value="Ganjil 2025/2026">Ganjil 2025/2026</option>
              <option value="Genap 2025/2026">Genap 2025/2026</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              select 
              SelectProps={{ native: true }} 
              label="Kelas Binaan" 
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
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', mb: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <TableCell width="50" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>NIS</TableCell>
                <TableCell width="200" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nama Siswa</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Deskripsi Perkembangan & Catatan</TableCell>
                <TableCell align="center" width="100" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswaData.map((siswa, index) => (
                <TableRow key={siswa.nis} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s', verticalAlign: 'top' }}>
                  <TableCell sx={{ fontWeight: 600, pt: 3 }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 500, pt: 3 }}>{siswa.nis}</TableCell>
                  <TableCell sx={{ pt: 3 }}>
                    <Typography variant="body2" fontWeight="700">{siswa.nama}</Typography>
                    <Box sx={{ display: 'inline-block', mt: 0.5, bgcolor: 'primary.50', color: 'primary.700', px: 1, py: 0.25, borderRadius: 1, fontSize: '0.7rem', fontWeight: 'bold' }}>
                      Kelas {siswa.kelas}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ pt: 2.5, pb: 2.5 }}>
                    {editing === siswa.nis ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={deskripsi[siswa.nis] || ''}
                        onChange={(e) => setDeskripsi({ ...deskripsi, [siswa.nis]: e.target.value })}
                        placeholder="Masukkan catatan positif mengenai sikap, partisipasi, dan pencapaian akademik..."
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#fff' } }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: deskripsi[siswa.nis] ? 'text.primary' : 'text.secondary', 
                        fontStyle: deskripsi[siswa.nis] ? 'normal' : 'italic',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6
                      }}>
                        {deskripsi[siswa.nis] || 'Belum ada deskripsi catatan wali kelas.'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ pt: 2.5 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setEditing(editing === siswa.nis ? null : siswa.nis)}
                      sx={{ bgcolor: editing === siswa.nis ? 'primary.50' : 'transparent' }}
                    >
                      <EditIcon />
                    </IconButton>
                    {editing === siswa.nis && (
                      <IconButton size="small" color="success" onClick={handleSave} sx={{ ml: 1, bgcolor: 'success.50' }}>
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

      {/* Info Card */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: '#E8F5E9', borderRadius: 3, border: '1px solid', borderColor: '#A5D6A7', display: 'flex', gap: 2 }}>
        <Box sx={{ fontSize: '2rem' }}>💡</Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" color="#1B5E20" gutterBottom>
            Panduan Penulisan Deskripsi
          </Typography>
          <Typography variant="body2" color="#2E7D32" sx={{ mb: 0.5, fontWeight: 500 }}>• Fokus pada perkembangan akademik, sosial, dan karakter unik siswa.</Typography>
          <Typography variant="body2" color="#2E7D32" sx={{ mb: 0.5, fontWeight: 500 }}>• Gunakan afirmasi bahasa positif dan kalimat membangun (constructive feedback).</Typography>
          <Typography variant="body2" color="#2E7D32" sx={{ fontWeight: 500 }}>• Rekomendasikan secara spesifik area kompetensi mana yang masih bisa ditingkatkan lebih jauh.</Typography>
        </Box>
      </Paper>
    </Box>
  )
}
