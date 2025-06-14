import Link from 'next/link';
import { notFound } from 'next/navigation';

import { User, Friend } from '@/types';
import fetchFromAPI from '@/utils/fetch-from-api';
import UserPosts from './user-posts';

interface Props {
  params: {
    userId: string;
  };
}

export default async function UserPage({ params }: Props) {
  const { userId } = await params;
  const [friends, users] = await Promise.all([
    fetchFromAPI<Friend[]>(`/friends?userId=${userId}`),
    fetchFromAPI<User[]>(`/users`),
  ]);

  const friendUsers = users.filter((u) =>
    friends.some((f) => f.friendId === u.id)
  );
  const user = users.find((u) => u.id === userId);
  if (!user) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">{user.name}&apos;s Profile</h1>
      <p className="text-gray-600 mb-1">{user.occupation}</p>
      <p className="text-gray-500 mb-4">Planet: {user.planet}</p>
      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="rounded mb-2 max-h-64 object-cover"
        />
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Friends</h2>
      {friendUsers.length === 0 ? (
        <p className="text-gray-500">No friends found.</p>
      ) : (
        <ul className="list-disc list-inside mb-4">
          {friendUsers.map((friend) => (
            <li key={friend.id}>
              <Link href={`/users/${friend.id}`}>{friend.name}</Link>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Posts</h2>
      <UserPosts userId={user.id} />
    </main>
  );
}
