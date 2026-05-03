export enum NoteColor {
  DEFAULT = 'DEFAULT',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  PINK = 'PINK',
  PURPLE = 'PURPLE',
  ORANGE = 'ORANGE'
}

export type NoteSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown or plain text
  type: 'text' | 'checklist';
  tasks?: TaskItem[] | undefined;
  color: NoteColor;
  bgImage?: string | undefined; // Unsplash URL or preset
  size: NoteSize;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
