import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Generate random math problem
  const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
  const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
  const answer = (num1 + num2).toString();
  const question = `${num1} + ${num2} = ?`;

  const cookieStore = await cookies();
  
  // Store answer in cookie
  cookieStore.set('captcha', answer, {
    httpOnly: true,
    path: '/',
    maxAge: 300, // 5 minutes
  });

  return NextResponse.json({ question });
}