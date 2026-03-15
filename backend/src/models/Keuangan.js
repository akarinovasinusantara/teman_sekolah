import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

/**
 * Model Keuangan - Merepresentasikan data keuangan siswa
 * 
 * Digunakan untuk mengelola:
 * - Tagihan SPP bulanan
 * - Uang pangkal, kegiatan, buku
 * - Status pembayaran dan verifikasi
 * - Metode pembayaran (QRIS, VA, Tunai, Transfer)
 * 
 * @typedef {Object} Keuangan
 * @property {UUID} id - ID unik transaksi keuangan (primary key)
 * @property {UUID} siswa_id - ID siswa yang ditagih
 * @property {string} jenis - Jenis tagihan: SPP, Uang_Pangkal, Kegiatan, Buku, Lainnya
 * @property {string} bulan - Bulan tagihan (untuk SPP)
 * @property {number} tahun - Tahun tagihan
 * @property {number} jumlah - Jumlah tagihan dalam Rupiah
 * @property {string} status - Status: 'Belum_Bayar', 'Lunas', 'Dibatalkan'
 * @property {Date} jatuh_tempo - Tanggal jatuh tempo pembayaran
 * @property {Date} tanggal_bayar - Tanggal pembayaran dilakukan
 * @property {string} metode_pembayaran - Metode: 'QRIS', 'VA', 'Tunai', 'Transfer'
 * @property {string} bukti_pembayaran - Path/file bukti pembayaran
 * @property {string} keterangan - Keterangan tambahan
 * @property {UUID} diverifikasi_oleh - ID user yang memverifikasi (TU)
 */
const Keuangan = sequelize.define('Keuangan', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'ID unik transaksi keuangan (UUID)'
  },
  siswa_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'ID siswa yang ditagih (foreign key ke Siswa)'
  },
  jenis: {
    type: DataTypes.ENUM('SPP', 'Uang_Pangkal', 'Kegiatan', 'Buku', 'Lainnya'),
    allowNull: false,
    comment: 'Jenis tagihan: SPP (bulanan), Uang_Pangkal, Kegiatan, Buku, atau Lainnya'
  },
  bulan: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Bulan tagihan (contoh: Januari, Februari) - khusus untuk SPP'
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Tahun tagihan'
  },
  jumlah: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    comment: 'Jumlah tagihan dalam Rupiah'
  },
  status: {
    type: DataTypes.ENUM('Belum_Bayar', 'Lunas', 'Dibatalkan'),
    defaultValue: 'Belum_Bayar',
    comment: 'Status pembayaran: Belum_Bayar, Lunas, atau Dibatalkan'
  },
  jatuh_tempo: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Tanggal jatuh tempo pembayaran'
  },
  tanggal_bayar: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Tanggal pembayaran dilakukan'
  },
  metode_pembayaran: {
    type: DataTypes.ENUM('QRIS', 'VA', 'Tunai', 'Transfer'),
    allowNull: true,
    comment: 'Metode pembayaran: QRIS, Virtual Account (VA), Tunai, atau Transfer'
  },
  bukti_pembayaran: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Path/file bukti pembayaran (foto/screenshoot)'
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Keterangan tambahan tentang transaksi'
  },
  diverifikasi_oleh: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID user (TU) yang memverifikasi pembayaran (foreign key ke User)'
  }
})

export default Keuangan
