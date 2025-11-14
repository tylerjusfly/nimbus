'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { Email } from '@/lib/types';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, query, where, writeBatch, getDocs } from 'firebase/firestore';
import { generateMockEmails } from '@/lib/mock-emails';


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

// This function simulates the initial fetch from an IMAP server for a new account.
const populateInitialEmails = async (firestore: any, user: any, imapAccountId: string) => {
    console.log('Simulating initial IMAP sync for user:', user.uid);
    const emailsCollectionRef = collection(firestore, `users/${user.uid}/imap_accounts/${imapAccountId}/emails`);

    // Check if emails already exist to prevent re-populating
    const existingEmailsSnap = await getDocs(query(emailsCollectionRef, where('category', '==', 'inbox')));
    if (!existingEmailsSnap.empty) {
        console.log('Emails already exist. Skipping population.');
        return;
    }

    const mockEmails = generateMockEmails(25); // Generate 25 mock emails
    console.log('Generated mock emails:', mockEmails);

    const batch = writeBatch(firestore);

    mockEmails.forEach((emailData) => {
        const newEmailRef = doc(collection(firestore, `users/${user.uid}/imap_accounts/${imapAccountId}/emails`));
        batch.set(newEmailRef, {
            ...emailData,
            imapAccountId: imapAccountId,
        });
    });

    try {
        await batch.commit();
        console.log('Successfully populated Firestore with mock emails.');
    } catch (error) {
        console.error('Error populating mock emails:', error);
    }
};


export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // A real app would have a way to manage multiple IMAP accounts
  // For now, we'll assume a single, hardcoded (but representative) account ID.
  const imapAccountId = 'primary_account'; 

  // Effect to populate emails for a new user
  useEffect(() => {
    if (user && !isUserLoading && firestore) {
      populateInitialEmails(firestore, user, imapAccountId);
    }
  }, [user, isUserLoading, firestore, imapAccountId]);

  const emailsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
        collection(firestore, `users/${user.uid}/imap_accounts/${imapAccountId}/emails`),
        where('category', '!=', 'trash') // Fetch all non-trashed emails
    );
  }, [user, firestore, imapAccountId]);

  const { data: allEmails = [], isLoading: emailsLoading } = useCollection<Email>(emailsQuery);

  const emails = useMemo(() => {
      return allEmails.filter(email => email.category !== 'trash');
  }, [allEmails]);

  const updateEmail = async (id: string, updates: Partial<Email>) => {
    if (!user) return;
    const emailRef = doc(firestore, `users/${user.uid}/imap_accounts/${imapAccountId}/emails`, id);
    await updateDoc(emailRef, updates);
  };

  const archiveEmail = (id: string) => {
    updateEmail(id, { isArchived: true });
  };

  const deleteEmail = (id: string) => {
    updateEmail(id, { category: 'trash' });
  };

  const toggleRead = (id: string) => {
    const email = allEmails.find((e) => e.id === id);
    if (email) {
      updateEmail(id, { isRead: !email.isRead });
    }
  };

  const getEmailById = (id: string) => {
    return allEmails.find((email) => email.id === id);
  };
  
  const contextValue = useMemo(() => ({
    emails: emails,
    updateEmail,
    archiveEmail,
    deleteEmail,
    toggleRead,
    getEmailById,
    isLoading: isUserLoading || emailsLoading
  }), [emails, isUserLoading, emailsLoading, user]);

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
