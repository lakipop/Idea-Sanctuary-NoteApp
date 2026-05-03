import { Pin, Trash2, Edit2 } from 'lucide-react';
import { Note, NoteColor } from '../types/note.types';

interface NoteCardProps {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const NoteCard = ({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) => {
  const getColors = () => {
    switch (note.color) {
      case NoteColor.YELLOW: return 'bg-[var(--note-yellow)] border-[var(--note-border-yellow)]';
      case NoteColor.BLUE: return 'bg-[var(--note-blue)] border-[var(--note-border-blue)]';
      case NoteColor.GREEN: return 'bg-[var(--note-green)] border-[var(--note-border-green)]';
      case NoteColor.PINK: return 'bg-[var(--note-pink)] border-[var(--note-border-pink)]';
      default: return 'bg-[var(--note-default)] border-[var(--note-border-default)]';
    }
  };

  const dateStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(note.updatedAt);

  return (
    <div 
      className={`masonry-item rounded-xl p-5 border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden animate-fade-up cursor-pointer ${getColors()}`}
      onClick={() => onEdit(note.id)}
    >
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onTogglePin(note.id); }}
          className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${note.pinned ? 'text-[var(--color-text-primary)] opacity-100' : 'text-[var(--color-text-muted)]'}`}
        >
          <Pin size={16} fill={note.pinned ? 'currentColor' : 'none'} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
          className="p-1.5 rounded-md hover:bg-red-500/20 text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {note.pinned && (
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity flex justify-end p-2 text-[var(--color-brand-primary)]">
          <Pin size={14} fill="currentColor" className="-rotate-45" />
        </div>
      )}

      {note.title && (
        <h3 className="font-display font-bold text-lg mb-2 pr-16 text-[var(--color-text-primary)] leading-tight">
          {note.title}
        </h3>
      )}
      
      <p className="text-[var(--color-text-secondary)] text-sm whitespace-pre-wrap break-words opacity-90 line-clamp-6">
        {note.content || <span className="italic opacity-50">Empty note...</span>}
      </p>

      <div className="mt-4 flex items-center justify-between">
         <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{dateStr}</span>
         
         <div className="opacity-0 group-hover:opacity-100 text-[var(--color-brand-primary)] transition-opacity">
            <Edit2 size={14} />
         </div>
      </div>
    </div>
  );
};
