import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: any;
  excerpt?: string;
  tags?: string[];
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Posts directory doesn't exist:", postsDirectory);
    return [];
  }
  
  console.log("Reading posts from directory:", postsDirectory);
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("Found files:", fileNames);
  
  const posts = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    console.log(`Attempting to load post from: ${fullPath}`);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post file not found: ${fullPath}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log(`Successfully read file contents for ${slug}`);
    
    const { data, content } = matter(fileContents);
    console.log(`Parsed frontmatter for ${slug}:`, data);
    
    if (!data.title || !data.date) {
      console.warn(`Post ${slug} is missing required frontmatter`);
    }
    
    console.log(`Serializing MDX content for ${slug}`);
    const mdxSource = await serialize(content);
    console.log(`MDX serialization complete for ${slug}`);

    return {
      slug,
      content: mdxSource,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}
