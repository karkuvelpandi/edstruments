'use client';
import { useUser } from '@/context/UserProvider';

const Dashboard = () => {
  const { user } = useUser();

  return <div>Welcome, {user?.name || 'Guest'}!</div>;
};

export default Dashboard;