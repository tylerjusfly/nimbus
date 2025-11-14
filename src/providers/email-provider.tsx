'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Email } from '@/lib/types';
import { emails as initialEmails } from '@/lib/data';

interface EmailContextType {
  emails: Email[];
  updateEmail: (id: string, updates: Partial<Email>) => void;
  archiveEmail: (id: string) => void;
  deleteEmail: (id: string) => void;
  toggleRead: (id: string) => void;
  getEmailById: (id: string) => Email | undefined;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);

  const updateEmail = (id: string, updates: Partial<Email>) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, ...updates } : email
      )
    );
  };
  
  const archiveEmail = (id: string) => {
    updateEmail(id, { category: 'archived' });
  };
  
  const deleteEmail = (id: string) => {
    updateEmail(id, { category: 'trash' });
  };

  const toggleRead = (id: string) => {
    const email = emails.find(e => e.id === id);
    if(email) {
      updateEmail(id, { read: !email.read });
    }
  };

  const getEmailById = (id: string) => {
    return emails.find((email) => email.id === id);
  };

  return (
    <EmailContext.Provider value={{ emails, updateEmail, archiveEmail, deleteEmail, toggleRead, getEmailById }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmails = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmails must be used within an EmailProvider');
  }
  return context;
};
