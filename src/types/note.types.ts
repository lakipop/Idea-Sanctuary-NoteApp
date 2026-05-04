export enum NoteColor {
  DEFAULT = 'DEFAULT',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  PINK = 'PINK',
  PURPLE = 'PURPLE',
  ORANGE = 'ORANGE',
  OCHRE = 'OCHRE', // From noteappcolors.jpg
  SAGE = 'SAGE'    // From noteappcolors.jpg
}

export type NoteSize = 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'half-tall';

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
  opacity: number; // New: 0 to 1
  fontColor: string; // New: hex or CSS var
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
