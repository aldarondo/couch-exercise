import { Friend, User } from '@/types';
import fetchFromAPI from '@/utils/fetch-from-api';
import FeedPosts from './feed-posts';

const CURRENT_USER_ID = '1'; // TODO: Replace with actual user ID logic

export default async function FeedPage() {
  const [friends, users] = await Promise.all([
    fetchFromAPI<Friend[]>(`/friends?userId=${CURRENT_USER_ID}`),
    fetchFromAPI<User[]>(`/users`),
  ]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Friend Feed</h1>
      </header>

      <FeedPosts friendIds={friends.map((f) => f.friendId)} users={users} />
    </main>
  );
}
