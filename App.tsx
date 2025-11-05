import React, { useState, useMemo, useEffect } from 'react';
import { Post, User, SearchResult, Todo, CryptoData } from './types';
import { firebaseConfig } from './firebase';
import { 
  streamPosts,
  addPost,
  incrementPostView,
  streamTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  seedInitialData,
} from './services/firebaseService';
import { fetchCryptoPrices } from './services/marketDataService';
import AstraPhoenixHeader from './components/Header';
import AstraPhoenixCryptoTicker from './components/CryptoTicker';
import AstraPhoenixPostList from './components/PostList';
import AstraPhoenixPostView from './components/PostView';
import AstraPhoenixCreatePost from './components/CreatePost';
import AstraPhoenixResearchPanel from './components/ResearchPanel';
import AstraPhoenixDashboard from './components/Dashboard';
import AstraPhoenixTodoListView from './components/TodoListView';
import AstraPhoenixFooter from './components/Footer';
import AstraPhoenixPriceChartModal from './components/PriceChartModal';

type View = 'dashboard' | 'posts' | 'post-view' | 'create-post' | 'todolist';

// Mock user to bypass authentication during development
const mockUser: User = {
  uid: 'mock-admin-uid-12345',
  name: 'Admin User',
  avatarUrl: 'https://i.pravatar.cc/150?u=mock-admin-uid-12345',
  role: 'admin',
};

const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";

const AstraPhoenixApp: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [isResearchPanelOpen, setIsResearchPanelOpen] = useState(false);
  const [researchHistory, setResearchHistory] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    
    seedInitialData();

    const unsubscribePosts = streamPosts(setPosts);
    const unsubscribeTodos = streamTodos(mockUser.uid, setTodos);
    
    const loadMarketData = async () => {
        try {
            const data = await fetchCryptoPrices();
            setCryptoData(data);
        } catch (error) {
            console.error("Failed to load market data:", error);
            // Optionally, set an error state to show in the UI
        }
    };
    
    loadMarketData();
    // Refresh market data every 60 seconds
    const marketDataInterval = setInterval(loadMarketData, 60000);

    return () => {
        unsubscribePosts();
        unsubscribeTodos();
        clearInterval(marketDataInterval);
    };
  }, []);

  const handleSelectPost = (postId: string) => {
    incrementPostView(postId);
    setSelectedPostId(postId);
    setCurrentView('post-view');
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setCurrentView('dashboard');
  };
  
  const handleNavigate = (view: string) => {
    setSelectedPostId(null);
    setCurrentView(view as View);
  }

  const handleSavePost = async (newPostData: Omit<Post, 'id' | 'createdAt' | 'views'>) => {
    await addPost(newPostData);
    setCurrentView('dashboard');
  };

  const handleNewSearch = (result: SearchResult) => {
    setResearchHistory(prev => [result, ...prev.filter(item => item.query !== result.query)]);
  };
  
  const handleSelectCrypto = (crypto: CryptoData) => {
    setSelectedCrypto(crypto);
  };
  
  const handleCloseChart = () => {
    setSelectedCrypto(null);
  };

  const selectedPost = useMemo(() => {
    return posts.find(post => post.id === selectedPostId) || null;
  }, [posts, selectedPostId]);

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-4">
        <div className="text-center p-8 max-w-lg w-full bg-[var(--background-secondary)] rounded-lg shadow-lg border border-[var(--border)]">
          <h1 className="text-2xl font-bold text-[var(--primary)] mb-4">Firebase Configuration Needed</h1>
          <p className="mb-4 text-[var(--foreground-secondary)]">This application requires a Firebase backend to function. Please configure your Firebase project credentials in the <strong>firebase.ts</strong> file.</p>
          <p className="text-sm text-[var(--foreground-tertiary)]">The app is currently using placeholder values, which caused the "invalid-api-key" error.</p>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AstraPhoenixDashboard 
          user={mockUser} 
          posts={posts} 
          onSelectPost={handleSelectPost} 
          onCreateNew={() => setCurrentView('create-post')}
          onStartResearch={() => setIsResearchPanelOpen(true)}
        />;
      case 'posts':
        return <AstraPhoenixPostList posts={posts} onSelectPost={handleSelectPost} />;
      case 'post-view':
        if (selectedPost) {
          return <AstraPhoenixPostView post={selectedPost} onBack={handleBackToList} />;
        }
        return null;
      case 'create-post':
        return <AstraPhoenixCreatePost 
          onSave={handleSavePost} 
          onCancel={() => setCurrentView('dashboard')} 
        />;
      case 'todolist':
        return <AstraPhoenixTodoListView 
            todos={todos}
            onAdd={(text) => addTodo(mockUser.uid, text)}
            onToggle={(id, completed) => toggleTodo(mockUser.uid, id, completed)}
            onDelete={(id) => deleteTodo(mockUser.uid, id)}
        />
      default:
        return <AstraPhoenixPostList posts={posts} onSelectPost={handleSelectPost} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <AstraPhoenixHeader user={mockUser} currentView={currentView} onNavigate={handleNavigate} />
      {cryptoData.length > 0 && <AstraPhoenixCryptoTicker data={cryptoData} onSelect={handleSelectCrypto} />}
      <main className="flex-grow container mx-auto p-6 md:p-8">
        {renderCurrentView()}
      </main>
      <AstraPhoenixFooter />
      {isResearchPanelOpen && (
        <AstraPhoenixResearchPanel
          history={researchHistory}
          onSearch={handleNewSearch}
          onClose={() => setIsResearchPanelOpen(false)}
        />
      )}
      {selectedCrypto && (
        <AstraPhoenixPriceChartModal crypto={selectedCrypto} onClose={handleCloseChart} />
      )}
    </div>
  );
};

export default AstraPhoenixApp;