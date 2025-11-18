import React from 'react';
import type { Project } from '../types';
import { Button } from './Button';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onCreateProject: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
}) => {
  return (
    <div className="min-h-screen bg-apple-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-apple-gray-900">
            Veckorapporter
          </h1>
          <Button onClick={onCreateProject}>
            + Nytt Projekt
          </Button>
        </div>

        {projects.length === 0 ? (
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
              Inga projekt än
            </h3>
            <p className="text-apple-gray-500 mb-6">
              Kom igång genom att skapa ditt första projekt
            </p>
            <Button onClick={onCreateProject}>
              Skapa Projekt
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="bg-white rounded-2xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {project.logoUrl && (
                  <div className="mb-4 h-12 flex items-center">
                    <img
                      src={project.logoUrl}
                      alt={project.customerName}
                      className="max-h-12 max-w-full object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium text-apple-gray-900 mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-apple-gray-500">
                  {project.customerName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
