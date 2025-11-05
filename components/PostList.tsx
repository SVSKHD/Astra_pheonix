import React, { useState, useMemo } from 'react';
import { Post } from '../types';
import AstraPhoenixPostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onSelectPost: (postId: string) => void;
}

const AstraPhoenixPostList: React.FC<PostListProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map(p => p.category)))], [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return posts;
    }
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--foreground)] animate-fade-in-up">Blog Posts</h2>
        <p className="text-lg text-[var(--foreground-tertiary)] mt-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>Browse by Category</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-8 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-[var(--primary)] text-[var(--primary-text)] shadow-md'
                : 'bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] text-[var(--foreground-secondary)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index * 100) + 300}ms` }}
            >
              <AstraPhoenixPostCard post={post} onSelectPost={onSelectPost} />
            </div>
          ))
        ) : (
          <p className="text-[var(--foreground-tertiary)] col-span-full text-center">No posts found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default AstraPhoenixPostList;