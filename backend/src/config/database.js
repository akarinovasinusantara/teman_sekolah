import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * =============================================
 * DATABASE CONFIGURATION
 * =============================================
 * 
 * Konfigurasi koneksi database menggunakan Sequelize ORM
 * 
 * Database yang digunakan: SQLite (file-based)
 * File database: database.sqlite
 * 
 * Environment Variables:
 * - NODE_ENV: development/production
 * - DB_HOST: Host database (untuk production)
 * - DB_PORT: Port database
 * - DB_USER: Username database
 * - DB_PASSWORD: Password database
 * - DB_NAME: Nama database
 */

// Load environment variables dari file .env
dotenv.config()

// Setup __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Konfigurasi Sequelize untuk SQLite
 * 
 * dialect: 'sqlite' - Menggunakan SQLite database
 * storage: Path ke file database.sqlite
 * logging: 
 *   - development: console.log (tampilkan query di console)
 *   - production: false (sembunyikan query untuk performa)
 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false
})

export default sequelize
