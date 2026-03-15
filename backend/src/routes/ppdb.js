import express from 'express'
import { PPDB, User } from '../models/index.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all PPDB registrations
router.get('/', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const { status, tahun } = req.query
    const where = {}
    
    if (status) where.status = status

    const registrations = await PPDB.findAll({
      where,
      include: [{ model: User, as: 'verifikator', attributes: ['id', 'nama_lengkap'] }],
      order: [['tanggal_daftar', 'DESC']]
    })
    res.json({ success: true, data: registrations })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get registration by ID
router.get('/:id', protect, authorize('super_admin', 'tu'), async (req, res) => {
  try {
    const registration = await PPDB.findByPk(req.params.id, {
      include: [{ model: User, as: 'verifikator' }]
    })
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' })
    }
    res.json({ success: true, data: registration })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create PPDB registration
router.post('/', async (req, res) => {
  try {
    // Generate registration number
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = await PPDB.count() + 1
    const no_pendaftaran = `PPDB${year}${month}${String(count).padStart(4, '0')}`

    const registration = await PPDB.create({
      ...req.body,
      no_pendaftaran
    })
    res.status(201).json({ 
      success: true, 
      message: 'Pendaftaran berhasil dibuat', 
      data: registration 
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update registration (process, accept, reject)
router.put('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const registration = await PPDB.findByPk(req.params.id)
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' })
    }

    // If status changed to Diterima, set acceptance date
    if (req.body.status === 'Diterima' && registration.status !== 'Diterima') {
      req.body.tanggal_diterima = new Date()
      req.body.diverifikasi_oleh = req.user.id
    }
    
    // If status changed to Proses, set process date
    if (req.body.status === 'Proses' && registration.status !== 'Proses') {
      req.body.tanggal_diproses = new Date()
      req.body.diverifikasi_oleh = req.user.id
    }

    await registration.update(req.body)
    res.json({ success: true, message: 'Pendaftaran berhasil diupdate', data: registration })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete registration
router.delete('/:id', protect, authorize('tu'), async (req, res) => {
  try {
    const registration = await PPDB.findByPk(req.params.id)
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' })
    }
    await registration.destroy()
    res.json({ success: true, message: 'Pendaftaran berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
