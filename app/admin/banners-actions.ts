'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveFile } from '@/lib/file-storage'

export async function createBannerAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const link = formData.get('link') as string
  const linkText = formData.get('linkText') as string
  const order = parseInt(formData.get('order') as string || '0')
  const imageFile = formData.get('image') as File
  const mobileImageFile = formData.get('mobileImage') as File

  if (!imageFile || imageFile.size === 0) {
    return { error: 'PC端图片必传' }
  }

  const imageUrl = await saveFile(imageFile)
  let mobileImageUrl = null
  if (mobileImageFile && mobileImageFile.size > 0) {
    mobileImageUrl = await saveFile(mobileImageFile)
  }

  try {
    await prisma.banner.create({
      data: {
        title,
        subtitle,
        link,
        linkText: linkText || "Discover Collection",
        order,
        imageUrl,
        mobileImageUrl,
        active: true,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: '创建失败' }
  }

  revalidatePath('/admin/dashboard/banners')
  redirect('/admin/dashboard/banners')
}

export async function updateBannerAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const link = formData.get('link') as string
  const linkText = formData.get('linkText') as string
  const order = parseInt(formData.get('order') as string || '0')
  const imageFile = formData.get('image') as File
  const mobileImageFile = formData.get('mobileImage') as File

  if (!id) return { error: 'ID is required' }

  let imageUrl = undefined
  let mobileImageUrl = undefined

  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveFile(imageFile)
  }

  if (mobileImageFile && mobileImageFile.size > 0) {
    mobileImageUrl = await saveFile(mobileImageFile)
  }

  try {
    await prisma.banner.update({
      where: { id },
      data: {
        title,
        subtitle,
        link,
        linkText,
        order,
        ...(imageUrl && { imageUrl }),
        ...(mobileImageUrl && { mobileImageUrl }),
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Update failed' }
  }

  revalidatePath('/admin/dashboard/banners')
  redirect('/admin/dashboard/banners')
}

export async function deleteBannerAction(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return
  try {
    await prisma.banner.delete({ where: { id } })
    revalidatePath('/admin/dashboard/banners')
  } catch (error) {
    console.error(error)
  }
}
