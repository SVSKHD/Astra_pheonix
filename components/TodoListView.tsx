import React, { useState } from 'react';
import { Todo } from '../types';
import { PlusIcon, TrashIcon, SquareIcon, CheckSquareIcon } from './icons';

interface TodoListViewProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const AstraPhoenixTodoListView: React.FC<TodoListViewProps> = ({ todos, onAdd, onToggle, onDelete }) => {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      onAdd(newTodoText.trim());
      setNewTodoText('');
    }
  };
  
  const sortedTodos = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[var(--background-secondary)] p-8 rounded-lg shadow-2xl border border-[var(--border)] animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">My To-Do List</h1>
        
        <form onSubmit={handleAddTodo} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow bg-[var(--background)] text-[var(--foreground)] border border-[var(--border-secondary)] rounded-md py-2 px-4 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-colors"
          />
          <button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-text)] font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
            <PlusIcon className="w-5 h-5"/>
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo, index) => (
              <li 
                key={todo.id}
                className="flex items-center bg-[var(--background)] p-4 rounded-md border border-[var(--border)] animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button onClick={() => onToggle(todo.id, !todo.completed)} className="mr-4 p-1">
                  {todo.completed ? (
                    <CheckSquareIcon className="w-6 h-6 text-[var(--success)]" />
                  ) : (
                    <SquareIcon className="w-6 h-6 text-[var(--foreground-tertiary)]" />
                  )}
                </button>
                <span className={`flex-grow ${todo.completed ? 'line-through text-[var(--foreground-tertiary)]' : 'text-[var(--foreground-secondary)]'}`}>
                  {todo.text}
                </span>
                <button onClick={() => onDelete(todo.id)} className="ml-4 p-2 text-[var(--foreground-tertiary)] hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-[var(--foreground-tertiary)] py-8">
              Your to-do list is empty. Add a task to get started!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AstraPhoenixTodoListView;