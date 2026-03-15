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
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Pengumuman Kelas
      </Typography>

      {sent && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Pengumuman berhasil dikirim!
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Paper sx={{ flex: 1, minWidth: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Buat Pengumuman Baru
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Judul Pengumuman"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Ujian Tengah Semester"
            />
            <TextField
              select
              SelectProps={{ native: true }}
              label="Kelas Tujuan"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            >
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="XI-A">XI-A</option>
              <option value="XI-B">XI-B</option>
              <option value="XII-A">XII-A</option>
              <option value="XII-B">XII-B</option>
            </TextField>
            <TextField
              fullWidth
              label="Isi Pengumuman"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              multiline
              rows={5}
              placeholder="Tulis isi pengumuman di sini..."
            />
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleKirim}
              disabled={!judul || !isi}
              size="large"
            >
              Kirim Pengumuman
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ flex: 1, minWidth: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Riwayat Pengumuman
          </Typography>

          <List sx={{ maxHeight: 500, overflow: 'auto' }}>
            {pengumuman.map((item) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
                sx={{
                  bgcolor: 'grey.50',
                  mb: 1,
                  borderRadius: 1,
                }}
                secondaryAction={
                  <IconButton edge="end" size="small" onClick={() => handleHapus(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {item.judul}
                      </Typography>
                      <Chip label={item.kelas} size="small" color="primary" variant="outlined" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {item.isi}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {item.tanggal}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}
