"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase } from 'lucide-react';
import { ComingSoonCard } from '@/components/coming-soon/coming-soon-card';


const ProfessionalComponent: React.FC = () => {
  const { user } = useAuth();


  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="w-full">
        <PageTitle
          title={"Professional"}
          icon={<Briefcase />}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
        
        <ComingSoonCard
          title="Professional Network"
          description="Connect with fellow alumni and explore professional opportunities in our growing network. This feature is coming soon!"
          expectedLaunch="Q3 2025"
        />
        
      </div>
    </div>
  );
};

const ProfessionalPage = () => {
  return <ProfessionalComponent />;
};

export default ProfessionalPage;
