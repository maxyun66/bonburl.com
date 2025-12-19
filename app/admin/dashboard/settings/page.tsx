import { prisma } from '@/lib/prisma'
import { SettingsForm } from '@/components/admin/SettingsForm'
import { PasswordForm } from '@/components/admin/PasswordForm'

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst() || {
    siteName: 'BONBURL',
    email: '',
    phone: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    shopee: '',
    address: '',
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">基本设置</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <SettingsForm initialData={settings} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">安全设置</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">修改管理员密码</h2>
          <PasswordForm />
        </div>
      </div>
    </div>
  )
}
