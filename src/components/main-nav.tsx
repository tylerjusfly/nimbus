'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Archive, Inbox, Settings, Tag, Trash2 } from 'lucide-react';
import { Logo } from './logo';
import { AccountSwitcher } from './account-switcher';
import { useEmails } from '@/providers/email-provider';
import { labels } from '@/lib/data';
import { Separator } from './ui/separator';

export function MainNav() {
  const pathname = usePathname();
  const { emails } = useEmails();

  const inboxCount = emails.filter(
    (e) => e.category === 'inbox' && !e.read
  ).length;

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === '/'}
                tooltip="Inbox"
              >
                <Inbox />
                <span>Inbox</span>
                {inboxCount > 0 && <SidebarMenuBadge>{inboxCount}</SidebarMenuBadge>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/archived" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === '/archived'}
                tooltip="Archived"
              >
                <Archive />
                <span>Archived</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Tag className="mr-2" />
            <span>Labels</span>
          </SidebarGroupLabel>
          <SidebarMenu>
            {labels.map((label) => (
              <SidebarMenuItem key={label.name}>
                <SidebarMenuButton
                  className="justify-start"
                  size="sm"
                  variant="ghost"
                  tooltip={label.name}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${label.color}`}
                  ></span>
                  <span className="capitalize">{label.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/setup" legacyBehavior passHref>
              <SidebarMenuButton isActive={pathname === '/setup'} tooltip="Setup">
                <Settings />
                <span>Setup</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-1" />
        <AccountSwitcher />
      </SidebarFooter>
    </>
  );
}
