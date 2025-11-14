'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import {
  Archive,
  ArrowLeft,
  Clock,
  MoreVertical,
  Trash2,
  Mail,
} from 'lucide-react';

import type { Email } from '@/lib/types';
import { labels as allLabels } from '@/lib/data';
import { useEmails } from '@/providers/email-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from './ui/sidebar';

interface EmailDisplayProps {
  email: Email;
}

export function EmailDisplay({ email }: EmailDisplayProps) {
  const router = useRouter();
  const { archiveEmail, deleteEmail, toggleRead } = useEmails();
  const { toast } = useToast();

  const handleArchive = () => {
    archiveEmail(email.id);
    toast({ title: 'Email archived.' });
    router.push('/');
  };

  const handleDelete = () => {
    deleteEmail(email.id);
    toast({ title: 'Email moved to trash.', variant: 'destructive' });
    router.push('/');
  };

  const handleToggleRead = () => {
    toggleRead(email.id);
    toast({ title: email.isRead ? 'Marked as unread.' : 'Marked as read.' });
  };

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col">
        <div className="flex items-center p-2 border-b">
          <SidebarTrigger className="md:hidden mr-2" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleArchive}>
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>More</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleToggleRead}>
                  <Mail className="mr-2 h-4 w-4" />
                  {email.isRead ? 'Mark as unread' : 'Mark as read'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-auto">
          <div className="flex items-start p-4 md:p-6">
            <div className="flex items-start gap-4 text-sm">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {email.sender.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{email.sender}</div>
                 <div className="line-clamp-1 text-xs text-muted-foreground">
                  {email.recipients.join(', ')}
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              {format(new Date(email.sentDate), 'PPpp')}
              <Clock className="h-3 w-3" />
            </div>
          </div>
          <Separator />
          <div className="whitespace-pre-wrap p-4 md:p-6 text-sm">
            <h2 className="text-xl font-bold mb-4">{email.subject}</h2>
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: email.body }}
            />
          </div>
          {email.labels.length > 0 && (
            <>
              <Separator />
              <div className="p-4 md:p-6 text-sm">
                <div className="flex items-center gap-2">
                  {email.labels.map((labelName) => {
                     const labelInfo = allLabels.find(l => l.name === labelName);
                    return (
                      <span
                        key={labelName}
                        className={cn('rounded-full px-3 py-1 text-xs text-white', labelInfo?.color || 'bg-gray-500')}
                      >
                        {labelName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
