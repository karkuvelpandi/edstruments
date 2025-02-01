'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserProvider';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  return <div className='h-[70vh] flex justify-center items-center'>
    <CircularProgress />
  </div>;
}