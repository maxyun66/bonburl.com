'use client'

import { useActionState } from 'react'
import { updateSettingsAction } from '@/app/admin/actions'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function SettingsForm({ initialData }: { initialData: any }) {
  const [state, action, isPending] = useActionState(updateSettingsAction, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">网站名称</label>
          <input
            type="text"
            name="siteName"
            defaultValue={initialData.siteName}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">联系邮箱</label>
          <input
            type="email"
            name="email"
            defaultValue={initialData.email || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">联系电话</label>
          <input
            type="text"
            name="phone"
            defaultValue={initialData.phone || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
          <input
            type="text"
            name="whatsapp"
            defaultValue={initialData.whatsapp || ''}
            placeholder="e.g. 628123456789"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Facebook 链接</label>
          <input
            type="url"
            name="facebook"
            defaultValue={initialData.facebook || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instagram 链接</label>
          <input
            type="url"
            name="instagram"
            defaultValue={initialData.instagram || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">TikTok 链接</label>
          <input
            type="url"
            name="tiktok"
            defaultValue={initialData.tiktok || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shopee 链接</label>
          <input
            type="url"
            name="shopee"
            defaultValue={initialData.shopee || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">地址</label>
          <textarea
            name="address"
            rows={3}
            defaultValue={initialData.address || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          {isPending ? '保存中...' : '保存更改'}
        </button>
      </div>
    </form>
  )
}
