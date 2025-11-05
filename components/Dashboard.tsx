import React, { useMemo } from 'react';
import { Post, User } from '../types';
import { FileTextIcon, BookIcon, PencilIcon, PlusIcon, SearchIcon } from './icons';

interface DashboardProps {
  user: User;
  posts: Post[];
  onSelectPost: (postId: string) => void;
  onCreateNew: () => void;
  onStartResearch: () => void;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, delay }) => (
  <div 
    className="bg-[var(--background-secondary)] p-6 rounded-xl border border-[var(--border)] flex items-center gap-6 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-[var(--foreground)]">{value}</p>
      <p className="text-[var(--foreground-tertiary)]">{label}</p>
    </div>
  </div>
);

interface CategoryChartProps {
  data: { name: string, count: number }[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count), 0);
    return (
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index} className="group grid grid-cols-4 items-center gap-4">
                    <p className="text-[var(--foreground-secondary)] truncate text-right">{item.name}</p>
                    <div className="col-span-3 bg-[var(--background-secondary)] rounded-full h-8 p-1 border border-[var(--border)]">
                        <div 
                            className="bg-[var(--primary-muted)] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end px-2"
                            style={{ width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%' }}
                        >
                           <span className="font-bold text-[var(--primary-muted-text)] opacity-0 group-hover:opacity-100 transition-opacity">{item.count}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


const AstraPhoenixDashboard: React.FC<DashboardProps> = ({ user, posts, onSelectPost, onCreateNew, onStartResearch }) => {
  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const uniqueCategories = new Set(posts.map(p => p.category)).size;
    const totalWords = posts.reduce((acc, post) => acc + post.content.split(/\s+/).filter(Boolean).length, 0);
    return { totalPosts, uniqueCategories, totalWords };
  }, [posts]);
  
  const sortedPosts = useMemo(() => [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [posts]);

  const latestPost = useMemo(() => sortedPosts[0] || null, [sortedPosts]);
  const recentPosts = useMemo(() => sortedPosts.slice(1, 4), [sortedPosts]);

  const postsPerCategory = useMemo(() => {
    const counts: { [key: string]: number } = {};
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  return (
    <div>
      <h1 
        className="text-4xl font-bold mb-2 animate-fade-in-up"
        style={{ animationDelay: `100ms` }}
      >
        Welcome back, {user.name.split(' ')[0]}!
      </h1>
      <p 
        className="text-lg text-[var(--foreground-tertiary)] mb-8 animate-fade-in-up"
        style={{ animationDelay: `200ms` }}
      >
        Here's a snapshot of your creative universe.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<FileTextIcon className="w-6 h-6" />} label="Total Posts" value={stats.totalPosts} color="bg-sky-200 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300" delay={300} />
        <StatCard icon={<BookIcon className="w-6 h-6" />} label="Unique Categories" value={stats.uniqueCategories} color="bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300" delay={400} />
        <StatCard icon={<PencilIcon className="w-6 h-6" />} label="Words Written" value={stats.totalWords.toLocaleString()} color="bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300" delay={500} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Latest Post and Recent */}
        <div className="lg:col-span-2 space-y-8">
            {latestPost && (
                <div className="bg-[var(--background-secondary)] p-6 rounded-xl border border-[var(--border)] animate-fade-in-up" style={{ animationDelay: `600ms` }}>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Latest Post</h2>
                    <div 
                        onClick={() => onSelectPost(latestPost.id)}
                        className="group flex flex-col md:flex-row gap-6 cursor-pointer"
                    >
                        <img src={latestPost.imageUrl} alt={latestPost.title} className="w-full md:w-1/3 h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"/>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="bg-[var(--primary-muted)] text-[var(--primary-muted-text)] text-xs font-semibold px-3 py-1 rounded-full self-start">{latestPost.category}</span>
                                <span className="text-xs text-[var(--foreground-tertiary)]">{latestPost.views.toLocaleString()} views</span>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors">{latestPost.title}</h3>
                            <p className="text-[var(--foreground-tertiary)] text-sm mt-1 mb-3">{new Date(latestPost.createdAt).toLocaleDateString()}</p>
                            <p className="text-[var(--foreground-secondary)] flex-grow">{latestPost.content.substring(0, 150)}...</p>
                        </div>
                    </div>
                </div>
            )}
             <div className="bg-[var(--background-secondary)] p-6 rounded-xl border border-[var(--border)] animate-fade-in-up" style={{ animationDelay: `700ms` }}>
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Recent Posts</h2>
                <ul className="space-y-4">
                    {recentPosts.map(post => (
                        <li key={post.id} onClick={() => onSelectPost(post.id)} className="flex items-center gap-4 group cursor-pointer">
                            <img src={post.imageUrl} alt={post.title} className="w-16 h-12 object-cover rounded-md" />
                            <div className="flex-grow">
                                <p className="font-semibold group-hover:text-[var(--primary)] transition-colors">{post.title}</p>
                                <p className="text-sm text-[var(--foreground-tertiary)]">{post.category}</p>
                            </div>
                            <p className="text-sm font-medium text-[var(--foreground-secondary)]">{post.views.toLocaleString()} views</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Right Column: Categories and Actions */}
        <div className="space-y-8">
            <div className="bg-[var(--background-secondary)] p-6 rounded-xl border border-[var(--border)] animate-fade-in-up" style={{ animationDelay: `800ms` }}>
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Posts by Category</h2>
                <CategoryChart data={postsPerCategory} />
            </div>
            <div className="bg-[var(--background-secondary)] p-6 rounded-xl border border-[var(--border)] animate-fade-in-up" style={{ animationDelay: `900ms` }}>
                 <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Quick Actions</h2>
                 <div className="space-y-3">
                    <button onClick={onCreateNew} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-semibold transition-colors duration-300">
                        <PlusIcon className="w-5 h-5"/>
                        Create New Post
                    </button>
                    <button onClick={onStartResearch} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] font-semibold transition-colors duration-300">
                        <SearchIcon className="w-5 h-5"/>
                        Start Research
                    </button>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AstraPhoenixDashboard;