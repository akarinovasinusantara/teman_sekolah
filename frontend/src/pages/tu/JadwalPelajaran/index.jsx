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
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const jadwalData = [
  { id: 1, kelas: 'X-A', hari: 'Senin', jam: '07:00 - 08:30', mapel: 'Matematika', guru: 'Dra. Siti Aminah, M.Pd' },
  { id: 2, kelas: 'X-A', hari: 'Senin', jam: '08:30 - 10:00', mapel: 'Bahasa Indonesia', guru: 'Budi Santoso, S.Pd' },
  { id: 3, kelas: 'X-A', hari: 'Senin', jam: '10:00 - 11:30', mapel: 'Bahasa Inggris', guru: 'Rina Wati, S.Pd' },
  { id: 4, kelas: 'X-B', hari: 'Senin', jam: '07:00 - 08:30', mapel: 'IPA', guru: 'Ahmad Fauzi, S.Pd' },
  { id: 5, kelas: 'X-B', hari: 'Senin', jam: '08:30 - 10:00', mapel: 'IPS', guru: 'Dewi Lestari, S.Pd' },
]

export default function JadwalPelajaran() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [tabValue, setTabValue] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography 
          variant="h4" 
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
        >
          Jadwal Pelajaran
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          fullWidth={isMobile}
        >
          Tambah Jadwal
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)} 
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
        >
          <Tab label="X-A" />
          <Tab label="X-B" />
          <Tab label="XI-A" />
          <Tab label="XI-B" />
          <Tab label="XII-A" />
          <Tab label="XII-B" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Hari</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Jam</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Mata Pelajaran</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Guru</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jadwalData.filter(j => j.kelas === 'X-A').map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.hari}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.jam}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.mapel}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.guru}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            fontWeight: 'bold',
            pr: 6,
          }}
        >
          Tambah Jadwal Pelajaran
        </DialogTitle>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField 
              fullWidth 
              select 
              SelectProps={{ native: true }} 
              label="Kelas"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            >
              <option value="">Pilih Kelas</option>
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="XI-A">XI-A</option>
              <option value="XI-B">XI-B</option>
              <option value="XII-A">XII-A</option>
              <option value="XII-B">XII-B</option>
            </TextField>
            <TextField 
              fullWidth 
              select 
              SelectProps={{ native: true }} 
              label="Hari"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            >
              <option value="">Pilih Hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
            </TextField>
            <TextField 
              fullWidth 
              label="Jam Mulai" 
              type="time" 
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              label="Jam Selesai" 
              type="time" 
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              select 
              SelectProps={{ native: true }} 
              label="Mata Pelajaran"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            >
              <option value="">Pilih Mapel</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="IPA">IPA</option>
              <option value="IPS">IPS</option>
            </TextField>
            <TextField 
              fullWidth 
              select 
              SelectProps={{ native: true }} 
              label="Guru Pengampu"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            >
              <option value="">Pilih Guru</option>
              <option value="Dra. Siti Aminah, M.Pd">Dra. Siti Aminah, M.Pd</option>
              <option value="Budi Santoso, S.Pd">Budi Santoso, S.Pd</option>
              <option value="Rina Wati, S.Pd">Rina Wati, S.Pd</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: isMobile ? 2 : 3,
            flexDirection: isMobile ? 'column-reverse' : 'row',
            gap: 1,
            '& .MuiButton-root': {
              minWidth: isMobile ? '100%' : 'auto',
            },
          }}
        >
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained">Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
