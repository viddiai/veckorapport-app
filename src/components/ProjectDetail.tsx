import React, { useState } from 'react';
import type { Project, WeeklyReport } from "../types";
import { formatDateShort } from '../utils/dateHelpers';
import { Button } from './Button';
import { exportToPDF } from '../utils/pdfExport';
import { ReportPreview } from './ReportPreview';

interface ProjectDetailProps {
  project: Project;
  reports: WeeklyReport[];
  onCreateReport: () => void;
  onViewReport: (reportId: string) => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  reports,
  onCreateReport,
  onViewReport,
  onEditProject,
  onDeleteProject,
  onBack,
}) => {
  const [selectedReport, setSelectedReport] = useState<WeeklyReport | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async (report: WeeklyReport) => {
    setIsExporting(true);
    setSelectedReport(report);

    // Wait for DOM to update
    setTimeout(async () => {
      try {
        const filename = `veckorapport-${project.name}-${formatDateShort(report.weekStartDate)}.pdf`;
        await exportToPDF('report-preview', filename);
      } catch (error) {
        console.error('Failed to export PDF:', error);
        alert('Det gick inte att exportera PDF. Försök igen.');
      } finally {
        setIsExporting(false);
        setSelectedReport(null);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-apple-blue hover:text-blue-600 font-medium mb-4 flex items-center gap-2"
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
            Tillbaka till Projekt
          </button>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {project.logoUrl && (
                  <div className="mb-4 h-12 flex items-center">
                    <img
                      src={project.logoUrl}
                      alt={project.customerName}
                      className="max-h-12 max-w-full object-contain"
                    />
                  </div>
                )}
                <h1 className="text-2xl font-semibold text-apple-gray-900 mb-1">
                  {project.name}
                </h1>
                <p className="text-apple-gray-500">{project.customerName}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="secondary" onClick={onEditProject}>
                  Redigera
                </Button>
                <Button
                  variant="secondary"
                  onClick={onDeleteProject}
                  className="!text-red-600 hover:!bg-red-50"
                >
                  Ta bort
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-apple-gray-900">
            Veckorapporter
          </h2>
          <Button onClick={onCreateReport}>+ Ny Rapport</Button>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-apple-gray-400 mb-4">
              <svg
                className="w-20 h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-apple-gray-700 mb-2">
              Inga rapporter än
            </h3>
            <p className="text-apple-gray-500 mb-6">
              Skapa din första veckorapport för detta projekt
            </p>
            <Button onClick={onCreateReport}>Skapa Rapport</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-apple-gray-900 mb-2">
                      Vecka {formatDateShort(report.weekStartDate)} -{' '}
                      {formatDateShort(report.weekEndDate)}
                    </h3>
                    <p className="text-apple-gray-600 line-clamp-2">
                      {report.summary}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="secondary"
                      onClick={() => onViewReport(report.id)}
                    >
                      Visa
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleExportPDF(report)}
                      disabled={isExporting}
                    >
                      {isExporting ? 'Exporterar...' : 'PDF'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden preview for PDF export */}
      {selectedReport && (
        <div className="fixed top-0 left-0 -z-10 opacity-0">
          <ReportPreview report={selectedReport} project={project} />
        </div>
      )}
    </div>
  );
};
