'use client';

import { useEffect, useState } from 'react';
import config from '@/lib/config';

/**
 * Display component that shows the application URL from environment variables
 * This is useful for debugging environment variable issues
 */
export function AppUrlDisplay() {
  const [directEnvValue, setDirectEnvValue] = useState<string>('');

  useEffect(() => {
    // Access the environment variable directly in the client
    // This will only work if it's prefixed with NEXT_PUBLIC_
    if (typeof window !== 'undefined') {
      const envValue =
        (
          window as unknown as {
            ENV_NEXT_PUBLIC_APP_URL: string;
          }
        ).ENV_NEXT_PUBLIC_APP_URL ||
        process.env.NEXT_PUBLIC_APP_URL ||
        'Not available directly';
      setDirectEnvValue(envValue);
    }
  }, []);

  return (
    <div className="p-4 border rounded-md bg-slate-50 my-4">
      <h2 className="text-lg font-semibold mb-2">
        Environment Variables Diagnostics
      </h2>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <span className="font-medium">From config.app.url: </span>
          <code className="bg-slate-100 px-2 py-1 rounded">
            {config.app.url}
          </code>
        </div>
        <div>
          <span className="font-medium">
            Direct NEXT_PUBLIC_APP_URL access:{' '}
          </span>
          <code className="bg-slate-100 px-2 py-1 rounded">
            {directEnvValue}
          </code>
        </div>
        <div>
          <span className="font-medium">NODE_ENV: </span>
          <code className="bg-slate-100 px-2 py-1 rounded">
            {config.app.environment}
          </code>
        </div>
      </div>
    </div>
  );
}

export default AppUrlDisplay;
