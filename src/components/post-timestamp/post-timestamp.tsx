import { Post } from '@/types';

interface Props {
  className?: string;
  prefix?: string;
  post: Post;
}

export default function PostTimestamp({
  className = '',
  prefix = '',
  post,
}: Props) {
  const formattedDate = new Date(post.timestamp).toLocaleString();

  return (
    <span className={`${className} text-sm text-gray-500`}>
      {prefix} {formattedDate}
    </span>
  );
}
