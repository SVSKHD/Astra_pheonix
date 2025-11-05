import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onSelectPost: (postId: string) => void;
}

const AstraPhoenixPostCard: React.FC<PostCardProps> = ({ post, onSelectPost }) => {
  const snippet = post.content.substring(0, 100) + '...';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div 
      className="bg-[var(--background-secondary)] rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group border border-[var(--border)] hover:border-[var(--border-secondary)] h-full flex flex-col"
      onClick={() => onSelectPost(post.id)}
    >
      <div className="relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute top-4 right-4 bg-[var(--primary-muted)] text-[var(--primary-muted-text)] text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{post.title}</h2>
        <p className="text-[var(--foreground-tertiary)] text-sm mb-4">{formatDate(post.createdAt)}</p>
        <p className="text-[var(--foreground-secondary)] flex-grow">{snippet}</p>
      </div>
    </div>
  );
};

export default AstraPhoenixPostCard;