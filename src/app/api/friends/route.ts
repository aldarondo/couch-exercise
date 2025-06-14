import { NextResponse } from 'next/server';

import friends from '@/data/friends.json';
import { Friend } from '@/types';
import querySchema from './zod-schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const result = querySchema.safeParse({ userId });

  if (!result.success) {
    return NextResponse.json(
      { error: 'Missing or invalid userId' },
      { status: 400 }
    );
  }

  const allFriends = friends as Friend[];
  const userFriends = allFriends.filter((f) => f.userId === userId);

  if (userFriends.length === 0) {
    return NextResponse.json(
      { error: `No friends found for userId ${userId}` },
      { status: 404 }
    );
  }

  return NextResponse.json(userFriends);
}
