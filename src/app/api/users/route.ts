import { NextResponse } from 'next/server';

import users from '@/data/users.json';
import { User } from '@/types';
import querySchema from './zod-schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const result = querySchema.safeParse({ id });

  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters' },
      { status: 400 }
    );
  }

  if (id) {
    const user = (users as User[]).find((u) => u.id === id);
    if (!user) {
      return NextResponse.json(
        { error: `User id ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  }

  return NextResponse.json(users);
}
