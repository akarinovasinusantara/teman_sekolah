import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Keuangan = sequelize.define('Keuangan', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  siswa_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  jenis: {
    type: DataTypes.ENUM('SPP', 'Uang_Pangkal', 'Kegiatan', 'Buku', 'Lainnya'),
    allowNull: false
  },
  bulan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jumlah: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Belum_Bayar', 'Lunas', 'Dibatalkan'),
    defaultValue: 'Belum_Bayar'
  },
  jatuh_tempo: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  tanggal_bayar: {
    type: DataTypes.DATE,
    allowNull: true
  },
  metode_pembayaran: {
    type: DataTypes.ENUM('QRIS', 'VA', 'Tunai', 'Transfer'),
    allowNull: true
  },
  bukti_pembayaran: {
    type: DataTypes.STRING,
    allowNull: true
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diverifikasi_oleh: {
    type: DataTypes.UUID,
    allowNull: true
  }
})

export default Keuangan
