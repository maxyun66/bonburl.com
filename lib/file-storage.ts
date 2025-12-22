import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
// Ensure these environment variables are set in your Vercel project settings
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function saveFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Check if Cloudinary credentials are provided
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    console.warn('Cloudinary environment variables are missing. Falling back to mock URL (images won\'t persist in production).')
    throw new Error('Cloudinary environment variables are missing. Please configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Vercel settings.')
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "bonburl",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(error)
        } else {
          if (!result?.secure_url) {
            reject(new Error('Upload successful but no URL returned'))
            return
          }
          resolve(result.secure_url)
        }
      }
    ).end(buffer)
  })
}

// Generate signature for client-side upload
export function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'bonburl',
    },
    process.env.CLOUDINARY_API_SECRET!
  )
  return { timestamp, signature }
}
