'use client';

import {useRouter} from 'next/navigation';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({error, reset}: ErrorProps) {
  let router = useRouter();
  
  function navigateToHome(){
    router.push('/');
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={navigateToHome}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}