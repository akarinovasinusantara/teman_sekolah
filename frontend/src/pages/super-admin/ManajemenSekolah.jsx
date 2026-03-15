/**
 * =============================================
 * MANAJEMEN SEKOLAH - SUPER ADMIN
 * =============================================
 * 
 * Komponen: ManajemenSekolah
 * File: /frontend/src/pages/super-admin/ManajemenSekolah.jsx
 * 
 * Deskripsi:
 * Halaman untuk mengelola data sekolah (CRUD).
 * Super Admin dapat menambah, mengedit, dan menghapus data sekolah.
 * 
 * Fitur:
 * - Tampilan tabel (desktop) / card (mobile) untuk daftar sekolah
 * - Tambah sekolah baru via dialog
 * - Edit data sekolah
 * - Hapus sekolah
 * - Status sekolah (Aktif/Non-Aktif)
 * - Responsive design untuk mobile & desktop
 * 
 * Role: Super Admin only
 * Route: /super-admin/sekolah
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
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

/**
 * Data dummy sekolah untuk demo
 * Dalam implementasi nyata, data ini diambil dari API
 * 
 * @constant {Array<Object>}
 * @property {number} id - ID unik sekolah
 * @property {string} nama - Nama sekolah
 * @property {string} npsn - NPSN sekolah
 * @property {string} alamat - Alamat sekolah
 * @property {string} status - Status: Aktif atau Non-Aktif
 */
const dummySekolah = [
  { id: 1, nama: 'SMA Negeri 1 Jakarta', npsn: '10101010', alamat: 'Jakarta Pusat', status: 'Aktif' },
  { id: 2, nama: 'SMP Harapan Bangsa', npsn: '20202020', alamat: 'Jakarta Selatan', status: 'Aktif' },
  { id: 3, nama: 'SMK Merdeka', npsn: '30303030', alamat: 'Jakarta Barat', status: 'Aktif' },
  { id: 4, nama: 'SD Tunas Muda', npsn: '40404040', alamat: 'Jakarta Timur', status: 'Non-Aktif' },
]

/**
 * Komponen Manajemen Sekolah
 * 
 * @component
 * @returns {JSX.Element} Halaman manajemen sekolah
 */
export default function ManajemenSekolah() {
  // Hook untuk responsive design
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  
  // State management
  const [open, setOpen] = useState(false)              // State untuk dialog tambah sekolah
  const [sekolah, setSekolah] = useState(dummySekolah) // State untuk daftar sekolah

  return (
    <Box>
      {/* Header: Judul dan Tombol Tambah */}
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
        {/* Judul halaman */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          Manajemen Sekolah
        </Typography>
        
        {/* Tombol Tambah Sekolah */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          fullWidth={isMobile}
        >
          Tambah Sekolah
        </Button>
      </Box>

      {/* Render berdasarkan device: Desktop (Table) atau Mobile (Card) */}
      {!isMobile ? (
        // Desktop: Table View
        <TableContainer component={Paper}>
          <Table>
            {/* Header tabel */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>No</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Nama Sekolah</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>NPSN</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Alamat</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            
            {/* Body tabel dengan data sekolah */}
            <TableBody>
              {sekolah.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.nama}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.npsn}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.alamat}</TableCell>
                  <TableCell>
                    {/* Badge status dengan warna kondisional */}
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: row.status === 'Aktif' ? 'success.light' : 'error.light',
                        color: row.status === 'Aktif' ? 'success.dark' : 'error.dark',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {/* Tombol aksi: Edit & Delete */}
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" color="primary" aria-label="edit">
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
          {sekolah.map((row, index) => (
            <Card key={row.id} sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: 2 }}>
                {/* Header card: Nama sekolah & status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1, mr: 2 }}>
                    {row.nama}
                  </Typography>
                  {/* Badge status */}
                  <Box
                    component="span"
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      bgcolor: row.status === 'Aktif' ? 'success.light' : 'error.light',
                      color: row.status === 'Aktif' ? 'success.dark' : 'error.dark',
                      fontSize: '0.65rem',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    {row.status}
                  </Box>
                </Box>
                
                {/* Info: NPSN & Alamat */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  NPSN: {row.npsn}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {row.alamat}
                </Typography>
                
                <Divider sx={{ mb: 1.5 }} />
                
                {/* Tombol aksi */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton size="small" color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" aria-label="hapus">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Dialog Tambah Sekolah */}
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
          Tambah Sekolah
        </DialogTitle>
        
        {/* Tombol Close di pojok kanan atas */}
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
        
        {/* Konten dialog dengan form */}
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Nama Sekolah"
              required
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField
              fullWidth
              label="NPSN"
              required
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField
              fullWidth
              label="Alamat"
              multiline
              rows={isMobile ? 4 : 3}
              required
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField
              fullWidth
              select
              SelectProps={{ native: true }}
              label="Status"
              required
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            >
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </TextField>
          </Box>
        </DialogContent>
        
        {/* Footer dialog dengan tombol Batal & Simpan */}
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
          <Button onClick={() => setOpen(false)} color="inherit">
            Batal
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
