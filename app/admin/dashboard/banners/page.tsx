import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Trash2, Pencil } from 'lucide-react'
import Image from 'next/image'
import { deleteBannerAction } from '@/app/admin/banners-actions'

export default async function BannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { order: 'asc' }, // Order by order asc
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Banner 管理</h1>
        <Link
          href="/admin/dashboard/banners/new"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          添加 Banner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group relative">
            <div className="relative aspect-video">
              <Image
                src={banner.imageUrl}
                alt={banner.title || 'Banner'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Link
                   href={`/admin/dashboard/banners/${banner.id}`}
                   className="bg-white/90 p-2 rounded-full text-gray-600 hover:text-black hover:bg-white"
                 >
                   <Pencil size={16} />
                 </Link>
                 <form action={deleteBannerAction}>
                   <input type="hidden" name="id" value={banner.id} />
                   <button className="bg-white/90 p-2 rounded-full text-red-600 hover:bg-red-50">
                     <Trash2 size={16} />
                   </button>
                 </form>
              </div>
            </div>
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{banner.title || '未命名'}</h3>
                <p className="text-xs text-gray-500 truncate">{banner.link || '无链接'}</p>
              </div>
              <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                排序: {banner.order}
              </div>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="col-span-2 py-12 text-center text-gray-500 text-sm bg-white rounded-xl border border-dashed border-gray-300">
            暂无 Banner
          </div>
        )}
      </div>
    </div>
  )
}
