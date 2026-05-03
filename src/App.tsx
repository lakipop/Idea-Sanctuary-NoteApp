import { useNotes } from './hooks/useNotes';
import { NoteToolbar } from './components/NoteToolbar';
import { NotesGrid } from './components/NotesGrid';
import { NoteEditor } from './components/NoteEditor';

export default function App() {
  const {
    filteredNotes,
    searchQuery,
    setSearchQuery,
    activeNote,
    editingId,
    setEditingId,
    titleRef,
    addNote,
    updateNote,
    deleteNote,
    togglePin
  } = useNotes();

  return (
    <div className="min-h-screen flex flex-col relative w-full">
      <NoteToolbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNote={addNote}
      />
      
      <main className="flex-1 w-full max-w-screen-2xl mx-auto">
        <NotesGrid 
          notes={filteredNotes}
          onEdit={setEditingId}
          onDelete={deleteNote}
          onTogglePin={togglePin}
        />
      </main>

      {editingId && (
        <NoteEditor 
          note={activeNote}
          onClose={() => setEditingId(null)}
          onUpdate={updateNote}
          titleRef={titleRef}
        />
      )}
    </div>
  );
}