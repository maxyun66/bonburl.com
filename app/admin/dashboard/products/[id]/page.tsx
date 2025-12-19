import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">编辑产品</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <ProductForm initialData={product} />
      </div>
    </div>
  )
}
