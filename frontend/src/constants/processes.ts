/**
 * Defines the available processes for each project
 */

export interface ProcessField {
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  label: string;
  required?: boolean;
  options?: string[];
}

export interface Process {
  id: string;
  name: string;
  description: string;
  fields: ProcessField[];
}

export const PROJECT_PROCESSES: Record<string, Process[]> = {
  'BookKeeping': [
    {
      id: 'add-transaction',
      name: 'Add Transaction',
      description: 'Add a new transaction to the system',
      fields: [
        {
          name: 'date',
          type: 'date',
          label: 'Transaction Date',
          required: true
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true
        },
        {
          name: 'amount',
          type: 'number',
          label: 'Amount',
          required: true
        },
        {
          name: 'paymentmode',
          type: 'select',
          label: 'Payment Mode',
          required: true,
          options: ['Cash', 'Bank Transfer', 'Credit Card', 'UPI']
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: ['EMI', 'Maintenance', 'Salaries', 'Other']
        },
        {
          name: 'comments',
          type: 'text',
          label: 'Comments'
        }
      ]
    },
    {
      id: 'reconcile-accounts',
      name: 'Reconcile Accounts',
      description: 'Reconcile transactions with bank statements',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Start Date',
          required: true
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
          required: true
        },
        {
          name: 'accountId',
          type: 'select',
          label: 'Account',
          required: true,
          options: ['EMI_001', 'EMI_002', 'EMI_003', 'EMI_004', 'EMI_007']
        }
      ]
    }
  ],
  'ContentManagement': [
    {
      id: 'upload-content',
      name: 'Upload Content',
      description: 'Upload new content to the system',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Content Title',
          required: true
        },
        {
          name: 'type',
          type: 'select',
          label: 'Content Type',
          required: true,
          options: ['Video', 'Image', 'Document']
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description'
        }
      ]
    }
  ],
  'DocumentManagement': [
    {
      id: 'process-document',
      name: 'Process Document',
      description: 'Process and categorize new documents',
      fields: [
        {
          name: 'documentType',
          type: 'select',
          label: 'Document Type',
          required: true,
          options: ['Invoice', 'Contract', 'Report', 'Other']
        },
        {
          name: 'priority',
          type: 'select',
          label: 'Priority',
          required: true,
          options: ['High', 'Medium', 'Low']
        },
        {
          name: 'notes',
          type: 'text',
          label: 'Processing Notes'
        }
      ]
    }
  ]
};

/**
 * Helper function to get processes for a project
 */
export const getProcessesForProject = (project: string): Process[] => {
  return PROJECT_PROCESSES[project] || [];
};

/**
 * Helper function to get a specific process by ID within a project
 */
export const getProcessById = (project: string, processId: string): Process | undefined => {
  return PROJECT_PROCESSES[project]?.find(process => process.id === processId);
};
