import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { deleteProductAction } from '@/app/admin/products-actions'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { images: true },
    orderBy: [
      { order: 'desc' },
      { createdAt: 'desc' }
    ],
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
        <Link
          href="/admin/dashboard/products/new"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          添加产品
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排序权重</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">图片</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{product.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 relative rounded-md overflow-hidden bg-gray-100">
                    {product.images[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/dashboard/products/${product.id}`}
                      className="text-gray-400 hover:text-black transition-colors"
                    >
                      <Pencil size={18} />
                    </Link>
                    <form action={deleteProductAction}>
                       <input type="hidden" name="id" value={product.id} />
                       <button className="text-gray-400 hover:text-red-600 transition-colors">
                         <Trash2 size={18} />
                       </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                  暂无产品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
