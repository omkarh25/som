import Link from 'next/link';

/**
 * Home page component
 * Provides an overview of the SOM system and quick access to main features
 */
export default function HomePage() {
  const features = [
    {
      title: 'Data Models',
      description: 'View and manage database structures across departments and projects',
      link: '/datamodels',
      icon: '📊'
    },
    {
      title: 'Control Processes',
      description: 'Execute and manage various business processes and workflows',
      link: '/controlprocesses',
      icon: '⚙️'
    },
    {
      title: 'Role Views',
      description: 'Access role-specific templates and functionalities',
      link: '/roleviews',
      icon: '👥'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to SOM</h1>
        <p className="text-xl text-gray-600">
          Simplify the management of personal and professional duties with our comprehensive office management system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.link}
            className="block group"
          >
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mt-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Select Department</h3>
            <p className="text-gray-600">
              Choose from Seredipity, DhoomStudios, or Trademan departments to access relevant projects.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">2. Choose Project</h3>
            <p className="text-gray-600">
              Select your project to view available data models, processes, or role-specific views.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">3. Access Features</h3>
            <p className="text-gray-600">
              Use the navigation tabs to switch between different aspects of project management.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm mt-12">
        <p>Version 1.0.0 | © 2024 SOM Office Management System</p>
      </div>
    </div>
  );
}
