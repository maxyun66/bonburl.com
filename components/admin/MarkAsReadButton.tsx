'use client'

import { markAsReadAction } from '@/app/admin/messages-actions'
import { MailOpen } from 'lucide-react'
import { useTransition } from 'react'

export function MarkAsReadButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    
    return (
        <button 
            onClick={() => startTransition(() => markAsReadAction(id))}
            disabled={isPending}
            className={`p-2 transition-colors ${isPending ? 'text-gray-300' : 'text-gray-400 hover:text-blue-600'}`}
            title="Mark as Read"
        >
            <MailOpen size={16} />
        </button>
    )
}
