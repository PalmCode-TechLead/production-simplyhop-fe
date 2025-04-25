'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AuthCallback() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const oauthError = searchParams.get('error');

    if (oauthError) {
      console.error('OAuth error:', oauthError);
      setError(oauthError);
      return;
    }

    if (!code) {
      console.warn('No code found in URL');
      setError('No code found in URL');
      return;
    }

    const fetchToken = async () => {
      try {
        const res = await fetch(`https://simplyhop-api-mmppce625q-de.a.run.app/api/auth/google/callback?code=${encodeURIComponent(code)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }

        const data = await res.json();
        console.log('Backend response:', data);
      } catch (err: any) {
        console.error('Failed to fetch token:', err.message);
        setError(err.message);
      }
    };

    fetchToken();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p>Processing login...</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
