'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function AnalyticsTrackerContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // We wait a bit to ensure it's not a bounce or rapid navigation? No, just track.
    const track = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            search: searchParams.toString(),
          }),
        })
      } catch (e) {
        // Ignore errors
      }
    }

    track()
  }, [pathname, searchParams])

  return null
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerContent />
    </Suspense>
  )
}