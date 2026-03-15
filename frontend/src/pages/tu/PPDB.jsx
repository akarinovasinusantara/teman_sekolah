import { useState } from 'react'
import Grid from '@mui/material/Grid'
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
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const pendaftarBaru = [
  { id: 'PPDB001', nama: 'Ahmad Rizky', asal_sekolah: 'SMP Negeri 1', tanggal: '01 Mar 2026', status: 'Baru' },
  { id: 'PPDB002', nama: 'Siti Nurhaliza', asal_sekolah: 'SMP Negeri 2', tanggal: '02 Mar 2026', status: 'Baru' },
  { id: 'PPDB003', nama: 'Budi Pratama', asal_sekolah: 'MTs Al-Hidayah', tanggal: '03 Mar 2026', status: 'Proses' },
  { id: 'PPDB004', nama: 'Dewi Lestari', asal_sekolah: 'SMP Negeri 3', tanggal: '05 Mar 2026', status: 'Baru' },
]

const pendaftarDiterima = [
  { id: 'PPDB005', nama: 'Fatimah Azzahra', asal_sekolah: 'SMP Negeri 4', tanggal: '15 Feb 2026', status: 'Diterima' },
  { id: 'PPDB006', nama: 'Muhammad Fikri', asal_sekolah: 'SMP Negeri 5', tanggal: '16 Feb 2026', status: 'Diterima' },
]

export default function PPDB() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [tabValue, setTabValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedPendaftar, setSelectedPendaftar] = useState(null)

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
          PPDB - Pendaftaran Peserta Didik Baru
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          fullWidth={isMobile}
        >
          Tambah Pendaftar
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
          <Tab label={`Pendaftar Baru (${pendaftarBaru.length})`} />
          <Tab label={`Diproses`} />
          <Tab label={`Diterima (${pendaftarDiterima.length})`} />
          <Tab label={`Ditolak`} />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No. Pendaftaran</TableCell>
                <TableCell>Nama Lengkap</TableCell>
                <TableCell>Asal Sekolah</TableCell>
                <TableCell>Tanggal Daftar</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tabValue === 0 ? pendaftarBaru : tabValue === 2 ? pendaftarDiterima : []}
              {tabValue === 0 && pendaftarBaru.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.asal_sekolah}</TableCell>
                  <TableCell>{row.tanggal}</TableCell>
                  <TableCell>
                    <Box component="span" sx={{ px: 1.5, py: 0.5, borderRadius: 1, bgcolor: 'info.light', color: 'info.dark', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={() => { setSelectedPendaftar(row); setOpen(true) }}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="success">
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {tabValue === 2 && pendaftarDiterima.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.asal_sekolah}</TableCell>
                  <TableCell>{row.tanggal}</TableCell>
                  <TableCell>
                    <Box component="span" sx={{ px: 1.5, py: 0.5, borderRadius: 1, bgcolor: 'success.light', color: 'success.dark', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={() => { setSelectedPendaftar(row); setOpen(true) }}>
                      <VisibilityIcon />
                    </IconButton>
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
        maxWidth="md" 
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
          Detail Pendaftar - {selectedPendaftar?.id}
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
          <VisibilityIcon />
        </IconButton>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="No. Pendaftaran" 
                defaultValue={selectedPendaftar?.id} 
                disabled
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="Tanggal Daftar" 
                defaultValue={selectedPendaftar?.tanggal} 
                disabled
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth 
                label="Nama Lengkap" 
                defaultValue={selectedPendaftar?.nama} 
                disabled
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth 
                label="Asal Sekolah" 
                defaultValue={selectedPendaftar?.asal_sekolah} 
                disabled
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth 
                label="Alamat" 
                multiline 
                rows={isMobile ? 3 : 2}
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="Nama Orang Tua"
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="No. Telepon"
                sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
              />
            </Grid>
          </Grid>
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
          <Button onClick={() => setOpen(false)}>Tutup</Button>
          <Button variant="contained" color="success">Terima</Button>
          <Button variant="contained" color="error">Tolak</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
