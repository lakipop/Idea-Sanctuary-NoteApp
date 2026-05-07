import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Grid, Pin, Trash2, 
  CheckSquare, CheckCircle2, Circle, Sun, Moon,
  Type, Droplets, Palette, Image as ImageIcon,
  Upload, X, Settings2, PenLine
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
  { name: 'Pure Black', value: '#1a1a1a' },
  { name: 'Ochre', value: '#D4A044' },
  { name: 'Sage', value: '#82B2A7' },
  { name: 'Deep Sea', value: '#1e3a8a' },
];

export default function App() {
  // Using useState and localStorage for persistent theme management
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
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div className="shrink-0">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 font-display">IDEA SANCTUARY</h1>
          <p className="text-current opacity-40 font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs">Unleash Your Creative Mind</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-full lg:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative flex-1 min-w-[140px] md:min-w-[200px] lg:w-80 group shrink-0">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:text-[var(--color-accent)] transition-colors" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full py-2 md:py-3 pl-9 md:pl-12 pr-4 outline-none focus:border-[var(--color-accent)] transition-all font-medium text-xs md:text-sm text-current placeholder:text-current placeholder:opacity-30"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button 
              onClick={() => { addNote('checklist'); openEditor(null); }}
              className="px-4 py-2 md:py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-xs md:text-sm"
            >
              <CheckSquare size={16} className="opacity-60" />
              <span className="opacity-60">List</span>
            </button>
            <button 
              onClick={() => { addNote('text'); openEditor(null); }}
              className="px-4 py-2 md:py-3 rounded-full bg-[var(--color-accent)] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md text-xs md:text-sm"
            >
              <Plus size={16} />
              <span>Idea</span>
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
      <footer className="mt-20 py-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-60">Â© 2026 LSR Vidanaarachchi</p>
        <div className="flex flex-wrap items-center gap-3">
          <a 
            href="https://lakidev.me" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/30 dark:border-white/20 hover:bg-black/[0.08] dark:hover:bg-white/20 transition-all duration-300 group shadow-sm shrink-0"
          >
            <svg 
              className="h-4 w-4 animate-[spin_8s_linear_infinite] opacity-80" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              style={{ color: isDarkMode ? 'var(--color-accent)' : '#000000' }}
            >
              <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1 0-2H10V3a1 1 0 0 1 1-1zm1 18a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5.5a1 1 0 0 1 1-1h6.5a1 1 0 0 1 0 2H14V19a1 1 0 0 1-1 1z" />
            </svg>
            <span 
              className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              Portfolio: lakidev
            </span>
            <svg 
              className="h-4 w-4 animate-[spin_8s_linear_infinite_reverse] opacity-60" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              style={{ color: isDarkMode ? 'var(--color-accent)' : '#000000' }}
            >
              <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1 0-2H10V3a1 1 0 0 1 1-1zm1 18a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5.5a1 1 0 0 1 1-1h6.5a1 1 0 0 1 0 2H14V19a1 1 0 0 1-1 1z" />
            </svg>
          </a>
          <a 
            href="https://github.com/lakipop" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/30 dark:border-white/20 hover:bg-black/[0.08] dark:hover:bg-white/20 transition-all duration-300 group shrink-0 shadow-sm"
          >
            <svg 
              className="h-4 w-4 opacity-60" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span 
              className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60"
              style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
            >
              GitHub
            </span>
          </a>
        </div>
      </footer>

    </div>
  );
}

// --- Subcomponents ---

