import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Futurama POC Social Media Site</h1>
        <Link href={`/feed`}>Go to Feed</Link>
      </header>
      <p className="mb-4">
        This is a POC social media application to view posts from characters in Futurama, or view a specific character's profile to see their posts and friends.
      </p>
      <h2 className="text-xl font-semibold mb-2">Modifying Configuration</h2>
      <ul className="list-disc list-inside mb-4">
        <li>.env file contains BASE_API_URL for the API, which is set to http://localhost:3000/api</li>
        <li>To override, create an .env.local file with a new value</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Decisions</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Added prettier to keep files consistently formatted</li>
        <li>Used zod for validating schema on routes and props</li>
        <li>Started from data schema first, then API, then pages consuming the API.</li>
        <li>Left warning about img tag due to time constraint</li>
        <li>Future would extract more of the individual post elements to be shared</li>
        <li>Future would improve API to create data that better maps what pages are needing to reduce load</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Challenges Faced</h2>
      <ul className="list-disc list-inside mb-4">
        <li>tailwindcss had to refer to some documentation for styling</li>
        <li>zod optional versus nullable</li>
      </ul>
    </main>
  );
}
