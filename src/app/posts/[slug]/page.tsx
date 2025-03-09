import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';

// Define the params type separately
type PostParams = {
  slug: string;
};

// Define the props type for the page component
type Props = {
  params: PostParams;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams(): Promise<PostParams[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{post.title}</h1>
      <div className="text-gray-500 mb-8">
        {formatDate(post.date)}
      </div>
      <MDXRemote source={post.content} />
    </article>
  );
}
