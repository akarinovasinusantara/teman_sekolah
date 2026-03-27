import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CampaignIcon from '@mui/icons-material/Campaign'
import DescriptionIcon from '@mui/icons-material/Description'

const pengumumanData = [
  { id: 1, judul: 'Ujian Tengah Semester', isi: 'UTS akan dilaksanakan pada tanggal 20-25 Maret 2026. Persiapkan diri kalian dengan baik.', kelas: 'X-A', tanggal: '15 Mar 2026, 10:30' },
  { id: 2, judul: 'Pengumpulan Tugas Matematika', isi: 'Tugas halaman 45-50 dikumpulkan paling lambat hari Jumat.', kelas: 'X-A', tanggal: '14 Mar 2026, 14:00' },
  { id: 3, judul: 'Kerja Kelompok', isi: 'Bentuk kelompok terdiri dari 4-5 orang untuk proyek IPA.', kelas: 'X-A', tanggal: '13 Mar 2026, 09:00' },
]

export default function PengumumanKelas() {
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [kelas, setKelas] = useState('X-A')
  const [pengumuman, setPengumuman] = useState(pengumumanData)
  const [sent, setSent] = useState(false)

  const handleKirim = () => {
    if (judul && isi) {
      const baru = {
        id: pengumuman.length + 1,
        judul,
        isi,
        kelas,
        tanggal: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      }
      setPengumuman([baru, ...pengumuman])
      setJudul('')
      setIsi('')
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    }
  }

  const handleHapus = (id) => {
    setPengumuman(pengumuman.filter(p => p.id !== id))
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
            Pusat Pengumuman
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Broadcast informasi dan edaran penting ke kelas secara real-time
          </Typography>
        </Box>
        <CampaignIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-10deg)'
        }} />
      </Box>

      {sent && (
        <Alert severity="success" sx={{ mb: 4, borderRadius: 2, fontWeight: 500 }}>
          Siaran pengumuman berhasil dikirimkan ke Dashboard Siswa dan Orang Tua!
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Form Pembuatan Pengumuman */}
        <Paper elevation={0} sx={{ flex: 1, minWidth: { md: 400 }, p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: 'fit-content' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon color="primary" /> Buat Pengumuman Baru
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Judul Pengumuman"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Jadwal Ujian Tengah Semester"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              select
              SelectProps={{ native: true }}
              label="Distribusi Kelas Tujuan"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <option value="X-A">Kelas X-A</option>
              <option value="X-B">Kelas X-B</option>
              <option value="XI-A">Kelas XI-A</option>
              <option value="XI-B">Kelas XI-B</option>
              <option value="XII-A">Kelas XII-A</option>
              <option value="XII-B">Kelas XII-B</option>
            </TextField>
            <TextField
              fullWidth
              label="Isi Pengumuman Lengkap"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              multiline
              rows={5}
              placeholder="Tulis instruksi atau informasi detail pengumuman di sini..."
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleKirim}
              disabled={!judul || !isi}
              size="large"
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
            >
              Broadcast Pengumuman Sekarang
            </Button>
          </Box>
        </Paper>

        {/* List Riwayat */}
        <Paper elevation={0} sx={{ flex: 1.2, p: 0, borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: { xs: 2.5, md: 3 }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc' }}>
            <Typography variant="h6" fontWeight="bold">
              Log Riwayat Pengumuman
            </Typography>
          </Box>

          <List sx={{ p: 0, maxHeight: 600, overflow: 'auto' }}>
            {pengumuman.length > 0 ? pengumuman.map((item, index) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2.5, md: 3 },
                  borderBottom: index !== pengumuman.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: 'grey.50' }
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" fontWeight="800" color="text.primary">
                      {item.judul}
                    </Typography>
                    <Chip label={item.kelas} size="small" color="primary" sx={{ fontWeight: 'bold', height: 22 }} />
                  </Box>
                  <IconButton edge="end" size="small" color="error" onClick={() => handleHapus(item.id)} sx={{ bgcolor: 'error.50' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {item.isi}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94A3B8' }}>
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" fontWeight="600">
                    Dikirim: {item.tanggal}
                  </Typography>
                </Box>
              </ListItem>
            )) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">Belum ada pengumuman yang dikirim.</Typography>
              </Box>
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}
