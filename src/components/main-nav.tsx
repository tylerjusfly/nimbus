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
import { Separator } from './ui/separator';

export function MainNav() {
  const pathname = usePathname();
  const { emails } = useEmails();

  const inboxCount = emails.filter(
    (e) => !e.isArchived && !e.isRead,
  ).length;

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/'}
              tooltip="Inbox"
            >
              <Link href="/">
                <Inbox />
                <span>Inbox</span>
                {inboxCount > 0 && <SidebarMenuBadge>{inboxCount}</SidebarMenuBadge>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/archived'}
              tooltip="Archived"
            >
              <Link href="/archived">
                <Archive />
                <span>Archived</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>

        {/* <Separator className="my-2" /> */}

        {/* <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Tag className="mr-2" />
            <span>Labels</span>
          </SidebarGroupLabel>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/setup'} tooltip="Setup">
              <Link href="/setup">
                <Settings />
                <span>Setup</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-1" />
        <AccountSwitcher />
      </SidebarFooter>
    </>
  );
}
