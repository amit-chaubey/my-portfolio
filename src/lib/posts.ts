import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export type { Post };

const NOTION_POSTS: Post[] = [
  {
    slug: 'skilled-worker-visa',
    title: 'UK Skilled Worker Visa Guide',
    date: '2024-03-15',
    excerpt: 'A comprehensive guide for applying to UK\'s Skilled Worker Visa',
    tags: ['Immigration', 'UK Visa', 'Guide'],
    isNotion: true,
    notionId: '1a30e3a0a90280d5b708e9ccc741fca1'
  }
];

export async function getAllPosts(): Promise<Post[]> {
  const mdxPosts = await getMDXPosts();
  return [...mdxPosts, ...NOTION_POSTS].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const notionPost = NOTION_POSTS.find(post => post.slug === slug);
  if (notionPost) return notionPost;
  
  return getMDXPostBySlug(slug);
}

export function getMDXPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getMDXPostBySlug(slug);
    });

  return Promise.all(allPosts)
    .then(posts => posts.filter((post): post is Post => post !== null))
    .then(posts => posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
}

export function getMDXPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return Promise.resolve({
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags,
      content: content,
    });
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return Promise.resolve(null);
  }
}
