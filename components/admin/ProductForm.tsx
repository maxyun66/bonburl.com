'use client'

import { useActionState } from 'react'
import { createProductAction, updateProductAction } from '@/app/admin/products-actions'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

interface ProductFormProps {
  initialData?: any
}

export function ProductForm({ initialData }: ProductFormProps) {
  const actionToUse = initialData ? updateProductAction : createProductAction
  const [state, action, isPending] = useActionState(actionToUse, null)

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form action={action} className="space-y-6">
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">产品名称</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={initialData?.name}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">分类</label>
          <select
            name="category"
            defaultValue={initialData?.category || 'Handbag'}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          >
            <option value="Handbag">手提包 (Handbag)</option>
            <option value="Backpack">背包 (Backpack)</option>
            <option value="Wallet">钱包 (Wallet)</option>
            <option value="Accessory">配饰 (Accessory)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">显示价格</label>
          <input
            type="text"
            name="price"
            defaultValue={initialData?.price}
            placeholder="e.g. Rp 1.500.000"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">排序权重 (数字越大越靠前)</label>
          <input
            type="number"
            name="order"
            defaultValue={initialData?.order || 0}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">产品描述</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">购买链接 (Shopee/TikTok)</label>
          <input
            type="url"
            name="purchaseLink"
            defaultValue={initialData?.purchaseLink}
            placeholder="https://..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            {initialData ? '添加更多图片' : '上传图片 (支持多选)'}
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            {initialData ? '新上传的图片将追加到现有图片之后。' : '第一张图片将作为主图。'}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href="/admin/dashboard/products"
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          取消
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isPending ? '保存中...' : '保存产品'}
        </button>
      </div>
    </form>
  )
}
