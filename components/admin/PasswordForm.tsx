'use client'

import { useActionState } from 'react'
import { updatePasswordAction } from '@/app/admin/actions'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function PasswordForm() {
  const [state, action, isPending] = useActionState(updatePasswordAction, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      // Optional: Clear form
      const form = document.querySelector('form[action="javascript:void(0);"]') as HTMLFormElement // Hacky, better to use ref
      // But standard reset works on successful submit usually if handled
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form action={action} className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">当前密码</label>
        <input
          type="password"
          name="currentPassword"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">新密码</label>
        <input
          type="password"
          name="newPassword"
          required
          minLength={6}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">确认新密码</label>
        <input
          type="password"
          name="confirmPassword"
          required
          minLength={6}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
        >
          {isPending ? '更新中...' : '修改密码'}
        </button>
      </div>
    </form>
  )
}