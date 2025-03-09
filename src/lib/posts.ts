import fs from 'fs';
import path from 'path';

// Dynamically import modules with fallbacks
let matter: any;
let serialize: any;

try {
  matter = require('gray-matter');
} catch (error) {
  // Fallback implementation if gray-matter is not available
  matter = (content: string) => {
    // Simple fallback that extracts YAML frontmatter between --- markers
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      return { data: {}, content };
    }
    
    try {
      // Very basic YAML parsing (only handles simple key-value pairs)
      const yamlStr = match[1];
      const data: Record<string, any> = {};
      
      yamlStr.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim();
          // Remove quotes if present
          data[key.trim()] = value.replace(/^["'](.*)["']$/, '$1');
        }
      });
      
      return { data, content: match[2] };
    } catch (e) {
      console.error('Error parsing frontmatter:', e);
      return { data: {}, content };
    }
  };
}

try {
  serialize = require('next-mdx-remote/serialize').serialize;
} catch (error) {
  // Simple fallback if serialize is not available
  serialize = async (content: string) => content;
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: any; // MDX content type
  excerpt?: string;
  tags?: string[];
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
    );

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content);

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
