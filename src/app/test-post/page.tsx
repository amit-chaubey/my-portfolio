import { getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function TestPostPage() {
  // Try to load a specific post directly
  const post = await getPostBySlug('example-post');
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Test post not found</h1>
        <p>Could not load the example post. Check the console logs for errors.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
      
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="text-gray-500 mb-8">
          {formatDate(post.date)}
        </div>
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
} 