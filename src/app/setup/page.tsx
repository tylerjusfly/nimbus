import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SetupPage() {
  const forwardingEmail = 'your-unique-address@nimbusmail.app';

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold tracking-tight">Setup Forwarding</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <Card className="mx-auto max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Connect Your Email</CardTitle>
            <CardDescription>
              To start using NimbusMail, forward your emails to your unique address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="forwarding-email" className="text-sm font-medium">
                Your Unique NimbusMail Address
              </label>
              <div className="flex space-x-2">
                <Input id="forwarding-email" value={forwardingEmail} readOnly />
                <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(forwardingEmail)}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Copy this address and follow the instructions for your email provider below.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">Gmail</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal space-y-2 pl-6 text-sm">
                    <li>On your computer, open Gmail using the account you want to forward messages from.</li>
                    <li>In the top right, click <strong>Settings {'>'} See all settings</strong>.</li>
                    <li>Click the <strong>Forwarding and POP/IMAP</strong> tab.</li>
                    <li>In the "Forwarding" section, click <strong>Add a forwarding address</strong>.</li>
                    <li>Enter your unique NimbusMail address: <strong>{forwardingEmail}</strong>.</li>
                    <li>Click <strong>Next {'>'} Proceed {'>'} OK</strong>.</li>
                    <li>A verification message will be sent to your NimbusMail inbox. Click the verification link in that email.</li>
                    <li>Back in your Gmail settings, refresh the page and select <strong>Forward a copy of incoming mail to</strong>.</li>
                    <li>Choose what you want Gmail to do with your emails, like keep a copy in the inbox.</li>
                    <li>Click <strong>Save Changes</strong> at the bottom of the page.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold">Outlook</AccordionTrigger>
                <AccordionContent>
                <ol className="list-decimal space-y-2 pl-6 text-sm">
                    <li>In Outlook.com, at the top of the page, select <strong>Settings {'>'} View all Outlook settings</strong>.</li>
                    <li>Select <strong>Mail {'>'} Forwarding</strong>.</li>
                    <li>Select <strong>Enable forwarding</strong>.</li>
                    <li>Enter your unique NimbusMail address: <strong>{forwardingEmail}</strong>.</li>
                    <li>If you want, select the <strong>Keep a copy of forwarded messages</strong> check box.</li>
                    <li>Select <strong>Save</strong>.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold">Apple Mail (iCloud)</AccordionTrigger>
                <AccordionContent>
                <ol className="list-decimal space-y-2 pl-6 text-sm">
                    <li>On iCloud.com, click the gear icon in the sidebar and choose <strong>Settings</strong>.</li>
                    <li>Under the "Forwarding" section, select <strong>Forward my email to</strong>.</li>
                    <li>Enter your unique NimbusMail address: <strong>{forwardingEmail}</strong>.</li>
                    <li>If you wish, select <strong>Delete messages after forwarding</strong>.</li>
                    <li>Click <strong>Done</strong>. All future emails to your iCloud address will be forwarded.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
