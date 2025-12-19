'use client'
import { useActionState } from 'react'
import { createBannerAction, updateBannerAction } from '@/app/admin/banners-actions'
import Link from 'next/link'

interface BannerFormProps {
  initialData?: any
}

export function BannerForm({ initialData }: BannerFormProps) {
  const actionToUse = initialData ? updateBannerAction : createBannerAction
  const [state, action, isPending] = useActionState(actionToUse, null)

  return (
    <form action={action} className="space-y-6">
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      <div>
        <label className="block text-sm font-medium text-gray-700">标题 (可选)</label>
        <input type="text" name="title" defaultValue={initialData?.title} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">副标题 (可选)</label>
        <input type="text" name="subtitle" defaultValue={initialData?.subtitle} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">跳转链接 (可选)</label>
          <input type="text" name="link" defaultValue={initialData?.link} placeholder="/products/..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">按钮文字 (默认: Discover Collection)</label>
          <input type="text" name="linkText" defaultValue={initialData?.linkText} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">排序权重 (数字越小越靠前)</label>
        <input type="number" name="order" defaultValue={initialData?.order || 0} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">PC端图片 {initialData ? '(可选，不传则保持原图)' : '(必传)'}</label>
        <input type="file" name="image" accept="image/*" required={!initialData} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">移动端图片 (可选)</label>
        <input type="file" name="mobileImage" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100" />
        <p className="mt-1 text-xs text-gray-500">如果不传，移动端将使用PC端图片。</p>
      </div>
      
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

      <div className="flex justify-end gap-3">
        <Link href="/admin/dashboard/banners" className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">取消</Link>
        <button type="submit" disabled={isPending} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50">
          {isPending ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  )
}
