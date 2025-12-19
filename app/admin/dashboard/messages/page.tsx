import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { deleteMessageAction, deleteAllMessagesAction } from '@/app/admin/messages-actions'
import { Trash2 } from 'lucide-react'
import { MarkAsReadButton } from '@/components/admin/MarkAsReadButton'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">消息列表</h1>
        {messages.length > 0 && (
            <form action={deleteAllMessagesAction}>
                <button 
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="清空所有消息"
                >
                    <Trash2 size={16} />
                    清空所有消息
                </button>
            </form>
        )}
      </div>
      
      <div className="bg-white border border-gray-100 overflow-hidden rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
              <th className="p-4 font-medium w-4"></th>
              <th className="p-4 font-medium">日期</th>
              <th className="p-4 font-medium">姓名</th>
              <th className="p-4 font-medium">邮箱</th>
              <th className="p-4 font-medium">留言内容</th>
              <th className="p-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-gray-500 text-sm">
                  暂无消息
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id} className={`hover:bg-gray-50/50 transition-colors group ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                  <td className="p-4 align-top">
                    {!msg.read && <div className="w-2 h-2 rounded-full bg-red-500 mt-2" title="未读"></div>}
                  </td>
                  <td className={`p-4 text-sm whitespace-nowrap align-top w-48 ${!msg.read ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {format(new Date(msg.createdAt), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td className={`p-4 text-sm whitespace-nowrap align-top w-48 ${!msg.read ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
                    {msg.name}
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap align-top w-64">
                    <a href={`mailto:${msg.email}`} className="hover:text-black underline decoration-gray-300 hover:decoration-black underline-offset-4">
                        {msg.email}
                    </a>
                  </td>
                  <td className={`p-4 text-sm text-gray-600 align-top ${!msg.read ? 'font-medium' : ''}`}>
                    <div className="max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 whitespace-pre-line">
                        {msg.message}
                    </div>
                  </td>
                  <td className="p-4 text-sm align-top text-right">
                    <div className="flex justify-end gap-2">
                        {!msg.read && (
                            <MarkAsReadButton id={msg.id} />
                        )}
                        <form action={deleteMessageAction}>
                            <input type="hidden" name="id" value={msg.id} />
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="删除">
                                <Trash2 size={16} />
                            </button>
                        </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
