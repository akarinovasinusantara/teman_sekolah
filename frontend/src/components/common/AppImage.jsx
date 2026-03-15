import { useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { getUploadUrl } from '../config/assets'

/**
 * Komponen Image dengan lazy loading dan fallback
 * 
 * @param {string} src - Source image URL
 * @param {string} alt - Alt text untuk aksesibilitas
 * @param {string} fallback - Fallback image jika src error
 * @param {object} sx - MUI sx styles
 * @param {boolean} lazy - Enable lazy loading
 */
export default function AppImage({
  src,
  alt = 'Image',
  fallback = '/images/avatars/default-avatar.png',
  sx = {},
  lazy = true,
  ...props
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const imageSrc = error ? fallback : src

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        ...sx,
      }}
      {...props}
    >
      {/* Loading Skeleton */}
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            ...sx,
          }}
        />
      )}

      {/* Image */}
      <img
        src={imageSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true)
          setLoading(false)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: loading ? 'none' : 'block',
        }}
      />
    </Box>
  )
}

/**
 * Komponen untuk menampilkan foto siswa dari backend upload
 */
export function StudentPhoto({ nis, alt = 'Foto Siswa', size = 80, ...props }) {
  const photoUrl = getUploadUrl(`students/${nis}/photo.jpg`)
  
  return (
    <AppImage
      src={photoUrl}
      alt={alt}
      fallback="/images/avatars/default-avatar.png"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        ...props.sx,
      }}
      {...props}
    />
  )
}

/**
 * Komponen untuk menampilkan foto guru dari backend upload
 */
export function TeacherPhoto({ nip, alt = 'Foto Guru', size = 80, ...props }) {
  const photoUrl = getUploadUrl(`teachers/${nip}/photo.jpg`)
  
  return (
    <AppImage
      src={photoUrl}
      alt={alt}
      fallback="/images/avatars/default-avatar.png"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        ...props.sx,
      }}
      {...props}
    />
  )
}

/**
 * Komponen untuk menampilkan logo sekolah dari backend upload
 */
export function SchoolLogo({ schoolId, alt = 'Logo Sekolah', size = 64, ...props }) {
  const logoUrl = getUploadUrl(`schools/${schoolId}/logo.png`)
  
  return (
    <AppImage
      src={logoUrl}
      alt={alt}
      fallback="/images/logos/default-logo.png"
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        ...props.sx,
      }}
      {...props}
    />
  )
}

/**
 * Komponen Avatar dengan fallback
 */
export function Avatar({ src, alt = 'Avatar', size = 40, fallbackText = '?', ...props }) {
  const [error, setError] = useState(false)
  
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...props.sx,
      }}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setError(true)}
        />
      ) : (
        <span style={{ fontSize: size * 0.4, fontWeight: 'bold' }}>
          {fallbackText}
        </span>
      )}
    </Box>
  )
}
