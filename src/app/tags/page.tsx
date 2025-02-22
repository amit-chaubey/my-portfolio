import { getAllTags } from '@/lib/tags';
import Link from 'next/link';

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Tags</h1>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${tag.slug}`}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </div>
  );
} 