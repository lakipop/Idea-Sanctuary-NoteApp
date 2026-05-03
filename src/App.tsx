import { useState } from 'react';
import { 
  Plus, Search, Grid, Pin, Trash2, 
  CheckSquare, CheckCircle2, Circle
} from 'lucide-react';
import { useNotes } from './hooks/useNotes';
import { Note, NoteColor, NoteSize } from './types/note.types';

const UNSPLASH_PRESETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&auto=format&fit=crop&q=60'
];

export default function App() {
  const {
    filteredNotes,
    searchQuery,
    setSearchQuery,
    activeNote,
    setEditingId,
    titleRef,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleTask,
    addTask
  } = useNotes();

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const openEditor = (id: string | null) => {
    setEditingId(id);
    setIsEditorOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 md:p-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2 font-display text-white">SYNTEC NOTES</h1>
          <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-xs">Aesthetic Productivity Board</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--color-accent)] transition-colors" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your mind..."
              className="w-full bg-white/5 border border-white/5 rounded-full py-3 pl-12 pr-6 outline-none focus:border-[var(--color-accent)]/50 transition-all font-medium text-white"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { addNote('checklist'); openEditor(null); }}
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60"
              title="Add Checklist"
            >
              <CheckSquare size={20} />
            </button>
            <button 
              onClick={() => { addNote('text'); openEditor(null); }}
              className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--color-accent)]/20"
            >
              <Plus size={20} />
              <span>Create</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Board */}
      <main className="bento-grid">
        {filteredNotes.map(note => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onClick={() => openEditor(note.id)}
            onTogglePin={() => togglePin(note.id)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </main>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 mt-20">
          <Grid size={80} className="mb-6 text-white" />
          <h2 className="text-2xl font-bold text-white">No notes found</h2>
          <p className="text-white">Start by creating a new aesthetic note card</p>
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && activeNote && (
        <NoteEditor 
          note={activeNote} 
          onClose={() => setIsEditorOpen(false)}
          onUpdate={(partial: Partial<Note>) => updateNote(activeNote.id, partial)}
          titleRef={titleRef}
          onToggleTask={(taskId: string) => toggleTask(activeNote.id, taskId)}
          onAddTask={(text: string) => addTask(activeNote.id, text)}
        />
      )}

      {/* Footer Branding */}
      <footer className="mt-20 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20">
        <p className="text-sm font-medium">© 2026 LSR Vidanaarachchi</p>
        <div className="flex gap-6">
          <a href="https://lakidev.me" className="text-xs hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest font-bold">Portfolio</a>
          <a href="https://github.com/lakipop" className="text-xs hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest font-bold">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function NoteCard({ note, onClick, onTogglePin, onDelete }: { note: Note, onClick: () => void, onTogglePin: () => void, onDelete: () => void }) {
  const getNoteColor = (color: NoteColor) => {
    switch (color) {
      case 'YELLOW': return 'var(--color-note-yellow)';
      case 'BLUE': return 'var(--color-note-blue)';
      case 'GREEN': return 'var(--color-note-green)';
      case 'PINK': return 'var(--color-note-pink)';
      case 'PURPLE': return 'var(--color-note-purple)';
      case 'ORANGE': return 'var(--color-note-orange)';
      default: return 'var(--color-bg-surface)';
    }
  };

  const isLightColor = note.color !== 'DEFAULT';

  return (
    <div 
      onClick={onClick}
      className={`note-card group cursor-pointer note-size-${note.size}`}
      style={{ 
        backgroundColor: note.bgImage ? 'transparent' : getNoteColor(note.color),
        backgroundImage: note.bgImage ? `url(${note.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: isLightColor ? '#000' : '#fff'
      }}
    >
      {note.bgImage && <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-500" />}
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black tracking-tight leading-tight uppercase font-display max-w-[80%] break-words">
            {note.title || (note.type === 'checklist' ? 'New List' : 'Untitled Note')}
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            className={`transition-colors ${note.pinned ? 'text-[var(--color-accent)]' : 'text-white/20 hover:text-white/40'}`}
          >
            <Pin size={18} fill={note.pinned ? 'currentColor' : 'none'} />
          </button>
        </div>

        {note.type === 'checklist' ? (
          <div className="space-y-2 overflow-hidden flex-1">
            {note.tasks?.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center gap-3">
                {task.completed ? <CheckCircle2 size={16} className="shrink-0" /> : <Circle size={16} className="shrink-0 opacity-40" />}
                <span className={`text-sm font-medium truncate ${task.completed ? 'line-through opacity-40' : ''}`}>{task.text}</span>
              </div>
            ))}
            {note.tasks && note.tasks.length > 5 && (
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">+{note.tasks.length - 5} more items</p>
            )}
          </div>
        ) : (
          <p className="text-sm font-medium line-clamp-6 opacity-60 flex-1 break-words leading-relaxed">
            {note.content || 'Click to write something...'}
          </p>
        )}

        <div className="mt-6 flex justify-between items-center pt-6 border-t border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
            {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-400/60 hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteEditor({ note, onClose, onUpdate, titleRef, onToggleTask, onAddTask }: any) {
  const [newTaskText, setNewTaskText] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[40px] flex flex-col md:flex-row shadow-2xl border border-white/10"
           style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        
        {/* Left Side: Sidebar Settings */}
        <div className="w-full md:w-64 border-r border-white/5 p-8 flex flex-col gap-8 bg-black/20">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 block">Note Size</label>
            <div className="grid grid-cols-2 gap-2">
              {(['small', 'medium', 'large', 'wide', 'tall'] as NoteSize[]).map(size => (
                <button 
                  key={size}
                  onClick={() => onUpdate({ size })}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${note.size === size ? 'bg-[var(--color-accent)] text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 block">Palette</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(NoteColor).map(color => (
                <button 
                  key={color}
                  onClick={() => onUpdate({ color, bgImage: undefined })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${note.color === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color === 'DEFAULT' ? '#333' : `var(--color-note-${color.toLowerCase()})` }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 block">Aesthetic Background</label>
            <div className="grid grid-cols-2 gap-2">
              {UNSPLASH_PRESETS.map((url, i) => (
                <button 
                  key={i}
                  onClick={() => onUpdate({ bgImage: url, color: NoteColor.DEFAULT })}
                  className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${note.bgImage === url ? 'border-[var(--color-accent)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={url} className="w-full h-full object-cover" />
                </button>
              ))}
              <button 
                onClick={() => onUpdate({ bgImage: undefined })}
                className="aspect-video rounded-xl border border-dashed border-white/20 flex items-center justify-center text-[10px] font-bold uppercase text-white/40 hover:bg-white/5"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Main Content */}
        <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <input 
            ref={titleRef}
            type="text"
            value={note.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder={note.type === 'checklist' ? 'List Title...' : 'Note Title...'}
            className="bg-transparent border-none outline-none text-5xl font-black tracking-tighter mb-8 placeholder:text-white/10 font-display text-white"
          />

          {note.type === 'checklist' ? (
            <div className="space-y-4">
              {note.tasks?.map((task: any) => (
                <div key={task.id} className="flex items-center gap-4 group">
                  <button onClick={() => onToggleTask(task.id)} className="text-[var(--color-accent)]">
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-20 group-hover:opacity-100" />}
                  </button>
                  <span className={`text-xl font-medium text-white ${task.completed ? 'line-through opacity-30' : ''}`}>{task.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Plus size={24} className="opacity-20 text-white" />
                <input 
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTaskText.trim()) {
                      onAddTask(newTaskText);
                      setNewTaskText('');
                    }
                  }}
                  placeholder="Add item..."
                  className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:text-white/10 text-white"
                />
              </div>
            </div>
          ) : (
            <textarea 
              value={note.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="What's on your mind?"
              className="flex-1 bg-transparent border-none outline-none text-xl font-medium leading-relaxed resize-none placeholder:text-white/10 min-h-[300px] text-white"
            />
          )}

          <div className="mt-12 flex justify-end gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-white font-bold text-black hover:scale-105 active:scale-95 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}