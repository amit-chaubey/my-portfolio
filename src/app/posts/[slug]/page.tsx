import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';

// Dynamically import MDXRemote with error handling
let MDXRemote: any;
try {
  // Try to import the module
  MDXRemote = require('next-mdx-remote/rsc').MDXRemote;
} catch (error) {
  // Fallback if module is not available
  MDXRemote = ({ source }: { source: string }) => (
    <div dangerouslySetInnerHTML={{ __html: source }} />
  );
}

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
  try {
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error Loading Post',
      description: 'There was an error loading this post'
    };
  }
}

export async function generateStaticParams(): Promise<PostParams[]> {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }: Props) {
  try {
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
  } catch (error) {
    console.error('Error rendering post:', error);
    return (
      <div className="prose dark:prose-invert mx-auto">
        <h1>Error Loading Post</h1>
        <p>There was an error loading this post. Please try again later.</p>
      </div>
    );
  }
}
