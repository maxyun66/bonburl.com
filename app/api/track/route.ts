import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, referrer, userAgent } = body;
    
    // Simple session tracking via cookie
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('analytics_session')?.value;
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookieStore.set('analytics_session', sessionId, {
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
      });
    }

    // Get IP (approximate)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    await prisma.visit.create({
      data: {
        path,
        userAgent: userAgent || req.headers.get('user-agent'),
        ip: ip.split(',')[0], // Take first IP if multiple
        // In a real app, we would resolve city/country here using a GeoIP library
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}