import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function TagsPage() {
  const posts = await getAllPosts();
  
  // Extract and count all tags
  const tagCounts: Record<string, number> = {};
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        const tagName = tag.toLowerCase();
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
      });
    }
  });
  
  // Convert to array and sort alphabetically
  const sortedTags = Object.keys(tagCounts).sort((a, b) => a.localeCompare(b));
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Tags</h1>
      
      <div className="flex flex-wrap gap-3">
        {sortedTags.map(tag => {
          const count = tagCounts[tag];
          const slug = tag.replace(/\s+/g, '-');
          
          return (
            <Link
              key={tag}
              href={`/tags/${slug}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="font-medium">{tag}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">({count})</span>
            </Link>
          );
        })}
      </div>
      
      {sortedTags.length === 0 && (
        <p className="text-gray-700 dark:text-gray-300">No tags found.</p>
      )}
    </div>
  );
} 