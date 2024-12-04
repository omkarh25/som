/**
 * Defines the available roles and their views for each project
 */

export interface RoleView {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  views: RoleView[];
}

export const PROJECT_ROLES: Record<string, Role[]> = {
  'BookKeeping': [
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full access to all bookkeeping features and management capabilities',
      views: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          description: 'Overview of financial status and key metrics',
          features: [
            'Total transactions overview',
            'EMI payment status',
            'Account balances',
            'Pending reconciliations'
          ]
        },
        {
          id: 'reports',
          name: 'Reports',
          description: 'Detailed financial reports and analytics',
          features: [
            'Monthly expense reports',
            'Category-wise analysis',
            'Payment mode distribution',
            'Reconciliation status'
          ]
        }
      ]
    },
    {
      id: 'ca-view',
      name: 'CAView',
      description: 'Chartered Accountant view with focus on financial compliance',
      views: [
        {
          id: 'transactions',
          name: 'Transactions',
          description: 'Detailed view of all financial transactions',
          features: [
            'Transaction history',
            'Category-wise grouping',
            'Reconciliation tools',
            'Export capabilities'
          ]
        }
      ]
    },
    {
      id: 'calendar-view',
      name: 'CalendarView',
      description: 'Calendar-based view of financial events and deadlines',
      views: [
        {
          id: 'schedule',
          name: 'Schedule',
          description: 'Calendar view of financial events',
          features: [
            'EMI due dates',
            'Recurring payments',
            'Payment reminders',
            'Important deadlines'
          ]
        }
      ]
    }
  ],
  'ContentManagement': [
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full access to content management system',
      views: [
        {
          id: 'content-dashboard',
          name: 'Content Dashboard',
          description: 'Overview of content status and metrics',
          features: [
            'Content overview',
            'Publishing status',
            'Performance metrics',
            'Team management'
          ]
        }
      ]
    },
    {
      id: 'creator-view',
      name: 'CreatorView',
      description: 'Content creator workspace',
      views: [
        {
          id: 'workspace',
          name: 'Workspace',
          description: 'Content creation and management workspace',
          features: [
            'Content editor',
            'Media library',
            'Draft management',
            'Publishing tools'
          ]
        }
      ]
    }
  ],
  'DocumentManagement': [
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full access to document management system',
      views: [
        {
          id: 'doc-dashboard',
          name: 'Document Dashboard',
          description: 'Overview of document status and organization',
          features: [
            'Document overview',
            'Storage metrics',
            'Access logs',
            'System settings'
          ]
        }
      ]
    },
    {
      id: 'doc-manager-view',
      name: 'DocManagerView',
      description: 'Document management workspace',
      views: [
        {
          id: 'manager-workspace',
          name: 'Manager Workspace',
          description: 'Document processing and organization tools',
          features: [
            'Document processing',
            'Category management',
            'Search and filter',
            'Batch operations'
          ]
        }
      ]
    }
  ]
};

/**
 * Helper function to get roles for a project
 */
export const getRolesForProject = (project: string): Role[] => {
  return PROJECT_ROLES[project] || [];
};

/**
 * Helper function to get a specific role by ID within a project
 */
export const getRoleById = (project: string, roleId: string): Role | undefined => {
  return PROJECT_ROLES[project]?.find(role => role.id === roleId);
};
