import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <article className="prose dark:prose-invert prose-slate max-w-none">
        <h1 className="text-gray-900 dark:text-gray-100">{post.title}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(post.date)}
        </div>
        <div className="text-gray-800 dark:text-gray-200">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
} 