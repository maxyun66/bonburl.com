'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveFile } from '@/lib/file-storage'

export async function updateContentBlockAction(prevState: any, formData: FormData) {
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

  try {
    if (image && image.size > 0) {
      console.log('Uploading PC image for content block...')
      imageUrl = await saveFile(image)
    }

    if (mobileImage && mobileImage.size > 0) {
      console.log('Uploading Mobile image for content block...')
      mobileImageUrl = await saveFile(mobileImage)
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
  } catch (error) {
    console.error('Update content block error:', error)
    return { error: '更新失败: ' + (error instanceof Error ? error.message : '未知错误') }
  }

  revalidatePath('/')
  revalidatePath('/admin/dashboard/content')
  redirect('/admin/dashboard/content')
}
