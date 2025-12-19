import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Edit2 } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: { slug: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">内容板块管理</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500">图片</th>
              <th className="px-6 py-4 font-medium text-gray-500">板块名称</th>
              <th className="px-6 py-4 font-medium text-gray-500">标题</th>
              <th className="px-6 py-4 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {blocks.map((block) => (
              <tr key={block.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="relative w-20 h-12 bg-gray-100 rounded overflow-hidden">
                    {block.imageUrl ? (
                      <Image
                        src={block.imageUrl}
                        alt={block.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full text-xs text-gray-400">无图</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{block.name}</span>
                  <p className="text-xs text-gray-500">{block.slug}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{block.title || '-'}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/dashboard/content/${block.id}`}
                    className="inline-flex items-center gap-1 text-black hover:text-gray-600 font-medium"
                  >
                    <Edit2 size={16} />
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
            {blocks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  暂无内容板块（请运行 Seed 脚本初始化）
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
