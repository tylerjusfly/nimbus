'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Email } from '@/lib/types';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, query, where } from 'firebase/firestore';

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
  const { user } = useUser();
  const firestore = useFirestore();

  // A real app would have a way to manage multiple IMAP accounts
  // For now, we'll assume a single, hardcoded (but representative) account ID.
  const imapAccountId = 'primary_account'; 

  const emailsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
        collection(firestore, `users/${user.uid}/imap_accounts/${imapAccountId}/emails`),
        where('isArchived', '==', false) // Example: only fetch non-archived emails
    );
  }, [user, firestore, imapAccountId]);

  const { data: emails = [], isLoading } = useCollection<Email>(emailsQuery);

  const updateEmail = async (id: string, updates: Partial<Email>) => {
    if (!user) return;
    const emailRef = doc(firestore, `users/${user.uid}/imap_accounts/${imapAccountId}/emails`, id);
    await updateDoc(emailRef, updates);
  };

  const archiveEmail = (id: string) => {
    updateEmail(id, { isArchived: true, category: 'archived' });
  };

  const deleteEmail = (id: string) => {
    updateEmail(id, { category: 'trash' });
  };

  const toggleRead = (id: string) => {
    const email = emails.find((e) => e.id === id);
    if (email) {
      updateEmail(id, { isRead: !email.isRead });
    }
  };

  const getEmailById = (id: string) => {
    return emails.find((email) => email.id === id);
  };
  
  const contextValue = useMemo(() => ({
    emails: emails || [],
    updateEmail,
    archiveEmail,
    deleteEmail,
    toggleRead,
    getEmailById,
    isLoading
  }), [emails, isLoading, user]);

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
