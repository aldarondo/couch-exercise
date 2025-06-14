import { NextResponse } from 'next/server';

import posts from '@/data/posts.json';
import { Post } from '@/types';
import querySchema from './zod-schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');

  const result = querySchema.safeParse({ authorId });

  if (!result.success) {
    return NextResponse.json(
      { error: 'Missing or invalid authorId' },
      { status: 400 }
    );
  }

  const allPosts = posts as Post[];

  if (authorId) {
    const filtered = allPosts.filter((p) => p.authorId === authorId);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(allPosts);
}
