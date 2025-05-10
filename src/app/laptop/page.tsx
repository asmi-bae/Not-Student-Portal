"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import MainContent from '@/components/MainContent';
import { useAuth } from '@/contexts/AuthContext';

export default function LaptopPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <MainContent>
      <PageTitle title="Laptop Management" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Laptop Management</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Manage laptop allocation and status here.</p>
        </div>
      </div>
    </MainContent>
  );
}
