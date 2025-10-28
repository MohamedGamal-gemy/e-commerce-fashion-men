'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorDisplay } from './products/components/ErrorDisplay';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <ErrorDisplay
          title="Something went wrong!"
          message={error.message || "We're sorry, but something unexpected happened."}
          errorCode={error.digest ? `ERR-${error.digest.substring(0, 8)}` : 'UNKNOWN_ERROR'}
          onRetry={handleRetry}
          onGoHome={handleGoHome}
          onGoBack={handleGoBack}
          showDetails
        />
      </div>
    </main>
  );
}