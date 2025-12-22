import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, userAgent, search } = body;
    
    // Simple session tracking via cookie
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('analytics_session')?.value;
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      // Set cookie using cookieStore in Next.js 15/App Router
      // Note: In a Server Action or Route Handler, setting cookies this way works
      (await cookies()).set('analytics_session', sessionId, {
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
      });
    }

    // Get IP (approximate)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Parse UTM and Source
    const searchParams = new URLSearchParams(search || '');
    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    
    let source = 'Direct';
    let cleanReferrer = referrer || '';

    // 1. Check UTM first (Strongest signal)
    if (utmSource) {
      source = utmSource;
      if (utmSource.toLowerCase() === 'qr') source = 'QR Scan'; // Common convention
    } 
    // 2. Check Referrer
    else if (cleanReferrer) {
      try {
        const refUrl = new URL(cleanReferrer);
        const refHost = refUrl.hostname.toLowerCase();
        const currentHost = req.headers.get('host')?.split(':')[0].toLowerCase() || '';

        if (refHost.includes(currentHost)) {
          source = 'Internal';
        } else if (refHost.includes('google.')) {
          source = 'Google Search';
        } else if (refHost.includes('bing.') || refHost.includes('bing.com')) {
          source = 'Bing Search';
        } else if (refHost.includes('baidu.')) {
          source = 'Baidu Search';
        } else if (refHost.includes('facebook.') || refHost.includes('fb.com')) {
          source = 'Facebook';
        } else if (refHost.includes('instagram.')) {
          source = 'Instagram';
        } else if (refHost.includes('twitter.') || refHost.includes('x.com')) {
          source = 'Twitter/X';
        } else if (refHost.includes('tiktok.')) {
          source = 'TikTok';
        } else if (refHost.includes('youtube.')) {
          source = 'YouTube';
        } else {
          source = refHost; // Other websites
        }
      } catch (e) {
        // Invalid URL, keep as is or treat as Direct
      }
    }

    await prisma.visit.create({
      data: {
        path,
        userAgent: userAgent || req.headers.get('user-agent'),
        ip: ip.split(',')[0],
        referrer: cleanReferrer,
        source,
        utmSource,
        utmMedium,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
