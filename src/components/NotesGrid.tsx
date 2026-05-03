import { Note } from '../types/note.types';
import { NoteCard } from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const NotesGrid = ({ notes, onEdit, onDelete, onTogglePin }: NotesGridProps) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-up">
        <div className="w-24 h-24 bg-[var(--color-bg-surface)] rounded-full flex items-center justify-center mb-6 shadow-inner border border-[var(--color-border-default)]">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
             <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
             <polyline points="14 2 14 8 20 8"></polyline>
           </svg>
        </div>
        <h2 className="text-2xl font-display font-bold text-[var(--color-text-primary)] mb-2">No notes here</h2>
        <p className="text-[var(--color-text-muted)] max-w-sm">
          You haven't captured any thoughts yet. Click "New Note" to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="masonry-grid p-6 md:p-12">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onTogglePin={onTogglePin} 
        />
      ))}
    </div>
  );
};
