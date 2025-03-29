import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { MDXContent } from '@/components/MDXContent';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(props.params);
    const slug = resolvedParams.slug;
    
    if (!slug) return { title: 'Post Not Found' };
    
    const post = await getPostBySlug(slug);
    if (!post) {
      return { title: 'Post Not Found' };
    }
    return {
      title: post.title,
      description: post.excerpt || '',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error Loading Post',
      description: 'There was an error loading this post'
    };
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage(props: Props) {
  try {
    const resolvedParams = await Promise.resolve(props.params);
    const slug = resolvedParams.slug;
    
    if (!slug) return <div>Invalid slug</div>;
    
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
            {formatDate(typeof post.date === 'string' ? post.date : post.date.toISOString())}
          </div>
          
          {/* Use the client component for markdown rendering */}
          <MDXContent content={post.content} />
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error rendering post:', error);
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-500">Error Loading Post</h1>
        <p>There was an error loading this post. Please try again later.</p>
        <div className="mt-4">
          <Link href="/posts" className="text-blue-600 hover:underline">
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }
}
