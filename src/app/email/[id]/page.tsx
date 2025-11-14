'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEmails } from '@/providers/email-provider';
import { EmailDisplay } from '@/components/email-display';
import { Skeleton } from '@/components/ui/skeleton';

export default function EmailPage({ params }: { params: { id: string } }) {
  const { getEmailById, updateEmail } = useEmails();
  const router = useRouter();
  
  const email = getEmailById(params.id);

  useEffect(() => {
    if (email && !email.isRead) {
      updateEmail(params.id, { isRead: true });
    }
  }, [email, params.id, updateEmail]);

  if (!email) {
    // Can show a loading state or a not found message
    // Redirect if email not found after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!email) { // Re-check if email is still not found
                router.push('/');
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [router, email]);

    return (
        <div className="p-8 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-48 w-full" />
        </div>
    );
  }

  return <EmailDisplay email={email} />;
}
