import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, captcha } = body;

    // 1. Verify Captcha
    const cookieStore = await cookies();
    const storedCaptcha = cookieStore.get('captcha')?.value;

    if (!storedCaptcha || !captcha || storedCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // 2. Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Save to database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    // 4. Clear captcha cookie
    cookieStore.delete('captcha');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}