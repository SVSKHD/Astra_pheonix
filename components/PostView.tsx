import React from 'react';
import { Post } from '../types';
import { ChevronLeftIcon } from './icons';

// Simple markdown-to-HTML-like conversion for demonstration
// A real app would use a library like 'markdown-it' or 'react-markdown'
export const renderMarkdown = (text: string) => {
    return text
        .split('\n')
        .map((line, index) => {
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
            }
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            // Basic bold and italic
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
            
            return <p key={index} dangerouslySetInnerHTML={{ __html: line }} />;
        });
};


interface PostViewProps {
  post: Post;
  onBack: () => void;
}

const AstraPhoenixPostView: React.FC<PostViewProps> = ({ post, onBack }) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-8 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors font-semibold"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Back to Posts
      </button>
      <article>
        <div className="mb-4 animate-fade-in flex items-center gap-4" style={{ animationDelay: '100ms'}}>
          <span className="bg-[var(--primary-muted)] text-[var(--primary-muted-text)] text-sm font-semibold px-3 py-1 rounded-full">{post.category}</span>
           <span className="text-sm text-[var(--foreground-tertiary)]">{post.views.toLocaleString()} views</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-[var(--foreground)] animate-fade-in" style={{ animationDelay: '200ms'}}>{post.title}</h1>
        <p className="text-[var(--foreground-tertiary)] mb-6 animate-fade-in" style={{ animationDelay: '300ms'}}>{formatDate(post.createdAt)}</p>
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto md:h-96 object-cover rounded-lg mb-8 shadow-2xl animate-fade-in" style={{ animationDelay: '400ms'}} />
        <div className="prose prose-invert prose-lg max-w-none text-[var(--foreground-secondary)] animate-fade-in" style={{ animationDelay: '500ms'}}>
          {renderMarkdown(post.content)}
        </div>
      </article>
    </div>
  );
};

export default AstraPhoenixPostView;