# NimbusMail

NimbusMail is a modern, elegant email client designed to streamline your inbox experience. It allows you to connect your external IMAP accounts (like Gmail and Outlook) and manage your emails with a clean, intuitive interface. This project is built with a focus on security, real-time synchronization, and a great user experience.

## Features

*   **External IMAP Account Integration:** Securely connect to your Gmail, Outlook, or other IMAP accounts using OAuth.
*   **Simulated Real-Time Email Sync:** For development, the app simulates fetching emails from an IMAP server and populates Firestore with a set of realistic mock emails for new users.
*   **Two-Way Status Synchronization:** Changes to email statuses (like read/unread) are synced back to the IMAP server.
*   **Modern UI:** A beautiful and responsive user interface built with ShadCN UI and Tailwind CSS.
*   **Firebase Integration:** Leverages Firebase Authentication for user management and Firestore for data storage.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Database:** [Cloud Firestore](https://firebase.google.com/docs/firestore)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Generative AI:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)

## Project Structure

Here's a brief overview of the key files and directories:

```
/
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # Reusable React components (UI and feature-specific)
│   ├── firebase/           # Firebase configuration, providers, and hooks
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, types, and static data
│   └── providers/          # React context providers for state management
├── docs/
│   └── backend.json        # Defines the data models and Firestore structure
├── firestore.rules         # Security rules for Cloud Firestore
└── next.config.ts          # Next.js configuration
```

## Getting Started

The application is designed to be developed within Firebase Studio.

1.  **Authentication:** The app uses Firebase Authentication. Use the "Connect Account" page to sign in with a Google or Microsoft account.
2.  **IMAP Connection:** Once signed in, the app will simulate connecting to an IMAP account and fetching emails into Firestore. For new users, it will automatically populate the database with 25 mock emails.
3.  **Explore:** Browse your inbox, open emails, and see real-time updates.

## How to Contribute

We welcome contributions! Here’s how you can help:

1.  **Understand the Architecture:** Familiarize yourself with the tech stack and the project structure outlined above. The `docs/backend.json` file is particularly important for understanding the data model.
2.  **Client-Side Logic:** All Firebase interactions (reading and writing data) are handled on the client-side within React Client Components (`'use client'`).
3.  **Firebase Hooks:** Use the provided hooks (`useUser`, `useCollection`, `useDoc`) for interacting with Firebase services. These are located in `src/firebase/`.
4.  **UI Components:** When adding or modifying UI, prefer using existing components from `src/components/ui` (ShadCN UI) to maintain consistency.
5.  **State Management:** For global state, consider using React Context. The `EmailProvider` in `src/providers/email-provider.tsx` is a good example.
