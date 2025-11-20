'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { Email } from '@/lib/types';
import { generateMockEmails } from '@/lib/mock-emails';
import { v4 as uuidv4 } from 'uuid';

interface EmailContextType {
  emails: Email[];
  updateEmail: (id: string, updates: Partial<Email>) => void;
  archiveEmail: (id: string) => void;
  deleteEmail: (id: string) => void;
  toggleRead: (id: string) => void;
  getEmailById: (id: string) => Email | undefined;
  isLoading: boolean;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const populateInitialEmails = async () => {
      setIsLoading(true);
      let apiEmail = null;
      try {
        const response = await fetch('/api/email');
        if (response.ok) {
          apiEmail = await response.json();
        }
      } catch (error) {
        console.error('Failed to fetch email from API', error);
      }

     

      let allEmails = [];

      if (apiEmail) {
        allEmails.unshift({
          id: uuidv4(),
          imapAccountId: 'primary_account',
          sender: apiEmail.from.text,
          recipients: ['recipient@example.com'], // Placeholder
          subject: apiEmail.subject,
          body: apiEmail.html || apiEmail.text,
          sentDate: apiEmail.date || new Date().toISOString(),
          isRead: false,
          isArchived: false,
          labels: [],
          category: 'inbox',
        });
      }

      setEmails(allEmails);
      setIsLoading(false);
    };

    populateInitialEmails();
  }, []);

  const updateEmail = (id: string, updates: Partial<Email>) => {
    setEmails(currentEmails =>
      currentEmails.map(email =>
        email.id === id ? { ...email, ...updates } : email
      )
    );
  };

  const archiveEmail = (id: string) => {
    updateEmail(id, { isArchived: true });
  };

  const deleteEmail = (id: string) => {
    updateEmail(id, { category: 'trash' });
  };

  const toggleRead = (id: string) => {
    const email = emails.find(e => e.id === id);
    if (email) {
      updateEmail(id, { isRead: !email.isRead });
    }
  };

  const getEmailById = (id: string) => {
    return emails.find(email => email.id === id);
  };

  const contextValue = useMemo(() => ({
    emails,
    updateEmail,
    archiveEmail,
    deleteEmail,
    toggleRead,
    getEmailById,
    isLoading,
  }), [emails, isLoading]);

  return (
    <EmailContext.Provider value={contextValue}>
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
