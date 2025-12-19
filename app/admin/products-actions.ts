'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { saveFile } from '@/lib/file-storage'

export async function createProductAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const category = formData.get('category') as string
  const purchaseLink = formData.get('purchaseLink') as string
  const order = parseInt(formData.get('order') as string || '0')
  
  // Handle files
  const imageFiles = formData.getAll('images') as File[]
  const imageUrls: string[] = []

  for (const file of imageFiles) {
    if (file.size > 0) {
      const url = await saveFile(file)
      imageUrls.push(url)
    }
  }

  if (!name || !category) {
    return { error: '名称和分类必填' }
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        purchaseLink,
        order,
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            isMain: index === 0,
          })),
        },
      },
    })
  } catch (error) {
    console.error('Create product error:', error)
    return { error: '创建失败' }
  }

  revalidatePath('/admin/dashboard/products')
  redirect('/admin/dashboard/products')
}

export async function updateProductAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const category = formData.get('category') as string
  const purchaseLink = formData.get('purchaseLink') as string
  const order = parseInt(formData.get('order') as string || '0')

  if (!id || !name || !category) {
    return { error: 'ID, Name, and Category are required' }
  }

  // Handle new files
  const imageFiles = formData.getAll('images') as File[]
  const newImageUrls: string[] = []

  for (const file of imageFiles) {
    if (file.size > 0) {
      const url = await saveFile(file)
      newImageUrls.push(url)
    }
  }

  try {
    // 1. Update basic info
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        category,
        purchaseLink,
        order,
      },
    })

    // 2. Add new images if any
    if (newImageUrls.length > 0) {
      // Get current max count or just add?
      // Since we want to append, we just create them.
      // But we need to know if we should mark one as main?
      // If there are no images, the first new one is main.
      const existingCount = await prisma.productImage.count({ where: { productId: id } })
      
      await prisma.productImage.createMany({
        data: newImageUrls.map((url, index) => ({
          productId: id,
          url,
          isMain: existingCount === 0 && index === 0,
        })),
      })
    }

  } catch (error) {
    console.error('Update product error:', error)
    return { error: 'Update failed' }
  }

  revalidatePath('/admin/dashboard/products')
  redirect('/admin/dashboard/products')
}

export async function deleteProductAction(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return

  try {
    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/dashboard/products')
  } catch (error) {
    console.error('Delete product error:', error)
  }
}
