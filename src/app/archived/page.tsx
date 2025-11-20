'use client';

import { useState } from 'react';
import { useEmails } from '@/providers/email-provider';
import { EmailList } from '@/components/email-list';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArchivedPage() {
  const { emails, isLoading } = useEmails();
  const archivedEmails = emails.filter((email) => email.isArchived);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold tracking-tight">Archived</h1>
      </header>
      <main className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <EmailList emails={archivedEmails} />
        )}
      </main>
    </div>
  );
}
