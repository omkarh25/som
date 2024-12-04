'use client';

import { useState } from 'react';
import Dropdown from '@/components/ui/dropdown';
import { DEPARTMENTS, getProjectsForDepartment } from '@/constants/data';
import { getRolesForProject, type Role, type RoleView } from '@/constants/roles';

/**
 * RoleViews page component
 * Allows users to access role-specific views and features based on department and project
 */
export default function RoleViewsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedView, setSelectedView] = useState<RoleView | null>(null);

  // Get available options based on selections
  const projects = selectedDepartment ? getProjectsForDepartment(selectedDepartment) : [];
  const roles = selectedProject ? getRolesForProject(selectedProject) : [];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setSelectedView(null);
  };

  const handleViewSelect = (view: RoleView) => {
    setSelectedView(view);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Role Views</h1>
        <p className="text-gray-600">
          Select your department, project, and role to access specific views and features.
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
            setSelectedRole(null);
            setSelectedView(null);
          }}
        />

        {selectedDepartment && (
          <Dropdown
            label="Project"
            options={projects}
            value={selectedProject}
            onChange={(value) => {
              setSelectedProject(value);
              setSelectedRole(null);
              setSelectedView(null);
            }}
          />
        )}
      </div>

      {selectedProject && roles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Role Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Available Roles</h2>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedRole?.id === role.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <h3 className="font-medium">{role.name}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* View Selection */}
          {selectedRole && (
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-semibold">Available Views</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedRole.views.map((view) => (
                  <div
                    key={view.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedView?.id === view.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-white hover:bg-gray-50 border-2 border-transparent'
                    }`}
                    onClick={() => handleViewSelect(view)}
                  >
                    <h3 className="font-medium mb-2">{view.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{view.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Features:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {view.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
