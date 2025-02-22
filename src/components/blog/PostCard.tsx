import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function PostCard({ slug, title, date, excerpt, tags }: PostCardProps) {
  return (
    <article className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link 
        href={`/posts/${slug}`}
        className="block space-y-4"
      >
        <h2 className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400">
          {title}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(date)}
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {excerpt}
        </p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}