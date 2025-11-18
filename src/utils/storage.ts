import type { Project, WeeklyReport } from '../types';

const PROJECTS_KEY = 'veckorapport_projects';
const REPORTS_KEY = 'veckorapport_reports';

// Project functions
export const getProjects = (): Project[] => {
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProject = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.id === id);
};

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);

  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const deleteProject = (id: string): void => {
  const projects = getProjects().filter(p => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));

  // Also delete all reports for this project
  const reports = getReports().filter(r => r.projectId !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

// Report functions
export const getReports = (): WeeklyReport[] => {
  const data = localStorage.getItem(REPORTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getReportsByProject = (projectId: string): WeeklyReport[] => {
  return getReports()
    .filter(r => r.projectId === projectId)
    .sort((a, b) => new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime());
};

export const getReport = (id: string): WeeklyReport | undefined => {
  const reports = getReports();
  return reports.find(r => r.id === id);
};

export const saveReport = (report: WeeklyReport): void => {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === report.id);

  if (index >= 0) {
    reports[index] = report;
  } else {
    reports.push(report);
  }

  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

export const deleteReport = (id: string): void => {
  const reports = getReports().filter(r => r.id !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};
