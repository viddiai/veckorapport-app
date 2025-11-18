import React, { useState, useRef } from 'react';
import type { Project } from '../types';
import { generateId } from '../utils/dateHelpers';
import { Button } from './Button';
import { Input } from './Input';

interface CreateProjectProps {
  existingProject?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  existingProject,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(existingProject?.name || '');
  const [customerName, setCustomerName] = useState(existingProject?.customerName || '');
  const [logoUrl, setLogoUrl] = useState(existingProject?.logoUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const project: Project = {
      id: existingProject?.id || generateId(),
      name,
      customerName,
      logoUrl,
      createdAt: existingProject?.createdAt || new Date().toISOString(),
    };

    onSave(project);
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-apple-gray-900 mb-6">
            {existingProject ? 'Redigera Projekt' : 'Nytt Projekt'}
          </h2>

          <form onSubmit={handleSubmit}>
            <Input
              label="Projektnamn"
              value={name}
              onChange={setName}
              placeholder="T.ex. Onboarding Q1 2024"
              required
            />

            <Input
              label="Kundnamn"
              value={customerName}
              onChange={setCustomerName}
              placeholder="T.ex. Acme AB"
              required
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Kundens Logotyp
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Välj Bild
                </Button>
                {logoUrl && (
                  <div className="flex items-center gap-3">
                    <img
                      src={logoUrl}
                      alt="Logotyp preview"
                      className="h-12 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setLogoUrl('')}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Ta bort
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {existingProject ? 'Spara Ändringar' : 'Skapa Projekt'}
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
