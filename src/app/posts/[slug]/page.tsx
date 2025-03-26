import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

// Define the params interface according to Next.js patterns
interface Params {
  slug: string;
}

// Use the recommended pattern for metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Wait for params to be fully resolved
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  if (!slug) {
    return { title: 'Post Not Found' };
  }
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }
  
  return {
    title: post.title,
    description: post.excerpt || '',
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// Use the same await pattern for the page component
export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Wait for params to be fully resolved
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  if (!slug) {
    return <div>Invalid post slug</div>;
  }
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-6">
          <Link href="/posts" className="text-blue-600 hover:underline">
            ← Back to Posts
          </Link>
        </div>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Post not found</h1>
          <p className="mb-6">We couldn't find the post you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <Link href="/posts" className="text-blue-600 hover:underline">
          ← Back to Posts
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
