'use client';

import { useState } from 'react';
import Dropdown from '@/components/ui/dropdown';
import Modal from '@/components/ui/modal';
import { DEPARTMENTS, getProjectsForDepartment } from '@/constants/data';
import { getProcessesForProject, type Process } from '@/constants/processes';

/**
 * ControlProcesses page component
 * Allows users to select and interact with various processes based on department and project
 */
export default function ControlProcessesPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Get available options based on selections
  const projects = selectedDepartment ? getProjectsForDepartment(selectedDepartment) : [];
  const processes = selectedProject ? getProcessesForProject(selectedProject) : [];

  const handleProcessSelect = (process: Process) => {
    setSelectedProcess(process);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    // TODO: Implement process submission
    console.log('Submitting process:', {
      process: selectedProcess?.id,
      data: formData
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Control Processes</h1>
        <p className="text-gray-600">
          Select a department and project to view and execute available processes.
        </p>
      </div>

      <div className="flex gap-4">
        <Dropdown
          label="Department"
          options={DEPARTMENTS}
          value={selectedDepartment}
          onChange={(value) => {
            setSelectedDepartment(value);
            setSelectedProject('');
            setSelectedProcess(null);
          }}
        />

        {selectedDepartment && (
          <Dropdown
            label="Project"
            options={projects}
            value={selectedProject}
            onChange={(value) => {
              setSelectedProject(value);
              setSelectedProcess(null);
            }}
          />
        )}
      </div>

      {selectedProject && processes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processes.map((process) => (
            <div
              key={process.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProcessSelect(process)}
            >
              <h3 className="text-lg font-semibold mb-2">{process.name}</h3>
              <p className="text-gray-600 text-sm">{process.description}</p>
            </div>
          ))}
        </div>
      )}

      {selectedProcess && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedProcess.name}
        >
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">{selectedProcess.description}</p>
            
            {selectedProcess.fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
