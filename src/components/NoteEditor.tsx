import { Check } from 'lucide-react';
import { Note, NoteColor } from '../types/note.types';

interface NoteEditorProps {
  note: Note | null;
  onClose: () => void;
  onUpdate: (id: string, partial: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
}

export const NoteEditor = ({ note, onClose, onUpdate, titleRef }: NoteEditorProps) => {
  if (!note) return null;

  const handleClose = (e?: React.MouseEvent) => {
    // If it's a backdrop click, close. If they explicitly clicked "Done", close.
    if (e && e.target === e.currentTarget) {
      onClose();
    } else if (!e) {
      onClose();
    }
  };

  const getColors = () => {
    switch (note.color) {
      case NoteColor.YELLOW: return 'bg-[var(--note-yellow)] border-[var(--note-border-yellow)]';
      case NoteColor.BLUE: return 'bg-[var(--note-blue)] border-[var(--note-border-blue)]';
      case NoteColor.GREEN: return 'bg-[var(--note-green)] border-[var(--note-border-green)]';
      case NoteColor.PINK: return 'bg-[var(--note-pink)] border-[var(--note-border-pink)]';
      default: return 'bg-[var(--note-default)] border-[var(--note-border-default)]';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm flex items-center justify-center p-4 py-12 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className={`w-full max-w-3xl rounded-2xl shadow-2xl border flex flex-col relative animate-fade-up ${getColors()}`}
        style={{ minHeight: '50vh', maxHeight: '85vh' }}
      >
        
        {/* Header Tools */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
           <button onClick={() => onClose()} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-[var(--color-text-secondary)] hover:text-white transition-colors">
              <Check size={18} />
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-8 pt-12 overflow-y-auto hide-scrollbar">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => onUpdate(note.id, { title: e.target.value })}
            className="text-3xl font-display font-bold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/50 mb-6"
          />
          <textarea
            placeholder="Take a note..."
            value={note.content}
            onChange={(e) => onUpdate(note.id, { content: e.target.value })}
            className="flex-1 w-full bg-transparent border-none outline-none text-[var(--color-text-secondary)] placeholder-[var(--color-text-muted)]/50 resize-none text-base leading-relaxed"
          />
        </div>

        {/* Footer Color Palette */}
        <div className="border-t border-[var(--color-border-default)] p-4 flex gap-2">
          {Object.values(NoteColor).map((color) => {
            let bgClass = "bg-[var(--note-default)]";
            switch (color) {
               case NoteColor.YELLOW: bgClass = "bg-[#f5a623]"; break;
               case NoteColor.BLUE: bgClass = "bg-[#00a3ff]"; break;
               case NoteColor.GREEN: bgClass = "bg-[#00d4aa]"; break;
               case NoteColor.PINK: bgClass = "bg-[#ff6b6b]"; break;
            }
            return (
              <button
                key={color}
                onClick={() => onUpdate(note.id, { color })}
                className={`w-8 h-8 rounded-full border-2 ${note.color === color ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'} transition-all ${bgClass}`}
                aria-label={`Set color to ${color}`}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};
