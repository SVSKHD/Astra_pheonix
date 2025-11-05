import React, { useState } from 'react';
import { Post } from '../types';
import { generatePostIdeas, generatePostContent, generatePostImage } from '../services/geminiService';
import { SparklesIcon, PencilIcon, ImageIcon } from './icons';
import AstraPhoenixLoadingSpinner from './LoadingSpinner';

interface CreatePostProps {
  onSave: (post: Omit<Post, 'id' | 'createdAt' | 'views'>) => void;
  onCancel: () => void;
}

const AstraPhoenixCreatePost: React.FC<CreatePostProps> = ({ onSave, onCancel }) => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdeas = async () => {
    if (!topic) return;
    setIsGeneratingIdeas(true);
    setError(null);
    try {
      const generatedIdeas = await generatePostIdeas(topic);
      setIdeas(generatedIdeas);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!title) return;
    setIsGeneratingContent(true);
    setError(null);
    try {
      const generatedContent = await generatePostContent(title);
      setContent(generatedContent);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!title) return;
    setIsGeneratingImage(true);
    setError(null);
    try {
      const generatedImageUrl = await generatePostImage(title);
      setImageUrl(generatedImageUrl);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  const handleSave = () => {
    if (title && content && imageUrl && category) {
      onSave({ title, content, imageUrl, category });
    }
  };

  const isSaveDisabled = !title || !content || !imageUrl || !category;

  return (
    <div className="max-w-4xl mx-auto bg-[var(--background-secondary)] p-8 rounded-lg shadow-2xl border border-[var(--border)]">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Create a New Post with AI</h1>

      {error && <div className="bg-[var(--error-bg)] text-[var(--error-text)] p-3 rounded-md mb-6">{error}</div>}

      {/* Step 1: Ideas */}
      <div className="mb-8 p-6 border border-[var(--border)] rounded-lg bg-[var(--background)]">
        <label htmlFor="topic" className="block text-lg font-semibold mb-2 text-[var(--primary)]">Step 1: Get Post Ideas</label>
        <p className="text-[var(--foreground-tertiary)] mb-4">Enter a topic and let AI generate some catchy titles for you.</p>
        <div className="flex gap-4">
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'React State Management'"
            className="flex-grow bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border-secondary)] rounded-md py-2 px-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-colors"
          />
          <button onClick={handleGenerateIdeas} disabled={!topic || isGeneratingIdeas} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
            {isGeneratingIdeas ? <AstraPhoenixLoadingSpinner /> : <SparklesIcon className="w-5 h-5"/>}
            Generate Ideas
          </button>
        </div>
        {ideas.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {ideas.map((idea, index) => (
              <button key={index} onClick={() => setTitle(idea)} className="bg-[var(--background-secondary)] hover:bg-[var(--primary)] hover:text-[var(--primary-text)] text-sm py-1 px-3 rounded-full transition-colors">
                {idea}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Content */}
      <div className="mb-8 p-6 border border-[var(--border)] rounded-lg bg-[var(--background)]">
         <label htmlFor="title" className="block text-lg font-semibold mb-2 text-[var(--primary)]">Step 2: Write Content</label>
         <p className="text-[var(--foreground-tertiary)] mb-4">Enter a title (or use a generated one), then let AI write the post.</p>
         <div className="flex gap-4 mb-4">
             <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
                className="flex-grow bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border-secondary)] rounded-md py-2 px-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-colors"
            />
            <button onClick={handleGenerateContent} disabled={!title || isGeneratingContent} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
                {isGeneratingContent ? <AstraPhoenixLoadingSpinner /> : <PencilIcon className="w-5 h-5" />}
                Write Content
            </button>
         </div>
         <div className="mb-4">
            <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Post Category (e.g., 'Web Development')"
                className="w-full bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border-secondary)] rounded-md py-2 px-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-colors"
            />
         </div>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your post content will appear here..."
            rows={15}
            className="w-full bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border-secondary)] rounded-md py-2 px-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-colors"
        />
      </div>

      {/* Step 3: Image */}
      <div className="mb-8 p-6 border border-[var(--border)] rounded-lg bg-[var(--background)]">
        <label className="block text-lg font-semibold mb-2 text-[var(--primary)]">Step 3: Generate Header Image</label>
        <p className="text-[var(--foreground-tertiary)] mb-4">Create a unique header image based on your post's title.</p>
        <button onClick={handleGenerateImage} disabled={!title || isGeneratingImage} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed mb-4">
            {isGeneratingImage ? <AstraPhoenixLoadingSpinner /> : <ImageIcon className="w-5 h-5" />}
            Generate Image
        </button>
        {imageUrl && (
            <div className="mt-4">
                <img src={imageUrl} alt="Generated post header" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
        )}
        {isGeneratingImage && !imageUrl && <div className="w-full h-64 bg-[var(--background-secondary)] rounded-lg flex items-center justify-center"><AstraPhoenixLoadingSpinner className="w-10 h-10"/></div>}
      </div>


      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <button onClick={onCancel} className="bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] font-semibold py-2 px-6 rounded-lg transition-colors">
          Cancel
        </button>
        <button onClick={handleSave} disabled={isSaveDisabled} className="bg-[var(--success)] hover:bg-[var(--success-hover)] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50">
          Save Post
        </button>
      </div>

    </div>
  );
};

export default AstraPhoenixCreatePost;