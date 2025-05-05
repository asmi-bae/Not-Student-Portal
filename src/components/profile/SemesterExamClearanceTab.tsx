import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/table';

export interface SemesterExamClearance {
  studentId: string | null;
  semesterId: string;
  semesterName: string;
  registration: boolean;
  midTermExam: boolean;
  finalExam: boolean;
}

interface SemesterExamClearanceTabProps {
  data: SemesterExamClearance[] | null;
  loading: boolean;
}

import { Check, X } from "lucide-react";

const statusIcon = (ok: boolean) => (
  ok ? <Check className="text-green-600 w-5 h-5 mx-auto" /> : <X className="text-gray-400 w-5 h-5 mx-auto" />
);

const SemesterExamClearanceTab: React.FC<SemesterExamClearanceTabProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500 max-w-3xl mx-auto">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1">Semester</TableHead>
                  <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1">Registration</TableHead>
                  <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1">Midterm Exam</TableHead>
                  <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1">Final Exam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="w-36"><div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show data
  return (
    <Card className="shadow-sm overflow-hidden max-w-4xl mx-auto animate-in fade-in-50 duration-500">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <h2 className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 text-teal-700 border-b pb-1 sm:pb-2">Semester Exam Clearance Status</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <div className="overflow-x-auto -mx-2 px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1 min-w-[120px]">Semester</TableHead>
                <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1 min-w-[120px]">Registration</TableHead>
                <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1 min-w-[120px]">Midterm Exam</TableHead>
                <TableHead className="bg-teal-600 text-white text-center border border-teal-200 px-2 py-1 min-w-[120px]">Final Exam</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                [...data]
                  .sort((a, b) => (b.semesterId > a.semesterId ? 1 : b.semesterId < a.semesterId ? -1 : 0))
                  .map((row, idx) => (
                    <TableRow key={row.semesterId || idx} className={idx % 2 === 0 ? "bg-teal-50 hover:bg-teal-100 transition" : "bg-white hover:bg-teal-100 transition"}>
                      <TableCell className="text-center font-medium text-teal-700 border border-teal-100 px-2 py-1 whitespace-nowrap">{row.semesterName}</TableCell>
                      <TableCell className="text-center border border-teal-100 px-2 py-1">{statusIcon(row.registration)}</TableCell>
                      <TableCell className="text-center border border-teal-100 px-2 py-1">{statusIcon(row.midTermExam)}</TableCell>
                      <TableCell className="text-center border border-teal-100 px-2 py-1">{statusIcon(row.finalExam)}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-400 py-6">No data found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SemesterExamClearanceTab;
