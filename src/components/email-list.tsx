'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Email } from '@/lib/types';
import { useEmails } from '@/providers/email-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Archive, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface EmailListProps {
  emails: Email[];
}

export function EmailList({ emails }: EmailListProps) {
  const { archiveEmail, deleteEmail } = useEmails();
  const { toast } = useToast();

  const handleArchive = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    archiveEmail(id);
    toast({ title: "Email archived." });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    deleteEmail(id);
    toast({ title: "Email moved to trash.", variant: 'destructive' });
  };
  
  if (emails.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        <p>No emails here. Everything's sorted!</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <ul className="flex flex-col">
        {emails.map((email) => (
          <li key={email.id}>
            <Link
              href={`/email/${email.id}`}
              className={cn(
                'group flex cursor-pointer items-start gap-4 border-b p-4 transition-colors hover:bg-card',
                !email.isRead ? 'bg-secondary/50' : 'bg-transparent'
              )}
            >
              <div
                className={cn(
                  'mt-1 h-2 w-2 shrink-0 rounded-full',
                  !email.isRead ? 'bg-primary' : 'bg-transparent'
                )}
                aria-label={!email.isRead ? 'Unread' : 'Read'}
              />
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {email.sender.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-baseline justify-between">
                  <p
                    className={cn(
                      'truncate text-sm font-medium',
                      !email.isRead && 'font-bold'
                    )}
                  >
                    {email.sender}
                  </p>
                  <time
                    className={cn(
                      'ml-4 shrink-0 text-xs text-muted-foreground',
                      !email.isRead && 'font-semibold text-foreground'
                    )}
                  >
                    {formatDistanceToNow(new Date(email.sentDate), {
                      addSuffix: true,
                    })}
                  </time>
                </div>
                <p
                  className={cn(
                    'truncate text-sm',
                    !email.isRead ? 'font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {email.subject}
                </p>
                
              </div>

              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={(e) => handleArchive(e, email.id)}>
                      <Archive className="h-4 w-4" />
                      <span className="sr-only">Archive</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Archive</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={(e) => handleDelete(e, email.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
