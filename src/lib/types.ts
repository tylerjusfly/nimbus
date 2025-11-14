export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  subject: string;
  body: string;
  date: string;
  read: boolean;
  labels: string[];
  category: 'inbox' | 'archived' | 'trash';
}

export type Label = {
  name: string;
  color: string;
};
