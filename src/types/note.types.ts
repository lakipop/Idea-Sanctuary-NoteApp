export enum NoteColor {
  DEFAULT = 'DEFAULT',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  PINK = 'PINK'
}

export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}
