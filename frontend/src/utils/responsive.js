// Responsive breakpoints configuration
// Phone: < 900px, Desktop: > 900px

export const BREAKPOINTS = {
  PHONE: 900,
  DESKTOP: 900,
}

// MUI breakpoint helpers
export const responsive = {
  // Usage: sx={{ ...responsive.phone }}
  phone: {
    xs: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  },
  desktop: {
    xs: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  },
}

// Common responsive spacing configurations
export const spacing = {
  // Page container padding
  pagePadding: { xs: 2, sm: 3, md: 4 },
  
  // Card/Paper padding
  cardPadding: { xs: 2, sm: 3 },
  
  // Gap between elements
  gap: { xs: 1, sm: 2, md: 3 },
  
  // Button sizing
  buttonSize: { xs: 'medium', sm: 'large' },
}

// Responsive typography variants
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

// Responsive table configuration
export const tableConfig = {
  // Show/hide columns based on screen size
  columns: {
    always: [], // Always visible
    desktop: [], // Only on desktop
    mobile: [], // Only on mobile
  },
  // Compact mode for mobile
  cellPadding: { xs: '4px', sm: '16px' },
  fontSize: { xs: '0.75rem', sm: '0.875rem' },
}

// Custom hook for responsive state
import { useState, useEffect } from 'react'

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINTS.PHONE)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= BREAKPOINTS.DESKTOP)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      setWidth(newWidth)
      setIsMobile(newWidth < BREAKPOINTS.PHONE)
      setIsDesktop(newWidth >= BREAKPOINTS.DESKTOP)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isMobile, isDesktop, width }
}
