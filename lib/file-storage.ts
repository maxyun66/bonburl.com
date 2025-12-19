import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function saveFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + '-' + file.name.replace(/\s/g, '-')
  const uploadDir = path.join(process.cwd(), 'public/uploads')

  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    // Ignore
  }

  await writeFile(path.join(uploadDir, filename), buffer)
  return `/uploads/${filename}`
}
