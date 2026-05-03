import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Note, NoteColor } from '../types/note.types';
import { getNotes, setNotes, generateId } from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotesState] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  // Initialize on mount
  useEffect(() => {
    setNotesState(getNotes());
    setIsInitialized(true);
  }, []);

  // Sync to storage whenever notes change
  useEffect(() => {
    if (isInitialized) {
      setNotes(notes);
    }
  }, [notes, isInitialized]);

  // Focus title when editingId changes
  useEffect(() => {
    if (editingId && titleRef.current) {
        setTimeout(() => {
            titleRef.current?.focus();
        }, 50); // slight delay for transition
    }
  }, [editingId]);

  const addNote = useCallback(() => {
    const newNote: Note = {
      id: generateId(),
      title: '',
      content: '',
      color: NoteColor.DEFAULT,
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
    if (editingId === id) {
      setEditingId(null);
    }
  }, [editingId]);

  const togglePin = useCallback((id: string) => {
    setNotesState(prev => 
      prev.map(note => 
        note.id === id ? { ...note, pinned: !note.pinned, updatedAt: Date.now() } : note
      )
    );
  }, []);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const sorted = [...notes].sort((a, b) => {
      // Sort pinned first, then by updated date
      if (a.pinned === b.pinned) {
        return b.updatedAt - a.updatedAt;
      }
      return a.pinned ? -1 : 1;
    });

    if (!q) return sorted;

    return sorted.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  const activeNote = useMemo(() => {
    if (!editingId) return null;
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
    togglePin
  };
};