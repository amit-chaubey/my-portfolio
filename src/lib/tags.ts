import { getAllPosts, Post } from './posts';

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach((post: Post) => {
    post.tags.forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count,
  }));
} 