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
import EventNoteIcon from '@mui/icons-material/EventNote'

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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" fontWeight="800" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Jadwal Pelajaran
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Kelola distribusi jam pelajaran seluruh kelas
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          sx={{ 
            backgroundColor: '#ffffff !important', 
            color: '#1565C0 !important', 
            fontWeight: '800',
            borderRadius: 2,
            px: 3,
            '&:hover': { 
              backgroundColor: '#f1f5f9 !important',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
            },
            transition: 'all 0.2s',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          Tambah Jadwal
        </Button>
        <EventNoteIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-5deg)'
        }} />
      </Box>

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
            '& .MuiTab-root': { py: 2, fontWeight: 700, fontSize: '1rem', minWidth: 100 },
          }}
        >
          <Tab label="Kelas X-A" />
          <Tab label="Kelas X-B" />
          <Tab label="Kelas XI-A" />
          <Tab label="Kelas XI-B" />
          <Tab label="Kelas XII-A" />
          <Tab label="Kelas XII-B" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Hari</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Jam Pelajaran</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Mata Pelajaran</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Guru Pengampu</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jadwalData.filter(j => j.kelas === 'X-A').map((row) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                  <TableCell sx={{ fontWeight: 600 }}>{row.hari}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{row.jam}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.mapel}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{row.guru}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <IconButton size="small" color="info" sx={{ bgcolor: 'info.50' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" sx={{ bgcolor: 'error.50' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog Modal */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
        PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}
      >
        <DialogTitle sx={{ fontWeight: '800', borderBottom: '1px solid', borderColor: 'divider', pb: 2, pt: 3, px: 4 }}>
          Tambah Jadwal Baru
          <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 16, top: 16 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField fullWidth select SelectProps={{ native: true }} label="Target Kelas" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              <option value="">Pilih...</option>
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
            </TextField>
            <TextField fullWidth select SelectProps={{ native: true }} label="Hari Pembelajaran" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              <option value="">Pilih...</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Jam Mulai" type="time" InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <TextField fullWidth label="Jam Selesai" type="time" InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            </Box>
            <TextField fullWidth select SelectProps={{ native: true }} label="Mata Pelajaran" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              <option value="">Pilih...</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            </TextField>
            <TextField fullWidth select SelectProps={{ native: true }} label="Guru Pengampu" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              <option value="">Pilih...</option>
              <option value="Dra. Siti Aminah, M.Pd">Dra. Siti Aminah, M.Pd</option>
              <option value="Budi Santoso, S.Pd">Budi Santoso, S.Pd</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1, px: 4 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Batalkan</Button>
          <Button variant="contained" sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>Simpan Jadwal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
