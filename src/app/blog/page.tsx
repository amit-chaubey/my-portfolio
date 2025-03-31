import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="space-y-2">
            <h2 className="text-2xl font-bold">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {post.title}
              </Link>
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(typeof post.date === 'string' ? post.date : post.date.toISOString())}
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {post.excerpt}
            </p>
            <div className="flex gap-2">
              {(post.tags || []).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 