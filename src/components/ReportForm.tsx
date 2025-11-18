import React, { useState, useEffect } from 'react';
import type { WeeklyReport, Project, ReportFormData } from "../types";
import { generateId, getWeekDates } from '../utils/dateHelpers';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';

interface ReportFormProps {
  project: Project;
  onSave: (report: WeeklyReport) => void;
  onCancel: () => void;
  existingReport?: WeeklyReport;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  project,
  onSave,
  onCancel,
  existingReport,
}) => {
  const weekDates = getWeekDates();

  const [formData, setFormData] = useState<ReportFormData>({
    weekStartDate: existingReport?.weekStartDate || weekDates.start,
    weekEndDate: existingReport?.weekEndDate || weekDates.end,
    summary: existingReport?.summary || '',
    activitiesThisWeek: existingReport?.activitiesThisWeek.join('\n') || '',
    completedActivities: existingReport?.completedActivities.join('\n') || '',
    startedActivities: existingReport?.startedActivities.join('\n') || '',
    milestonesAchieved: existingReport?.milestonesAchieved.join('\n') || '',
    blockersAndChallenges: existingReport?.blockersAndChallenges.join('\n') || '',
    decisionsNeeded: existingReport?.decisionsNeeded.join('\n') || '',
    plannedActivitiesNextWeek: existingReport?.plannedActivitiesNextWeek.join('\n') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const report: WeeklyReport = {
      id: existingReport?.id || generateId(),
      projectId: project.id,
      weekStartDate: formData.weekStartDate,
      weekEndDate: formData.weekEndDate,
      summary: formData.summary,
      activitiesThisWeek: formData.activitiesThisWeek
        .split('\n')
        .filter((item) => item.trim() !== ''),
      completedActivities: formData.completedActivities
        .split('\n')
        .filter((item) => item.trim() !== ''),
      startedActivities: formData.startedActivities
        .split('\n')
        .filter((item) => item.trim() !== ''),
      milestonesAchieved: formData.milestonesAchieved
        .split('\n')
        .filter((item) => item.trim() !== ''),
      blockersAndChallenges: formData.blockersAndChallenges
        .split('\n')
        .filter((item) => item.trim() !== ''),
      decisionsNeeded: formData.decisionsNeeded
        .split('\n')
        .filter((item) => item.trim() !== ''),
      plannedActivitiesNextWeek: formData.plannedActivitiesNextWeek
        .split('\n')
        .filter((item) => item.trim() !== ''),
      createdAt: existingReport?.createdAt || new Date().toISOString(),
    };

    onSave(report);
  };

  const updateField = (field: keyof ReportFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-apple-gray-900">
              {existingReport ? 'Redigera Rapport' : 'Ny Veckorapport'}
            </h2>
            <p className="text-apple-gray-500 mt-1">
              {project.name} - {project.customerName}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="Vecka Startar"
                value={formData.weekStartDate}
                onChange={(value) => updateField('weekStartDate', value)}
                type="date"
                required
              />
              <Input
                label="Vecka Slutar"
                value={formData.weekEndDate}
                onChange={(value) => updateField('weekEndDate', value)}
                type="date"
                required
              />
            </div>

            <Textarea
              label="Sammanfattning"
              value={formData.summary}
              onChange={(value) => updateField('summary', value)}
              placeholder="En kort sammanfattning av veckan..."
              required
              rows={3}
              helpText="Beskriv kortfattat vad som har hänt denna vecka"
            />

            <Textarea
              label="Aktiviteter Under Veckan"
              value={formData.activitiesThisWeek}
              onChange={(value) => updateField('activitiesThisWeek', value)}
              placeholder="• Aktivitet 1&#10;• Aktivitet 2"
              rows={4}
              helpText="En rad per aktivitet"
            />

            <Textarea
              label="Avslutade Aktiviteter"
              value={formData.completedActivities}
              onChange={(value) => updateField('completedActivities', value)}
              placeholder="• Avslutad aktivitet 1&#10;• Avslutad aktivitet 2"
              rows={4}
              helpText="En rad per aktivitet"
            />

            <Textarea
              label="Påbörjade Aktiviteter"
              value={formData.startedActivities}
              onChange={(value) => updateField('startedActivities', value)}
              placeholder="• Påbörjad aktivitet 1&#10;• Påbörjad aktivitet 2"
              rows={4}
              helpText="En rad per aktivitet"
            />

            <Textarea
              label="Uppnådda Milstolpar"
              value={formData.milestonesAchieved}
              onChange={(value) => updateField('milestonesAchieved', value)}
              placeholder="• Milstolpe 1&#10;• Milstolpe 2"
              rows={3}
              helpText="En rad per milstolpe"
            />

            <Textarea
              label="Blockeringar och Utmaningar"
              value={formData.blockersAndChallenges}
              onChange={(value) => updateField('blockersAndChallenges', value)}
              placeholder="• Blockering 1&#10;• Utmaning 2"
              rows={3}
              helpText="En rad per punkt"
            />

            <Textarea
              label="Beslut som Behöver Fattas"
              value={formData.decisionsNeeded}
              onChange={(value) => updateField('decisionsNeeded', value)}
              placeholder="• Beslut 1&#10;• Beslut 2"
              rows={3}
              helpText="En rad per beslut"
            />

            <Textarea
              label="Planerade Aktiviteter Nästa Vecka"
              value={formData.plannedActivitiesNextWeek}
              onChange={(value) => updateField('plannedActivitiesNextWeek', value)}
              placeholder="• Planerad aktivitet 1&#10;• Planerad aktivitet 2"
              rows={4}
              helpText="En rad per aktivitet"
            />

            <div className="flex gap-3 pt-6">
              <Button type="submit" className="flex-1">
                {existingReport ? 'Uppdatera Rapport' : 'Spara Rapport'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                className="flex-1"
              >
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
