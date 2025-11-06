import { NextResponse } from 'next/server';
import { BACKEND_BASE_URL, AUTH_REGISTER_PATH } from '@/lib/env';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
      const response = await fetch(`${BACKEND_BASE_URL}${AUTH_REGISTER_PATH}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json({ message: data.message || 'Registration failed' }, { status: response.status });
      }

      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      console.error('Backend API error:', error);
      return NextResponse.json({ message: 'Backend service unavailable' }, { status: 503 });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
