/**
 * API service for making requests to the backend
 */

export interface TableColumn {
  name: string;
  type: string;
  primary_key: boolean;
  nullable: boolean;
}

export interface TableInfo {
  name: string;
  columns: TableColumn[];
}

export interface DatabaseInfo {
  tables: TableInfo[];
}

export interface Transaction {
  trno: number;
  date: string;
  description: string;
  amount: number;
  paymentmode: string;
  accid: string;
  department: string;
  comments: string | null;
  category: string;
  reconciled: string;
}

export interface Account {
  slno: number;
  accountname: string;
  type: string;
  accid: string;
  balance: number;
  intrate: number;
  nextduedate: string;
  bank: string;
  tenure: number;
  emiamt: number;
  comments: string | null;
}

export interface Freedom {
  trno: number;
  date: string;
  description: string;
  amount: number;
  paymentmode: string;
  accid: string;
  department: string;
  comments: string | null;
  category: string;
  paid: string;
}

const API_BASE_URL = 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

/**
 * Database metadata related endpoints
 */
export const metadataApi = {
  getDatabaseInfo: () => fetchApi<DatabaseInfo>('/metadata/database'),
  getTableInfo: (tableName: string) => fetchApi<TableInfo>(`/metadata/tables/${tableName}`),
};

/**
 * Transactions related endpoints
 */
export const transactionsApi = {
  getTransactions: (params?: { 
    skip?: number;
    limit?: number;
    department?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.department) queryParams.append('department', params.department);
    if (params?.startDate) queryParams.append('start_date', params.startDate);
    if (params?.endDate) queryParams.append('end_date', params.endDate);

    return fetchApi<Transaction[]>(`/transactions/?${queryParams.toString()}`);
  },
  getTransaction: (id: number) => fetchApi<Transaction>(`/transactions/${id}`),
};

/**
 * Accounts related endpoints
 */
export const accountsApi = {
  getAccounts: (params?: {
    skip?: number;
    limit?: number;
    type?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.type) queryParams.append('type', params.type);

    return fetchApi<Account[]>(`/accounts/?${queryParams.toString()}`);
  },
  getAccount: (id: string) => fetchApi<Account>(`/accounts/${id}`),
  getFreedomTransactions: (params?: {
    skip?: number;
    limit?: number;
    paid?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.skip) queryParams.append('skip', params.skip.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.paid) queryParams.append('paid', params.paid);

    return fetchApi<Freedom[]>(`/accounts/freedom/?${queryParams.toString()}`);
  },
};
