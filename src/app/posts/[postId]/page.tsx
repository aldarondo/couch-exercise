import Link from 'next/link';
import { notFound } from 'next/navigation';

import PostTimestamp from '@/components/post-timestamp/post-timestamp';
import { Post, User } from '@/types';
import fetchFromAPI from '@/utils/fetch-from-api';

interface Props {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: Props) {
  const { postId } = await params;
  const posts = await fetchFromAPI<Post[]>(`/posts`);
  const post = posts.find((p) => p.id === postId);

  if (!post) notFound();

  const users = await fetchFromAPI<User[]>(`/users`);
  const author = users.find((u) => u.id === post.authorId);

  if (!author) notFound();

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Post Detail</h1>

      <div className="border p-4 rounded shadow">
        <PostTimestamp className="mb-2" prefix="Posted on" post={post} />

        <div className="mb-4">
          By <Link href={`/users/${author.id}`}>{author.name}</Link>
        </div>

        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post image"
            className="rounded mb-2 max-h-64 object-cover"
          />
        )}
      </div>
    </main>
  );
}
