import { useState, useEffect } from 'react';
import type { Project, WeeklyReport } from './types';
import {
  getProjects,
  saveProject,
  getReportsByProject,
  saveReport,
  getProject,
  getReport,
  deleteProject,
} from './utils/storage';
import { ProjectList } from './components/ProjectList';
import { CreateProject } from './components/CreateProject';
import { ProjectDetail } from './components/ProjectDetail';
import { ReportForm } from './components/ReportForm';
import { ReportView } from './components/ReportView';

type View =
  | { type: 'projects' }
  | { type: 'create-project' }
  | { type: 'edit-project'; projectId: string }
  | { type: 'project-detail'; projectId: string }
  | { type: 'create-report'; projectId: string }
  | { type: 'edit-report'; projectId: string; reportId: string }
  | { type: 'view-report'; projectId: string; reportId: string };

function App() {
  const [view, setView] = useState<View>({ type: 'projects' });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setProjects(getProjects());
  };

  const handleSaveProject = (project: Project) => {
    saveProject(project);
    loadProjects();
    setView({ type: 'projects' });
  };

  const handleSaveReport = (report: WeeklyReport) => {
    saveReport(report);
    setView({ type: 'project-detail', projectId: report.projectId });
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Är du säker på att du vill ta bort detta projekt? Alla rapporter kommer också tas bort.')) {
      deleteProject(projectId);
      loadProjects();
      setView({ type: 'projects' });
    }
  };

  const renderView = () => {
    switch (view.type) {
      case 'projects':
        return (
          <ProjectList
            projects={projects}
            onSelectProject={(projectId) =>
              setView({ type: 'project-detail', projectId })
            }
            onCreateProject={() => setView({ type: 'create-project' })}
          />
        );

      case 'create-project':
        return (
          <CreateProject
            onSave={handleSaveProject}
            onCancel={() => setView({ type: 'projects' })}
          />
        );

      case 'edit-project': {
        const project = getProject(view.projectId);
        if (!project) {
          return (
            <div className="min-h-screen bg-apple-gray-50 p-6">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-apple-gray-700">Projekt hittades inte</p>
                <button
                  onClick={() => setView({ type: 'projects' })}
                  className="mt-4 text-apple-blue hover:text-blue-600"
                >
                  Tillbaka till projekt
                </button>
              </div>
            </div>
          );
        }

        return (
          <CreateProject
            existingProject={project}
            onSave={handleSaveProject}
            onCancel={() =>
              setView({ type: 'project-detail', projectId: view.projectId })
            }
          />
        );
      }

      case 'project-detail': {
        const project = getProject(view.projectId);
        if (!project) {
          return (
            <div className="min-h-screen bg-apple-gray-50 p-6">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-apple-gray-700">Projekt hittades inte</p>
                <button
                  onClick={() => setView({ type: 'projects' })}
                  className="mt-4 text-apple-blue hover:text-blue-600"
                >
                  Tillbaka till projekt
                </button>
              </div>
            </div>
          );
        }

        const reports = getReportsByProject(view.projectId);

        return (
          <ProjectDetail
            project={project}
            reports={reports}
            onCreateReport={() =>
              setView({ type: 'create-report', projectId: view.projectId })
            }
            onViewReport={(reportId) =>
              setView({
                type: 'view-report',
                projectId: view.projectId,
                reportId,
              })
            }
            onEditProject={() =>
              setView({ type: 'edit-project', projectId: view.projectId })
            }
            onDeleteProject={() => handleDeleteProject(view.projectId)}
            onBack={() => setView({ type: 'projects' })}
          />
        );
      }

      case 'create-report': {
        const project = getProject(view.projectId);
        if (!project) {
          return (
            <div className="min-h-screen bg-apple-gray-50 p-6">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-apple-gray-700">Projekt hittades inte</p>
                <button
                  onClick={() => setView({ type: 'projects' })}
                  className="mt-4 text-apple-blue hover:text-blue-600"
                >
                  Tillbaka till projekt
                </button>
              </div>
            </div>
          );
        }

        return (
          <ReportForm
            project={project}
            onSave={handleSaveReport}
            onCancel={() =>
              setView({ type: 'project-detail', projectId: view.projectId })
            }
          />
        );
      }

      case 'edit-report': {
        const project = getProject(view.projectId);
        const report = getReport(view.reportId);

        if (!project || !report) {
          return (
            <div className="min-h-screen bg-apple-gray-50 p-6">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-apple-gray-700">Projekt eller rapport hittades inte</p>
                <button
                  onClick={() => setView({ type: 'projects' })}
                  className="mt-4 text-apple-blue hover:text-blue-600"
                >
                  Tillbaka till projekt
                </button>
              </div>
            </div>
          );
        }

        return (
          <ReportForm
            project={project}
            existingReport={report}
            onSave={handleSaveReport}
            onCancel={() =>
              setView({
                type: 'view-report',
                projectId: view.projectId,
                reportId: view.reportId,
              })
            }
          />
        );
      }

      case 'view-report': {
        const project = getProject(view.projectId);
        const report = getReport(view.reportId);

        if (!project || !report) {
          return (
            <div className="min-h-screen bg-apple-gray-50 p-6">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-apple-gray-700">Projekt eller rapport hittades inte</p>
                <button
                  onClick={() => setView({ type: 'projects' })}
                  className="mt-4 text-apple-blue hover:text-blue-600"
                >
                  Tillbaka till projekt
                </button>
              </div>
            </div>
          );
        }

        return (
          <ReportView
            project={project}
            report={report}
            onBack={() =>
              setView({ type: 'project-detail', projectId: view.projectId })
            }
            onEdit={() =>
              setView({
                type: 'edit-report',
                projectId: view.projectId,
                reportId: view.reportId,
              })
            }
          />
        );
      }

      default:
        return null;
    }
  };

  return <div className="min-h-screen">{renderView()}</div>;
}

export default App;
