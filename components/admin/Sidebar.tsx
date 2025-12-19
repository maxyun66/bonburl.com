'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, Settings, LogOut, FileText, Mail } from 'lucide-react'
import { logoutAction } from '@/app/admin/actions'

const navItems = [
  { name: '概览', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: '产品管理', href: '/admin/dashboard/products', icon: ShoppingBag },
  { name: 'Banner管理', href: '/admin/dashboard/banners', icon: ImageIcon },
  { name: '内容板块', href: '/admin/dashboard/content', icon: FileText },
  { name: '消息列表', href: '/admin/dashboard/messages', icon: Mail },
  { name: '基本设置', href: '/admin/dashboard/settings', icon: Settings },
]

export function Sidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col fixed left-0 top-0 bottom-0">
      <div className="p-6 border-b h-16 flex items-center">
        <h1 className="text-2xl font-bold font-serif tracking-widest">BONBURL</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          const isMessages = item.href === '/admin/dashboard/messages'
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="flex-1">{item.name}</span>
              {isMessages && unreadCount > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-black' : 'bg-red-600 text-white'
                }`}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <form action={logoutAction}>
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            退出登录
          </button>
        </form>
      </div>
    </div>
  )
}
