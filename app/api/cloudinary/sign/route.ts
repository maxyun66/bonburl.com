import { NextResponse } from 'next/server'
import { getSignature } from '@/lib/file-storage'

export async function GET() {
  try {
    const { timestamp, signature } = getSignature()
    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 })
  }
}
