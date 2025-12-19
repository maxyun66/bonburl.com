import { prisma } from '@/lib/prisma'
import { updateContentBlockAction } from '@/app/admin/content-actions'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function EditContentPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const block = await prisma.contentBlock.findUnique({
    where: { id },
  })

  if (!block) {
    return <div>Content Block not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/dashboard/content"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">编辑: {block.name}</h1>
      </div>

      <form action={updateContentBlockAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <input type="hidden" name="id" value={block.id} />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">标题 (Title)</label>
          <input
            type="text"
            name="title"
            defaultValue={block.title || ''}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">副标题 (Subtitle)</label>
          <input
            type="text"
            name="subtitle"
            defaultValue={block.subtitle || ''}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">描述 (Description)</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={block.description || ''}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">链接 (Link)</label>
            <input
              type="text"
              name="link"
              defaultValue={block.link || ''}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">链接文本 (Button Text)</label>
            <input
              type="text"
              name="linkText"
              defaultValue={block.linkText || ''}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PC Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">电脑端图片 (PC Image)</label>
            {block.imageUrl && (
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                <Image
                  src={block.imageUrl}
                  alt={block.title || 'Block Image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>

          {/* Mobile Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">手机端图片 (Mobile Image - Optional)</label>
            {block.mobileImageUrl ? (
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-2">
                <Image
                  src={block.mobileImageUrl}
                  alt={block.title || 'Block Mobile Image'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
               <div className="w-full aspect-[4/5] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm mb-2">
                 未上传，将使用PC图片
               </div>
            )}
            <input
              type="file"
              name="mobileImage"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={18} />
            保存修改
          </button>
        </div>
      </form>
    </div>
  )
}
