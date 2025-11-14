import { type DocumentData } from 'firebase/firestore';

export interface Email extends DocumentData {
  id: string;
  sender: string;
  recipients: string[];
  subject: string;
  body: string;
  sentDate: string; // ISO 8601 date string
  isRead: boolean;
  isArchived: boolean;
  labels: string[];
  category: 'inbox' | 'archived' | 'trash';
}

export type Label = {
  name: string;
  color: string;
};
