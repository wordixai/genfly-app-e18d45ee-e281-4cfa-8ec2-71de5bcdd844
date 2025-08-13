import { Dashboard } from './Dashboard';
import { initializeMockData } from '@/lib/mockData';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Initialize mock data on first load
    initializeMockData();
  }, []);

  return <Dashboard />;
};

export default Index;