const isColorLight = (color: NoteColor) => {
  const lightColors = [
    NoteColor.YELLOW, 
    NoteColor.BLUE, 
    NoteColor.GREEN, 
    NoteColor.PINK, 
    NoteColor.PURPLE, 
    NoteColor.ORANGE
  ];
  return lightColors.includes(color);
};

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
    ? (isColorLight(note.color) ? 'var(--color-planner-dark)' : (note.bgImage ? '#ffffff' : (isDarkMode ? '#ffffff' : 'var(--color-planner-dark)'))) 
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
      {note.bgImage && <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10" />}
      
      <div className="relative z-10 p-5 md:p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <h3 className="text-lg md:text-2xl font-black tracking-tight leading-tight uppercase font-display max-w-[80%] break-words">
            {note.title || (note.type === 'checklist' ? 'Brain List' : 'Idea')}
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            className={`transition-colors ${note.pinned ? 'text-[var(--color-accent)]' : 'opacity-20 hover:opacity-100'}`}
          >
            <Pin className="w-4 h-4 md:w-[18px] md:h-[18px]" fill={note.pinned ? 'currentColor' : 'none'} />
          </button>
        </div>

        {note.type === 'checklist' ? (
          <div className="space-y-1.5 md:space-y-2 overflow-hidden flex-1">
            {note.tasks?.slice(0, 5).map((task: any) => (
              <div key={task.id} className="flex items-center gap-2 md:gap-3">
                {task.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 opacity-40" />
                )}
                <span className={`text-xs md:text-sm font-medium truncate ${task.completed ? 'line-through opacity-40' : ''}`}>{task.text}</span>
              </div>
            ))}
            {note.tasks && note.tasks.length > 5 && (
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">+{note.tasks.length - 5} more ideas</p>
            )}
          </div>
        ) : (
          <p className="text-xs md:text-sm font-medium line-clamp-6 opacity-60 flex-1 break-words leading-relaxed">
            {note.content || 'Start writing...'}
          </p>
        )}

        <div className="mt-4 md:mt-6 flex justify-between items-center pt-4 md:pt-6 border-t border-black/5 dark:border-white/5">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">
            {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-400/60 hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteEditor({ note, isDarkMode, onClose, onUpdate, titleRef, onToggleTask, onAddTask }: any) {
  const [newTaskText, setNewTaskText] = useState('');
  const [activeMobileTab, setActiveMobileTab] = useState<'content' | 'settings'>('content');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the title input when the editor opens
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

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
    ? (isColorLight(note.color) ? 'var(--color-planner-dark)' : (note.bgImage ? '#ffffff' : (isDarkMode ? '#ffffff' : 'var(--color-planner-dark)'))) 
    : note.fontColor;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div 
        className="relative overflow-hidden w-full max-w-5xl h-[80vh] md:h-[85vh] rounded-[40px] flex flex-col md:flex-row shadow-2xl border border-white/10 transition-all duration-500 note-editor-modal"
        style={{ 
          backgroundColor: note.bgImage ? 'transparent' : getNoteColor(note.color),
          backgroundImage: note.bgImage ? `url(${note.bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: note.opacity ?? 1
        }}
      >
        {note.bgImage && <div className="absolute inset-0 bg-black/40 z-0" />}

        {/* Header Toggle for Mobile */}
        <div className="md:hidden relative z-50 flex border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <button 
            onClick={() => setActiveMobileTab('content')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${activeMobileTab === 'content' ? 'bg-[var(--color-accent)] text-white' : 'opacity-40'}`}
          >
            <PenLine size={16} /> Write
          </button>
          <button 
            onClick={() => setActiveMobileTab('settings')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${activeMobileTab === 'settings' ? 'bg-[var(--color-accent)] text-white' : 'opacity-40'}`}
          >
            <Settings2 size={16} /> Config
          </button>
          <button 
            onClick={onClose}
            className="px-6 border-l border-white/10 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={20} />
          </button>
        </div>

        {/* Left Side: Sidebar Settings */}
        <div 
          className={`relative z-10 w-full md:w-72 border-r border-black/5 dark:border-white/5 p-8 flex flex-col gap-8 bg-black/10 backdrop-blur-sm overflow-y-auto custom-scrollbar ${activeMobileTab === 'settings' ? 'flex' : 'hidden md:flex'}`}
          style={{ color: textColor }}
        >
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 block flex items-center gap-2">
              <Grid size={12} /> Note Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['small', 'medium', 'large', 'wide', 'tall', 'half-tall'] as any[]).map(size => (
                <button 
                  key={size}
                  onClick={() => onUpdate({ size })}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${note.size === size ? 'bg-[var(--color-accent)] text-white shadow-sm' : 'bg-black/10 dark:bg-white/5 opacity-40 hover:opacity-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 block flex items-center gap-2">
              <Palette size={12} /> Palette
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(NoteColor).map(color => (
                <button 
                  key={color}
                  onClick={() => onUpdate({ color, bgImage: undefined })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${note.color === color ? 'border-white scale-110 shadow-sm' : 'border-transparent'}`}
                  style={{ backgroundColor: color === 'DEFAULT' ? '#333' : `var(--color-note-${color.toLowerCase()})` }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 block flex items-center gap-2">
              <Type size={12} /> Font Color
            </label>
            <div className="flex flex-wrap gap-2">
              {FONT_COLORS.map(fc => (
                <button 
                  key={fc.value}
                  onClick={() => onUpdate({ fontColor: fc.value })}
                  className={`w-6 h-6 rounded-md border border-white/10 transition-transform hover:scale-110 ${note.fontColor === fc.value ? 'ring-2 ring-white scale-110 shadow-sm' : ''}`}
                  style={{ backgroundColor: fc.value === 'inherit' ? '#666' : fc.value }}
                  title={fc.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 block flex items-center gap-2">
              <Droplets size={12} /> Opacity ({Math.round((note.opacity ?? 1) * 100)}%)
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1" 
              value={note.opacity ?? 1}
              onChange={(e) => onUpdate({ opacity: parseFloat(e.target.value) })}
              className="w-full accent-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 block flex items-center gap-2">
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
                className="aspect-video rounded-xl border border-dashed border-black/20 dark:border-white/20 flex flex-col items-center justify-center bg-white/5 opacity-40 hover:opacity-100 transition-all"
              >
                <Upload size={16} />
                <span className="text-[8px] font-bold mt-1">Upload</span>
              </button>
              <button 
                onClick={() => onUpdate({ bgImage: undefined })}
                className="aspect-video rounded-xl border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center text-[10px] font-bold uppercase opacity-40 hover:opacity-100 hover:bg-white/5 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Main Content */}
        <div className={`relative z-10 flex-1 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar bg-transparent ${activeMobileTab === 'content' ? 'flex' : 'hidden md:flex'}`} style={{ color: textColor }}>
          {/* Desktop Close Button */}
          <button 
            onClick={onClose}
            className="hidden md:block absolute right-8 top-8 opacity-20 hover:opacity-100 transition-opacity"
          >
            <X size={24} />
          </button>

          <input 
            ref={titleRef}
            type="text"
            value={note.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder={note.type === 'checklist' ? 'Brain List Title...' : 'Idea Title...'}
            className="bg-transparent border-none outline-none text-4xl md:text-5xl font-black tracking-tighter mb-8 placeholder:opacity-40 font-display"
            style={{ color: textColor }}
          />

          {note.type === 'checklist' ? (
            <div className="space-y-4">
              {note.tasks?.map((task: any) => (
                <div key={task.id} className="flex items-center gap-4 group">
                  <button onClick={() => onToggleTask(task.id)} className="text-[var(--color-accent)]">
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-20 group-hover:opacity-100" />}
                  </button>
                  <span className={`text-lg md:text-xl font-medium ${task.completed ? 'line-through opacity-30' : ''}`}>{task.text}</span>
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
                  className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-medium placeholder:opacity-40"
                  style={{ color: textColor }}
                />
              </div>
            </div>
          ) : (
            <textarea 
              value={note.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Spill your creative thoughts..."
              className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-medium leading-relaxed resize-none placeholder:opacity-30 min-h-[300px]"
              style={{ color: textColor }}
            />
          )}

          <div className="mt-12 flex justify-end gap-4">
            <button 
              onClick={onClose}
              className="px-10 py-3 rounded-full bg-[var(--color-accent)] text-white font-bold hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Secure Idea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
