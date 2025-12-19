import { BannerForm } from '@/components/admin/BannerForm'

export default function NewBannerPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">添加 Banner</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <BannerForm />
      </div>
    </div>
  )
}
