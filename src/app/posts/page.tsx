"use client";
import { useState, useEffect } from 'react';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/blog/PostCard';

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} date={typeof post.date === 'string' ? post.date : post.date.toISOString()} excerpt={post.excerpt ?? ''} tags={post.tags ?? []} />
        ))}
      </div>
    </div>
  );
} 