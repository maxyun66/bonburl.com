'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function markAsReadAction(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  })
  revalidatePath('/admin/dashboard', 'layout')
}

export async function deleteMessageAction(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return

  try {
    await prisma.contactMessage.delete({
        where: { id }
    })
    revalidatePath('/admin/dashboard', 'layout')
  } catch (e) {
    console.error(e)
  }
}

export async function deleteAllMessagesAction() {
  try {
    await prisma.contactMessage.deleteMany({})
    revalidatePath('/admin/dashboard', 'layout')
  } catch (e) {
    console.error(e)
  }
}
