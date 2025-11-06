import { NextResponse } from 'next/server';
import { apiFetch } from '@/lib/api';
import { BACKEND_BASE_URL, AUTH_LOGIN_PATH } from '@/lib/env';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    try {
      const response = await fetch(`${BACKEND_BASE_URL}${AUTH_LOGIN_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json({ message: data.message || 'Invalid credentials' }, { status: response.status });
      }

      // Since we're using the admin login endpoint, if we get a successful response,
      // it means the user is an admin. No need to check isAdmin flag.
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error('Backend API error:', error);
      return NextResponse.json({ message: 'Backend service unavailable' }, { status: 503 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
