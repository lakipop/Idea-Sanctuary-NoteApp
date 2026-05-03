import { Search, Plus } from 'lucide-react';

interface NoteToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddNote: () => void;
}

export const NoteToolbar = ({ searchQuery, onSearchChange, onAddNote }: NoteToolbarProps) => {
  return (
    <div className="sticky top-0 z-40 bg-[var(--color-bg-page)]/80 backdrop-blur-xl border-b border-[var(--color-border-default)] py-4 px-6 md:px-12 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="w-10 h-10 bg-[var(--color-brand-primary)]/10 rounded-xl flex items-center justify-center border border-[var(--color-brand-primary)]/20 shadow-[0_0_15px_rgba(245,166,35,0.15)]">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
             <polyline points="14 2 14 8 20 8"></polyline>
             <line x1="16" y1="13" x2="8" y2="13"></line>
             <line x1="16" y1="17" x2="8" y2="17"></line>
             <polyline points="10 9 9 9 8 9"></polyline>
           </svg>
        </div>
        <h1 className="text-xl font-display font-bold tracking-tight text-[var(--color-text-primary)]">
          Notes
        </h1>
      </div>

      <div className="flex-1 max-w-xl w-full flex items-center relative">
        <Search className="absolute left-3 text-[var(--color-text-muted)]" size={18} />
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-full py-2 pl-10 pr-4 outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)]/50 transition-all font-mono text-sm"
        />
      </div>

      <button 
        onClick={onAddNote}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-[var(--color-brand-primary)] text-[#0a0a0f] font-semibold py-2 px-5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[var(--color-brand-primary)]/20"
      >
        <Plus size={18} />
        <span>New Note</span>
      </button>
    </div>
  );
};
