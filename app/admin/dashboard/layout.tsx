import { Sidebar } from '@/components/admin/Sidebar'
import { prisma } from '@/lib/prisma'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const unreadCount = await prisma.contactMessage.count({
    where: { read: false }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar unreadCount={unreadCount} />
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
