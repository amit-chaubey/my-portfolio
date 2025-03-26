import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Blog Posts',
  description: 'Read my latest articles on software development and technology',
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No posts found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">{post.title}</h2>
              </Link>
              <div className="text-gray-500 mb-3">{formatDate(post.date)}</div>
              {post.excerpt && <p className="mb-4">{post.excerpt}</p>}
              <div className="flex gap-2 mb-4">
                {post.tags?.map((tag) => (
                  <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}