import { prisma } from '@/lib/prisma'
import { startOfDay, subDays, format } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const today = startOfDay(new Date())
  const yesterday = startOfDay(subDays(new Date(), 1))

  // 1. Total Visits Today
  const todayVisits = await prisma.visit.count({
    where: { createdAt: { gte: today } }
  })

  // 2. Total Visits Yesterday (for comparison if needed, or just show today)
  // const yesterdayVisits = await prisma.visit.count({
  //   where: { createdAt: { gte: yesterday, lt: today } }
  // })

  // 3. Top Pages Today
  // GroupBy is not fully supported in SQLite with Prisma in the same way, but let's try or do raw query
  // Or just fetch all today and aggregate in JS for simplicity on small scale
  const todayLogs = await prisma.visit.findMany({
    where: { createdAt: { gte: today } },
    select: { path: true }
  })

  const pageViews: Record<string, number> = {}
  todayLogs.forEach(log => {
    pageViews[log.path] = (pageViews[log.path] || 0) + 1
  })

  const topPages = Object.entries(pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">概览</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">系统状态</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">正常运行</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">今日页面浏览量 (PV)</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{todayVisits}</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">今日热门页面</h3>
            <div className="space-y-4">
                {topPages.length === 0 ? (
                    <p className="text-gray-500 text-sm">暂无数据</p>
                ) : (
                    topPages.map(([path, count]) => (
                        <div key={path} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                            <span className="text-gray-600 text-sm font-mono truncate max-w-[80%]">{path}</span>
                            <span className="font-bold text-gray-900">{count}</span>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">快速开始</h2>
            <div className="prose text-gray-600">
            <p>欢迎使用 BONBURL 后台管理系统。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>在 <b>产品管理</b> 中上传新的包袋产品。</li>
                <li>在 <b>Banner管理</b> 中更换首页轮播图。</li>
                <li>在 <b>基本设置</b> 中修改联系方式和社交媒体链接。</li>
            </ul>
            </div>
        </div>
      </div>
    </div>
  )
}
