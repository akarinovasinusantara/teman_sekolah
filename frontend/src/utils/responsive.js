/**
 * =============================================
 * RESPONSIVE UTILITIES
 * =============================================
 * 
 * File: /frontend/src/utils/responsive.js
 * 
 * Deskripsi:
 * Kumpulan utility functions dan konfigurasi untuk
 * menangani responsive design di aplikasi.
 * 
 * Fitur:
 * - Breakpoints configuration
 * - Responsive helpers untuk MUI
 * - Spacing configurations
 * - Typography responsive variants
 * - Table responsive configuration
 * - Custom hook untuk responsive state
 * 
 * Penggunaan:
 * 
 * // 1. Import konfigurasi breakpoints
 * import { BREAKPOINTS } from '../utils/responsive'
 * 
 * // 2. Import responsive helpers
 * import { responsive, spacing, typography } from '../utils/responsive'
 * 
 * // 3. Gunakan di komponen
 * sx={{
 *   ...responsive.phone,
 *   padding: spacing.pagePadding,
 *   fontSize: typography.h6.fontSize
 * }}
 * 
 * // 4. Gunakan custom hook
 * const { isMobile, isDesktop, width } = useResponsive()
 */

/**
 * Responsive breakpoints configuration
 * 
 * Threshold untuk menentukan device type:
 * - Phone/Mobile: < 900px
 * - Desktop: >= 900px
 * 
 * @constant {Object}
 */
export const BREAKPOINTS = {
  PHONE: 900,
  DESKTOP: 900,
}

/**
 * Material-UI breakpoint helpers
 * 
 * Digunakan untuk mengontrol visibilitas elemen
 * berdasarkan ukuran layar.
 * 
 * @constant {Object}
 * 
 * @example
 * // Tampilkan hanya di mobile
 * sx={{ ...responsive.phone }}
 * 
 * // Tampilkan hanya di desktop
 * sx={{ ...responsive.desktop }}
 */
export const responsive = {
  // Tampilkan di semua ukuran (phone & desktop)
  phone: {
    xs: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  },
  // Tampilkan hanya di desktop (md, lg, xl)
  desktop: {
    xs: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  },
}

/**
 * Common responsive spacing configurations
 * 
 * Konfigurasi spacing yang umum digunakan
 * untuk konsistensi desain di seluruh aplikasi.
 * 
 * @constant {Object}
 * 
 * @example
 * // Page container padding
 * sx={{ p: spacing.pagePadding }}
 * 
 * // Card padding
 * sx={{ p: spacing.cardPadding }}
 * 
 * // Gap between elements
 * sx={{ gap: spacing.gap }}
 */
export const spacing = {
  // Page container padding
  // Mobile: 16px, Tablet: 24px, Desktop: 32px
  pagePadding: { xs: 2, sm: 3, md: 4 },

  // Card/Paper padding
  // Mobile: 16px, Desktop: 24px
  cardPadding: { xs: 2, sm: 3 },

  // Gap between elements
  // Mobile: 8px, Tablet: 16px, Desktop: 24px
  gap: { xs: 1, sm: 2, md: 3 },

  // Button sizing
  // Mobile: medium, Desktop: large
  buttonSize: { xs: 'medium', sm: 'large' },
}

/**
 * Responsive typography variants
 * 
 * Konfigurasi ukuran font untuk heading
 * yang responsif berdasarkan ukuran layar.
 * 
 * @constant {Object}
 * 
 * @example
 * // H4 heading
 * sx={{ ...typography.h4 }}
 * 
 * // H5 heading
 * sx={{ ...typography.h5 }}
 */
export const typography = {
  h4: {
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
    fontWeight: 'bold',
  },
  h5: {
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    fontWeight: 'bold',
  },
  h6: {
    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
    fontWeight: 'bold',
  },
}

/**
 * Responsive table configuration
 * 
 * Konfigurasi untuk tabel responsif:
 * - Show/hide columns berdasarkan screen size
 * - Compact mode untuk mobile
 * - Font size yang menyesuaikan
 * 
 * @constant {Object}
 * 
 * @example
 * // Gunakan di komponen tabel
 * sx={{
 *   '& .MuiTableCell-root': {
 *     p: tableConfig.cellPadding,
 *     fontSize: tableConfig.fontSize
 *   }
 * }}
 */
export const tableConfig = {
  // Show/hide columns based on screen size
  columns: {
    always: [], // Selalu visible di semua device
    desktop: [], // Hanya visible di desktop
    mobile: [],  // Hanya visible di mobile
  },
  // Compact mode untuk mobile
  cellPadding: { xs: '4px', sm: '16px' },
  fontSize: { xs: '0.75rem', sm: '0.875rem' },
}

// ==========================================
// CUSTOM HOOKS
// ==========================================

import { useState, useEffect } from 'react'

/**
 * Custom hook untuk responsive state
 * 
 * Memantau ukuran layar dan menyediakan
 * informasi tentang device type saat ini.
 * 
 * @hook
 * @returns {Object} Responsive state object
 * @returns {boolean} returns.isMobile - true jika lebar < 900px
 * @returns {boolean} returns.isDesktop - true jika lebar >= 900px
 * @returns {number} returns.width - Lebar layar saat ini dalam pixel
 * 
 * @example
 * function MyComponent() {
 *   const { isMobile, isDesktop, width } = useResponsive()
 *   
 *   return (
 *     <div>
 *       {isMobile && <MobileView />}
 *       {isDesktop && <DesktopView />}
 *     </div>
 *   )
 * }
 */
export function useResponsive() {
  // State untuk menyimpan responsive info
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINTS.PHONE)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= BREAKPOINTS.DESKTOP)
  const [width, setWidth] = useState(window.innerWidth)

  // Effect untuk memantau perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      setWidth(newWidth)
      setIsMobile(newWidth < BREAKPOINTS.PHONE)
      setIsDesktop(newWidth >= BREAKPOINTS.DESKTOP)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isMobile, isDesktop, width }
}
