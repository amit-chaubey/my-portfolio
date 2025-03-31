import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { tag: string };
};

//function to generate static params for all tags
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  // Get all unique tags
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagsSet.add(tag.toLowerCase().replace(/\s+/g, '-'));
    });
  });
  
  // Convert to array of param objects
  return Array.from(tagsSet).map(tag => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag).replace(/-/g, ' ');
  
  return {
    title: `Posts tagged with "${tag}"`,
    description: `Articles and tutorials related to ${tag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const tagSlug = params.tag;
  if (!tagSlug) return notFound();
  
  // Convert slug format (kebab-case) to display format (spaces, proper case)
  const tag = decodeURIComponent(tagSlug).replace(/-/g, ' ');
  
  const allPosts = await getAllPosts();
  const filteredPosts = allPosts.filter(post => 
    post.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase() ||
      postTag.toLowerCase().replace(/\s+/g, '-') === tagSlug.toLowerCase()
    )
  );
  
  if (filteredPosts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Tag: {tag}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">No posts found with this tag.</p>
        <Link href="/tags" className="text-blue-600 hover:underline">
          ← Back to all tags
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Tag: {tag}</h1>
      <div className="mb-8">
        <Link href="/tags" className="text-blue-600 hover:underline">
          ← Back to all tags
        </Link>
      </div>
      
      <div className="space-y-8">
        {filteredPosts.map((post) => (
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
          </article>
        ))}
      </div>
    </div>
  );
} 