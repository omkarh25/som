/**
 * Application constants defining the relationships between departments, projects, and their associated data
 */
export const DEPARTMENTS = ['Seredipity', 'DhoomStudios', 'Trademan'];

export const DEPARTMENT_PROJECTS: Record<string, string[]> = {
  'Seredipity': ['BookKeeping'],
  'DhoomStudios': ['ContentManagement'],
  'Trademan': ['DocumentManagement']
};

export const PROJECT_DATABASES: Record<string, string> = {
  'BookKeeping': 'Kaas.db',
  'ContentManagement': 'DigitalAssets.db',
  'DocumentManagement': 'BitByBit.db'
};

// Database table structures
export const DATABASE_TABLES: Record<string, Record<string, string[]>> = {
  'Kaas.db': {
    'Transactions': [
      'trno',
      'date',
      'description',
      'amount',
      'paymentmode',
      'accid',
      'department',
      'comments',
      'category',
      'reconciled'
    ],
    'Accounts': [
      'slno',
      'accountname',
      'type',
      'accid',
      'balance',
      'intrate',
      'nextduedate',
      'bank',
      'tenure',
      'emiamt',
      'comments'
    ],
    'Freedom': [
      'trno',
      'date',
      'description',
      'amount',
      'paymentmode',
      'accid',
      'department',
      'comments',
      'category',
      'paid'
    ]
  }
};

/**
 * Helper function to get projects for a department
 */
export const getProjectsForDepartment = (department: string): string[] => {
  return DEPARTMENT_PROJECTS[department] || [];
};

/**
 * Helper function to get database for a project
 */
export const getDatabaseForProject = (project: string): string => {
  return PROJECT_DATABASES[project] || '';
};

/**
 * Helper function to get tables for a database
 */
export const getTablesForDatabase = (database: string): string[] => {
  return Object.keys(DATABASE_TABLES[database] || {});
};

/**
 * Helper function to get columns for a table in a database
 */
export const getColumnsForTable = (database: string, table: string): string[] => {
  return DATABASE_TABLES[database]?.[table] || [];
};

/**
 * Helper function to get table description
 */
export const getTableDescription = (table: string): string => {
  const descriptions: Record<string, string> = {
    'Transactions': 'Records of all financial transactions including EMIs, maintenance, and other expenses',
    'Accounts': 'Details of all accounts including loans, EMIs, and their associated information',
    'Freedom': 'Future transactions and planned payments tracking system'
  };
  return descriptions[table] || 'No description available';
};
