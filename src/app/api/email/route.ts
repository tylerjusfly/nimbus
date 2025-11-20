import { NextResponse } from 'next/server';
import { ImapFlow } from 'imapflow';

export async function GET() {
  const client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
      user: process.env.IMAP_USER || 'your_email@gmail.com',
      pass: process.env.IMAP_PASS || 'your_app_password'
    },
    logger: false
  });

  try {
    await client.connect();
    let lock = await client.getMailboxLock('INBOX');
    const emails = [];

    try {
      const total = client.mailbox.exists;

      if (total > 0) {
        const fetchCount = 10;
        const start = Math.max(1, total - fetchCount + 1);
        const range = `${start}:*`;

        // Fetch Envelope (Metadata only)
        for await (let msg of client.fetch(range, { envelope: true, uid: true })) {
          
          // --- SAFE PARSING LOGIC ---
          
          // 1. Get Subject safely
          const subject = msg.envelope.subject || '(No Subject)';

          // 2. Get Sender safely
          // 'from' is an array. We check if it exists and has at least one item.
          const senderInfo = msg.envelope.from && msg.envelope.from[0] 
            ? msg.envelope.from[0] 
            : { name: 'Unknown', address: 'unknown@sender.com' };

          // 3. Push to array
          emails.push({
            id: msg.uid,
            seq: msg.seq,
            subject: subject,
            from: senderInfo.address,
            fromName: senderInfo.name || senderInfo.address, // Fallback to address if name is missing
            date: msg.envelope.date,
            snippet: 'Load full email to see content...' // Envelope does not contain body text
          });
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
    
    // Reverse to show newest at the top
    emails.reverse();

    return NextResponse.json(emails);
  } catch (error) {
    console.error('IMAP Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' }, 
      { status: 500 }
    );
  }
}