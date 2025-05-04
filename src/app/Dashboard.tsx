import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import StatCards from '../components/dashboard/StatCards';
import CGPAProgressionCard from '../components/dashboard/CGPAProgressionCard';
import DropSemesterCard from '../components/dashboard/DropSemesterCard';
import StudentProfileSummaryCard from '../components/dashboard/StudentProfileSummaryCard';
import {
  dashboardService,
  calculatePaymentSummary,
  PaymentSummary,
  CGPAData,
  SGPAData,
  profileService,
  StudentInfo
} from '../services/api';

// Dashboard Component
const Dashboard = () => {
  const pageTitle = 'Student Dashboard';
  const pageIcon = 'LayoutDashboard';

  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
  const [cgpaData, setCgpaData] = useState<CGPAData | SGPAData[] | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [dropSemesters, setDropSemesters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    const errors: string[] = [];

    try {
      // 1. Payment Ledger Summary
      try {
        const paymentLedger = await dashboardService.getPaymentLedgerSummary();
        console.log('Payment Ledger:', paymentLedger);
        setPaymentSummary(calculatePaymentSummary(paymentLedger));
      } catch (err) {
        console.error('Payment summary fetch error:', err);
        errors.push('Failed to load payment summary');
      }

      // 2. CGPA Data
      try {
        const cgpaGraph = await dashboardService.getCGPAData();
        console.log('CGPA Graph:', cgpaGraph);
        console.log('CGPA Graph Type:', typeof cgpaGraph, 'Keys:', Object.keys(cgpaGraph || {}));
        setCgpaData(cgpaGraph);
      } catch (err) {
        console.error('CGPA data fetch error:', err);
        errors.push('Failed to load CGPA data');
      }

      // 3. Student Profile
      try {
        const studentProfile = await profileService.getStudentInfo();
        console.log('Student Profile:', studentProfile);
        setStudentInfo(studentProfile);
      } catch (err) {
        console.error('Student profile fetch error:', err);
        errors.push('Failed to load student profile');
      }

      // 4. Drop Semester List
      try {
        const dropSemesterList = await dashboardService.getDropSemesterList();
        console.log('Drop Semester List:', dropSemesterList);
        setDropSemesters(dropSemesterList);
      } catch (err) {
        console.error('Drop semester list fetch error:', err);
        errors.push('Failed to load drop semester list');
      }

      // Set error if any errors occurred
      if (errors.length > 0) {
        setError(errors.join(', '));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <>
      <PageTitle
        title={pageTitle}
        icon={pageIcon}
      />

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <StatCards
            onRetry={() => {
              fetchDashboardData();
            }}
          />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CGPAProgressionCard 
              cgpaData={cgpaData} 
              loading={loading}
              error={error}
            />
            <DropSemesterCard dropSemesters={dropSemesters} />
            <StudentProfileSummaryCard studentInfo={studentInfo} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
