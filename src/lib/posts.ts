import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string | Date; // Allow both string and Date
  content?: any; // Make content optional since getAllPosts doesn't include it
  excerpt?: string;
  tags?: string[];
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.log(`Directory not found: ${postsDirectory}`);
      return [];
    }

    const filenames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      filenames.filter(filename => {
        return filename.endsWith('.mdx') || filename.endsWith('.md');
      }).map(async filename => {
        const slug = filename.replace(/\.mdx?$/, '');
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title,
          date: new Date(data.date),
          excerpt: data.excerpt,
          tags: data.tags || [],
        };
      })
    );

    // Sort posts by date
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error loading all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Temporarily simplify by just sending the raw content for debugging
    // const mdxSource = await serialize(content, {
    //   parseFrontmatter: false, // We've already parsed it with gray-matter
    //   mdxOptions: {
    //     development: process.env.NODE_ENV === 'development',
    //   },
    // });

    return {
      slug,
      title: data.title,
      date: new Date(data.date).toISOString(),
      excerpt: data.excerpt,
      tags: data.tags || [],
      content: content, // Raw content as a string
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}
