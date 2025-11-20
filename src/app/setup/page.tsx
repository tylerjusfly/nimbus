'use client';

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome, Briefcase } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SetupPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = async (provider: 'google' | 'microsoft') => {
    try {
      if (provider === 'google') {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider);
      } else {
        const microsoftProvider = new OAuthProvider('microsoft.com');
        await signInWithPopup(auth, microsoftProvider);
      }
      // The useEffect hook above will handle the redirect once `user` is populated.
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold tracking-tight">Connect Account</h1>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-6 lg:p-8">
        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connect Your Email Account</CardTitle>
            <CardDescription>
              Sign in to connect your external email account like Gmail or Outlook.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => handleSignIn('google')}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleSignIn('microsoft')}
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Sign in with Microsoft
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
