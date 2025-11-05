import React, { useState } from 'react';
import { signInWithGoogle, signInWithGitHub } from '../services/firebaseService';
import { GoogleIcon, GitHubIcon } from './icons';
import AstraPhoenixLoadingSpinner from './LoadingSpinner';

const AstraPhoenixLogin: React.FC = () => {
  const [loading, setLoading] = useState<'google' | 'github' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (provider: 'google' | 'github') => {
    setLoading(provider);
    setError(null);
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGitHub();
      }
    } catch (error: any) {
      setError("Failed to sign in. Please try again.");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid-pattern p-4">
      <div className="max-w-md w-full bg-[var(--background-secondary)] p-8 rounded-2xl shadow-2xl border border-[var(--border)] text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">Astra Phoenix</h1>
        <p className="text-[var(--foreground-secondary)] mb-8">Your AI-Powered Content Creation Hub</p>

        {error && <p className="bg-[var(--error-bg)] text-[var(--error-text)] p-3 rounded-md mb-6">{error}</p>}

        <div className="space-y-4">
           <button
            onClick={() => handleLogin('github')}
            disabled={!!loading}
            className="w-full bg-[#333] hover:bg-[#444] text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading === 'github' ? <AstraPhoenixLoadingSpinner /> : <GitHubIcon className="w-6 h-6" />}
            Log In as Admin
          </button>
          <button
            onClick={() => handleLogin('google')}
            disabled={!!loading}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading === 'google' ? <AstraPhoenixLoadingSpinner /> : <GoogleIcon className="w-6 h-6" />}
            Log In as User
          </button>
        </div>
        <p className="text-xs text-[var(--foreground-tertiary)] mt-6">
          Admin login (GitHub) provides access to the dashboard and content creation tools.
        </p>
      </div>
    </div>
  );
};

export default AstraPhoenixLogin;