'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar component that provides navigation for the SOM application
 * Contains tabs for DataModels, ControlProcesses, and RoleViews
 */
const Sidebar: FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'DataModels', path: '/datamodels' },
    { name: 'ControlProcesses', path: '/controlprocesses' },
    { name: 'RoleViews', path: '/roleviews' }
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <Link href="/" className="block">
        <div className="text-xl font-bold mb-8">SOM</div>
      </Link>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block p-2 rounded hover:bg-gray-700 transition-colors ${
                  pathname === item.path ? 'bg-gray-700' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
