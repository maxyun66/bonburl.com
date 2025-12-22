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
    select: { 
      path: true,
      ip: true,
      source: true
    }
  })

  // Calculate PV (Total logs)
  // todayVisits is already calculated via count() but let's reuse logs if we have them
  // Actually count() is faster if we only needed count, but we need data for aggregation now.
  
  // Calculate UV (Unique IPs)
  const uniqueIPs = new Set(todayLogs.map(log => log.ip).filter(Boolean))
  const todayUV = uniqueIPs.size

  // Top Pages
  const pageViews: Record<string, number> = {}
  todayLogs.forEach(log => {
    const p = log.path || '/'
    pageViews[p] = (pageViews[p] || 0) + 1
  })

  const topPages = Object.entries(pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Top Sources
  const sources: Record<string, number> = {}
  todayLogs.forEach(log => {
    // Default to 'Direct / Unknown' if source is null or 'Internal' if we want to filter it
    let s = log.source || 'Direct'
    if (s === 'Internal') return; // Optionally hide internal navigation
    sources[s] = (sources[s] || 0) + 1
  })

  const topSources = Object.entries(sources)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">概览</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">今日访客数 (UV)</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{todayUV}</p>
          <p className="text-xs text-gray-400 mt-1">独立 IP 数量</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">今日页面浏览量 (PV)</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{todayVisits}</p>
          <p className="text-xs text-gray-400 mt-1">总访问次数</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">系统状态</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">正常运行</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Sources */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">今日流量来源</h3>
            <div className="space-y-4">
                {topSources.length === 0 ? (
                    <p className="text-gray-500 text-sm">暂无外部来源数据</p>
                ) : (
                    topSources.map(([source, count]) => (
                        <div key={source} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
                            <span className="text-gray-600 text-sm truncate max-w-[70%]">{source}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{count}</span>
                              <span className="text-xs text-gray-400 w-8 text-right">
                                {Math.round((count / (todayVisits || 1)) * 100)}%
                              </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

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
      </div>
    </div>
  )
}
