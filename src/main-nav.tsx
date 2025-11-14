export function MainNav() {
  const pathname = usePathname();
  const { emails } = useEmails();

  const inboxCount = emails.filter(
    (e) => e.category === 'inbox' && !e.isRead,
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
