import React from 'react';
import { GitHubIcon, TwitterIcon, LinkedinIcon } from './icons';

const AstraPhoenixFooter: React.FC = () => {
  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border)] mt-12">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-[var(--foreground-tertiary)] text-sm mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Astra Phoenix. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground-tertiary)] hover:text-[var(--primary)] transition-colors">
            <GitHubIcon className="w-6 h-6" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground-tertiary)] hover:text-[var(--primary)] transition-colors">
            <TwitterIcon className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground-tertiary)] hover:text-[var(--primary)] transition-colors">
            <LinkedinIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AstraPhoenixFooter;