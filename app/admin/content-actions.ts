'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function updateContentBlockAction(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const description = formData.get('description') as string
  const link = formData.get('link') as string
  const linkText = formData.get('linkText') as string
  const image = formData.get('image') as File
  const mobileImage = formData.get('mobileImage') as File

  let imageUrl: string | undefined
  let mobileImageUrl: string | undefined

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer())
    const filename = `${Date.now()}-pc-${image.name.replaceAll(' ', '_')}`
    
    // Ensure public/uploads exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await require('fs').promises.mkdir(uploadDir, { recursive: true })
    } catch (e) {}

    await writeFile(path.join(uploadDir, filename), buffer)
    imageUrl = `/uploads/${filename}`
  }

  if (mobileImage && mobileImage.size > 0) {
    const buffer = Buffer.from(await mobileImage.arrayBuffer())
    const filename = `${Date.now()}-mobile-${mobileImage.name.replaceAll(' ', '_')}`
    
    // Ensure public/uploads exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await require('fs').promises.mkdir(uploadDir, { recursive: true })
    } catch (e) {}

    await writeFile(path.join(uploadDir, filename), buffer)
    mobileImageUrl = `/uploads/${filename}`
  }

  await prisma.contentBlock.update({
    where: { id },
    data: {
      title,
      subtitle,
      description,
      link,
      linkText,
      ...(imageUrl && { imageUrl }),
      ...(mobileImageUrl && { mobileImageUrl }),
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/dashboard/content')
  redirect('/admin/dashboard/content')
}
