'use client';

import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    window.location.replace('/cv_nicolas_daval/fr/');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Redirecting...</p>
    </main>
  );
}
