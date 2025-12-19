import { ProductForm } from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">添加新产品</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <ProductForm />
      </div>
    </div>
  )
}
