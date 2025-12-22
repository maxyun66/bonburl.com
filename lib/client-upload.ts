export async function uploadToCloudinary(file: File) {
  // 1. Get signature from server
  const signRes = await fetch('/api/cloudinary/sign')
  if (!signRes.ok) throw new Error('Failed to get upload signature')
  const { signature, timestamp, cloudName, apiKey } = await signRes.json()

  // 2. Upload directly to Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)
  formData.append('folder', 'bonburl')

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!uploadRes.ok) {
    const error = await uploadRes.json()
    throw new Error(error.message || 'Upload failed')
  }

  const data = await uploadRes.json()
  return data.secure_url as string
}
