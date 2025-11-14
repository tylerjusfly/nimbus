import { faker } from '@faker-js/faker';
import type { Email } from './types';

// Function to generate a single mock email
const createRandomEmail = (): Omit<Email, 'id' | 'imapAccountId'> => {
  const sentDate = faker.date.recent({ days: 30 });
  const isRead = faker.datatype.boolean(0.7); // 70% chance of being read

  // Define possible labels
  const labels = ['work', 'personal', 'finance', 'travel'];
  const numLabels = faker.number.int({ min: 0, max: 2 });
  const selectedLabels = faker.helpers.shuffle(labels).slice(0, numLabels);

  return {
    sender: faker.internet.email(),
    recipients: [faker.internet.email()],
    subject: faker.lorem.sentence({min: 3, max: 8}),
    body: `<p>${faker.lorem.paragraphs({min: 2, max: 5}, '</p><p>')}</p>`,
    sentDate: sentDate.toISOString(),
    isRead,
    isArchived: false,
    labels: selectedLabels,
    category: 'inbox',
  };
};

// Function to generate a specified number of mock emails
export const generateMockEmails = (count: number): Omit<Email, 'id' | 'imapAccountId'>[] => {
  return Array.from({ length: count }, createRandomEmail);
};
