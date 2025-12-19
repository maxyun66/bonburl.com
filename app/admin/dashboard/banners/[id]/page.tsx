import { prisma } from '@/lib/prisma'
import { BannerForm } from '@/components/admin/BannerForm'
import { notFound } from 'next/navigation'

export default async function EditBannerPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const banner = await prisma.banner.findUnique({
    where: { id },
  })

  if (!banner) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">编辑 Banner</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <BannerForm initialData={banner} />
      </div>
    </div>
  )
}
