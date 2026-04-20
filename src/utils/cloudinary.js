// Optimize Cloudinary image URLs automatically
export const optimizeImage = (url, options = {}) => {
  if (!url || !url.includes('cloudinary')) return url

  const {
    width = 800,
    quality = 'auto',
    format = 'auto'
  } = options

  // Insert transformation after /upload/
  return url.replace(
    '/upload/',
    `/upload/w_${width},q_${quality},f_${format}/`
  )
}

// Thumbnail version (for product cards and grids)
export const thumbnailImage = (url) => optimizeImage(url, {
  width: 400,
  quality: 'auto',
  format: 'auto'
})

// Full size version (for product detail main image)
export const fullImage = (url) => optimizeImage(url, {
  width: 1200,
  quality: 'auto',
  format: 'auto'
})

// Medium version (for product detail thumbnails)
export const mediumImage = (url) => optimizeImage(url, {
  width: 600,
  quality: 'auto',
  format: 'auto'
})