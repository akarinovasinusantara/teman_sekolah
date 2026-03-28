import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
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
import CloseIcon from '@mui/icons-material/Close'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import CustomDialog from '../../../components/common/CustomDialog'

export default function PPDB() {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  
  const [open, setOpen] = useState(false)
  const [ppdb, setPpdb] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [formData, setFormData] = useState({ nama_lengkap: '', asal_sekolah: '', status: 'Baru' })
  const [editingId, setEditingId] = useState(null)
  const [viewData, setViewData] = useState(null)

  const getHeaders = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    return {
      'Content-Type': 'application/json',
      ...(savedUser?.token ? { Authorization: `Bearer ${savedUser.token}` } : {})
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const [listRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/ppdb', { headers: getHeaders() }),
        fetch('http://localhost:5000/api/ppdb/stats', { headers: getHeaders() })
      ])

      if (listRes.status === 401) throw new Error('Sesi kedaluwarsa')
      
      const listData = await listRes.json()
      const statsData = await statsRes.json()

      if (listData.success) setPpdb(listData.data)
      if (statsData.success) setStats(statsData.data)
    } catch (err) {
      setError(err.message || 'Gagal mengambil data dari server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pendaftar ini?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/ppdb/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        })
        const data = await res.json()
        if (data.success) {
          alert('Data berhasil dihapus')
          fetchData()
        } else {
          alert(data.message || 'Gagal menghapus data')
        }
      } catch (err) {
        alert('Terjadi kesalahan saat menghapus data')
      }
    }
  }

  const handleEdit = (row) => {
    setFormData({ nama_lengkap: row.nama_lengkap, asal_sekolah: row.asal_sekolah, status: row.status });
    setEditingId(row.id);
    setOpen(true);
  }

  const handleView = (row) => {
    setViewData(row);
  }

  const handleRegister = async () => {
    if (!formData.nama_lengkap || !formData.asal_sekolah) {
      alert('Mohon lengkapi Nama Lengkap Anak dan Asal Sekolah!');
      return;
    }
    
    try {
      const url = editingId ? `http://localhost:5000/api/ppdb/${editingId}` : 'http://localhost:5000/api/ppdb'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        alert(editingId ? 'Data berhasil diperbarui' : 'Pendaftaran berhasil disimpan')
        fetchData()
        setOpen(false)
        setEditingId(null)
        setFormData({ nama_lengkap: '', asal_sekolah: '', status: 'Baru' })
      } else {
        alert(data.message || 'Gagal menyimpan data')
      }
    } catch (err) {
      alert('Terjadi kesalahan pada server')
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Baru': return { bg: 'info.50', color: 'info.700', border: 'info.200' }
      case 'Proses': return { bg: 'warning.50', color: 'warning.800', border: 'warning.200' }
      case 'Diterima': return { bg: 'success.50', color: 'success.700', border: 'success.200' }
      case 'Ditolak': return { bg: 'error.50', color: 'error.700', border: 'error.200' }
      default: return { bg: 'grey.100', color: 'grey.800', border: 'grey.300' }
    }
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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 3
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" fontWeight="800" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Pendaftaran Peserta Didik Baru (PPDB)
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Pengelolaan calon peserta dari tahap registrasi hingga seleksi akhir
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
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            whiteSpace: 'nowrap'
          }}
        >
          Form Registrasi Baru
        </Button>
        <PersonAddAltIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-10deg)'
        }} />
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Pendaftar Baru', val: ppdb.filter(p => p.status === 'Baru').length, color: '#0288D1' },
          { label: 'Dalam Seleksi', val: ppdb.filter(p => p.status === 'Proses').length, color: '#F57C00' },
          { label: 'Lolos Final', val: ppdb.filter(p => p.status === 'Diterima').length, color: '#388E3C' },
          { label: 'Ditolak/Gugur', val: ppdb.filter(p => p.status === 'Ditolak').length, color: '#D32F2F' }
        ].map((s, i) => (
           <Grid item xs={12} sm={6} md={3} key={i}>
             <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1, borderTop: `4px solid ${s.color}` }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="800" sx={{ color: s.color, mb: 0.5 }}>{loading ? '...' : s.val}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="700">{s.label}</Typography>
              </CardContent>
            </Card>
           </Grid>
        ))}
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
      )}

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', position: 'relative' }}>
        {loading && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight="bold">Memuat Data...</Typography>
          </Box>
        )}
        {/* Toolbar */}
        <Box sx={{ p: { xs: 2.5, md: 3 }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
           <Typography variant="h6" fontWeight="bold" sx={{ mr: 'auto', display: { xs: 'none', lg: 'block' } }}>Database Pendaftar</Typography>
           <TextField 
             size="small" 
             select 
             SelectProps={{ native: true }} 
             label="Filter Status Calon"
             InputLabelProps={{ shrink: true }}
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
             sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
           >
             <option value="">Lihat Semua Status</option>
             <option value="Baru">Baru Terdaftar</option>
             <option value="Proses">Dalam Tahap Seleksi</option>
             <option value="Diterima">Sudah Terdaftar (Diterima)</option>
             <option value="Ditolak">Gagal/Ditolak</option>
           </TextField>
           <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: 2, fontWeight: 600 }}>Cari Lanjut</Button>
        </Box>

        {!isMobile ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'transparent' }}>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>No Registrasi</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nama Lengkap Anak</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Asal Institusi Sebelumnya</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Tanggal Input</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Stage Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Kontrol</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ppdb.filter(p => !filterStatus || p.status === filterStatus).map((row, index) => {
                  const sStyle = getStatusStyle(row.status)
                  return (
                    <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                      <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>{row.no_pendaftaran}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{row.nama_lengkap}</TableCell>
                      <TableCell>{row.asal_sekolah}</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{row.tanggal_daftar}</TableCell>
                      <TableCell align="center">
                         <Box sx={{ 
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          px: 2, py: 0.5, borderRadius: '50px',
                          bgcolor: sStyle.bg, color: sStyle.color, border: '1px solid', borderColor: sStyle.border,
                          fontWeight: 'bold', fontSize: '0.75rem', minWidth: 90
                        }}>
                          {row.status}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          <IconButton size="small" color="primary" sx={{ bgcolor: 'rgba(2, 136, 209, 0.08)' }} onClick={() => handleView(row)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="warning" sx={{ bgcolor: 'rgba(245, 124, 0, 0.08)' }} onClick={() => handleEdit(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(row.id)} size="small" color="error" sx={{ bgcolor: 'error.50' }}><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
           <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ppdb.filter(p => !filterStatus || p.status === filterStatus).map((row) => {
               const sStyle = getStatusStyle(row.status)
               return (
                <Card key={row.id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ pr: 2 }}>{row.nama_lengkap}</Typography>
                      <Box sx={{ 
                          display: 'inline-flex', px: 1, py: 0.25, borderRadius: '50px',
                          bgcolor: sStyle.bg, color: sStyle.color, border: '1px solid', borderColor: sStyle.border,
                          fontWeight: 'bold', fontSize: '0.65rem', whiteSpace: 'nowrap'
                        }}>
                          {row.status}
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>No. Pendaftaran: {row.no_pendaftaran}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Asal Sekolah: {row.asal_sekolah}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Tanggal: {row.tanggal_daftar}</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button onClick={() => handleView(row)} size="small" variant="outlined" sx={{ borderRadius: 2 }}>Detail</Button>
                      <Button onClick={() => handleEdit(row)} size="small" variant="contained" color="info" sx={{ borderRadius: 2, minWidth:0, px:2, color: 'white' }}><EditIcon fontSize="small" /></Button>
                      <Button onClick={() => handleDelete(row.id)} size="small" variant="contained" color="error" sx={{ borderRadius: 2, minWidth:0, px:2 }}><DeleteIcon fontSize="small" /></Button>
                    </Box>
                  </CardContent>
                </Card>
               )
            })}
           </Box>
        )}
      </Paper>

      <CustomDialog 
        open={open} 
        onClose={() => { setOpen(false); setEditingId(null); setFormData({nama_lengkap:'', asal_sekolah:''}); }} 
        maxWidth="md"
        title={editingId ? 'Edit Data Pendaftar PPDB' : 'Pendaftaran Peserta Didik Baru'}
        actions={
          <>
            <Button onClick={() => { setOpen(false); setEditingId(null); setFormData({nama_lengkap:'', asal_sekolah:''}); }} sx={{ fontWeight: 600 }}>Batalkan Pengisian</Button>
            <Button variant="contained" onClick={handleRegister} sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>
              {editingId ? 'Simpan Perubahan' : 'Registrasikan Akun'}
            </Button>
          </>
        }
      >
        <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Informasi Identitas Peserta</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField fullWidth label="Nama Lengkap Anak" required value={formData.nama_lengkap} onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Nomor Induk Siswa Nasional (NISN)" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField fullWidth label="Tempat Lahir" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Tanggal Kelahiran" type="date" InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Jenis Kelamin" select SelectProps={{ native: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              <option value="L">Laki-Laki (Pria)</option>
              <option value="P">Perempuan (Wanita)</option>
            </TextField>
          </Box>
          <TextField fullWidth label="Asal Afiliasi Sekolah Spesifik" required value={formData.asal_sekolah} onChange={(e) => setFormData({ ...formData, asal_sekolah: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        </Box>

        <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>Data Orang Tua & Kontak Darurat</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField fullWidth label="Nama Ayah / Wali Pertama" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Nama Ibu / Wali Kandung" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          </Box>
          <TextField fullWidth label="Nomor Telepon Seluler Aktif (Bisa Di Dihubungi)" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        </Box>
      </CustomDialog>

      {/* Modal View Detail Pendaftar */}
      <CustomDialog
        open={!!viewData}
        onClose={() => setViewData(null)}
        title="Detail Dokumen Pendaftar"
        maxWidth="xs"
        actions={
          <Button variant="contained" onClick={() => setViewData(null)} sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>
            Tutup Lembar
          </Button>
        }
      >
        {viewData && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="700">NOMOR REGISTRASI</Typography>
              <Typography variant="body1" fontWeight="600" color="primary.main">{viewData.no_pendaftaran}</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="700">NAMA LENGKAP ANAK</Typography>
              <Typography variant="body1" fontWeight="800" sx={{ fontSize: '1.1rem' }}>{viewData.nama_lengkap}</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="700">ASAL INSTITUSI SEBELUMNYA</Typography>
              <Typography variant="body1" fontWeight="500">{viewData.asal_sekolah}</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="700">STATUS SELEKSI SAAT INI</Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip 
                  label={viewData.status} 
                  color={viewData.status === 'Baru' ? 'info' : viewData.status === 'Proses' ? 'warning' : viewData.status === 'Diterima' ? 'success' : 'error'} 
                  sx={{ fontWeight: 'bold' }} 
                />
              </Box>
            </Box>
            <Divider />
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight="700">TANGGAL PENDAFTARAN</Typography>
              <Typography variant="body1" fontWeight="500">{viewData.tanggal_daftar}</Typography>
            </Box>
          </Box>
        )}
      </CustomDialog>
    </Box>
  )
}
