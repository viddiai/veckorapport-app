export interface Project {
  id: string;
  name: string;
  customerName: string;
  logoUrl?: string;
  createdAt: string;
}

export interface WeeklyReport {
  id: string;
  projectId: string;
  weekStartDate: string;
  weekEndDate: string;
  summary: string;
  activitiesThisWeek: string[];
  completedActivities: string[];
  startedActivities: string[];
  milestonesAchieved: string[];
  blockersAndChallenges: string[];
  decisionsNeeded: string[];
  plannedActivitiesNextWeek: string[];
  createdAt: string;
}

export interface ReportFormData {
  weekStartDate: string;
  weekEndDate: string;
  summary: string;
  activitiesThisWeek: string;
  completedActivities: string;
  startedActivities: string;
  milestonesAchieved: string;
  blockersAndChallenges: string;
  decisionsNeeded: string;
  plannedActivitiesNextWeek: string;
}
