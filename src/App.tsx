import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Grid, Pin, Trash2, 
  CheckSquare, CheckCircle2, Circle, Sun, Moon,
  Type, Droplets, Palette, Image as ImageIcon,
  Upload, X
} from 'lucide-react';
import { useNotes } from './hooks/useNotes';
import { Note, NoteColor, NoteSize } from './types/note.types';

const UNSPLASH_PRESETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60', // Human action: Leading
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60', // Human action: Thinking
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60', // Collaboration
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60', // Writing
];

const FONT_COLORS = [
  { name: 'Default', value: 'inherit' },
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Pure Black', value: '#000000' },
  { name: 'Ochre', value: '#D4A044' },
  { name: 'Sage', value: '#82B2A7' },
  { name: 'Deep Sea', value: '#1e3a8a' },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('notes_theme');
    return saved ? saved === 'dark' : true;
  });

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

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('notes_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const openEditor = (id: string | null) => {
    setEditingId(id);
    setIsEditorOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 md:p-10 transition-colors duration-500">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2 font-display">IDEA SANCTUARY</h1>
          <p className="text-current opacity-40 font-medium uppercase tracking-[0.2em] text-xs">Unleash Your Creative Mind</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:text-[var(--color-accent)] transition-colors" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your brain..."
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-full py-3 pl-12 pr-6 outline-none focus:border-[var(--color-accent)]/50 transition-all font-medium"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { addNote('checklist'); openEditor(null); }}
              className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-60"
              title="Add Checklist"
            >
              <CheckSquare size={20} />
            </button>
            <button 
              onClick={() => { addNote('text'); openEditor(null); }}
              className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--color-accent)]/20"
            >
              <Plus size={20} />
              <span>Brainstorm</span>
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
            isDarkMode={isDarkMode}
            onClick={() => openEditor(note.id)}
            onTogglePin={() => togglePin(note.id)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </main>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 mt-20">
          <Grid size={80} className="mb-6" />
          <h2 className="text-2xl font-bold">Your sanctuary is empty</h2>
          <p>Capture your first creative thought</p>
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && activeNote && (
        <NoteEditor 
          note={activeNote} 
          isDarkMode={isDarkMode}
          onClose={() => setIsEditorOpen(false)}
          onUpdate={(partial: Partial<Note>) => updateNote(activeNote.id, partial)}
          titleRef={titleRef}
          onToggleTask={(taskId: string) => toggleTask(activeNote.id, taskId)}
          onAddTask={(text: string) => addTask(activeNote.id, text)}
        />
      )}

      {/* Footer Branding */}
      <footer className="mt-20 py-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-20">
        <p className="text-sm font-medium">© 2026 LSR Vidanaarachchi • Syntecxhub Intern</p>
        <div className="flex gap-6">
          <a href="https://lakidev.me" className="text-xs hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest font-bold">Portfolio</a>
          <a href="https://github.com/lakipop" className="text-xs hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest font-bold">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function NoteCard({ note, isDarkMode, onClick, onTogglePin, onDelete }: any) {
  const getNoteColor = (color: NoteColor) => {
    switch (color) {
      case 'YELLOW': return 'var(--color-note-yellow)';
      case 'BLUE': return 'var(--color-note-blue)';
      case 'GREEN': return 'var(--color-note-green)';
      case 'PINK': return 'var(--color-note-pink)';
      case 'PURPLE': return 'var(--color-note-purple)';
      case 'ORANGE': return 'var(--color-note-orange)';
      case 'OCHRE': return 'var(--color-note-ochre)';
      case 'SAGE': return 'var(--color-note-sage)';
      default: return isDarkMode ? 'var(--color-bg-surface)' : '#ffffff';
    }
  };

  const textColor = note.fontColor === 'inherit' 
    ? (isDarkMode ? '#ffffff' : 'var(--color-planner-dark)') 
    : note.fontColor;

  return (
    <div 
      onClick={onClick}
      className={`note-card group cursor-pointer note-size-${note.size}`}
      style={{ 
        backgroundColor: note.bgImage ? 'transparent' : getNoteColor(note.color),
        backgroundImage: note.bgImage ? `url(${note.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: note.opacity,
        color: textColor
      }}
    >
      {/* Removed blur from overlay */}
      {note.bgImage && <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10" />}
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black tracking-tight leading-tight uppercase font-display max-w-[80%] break-words">
            {note.title || (note.type === 'checklist' ? 'Brain List' : 'Idea')}
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            className={`transition-colors ${note.pinned ? 'text-[var(--color-accent)]' : 'opacity-20 hover:opacity-100'}`}
          >
            <Pin size={18} fill={note.pinned ? 'currentColor' : 'none'} />
          </button>
        </div>

        {note.type === 'checklist' ? (
          <div className="space-y-2 overflow-hidden flex-1">
            {note.tasks?.slice(0, 5).map((task: any) => (
              <div key={task.id} className="flex items-center gap-3">
                {task.completed ? <CheckCircle2 size={16} className="shrink-0" /> : <Circle size={16} className="shrink-0 opacity-40" />}
                <span className={`text-sm font-medium truncate ${task.completed ? 'line-through opacity-40' : ''}`}>{task.text}</span>
              </div>
            ))}
            {note.tasks && note.tasks.length > 5 && (
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">+{note.tasks.length - 5} more ideas</p>
            )}
          </div>
        ) : (
          <p className="text-sm font-medium line-clamp-6 opacity-60 flex-1 break-words leading-relaxed">
            {note.content || 'Start writing...'}
          </p>
        )}

        <div className="mt-6 flex justify-between items-center pt-6 border-t border-black/5 dark:border-white/5">
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

function NoteEditor({ note, isDarkMode, onClose, onUpdate, titleRef, onToggleTask, onAddTask }: any) {
  const [newTaskText, setNewTaskText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getNoteColor = (color: NoteColor) => {
    switch (color) {
      case 'YELLOW': return 'var(--color-note-yellow)';
      case 'BLUE': return 'var(--color-note-blue)';
      case 'GREEN': return 'var(--color-note-green)';
      case 'PINK': return 'var(--color-note-pink)';
      case 'PURPLE': return 'var(--color-note-purple)';
      case 'ORANGE': return 'var(--color-note-orange)';
      case 'OCHRE': return 'var(--color-note-ochre)';
      case 'SAGE': return 'var(--color-note-sage)';
      default: return isDarkMode ? 'var(--color-bg-surface)' : '#ffffff';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ bgImage: reader.result as string, color: NoteColor.DEFAULT });
      };
      reader.readAsDataURL(file);
    }
  };

  const textColor = note.fontColor === 'inherit' 
    ? (isDarkMode ? '#ffffff' : 'var(--color-planner-dark)') 
    : note.fontColor;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Reduced blur on backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div 
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[40px] flex flex-col md:flex-row shadow-2xl border border-white/10 transition-all duration-500 note-size-${note.size}`}
        style={{ 
          backgroundColor: note.bgImage ? 'transparent' : getNoteColor(note.color),
          backgroundImage: note.bgImage ? `url(${note.bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: note.opacity,
          color: textColor
        }}
      >
        {/* No blur overlay inside editor */}
        {note.bgImage && <div className="absolute inset-0 bg-black/20 z-0" />}

        {/* Left Side: Sidebar Settings */}
        <div className="relative z-10 w-full md:w-72 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-8 bg-black/10 backdrop-blur-sm overflow-y-auto custom-scrollbar">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 block flex items-center gap-2">
              <Grid size={12} /> Note Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['small', 'medium', 'large', 'wide', 'tall', 'half-tall'] as any[]).map(size => (
                <button 
                  key={size}
                  onClick={() => onUpdate({ size })}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${note.size === size ? 'bg-[var(--color-accent)] text-white' : 'bg-black/10 dark:bg-white/5 opacity-40 hover:opacity-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 block flex items-center gap-2">
              <Palette size={12} /> Palette
            </label>
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
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 block flex items-center gap-2">
              <Type size={12} /> Font Color
            </label>
            <div className="flex flex-wrap gap-2">
              {FONT_COLORS.map(fc => (
                <button 
                  key={fc.value}
                  onClick={() => onUpdate({ fontColor: fc.value })}
                  className={`w-6 h-6 rounded-md border border-white/10 transition-transform hover:scale-110 ${note.fontColor === fc.value ? 'ring-2 ring-white scale-110' : ''}`}
                  style={{ backgroundColor: fc.value === 'inherit' ? '#666' : fc.value }}
                  title={fc.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 block flex items-center gap-2">
              <Droplets size={12} /> Opacity ({Math.round(note.opacity * 100)}%)
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1" 
              value={note.opacity}
              onChange={(e) => onUpdate({ opacity: parseFloat(e.target.value) })}
              className="w-full accent-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 block flex items-center gap-2">
              <ImageIcon size={12} /> Backgrounds
            </label>
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
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video rounded-xl border border-dashed border-black/20 dark:border-white/20 flex flex-col items-center justify-center bg-white/5 opacity-40 hover:opacity-100"
              >
                <Upload size={16} />
                <span className="text-[8px] font-bold mt-1">Upload</span>
              </button>
              <button 
                onClick={() => onUpdate({ bgImage: undefined })}
                className="aspect-video rounded-xl border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center text-[10px] font-bold uppercase opacity-40 hover:opacity-100 hover:bg-white/5"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Main Content */}
        <div className="relative z-10 flex-1 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar bg-transparent">
          <input 
            ref={titleRef}
            type="text"
            value={note.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder={note.type === 'checklist' ? 'Brain List Title...' : 'Idea Title...'}
            className="bg-transparent border-none outline-none text-5xl font-black tracking-tighter mb-8 placeholder:opacity-10 font-display"
            style={{ color: textColor }}
          />

          {note.type === 'checklist' ? (
            <div className="space-y-4">
              {note.tasks?.map((task: any) => (
                <div key={task.id} className="flex items-center gap-4 group">
                  <button onClick={() => onToggleTask(task.id)} className="text-[var(--color-accent)]">
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-20 group-hover:opacity-100" />}
                  </button>
                  <span className={`text-xl font-medium ${task.completed ? 'line-through opacity-30' : ''}`} style={{ color: textColor }}>{task.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                <Plus size={24} className="opacity-20" />
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
                  className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:opacity-10"
                  style={{ color: textColor }}
                />
              </div>
            </div>
          ) : (
            <textarea 
              value={note.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Spill your creative thoughts..."
              className="flex-1 bg-transparent border-none outline-none text-xl font-medium leading-relaxed resize-none placeholder:opacity-10 min-h-[300px]"
              style={{ color: textColor }}
            />
          )}

          <div className="mt-12 flex justify-end gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-black dark:bg-white font-bold text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Secure Idea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icons from lucide
function Maximize2({ size, className }: { size: number, className?: string }) {
  return <Grid size={size} className={className} />;
}