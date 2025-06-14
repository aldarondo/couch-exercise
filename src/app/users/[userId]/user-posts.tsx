'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Post } from '@/types';

interface Props {
  userId: string;
}

export default function UserPosts({ userId }: Props) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?authorId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPosts();
  }, [userId]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!posts) return <p>Loading posts...</p>;
  if (posts.length === 0)
    return <p className="text-gray-500">No posts by this user.</p>;

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border p-4 rounded shadow">
          <div className="ml-2 text-sm">
            {new Date(post.timestamp).toLocaleString()}
          </div>
          <p className="mb-2">{post.content}</p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post image"
              className="rounded mb-2 max-h-64 object-cover"
            />
          )}
          <Link href={`/posts/${post.id}`} className="text-sm">
            View Post Detail
          </Link>
        </li>
      ))}
    </ul>
  );
}
