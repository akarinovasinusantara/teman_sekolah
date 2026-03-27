/**
 * =============================================
 * CUSTOM BUTTON COMPONENTS
 * =============================================
 * 
 * Komponen: PrimaryButton, SecondaryButton, TertiaryButton, HeaderActionButton
 * File: /frontend/src/components/common/Button.jsx
 * 
 * Deskripsi:
 * Kumpulan komponen tombol (Button) yang distandardisasi agar memiliki 
 * UI dan interaksi (hover, click) yang konsisten di seluruh aplikasi Teman Sekolah.
 * Menggunakan skema warna premium Siswa Blue (#1565C0).
 */

import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// ============================================
// 1. PRIMARY BUTTON (Aksi Utama)
// ============================================
// Digunakan untuk aksi paling penting (Submit form, Simpan Data, dll)
export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1565C0',
  color: '#ffffff',
  fontWeight: '700',
  borderRadius: '8px',
  padding: '8px 24px',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(21, 101, 192, 0.25)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#0D47A1',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(21, 101, 192, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&.Mui-disabled': {
    backgroundColor: '#E2E8F0',
    color: '#94A3B8',
    boxShadow: 'none',
  }
}))

// ============================================
// 2. SECONDARY BUTTON (Aksi Alternatif)
// ============================================
// Digunakan untuk aksi sekunder (Batal, Filter, Detail, dll)
export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#1565C0',
  border: '1px solid #1565C0',
  fontWeight: '600',
  borderRadius: '8px',
  padding: '7px 23px', // 1px kurang dari primary karena ada border
  textTransform: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(21, 101, 192, 0.08)',
    borderColor: '#0D47A1',
    color: '#0D47A1',
  },
  '&.Mui-disabled': {
    borderColor: '#E2E8F0',
    color: '#94A3B8',
  }
}))

// ============================================
// 3. TERTIARY BUTTON (Text / Ghost Button)
// ============================================
// Digunakan untuk aksi ringan (Kembali, Hapus opsional, Link teks)
export const TertiaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#64748B', // Default slate-500
  fontWeight: '600',
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#F1F5F9', // Slate-100
    color: '#0F172A', // Slate-900
  },
  '&.Mui-disabled': {
    color: '#CBD5E1',
  }
}))

// ============================================
// 4. HEADER ACTION BUTTON (Tombol Spesial Header)
// ============================================
// Digunakan khusus di dalam Gradient Header biru yang gelap
export const HeaderActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#1565C0',
  fontWeight: '800',
  borderRadius: '8px',
  padding: '8px 24px',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#F8FAFC', // Slate-50
    color: '#0D47A1',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}))

// Komponen Pembungkus Default (Pilihan Opsional dengan prop `variant`)
export default function CustomButton({ variant = 'primary', children, ...props }) {
  if (variant === 'primary') return <PrimaryButton {...props}>{children}</PrimaryButton>
  if (variant === 'secondary') return <SecondaryButton {...props}>{children}</SecondaryButton>
  if (variant === 'tertiary') return <TertiaryButton {...props}>{children}</TertiaryButton>
  if (variant === 'header') return <HeaderActionButton {...props}>{children}</HeaderActionButton>
  
  return <PrimaryButton {...props}>{children}</PrimaryButton>
}
