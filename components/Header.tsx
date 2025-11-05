import React from 'react';
import { User } from '../types';
import { DashboardIcon, FileTextIcon, ListTodoIcon } from './icons';

interface HeaderProps {
  user: User;
  currentView: string;
  onNavigate: (view: string) => void;
}

const AstraPhoenixHeader: React.FC<HeaderProps> = ({ user, currentView, onNavigate }) => {
  // Combine all nav items for development, giving access to all views.
  const navItems = [
    { name: 'Dashboard', view: 'dashboard', icon: <DashboardIcon className="w-5 h-5"/> },
    { name: 'Posts', view: 'posts', icon: <FileTextIcon className="w-5 h-5"/> },
    { name: 'To-Do List', view: 'todolist', icon: <ListTodoIcon className="w-5 h-5"/> }
  ];

  return (
    <header className="bg-[var(--background-secondary)] shadow-md sticky top-0 z-30 border-b border-[var(--border)]">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Astra Phoenix</h1>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
                <button 
                  key={item.name} 
                  onClick={() => onNavigate(item.view)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-colors ${currentView === item.view ? 'bg-[var(--primary-muted)] text-[var(--primary-muted-text)]' : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'}`}
                >
                    {item.icon}
                    {item.name}
                </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[var(--foreground)] font-semibold hidden sm:block">{user.name}</span>
          <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[var(--primary)]" />
        </div>
      </div>
    </header>
  );
};

export default AstraPhoenixHeader;