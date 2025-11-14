import type { Email, Label } from './types';

export const labels: Label[] = [
  { name: 'work', color: 'bg-blue-500' },
  { name: 'personal', color: 'bg-green-500' },
  { name: 'finance', color: 'bg-yellow-500' },
  { name: 'travel', color: 'bg-purple-500' },
];

export const emails: Email[] = [
  {
    id: '1',
    from: { name: 'Brenda', email: 'brenda@example.com', avatar: 'https://picsum.photos/seed/1/40/40' },
    subject: 'Project Update: Q3 Milestones',
    body: `
      <p>Hi team,</p>
      <p>Here's a quick update on our Q3 progress. We're on track to meet all our key milestones. The design team has finalized the new UI, and development is 70% complete on the new features.</p>
      <p>You can view the latest mockups <a href="#" class="text-primary underline">here</a>.</p>
      <p>Let's keep up the great work!</p>
      <br/>
      <p>Best,</p>
      <p>Brenda</p>
    `,
    date: '2024-07-29T10:30:00Z',
    read: false,
    labels: ['work'],
    category: 'inbox',
  },
  {
    id: '2',
    from: { name: 'Alex', email: 'alex@example.com', avatar: 'https://picsum.photos/seed/2/40/40' },
    subject: 'Weekend Plans?',
    body: `
      <p>Hey,</p>
      <p>Are you free this weekend? A few of us are planning a hike on Saturday morning. Let me know if you'd like to join!</p>
      <p>Cheers,</p>
      <p>Alex</p>
      <img src="https://picsum.photos/seed/101/600/400" alt="Landscape" style="max-width: 100%; border-radius: 8px; margin-top: 1rem;" data-ai-hint="mountain landscape"/>
    `,
    date: '2024-07-29T09:15:00Z',
    read: true,
    labels: ['personal'],
    category: 'inbox',
  },
  {
    id: '3',
    from: { name: 'Innovate Bank', email: 'noreply@innovatebank.com', avatar: 'https://picsum.photos/seed/3/40/40' },
    subject: 'Your monthly statement is ready',
    body: `
      <p>Dear Customer,</p>
      <p>Your monthly statement for July 2024 is now available. Please log in to your account to view and download it.</p>
      <p>Thank you for banking with Innovate Bank.</p>
    `,
    date: '2024-07-28T15:00:00Z',
    read: true,
    labels: ['finance'],
    category: 'inbox',
  },
  {
    id: '4',
    from: { name: 'SkyHigh Airlines', email: 'bookings@skyhigh.com', avatar: 'https://picsum.photos/seed/4/40/40' },
    subject: 'Your flight to Tokyo is confirmed!',
    body: `
      <h1>Flight Confirmation</h1>
      <p>Thank you for booking with SkyHigh Airlines. Your flight to Tokyo (HND) is confirmed for August 15, 2024.</p>
      <p><strong>Booking Reference:</strong> XYZ123</p>
      <p>We look forward to welcoming you on board.</p>
    `,
    date: '2024-07-27T18:45:00Z',
    read: false,
    labels: ['travel', 'personal'],
    category: 'inbox',
  },
  {
    id: '5',
    from: { name: 'Sarah', email: 'sarah@example.com', avatar: 'https://picsum.photos/seed/5/40/40' },
    subject: 'Re: Project Update: Q3 Milestones',
    body: `
      <p>Thanks for the update, Brenda! The mockups look fantastic. The team is really excited to see it all come together.</p>
      <p>Best,</p>
      <p>Sarah</p>
    `,
    date: '2024-07-29T11:00:00Z',
    read: true,
    labels: ['work'],
    category: 'inbox',
  },
  {
    id: '6',
    from: { name: 'Old Friend', email: 'old.friend@example.com', avatar: 'https://picsum.photos/seed/6/40/40' },
    subject: 'Catch up soon?',
    body: `
      <p>Hey there,</p>
      <p>It's been a while! I was thinking it would be great to catch up. I've archived this message to deal with later.</p>
      <p>Let me know when you're free.</p>
    `,
    date: '2024-06-10T12:00:00Z',
    read: true,
    labels: ['personal'],
    category: 'archived',
  },
    {
    id: '7',
    from: { name: 'Design Conf', email: 'hello@designconf.com', avatar: 'https://picsum.photos/seed/7/40/40' },
    subject: 'Early bird tickets ending soon!',
    body: `
      <p>Hi there!</p>
      <p>Just a friendly reminder that early bird tickets for Design Conf 2024 end this Friday. Get yours now and save 20%!</p>
      <p>Hope to see you there!</p>
    `,
    date: '2024-07-26T09:00:00Z',
    read: false,
    labels: ['work'],
    category: 'inbox',
  },
  {
    id: '8',
    from: { name: 'Local Eats', email: 'orders@localeats.com', avatar: 'https://picsum.photos/seed/8/40/40' },
    subject: 'Your order has been delivered',
    body: `
      <p>Enjoy your meal!</p>
      <p>Your order from 'The Best Pizza Place' has been delivered. We hope you enjoy it!</p>
      <p>Please rate your experience in our app.</p>
    `,
    date: '2024-07-25T19:20:00Z',
    read: true,
    labels: [],
    category: 'archived',
  },
];
