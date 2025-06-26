import { NextResponse } from 'next/server';
import User from '@/models/UserSchema';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/utils/ConnectToDB';

import jwt from "jsonwebtoken";
import isEmail from 'validator/lib/isEmail';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    if (!isEmail(email)){
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'JWT secret is not configured.' }, { status: 500 });
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Password is incorrect' }, { status: 401 });
    }

    // Sign JWT with role and service
    const token = jwt.sign(
      { id: user._id, role: user.role, service: user.service },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        service: user.service,
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      path: '/',
    });

    return response;

  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
