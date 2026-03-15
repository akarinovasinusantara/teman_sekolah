/**
 * Konfigurasi Asset Paths
 * 
 * Helper untuk mengakses file image dan icon dari public folder
 */

// Base path untuk public assets
export const PUBLIC_PATH = '/'

// Image paths
export const IMAGES = {
  // Logos
  LOGOS: `${PUBLIC_PATH}images/logos`,
  LOGO_SEKOLAH: `${PUBLIC_PATH}images/logos/logo-sekolah.png`,
  LOGO_YAYASAN: `${PUBLIC_PATH}images/logos/logo-yayasan.png`,
  
  // Illustrations
  ILLUSTRATIONS: `${PUBLIC_PATH}images/illustrations`,
  WELCOME: `${PUBLIC_PATH}images/illustrations/welcome.svg`,
  EMPTY_STATE: `${PUBLIC_PATH}images/illustrations/empty-state.svg`,
  ERROR_404: `${PUBLIC_PATH}images/illustrations/404.svg`,
  
  // Avatars
  AVATARS: `${PUBLIC_PATH}images/avatars`,
  DEFAULT_AVATAR: `${PUBLIC_PATH}images/avatars/default-avatar.png`,
  
  // Backgrounds
  BACKGROUNDS: `${PUBLIC_PATH}images/backgrounds`,
  LOGIN_BG: `${PUBLIC_PATH}images/backgrounds/login-bg.jpg`,
  HERO_BG: `${PUBLIC_PATH}images/backgrounds/hero-bg.jpg`,
}

// Icon paths
export const ICONS = {
  // App icons
  APP: `${PUBLIC_PATH}icons/app`,
  FAVICON: `${PUBLIC_PATH}icons/app/favicon.ico`,
  APP_ICON_192: `${PUBLIC_PATH}icons/app/icon-192x192.png`,
  APP_ICON_512: `${PUBLIC_PATH}icons/app/icon-512x512.png`,
  
  // Social icons
  SOCIAL: `${PUBLIC_PATH}icons/social`,
  FACEBOOK: `${PUBLIC_PATH}icons/social/facebook.svg`,
  TWITTER: `${PUBLIC_PATH}icons/social/twitter.svg`,
  INSTAGRAM: `${PUBLIC_PATH}icons/social/instagram.svg`,
  YOUTUBE: `${PUBLIC_PATH}icons/social/youtube.svg`,
}

// Backend upload paths (untuk image yang diupload dari backend)
export const UPLOADS = {
  BASE_URL: 'http://localhost:5000/uploads',
  
  // Student uploads
  STUDENTS: '/uploads/students',
  
  // Teacher uploads
  TEACHERS: '/uploads/teachers',
  
  // School uploads
  SCHOOLS: '/uploads/schools',
  
  // Document uploads
  DOCUMENTS: '/uploads/documents',
  
  // Other uploads
  OTHERS: '/uploads/others',
}

/**
 * Helper function untuk mendapatkan URL dari backend upload
 * @param {string} path - Path relatif dari folder uploads
 * @returns {string} - Full URL ke image
 */
export function getUploadUrl(path) {
  // Hapus slash di awal jika ada
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${UPLOADS.BASE_URL}/${cleanPath}`
}

/**
 * Helper function untuk mendapatkan student photo URL
 * @param {string} nis - NIS siswa
 * @param {string} filename - Nama file foto
 * @returns {string} - Full URL ke foto siswa
 */
export function getStudentPhotoUrl(nis, filename = 'photo.jpg') {
  return getUploadUrl(`students/${nis}/${filename}`)
}

/**
 * Helper function untuk mendapatkan teacher photo URL
 * @param {string} nip - NIP guru
 * @param {string} filename - Nama file foto
 * @returns {string} - Full URL ke foto guru
 */
export function getTeacherPhotoUrl(nip, filename = 'photo.jpg') {
  return getUploadUrl(`teachers/${nip}/${filename}`)
}

/**
 * Helper function untuk mendapatkan school logo URL
 * @param {string|number} schoolId - ID sekolah
 * @param {string} filename - Nama file logo
 * @returns {string} - Full URL ke logo sekolah
 */
export function getSchoolLogoUrl(schoolId, filename = 'logo.png') {
  return getUploadUrl(`schools/${schoolId}/${filename}`)
}

// Export default untuk convenience
export default {
  IMAGES,
  ICONS,
  UPLOADS,
  getUploadUrl,
  getStudentPhotoUrl,
  getTeacherPhotoUrl,
  getSchoolLogoUrl,
}
