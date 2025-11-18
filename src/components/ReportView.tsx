import React, { useState } from 'react';
import type { WeeklyReport, Project } from "../types";
import { Button } from './Button';
import { ReportPreview } from './ReportPreview';
import { exportToPDF } from '../utils/pdfExport';
import { formatDateShort } from '../utils/dateHelpers';

interface ReportViewProps {
  report: WeeklyReport;
  project: Project;
  onBack: () => void;
  onEdit: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  project,
  onBack,
  onEdit,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `veckorapport-${project.name}-${formatDateShort(report.weekStartDate)}.pdf`;
      await exportToPDF('report-preview', filename);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Det gick inte att exportera PDF. Försök igen.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-apple-blue hover:text-blue-600 font-medium flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Tillbaka
          </button>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onEdit}>
              Redigera
            </Button>
            <Button onClick={handleExportPDF} disabled={isExporting}>
              {isExporting ? 'Exporterar...' : 'Exportera PDF'}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <ReportPreview report={report} project={project} />
        </div>
      </div>
    </div>
  );
};
