import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Upload to Cloudinary using a stream or directly
    // Since Vercel has limits on request body size, for larger files client-side upload is better.
    // But for simplicity in Admin dashboard, we try server-side upload here.
    
    return new Promise<NextResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { 
                folder: "bonburl", // Optional: organize in a folder
                resource_type: "auto" 
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error)
                    resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }))
                } else {
                    resolve(NextResponse.json({ url: result?.secure_url }))
                }
            }
        ).end(buffer)
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
