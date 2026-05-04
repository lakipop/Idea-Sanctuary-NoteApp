import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Note, NoteColor, TaskItem } from '../types/note.types';
import { getNotes, setNotes, generateId } from '../utils/storage';

export const useNotes = () => {
  // Using useState to manage the list of notes
  const [notes, setNotesState] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //  Load notes from localStorage on initial mount
    setNotesState(getNotes());
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    //  Persist notes to localStorage whenever the list changes
    if (isInitialized) {
      setNotes(notes);
    }
  }, [notes, isInitialized]);

  const addNote = useCallback((type: 'text' | 'checklist' = 'text') => {
    const newNote: Note = {
      id: generateId(),
      title: '',
      content: '',
      type,
      tasks: type === 'checklist' ? [] : undefined,
      color: NoteColor.DEFAULT,
      size: 'medium',
      opacity: 1,
      fontColor: 'inherit',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pinned: false
    };
    setNotesState(prev => [newNote, ...prev]);
    setEditingId(newNote.id);
  }, []);

  const updateNote = useCallback((id: string, partial: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    setNotesState(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...partial, updatedAt: Date.now() } 
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotesState(prev => prev.filter(n => n.id !== id));
    if (editingId === id) setEditingId(null);
  }, [editingId]);

  const togglePin = useCallback((id: string) => {
    setNotesState(prev => 
      prev.map(note => 
        note.id === id ? { ...note, pinned: !note.pinned, updatedAt: Date.now() } : note
      )
    );
  }, []);

  const addTask = useCallback((noteId: string, text: string) => {
    const newTask: TaskItem = { id: generateId(), text, completed: false };
    setNotesState(prev => prev.map(note => 
      note.id === noteId ? { 
        ...note, 
        tasks: [...(note.tasks ?? []), newTask],
        updatedAt: Date.now() 
      } : note
    ));
  }, []);

  const toggleTask = useCallback((noteId: string, taskId: string) => {
    setNotesState(prev => prev.map(note => 
      note.id === noteId ? { 
        ...note, 
        tasks: note.tasks?.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) ?? [],
        updatedAt: Date.now() 
      } : note
    ));
  }, []);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const sorted = [...notes].sort((a, b) => {
      if (a.pinned === b.pinned) return b.updatedAt - a.updatedAt;
      return a.pinned ? -1 : 1;
    });
    if (!q) return sorted;
    return sorted.filter(n => 
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  const activeNote = useMemo(() => {
    return notes.find(n => n.id === editingId) || null;
  }, [notes, editingId]);

  return {
    notes,
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
    togglePin,
    addTask,
    toggleTask
  };
};