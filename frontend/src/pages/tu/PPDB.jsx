/**
 * =============================================
 * PPDB - TATA USAHA
 * =============================================
 * 
 * Komponen: PPDB
 * File: /frontend/src/pages/tu/PPDB.jsx
 * 
 * Deskripsi:
 * Halaman untuk mengelola Pendaftaran Peserta Didik Baru (PPDB).
 * TU dapat melihat, memverifikasi, dan mengubah status pendaftaran.
 * 
 * Fitur:
 * - Daftar pendaftar dengan status (Baru, Proses, Diterima, Ditolak)
 * - Detail pendaftaran
 * - Update status pendaftaran
 * - Filter berdasarkan status
 * - Export data pendaftaran
 * 
 * Role: TU (Tata Usaha)
 * Route: /tu/ppdb
 */

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
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

/**
 * Data dummy pendaftaran PPDB
 * 
 * @constant {Array<Object>}
 */
const dummyPPDB = [
  { 
    id: 1, 
    no_pendaftaran: 'PPDB2026010001', 
    nama_lengkap: 'Ahmad Rizky', 
    asal_sekolah: 'SMP Negeri 1', 
    status: 'Baru',
    tanggal_daftar: '2026-03-01'
  },
  { 
    id: 2, 
    no_pendaftaran: 'PPDB2026010002', 
    nama_lengkap: 'Siti Nurhaliza', 
    asal_sekolah: 'SMP Negeri 2', 
    status: 'Proses',
    tanggal_daftar: '2026-03-02'
  },
  { 
    id: 3, 
    no_pendaftaran: 'PPDB2026010003', 
    nama_lengkap: 'Budi Santoso', 
    asal_sekolah: 'SMP Negeri 3', 
    status: 'Diterima',
    tanggal_daftar: '2026-03-03'
  },
  { 
    id: 4, 
    no_pendaftaran: 'PPDB2026010004', 
    nama_lengkap: 'Dewi Lestari', 
    asal_sekolah: 'SMP Negeri 4', 
    status: 'Ditolak',
    tanggal_daftar: '2026-03-04'
  },
]

/**
 * Komponen PPDB
 * 
 * @component
 * @returns {JSX.Element} Halaman pengelolaan PPDB
 */
export default function PPDB() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  
  // State management
  const [open, setOpen] = useState(false)
  const [ppdb, setPpdb] = useState(dummyPPDB)
  const [filterStatus, setFilterStatus] = useState('')

  /**
   * Mendapatkan warna chip berdasarkan status
   * 
   * @param {string} status - Status pendaftaran
   * @returns {Object} Warna chip
   */
  const getStatusChipColor = (status) => {
    switch (status) {
      case 'Baru':
        return { color: 'info', bgcolor: 'info.light', text: 'info.dark' }
      case 'Proses':
        return { color: 'warning', bgcolor: 'warning.light', text: 'warning.dark' }
      case 'Diterima':
        return { color: 'success', bgcolor: 'success.light', text: 'success.dark' }
      case 'Ditolak':
        return { color: 'error', bgcolor: 'error.light', text: 'error.dark' }
      default:
        return { color: 'default', bgcolor: 'grey.200', text: 'grey.800' }
    }
  }

  return (
    <Box>
      {/* Header: Judul dan Filter */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          PPDB - Pendaftaran Siswa Baru
        </Typography>
        
        {/* Filter dan Tombol */}
        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter Status</InputLabel>
            <Select
              value={filterStatus}
              label="Filter Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="">Semua</MenuItem>
              <MenuItem value="Baru">Baru</MenuItem>
              <MenuItem value="Proses">Proses</MenuItem>
              <MenuItem value="Diterima">Diterima</MenuItem>
              <MenuItem value="Ditolak">Ditolak</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            fullWidth={isMobile}
          >
            Tambah Pendaftar
          </Button>
        </Box>
      </Box>

      {/* Statistik Pendaftaran */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main" fontWeight="bold">
              {ppdb.filter(p => p.status === 'Baru').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pendaftaran Baru
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {ppdb.filter(p => p.status === 'Proses').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dalam Proses
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {ppdb.filter(p => p.status === 'Diterima').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Diterima
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {ppdb.filter(p => p.status === 'Ditolak').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ditolak
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabel/Card Daftar Pendaftar */}
      {!isMobile ? (
        // Desktop: Table View
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>No</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>No. Pendaftaran</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Nama Lengkap</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Asal Sekolah</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Tanggal Daftar</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ppdb
                .filter(p => !filterStatus || p.status === filterStatus)
                .map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.no_pendaftaran}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.nama_lengkap}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.asal_sekolah}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.tanggal_daftar}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusChipColor(row.status).bgcolor,
                        color: getStatusChipColor(row.status).text,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" color="primary" aria-label="lihat">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton size="small" color="info" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error" aria-label="hapus">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Mobile: Card View
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ppdb
            .filter(p => !filterStatus || p.status === filterStatus)
            .map((row, index) => (
            <Card key={row.id} sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1, mr: 2 }}>
                    {row.nama_lengkap}
                  </Typography>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusChipColor(row.status).bgcolor,
                      color: getStatusChipColor(row.status).text,
                      fontWeight: 'bold',
                      fontSize: '0.65rem',
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  No. Pendaftaran: {row.no_pendaftaran}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Asal Sekolah: {row.asal_sekolah}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Tanggal Daftar: {row.tanggal_daftar}
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton size="small" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" color="info">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Dialog Tambah Pendaftar */}
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
          Tambah Pendaftar Baru
        </DialogTitle>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField fullWidth label="Nama Lengkap" required />
            <TextField fullWidth label="NISN" />
            <TextField fullWidth label="Tempat Lahir" />
            <TextField fullWidth label="Tanggal Lahir" type="date" InputLabelProps={{ shrink: true }} />
            <FormControl fullWidth>
              <InputLabel>Jenis Kelamin</InputLabel>
              <Select label="Jenis Kelamin">
                <MenuItem value="L">Laki-laki</MenuItem>
                <MenuItem value="P">Perempuan</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Asal Sekolah" required />
            <TextField fullWidth label="Nama Ayah" />
            <TextField fullWidth label="Nama Ibu" />
            <TextField fullWidth label="No. Telepon" />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: isMobile ? 2 : 3,
            flexDirection: isMobile ? 'column-reverse' : 'row',
            gap: 1,
          }}
        >
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained">Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
