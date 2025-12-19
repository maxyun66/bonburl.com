'use server'

import { prisma } from '@/lib/prisma'
import { encrypt, getSession } from '@/lib/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updatePasswordAction(prevState: any, formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: '请填写所有字段' }
  }

  if (newPassword !== confirmPassword) {
    return { error: '两次输入的新密码不一致' }
  }

  try {
    // Verify current user
    const session = await getSession()
    if (!session || !session.user) {
      return { error: '未授权，请重新登录' }
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: '用户不存在' }
    }

    // Verify current password (using plain text for now as per loginAction)
    if (user.password !== currentPassword) {
      return { error: '当前密码错误' }
    }

    // Update password
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { password: newPassword },
    })

    return { success: true, message: '密码修改成功' }
  } catch (error) {
    console.error('Password update error:', error)
    return { error: '修改失败，请重试' }
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: '请输入用户名和密码' }
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { username },
    })

    if (!user || user.password !== password) {
      return { error: '用户名或密码错误' }
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ user: { id: user.id, username: user.username }, expires })

    const cookieStore = await cookies()
    cookieStore.set('session', session, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' })

  } catch (error) {
    console.error('Login error:', error)
    return { error: '登录失败，请重试' }
  }

  redirect('/admin/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/admin/login')
}

export async function updateSettingsAction(prevState: any, formData: FormData) {
  const data = {
    siteName: formData.get('siteName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    whatsapp: formData.get('whatsapp') as string,
    facebook: formData.get('facebook') as string,
    instagram: formData.get('instagram') as string,
    tiktok: formData.get('tiktok') as string,
    shopee: formData.get('shopee') as string,
    address: formData.get('address') as string,
  }

  try {
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    })
    return { success: true, message: '设置已更新' }
  } catch (error) {
    console.error('Settings update error:', error)
    return { success: false, message: '更新失败' }
  }
}

