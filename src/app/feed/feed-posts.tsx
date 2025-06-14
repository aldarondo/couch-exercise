'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post, User } from '@/types';

interface Props {
  friendIds: string[];
  users: User[];
}

export default function FeedPosts({ friendIds, users }: Props) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userMap = new Map(users.map((u) => [u.id, u]));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await res.json();
        setPosts(data.filter((post) => friendIds.includes(post.authorId)));
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPosts();
  }, [friendIds]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!posts) return <p>Loading posts...</p>;
  if (posts.length === 0)
    return <p>No posts, maybe get some better friends?</p>;

  return (
    <ul className="space-y-4">
      {posts.map((post) => {
        const author = userMap.get(post.authorId);
        return (
          <li key={post.id} className="border p-4 rounded shadow">
            <div className="mb-2">
              <Link href={`/users/${author?.id}`} className="font-semibold">
                {author?.name}
              </Link>
              <span className="ml-2 text-sm">
                ({new Date(post.timestamp).toLocaleString()})
              </span>
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
        );
      })}
    </ul>
  );
}
