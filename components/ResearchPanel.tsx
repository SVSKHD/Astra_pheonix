import React, { useState } from 'react';
import { SearchResult } from '../types';
import { researchTopic, ResearchResult } from '../services/geminiService';
import AstraPhoenixLoadingSpinner from './LoadingSpinner';
import { BookOpenIcon, SearchIcon, XIcon } from './icons';
import { renderMarkdown } from './PostView';

interface ResearchPanelProps {
  history: SearchResult[];
  onSearch: (result: SearchResult) => void;
  onClose: () => void;
}

enum Tab {
  Research,
  History,
}

const AstraPhoenixResearchPanel: React.FC<ResearchPanelProps> = ({ history, onSearch, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Research);
  const [query, setQuery] = useState('');
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query || isLoading) return;
    setIsLoading(true);
    setError(null);
    setCurrentResult(null);
    try {
      const result: ResearchResult = await researchTopic(query);
      const searchResult: SearchResult = { query, ...result };
      setCurrentResult(searchResult);
      onSearch(searchResult);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const viewHistoryItem = (item: SearchResult) => {
    setCurrentResult(item);
    setQuery(item.query);
    setActiveTab(Tab.Research);
  };

  const ResultDisplay: React.FC<{ result: SearchResult }> = ({ result }) => (
    <div className="mt-6 space-y-4 animate-fade-in">
        <h3 className="text-2xl font-bold text-[var(--foreground)]">{result.query}</h3>
        <div className="prose prose-invert prose-lg max-w-none text-[var(--foreground-secondary)]">
            {renderMarkdown(result.summary)}
        </div>

        {result.sources.length > 0 && (
            <div>
                <h4 className="text-lg font-semibold mt-6 mb-2 text-[var(--primary)]">Sources</h4>
                <ul className="list-disc list-inside space-y-2">
                    {result.sources.map((source, index) => (
                        <li key={index}>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:text-[var(--primary-hover)] hover:underline break-all">
                                {source.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );


  return (
    <div className="fixed inset-0 bg-black/60 z-40 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[var(--background)] shadow-2xl z-50 flex flex-col border-l border-[var(--border)] animate-slide-in-right"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--border)] flex-shrink-0">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">AI Research Assistant</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--background-secondary)] transition-colors" aria-label="Close research panel">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <div className="sticky top-0 bg-[var(--background)]/80 backdrop-blur-sm z-10 px-6 pt-6">
            <div className="flex border-b border-[var(--border)]">
                <button
                onClick={() => setActiveTab(Tab.Research)}
                className={`flex items-center gap-2 px-4 py-3 text-lg font-semibold transition-colors ${activeTab === Tab.Research ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-[var(--foreground-tertiary)] hover:text-[var(--foreground)]'}`}
                >
                <SearchIcon className="w-5 h-5"/>
                Research
                </button>
                <button
                onClick={() => setActiveTab(Tab.History)}
                className={`flex items-center gap-2 px-4 py-3 text-lg font-semibold transition-colors ${activeTab === Tab.History ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-[var(--foreground-tertiary)] hover:text-[var(--foreground)]'}`}
                >
                <BookOpenIcon className="w-5 h-5"/>
                History ({history.length})
                </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === Tab.Research && (
                <div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            placeholder="Enter a research topic..."
                            className="flex-grow bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border-secondary)] rounded-md py-2 px-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-colors"
                        />
                        <button onClick={handleSearch} disabled={!query || isLoading} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
                            {isLoading ? <AstraPhoenixLoadingSpinner /> : <SearchIcon className="w-5 h-5" />}
                            Search
                        </button>
                    </div>
                    {error && <div className="bg-[var(--error-bg)] text-[var(--error-text)] p-3 rounded-md mt-4">{error}</div>}
                    
                    {isLoading && (
                        <div className="text-center py-16">
                            <AstraPhoenixLoadingSpinner className="w-12 h-12 mx-auto" />
                            <p className="mt-4 text-[var(--foreground-secondary)]">Researching... this may take a moment.</p>
                        </div>
                    )}
                    
                    {currentResult && <ResultDisplay result={currentResult} />}
                </div>
            )}

            {activeTab === Tab.History && (
                <div>
                    {history.length === 0 ? (
                        <p className="text-[var(--foreground-tertiary)] text-center py-8">Your research history is empty.</p>
                    ) : (
                        <ul className="space-y-3">
                            {history.map((item, index) => (
                                <li key={index}
                                    className="bg-[var(--background-secondary)] p-4 rounded-md cursor-pointer hover:bg-[var(--background-tertiary)] transition-colors border border-[var(--border)]"
                                    onClick={() => viewHistoryItem(item)}
                                >
                                    <p className="font-semibold text-[var(--foreground)] truncate">{item.query}</p>
                                    <p className="text-sm text-[var(--foreground-tertiary)] truncate mt-1">{item.summary}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AstraPhoenixResearchPanel;