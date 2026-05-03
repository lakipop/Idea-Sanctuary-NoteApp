import { Note } from '../types/note.types';

const STORAGE_KEY = 'laki_notes';

export const getNotes = (): Note[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Note[];
  } catch (err) {
    console.error('Failed to parse notes from local storage:', err);
    return [];
  }
};

export const setNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to local storage:', err);
  }
};

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return Math.random().toString(36).substring(2, 15);
};