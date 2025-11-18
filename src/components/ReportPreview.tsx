import React from 'react';
import type { WeeklyReport, Project } from "../types";
import { formatDate } from '../utils/dateHelpers';

interface ReportPreviewProps {
  report: WeeklyReport;
  project: Project;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({
  report,
  project,
}) => {
  const renderBulletList = (items: string[]) => {
    if (items.length === 0) return <p className="text-apple-gray-500 italic">Inga poster</p>;

    return (
      <ul className="list-none space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-apple-blue mr-2 mt-1 flex-shrink-0">•</span>
            <span className="text-apple-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      id="report-preview"
      className="bg-white p-12 max-w-[210mm] mx-auto"
      style={{ minHeight: '297mm' }}
    >
      {/* Logo */}
      {project.logoUrl && (
        <div className="mb-8 flex justify-start">
          <img
            src={project.logoUrl}
            alt={project.customerName}
            className="max-h-16 object-contain"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 border-b border-apple-gray-200 pb-4">
        <h1 className="text-2xl font-semibold text-apple-gray-900 mb-2">
          Veckorapport
        </h1>
        <div className="text-sm text-apple-gray-600">
          <p className="font-medium">{project.name}</p>
          <p>
            {formatDate(report.weekStartDate)} - {formatDate(report.weekEndDate)}
          </p>
        </div>
      </div>

      {/* Summary */}
      {report.summary && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Sammanfattning
          </h2>
          <p className="text-apple-gray-700 leading-relaxed">{report.summary}</p>
        </div>
      )}

      {/* Activities This Week */}
      {report.activitiesThisWeek.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Aktiviteter Under Veckan
          </h2>
          {renderBulletList(report.activitiesThisWeek)}
        </div>
      )}

      {/* Completed Activities */}
      {report.completedActivities.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Avslutade Aktiviteter
          </h2>
          {renderBulletList(report.completedActivities)}
        </div>
      )}

      {/* Started Activities */}
      {report.startedActivities.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Påbörjade Aktiviteter
          </h2>
          {renderBulletList(report.startedActivities)}
        </div>
      )}

      {/* Milestones */}
      {report.milestonesAchieved.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Uppnådda Milstolpar
          </h2>
          {renderBulletList(report.milestonesAchieved)}
        </div>
      )}

      {/* Blockers and Challenges */}
      {report.blockersAndChallenges.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Blockeringar och Utmaningar
          </h2>
          {renderBulletList(report.blockersAndChallenges)}
        </div>
      )}

      {/* Decisions Needed */}
      {report.decisionsNeeded.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Beslut som Behöver Fattas
          </h2>
          {renderBulletList(report.decisionsNeeded)}
        </div>
      )}

      {/* Planned Activities Next Week */}
      {report.plannedActivitiesNextWeek.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-semibold text-apple-gray-900 mb-2">
            Planerade Aktiviteter Nästa Vecka
          </h2>
          {renderBulletList(report.plannedActivitiesNextWeek)}
        </div>
      )}
    </div>
  );
};
