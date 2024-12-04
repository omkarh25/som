'use client';

import Dropdown from '@/components/ui/dropdown';
import { DEPARTMENTS, getProjectsForDepartment } from '@/constants/data';
import type { Account, DatabaseInfo, Freedom, Transaction } from '@/services/api';
import { accountsApi, transactionsApi } from '@/services/api';
import {
  Cell,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  HeaderGroup,
  Row,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

/**
 * DataModels page component
 * Displays database structure and allows navigation through departments, projects, and tables
 */
export default function DataModelsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [databaseInfo, setDatabaseInfo] = useState<DatabaseInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [freedomTransactions, setFreedomTransactions] = useState<Freedom[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get available options based on selections
  const projects = selectedDepartment ? getProjectsForDepartment(selectedDepartment) : [];
  const tables = databaseInfo?.tables.map(t => t.name) || [];

  // Column helpers for TanStack Table
  const transactionColumnHelper = createColumnHelper<Transaction>();
  const accountColumnHelper = createColumnHelper<Account>();
  const freedomColumnHelper = createColumnHelper<Freedom>();

  // Theme classes
  const themeClasses = {
    container: isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
    header: isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-500',
    row: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    cell: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    text: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    button: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200',
  };

  // Define columns for transactions table
  const transactionColumns = useMemo(
    () => [
      transactionColumnHelper.accessor('trno', {
        header: 'Transaction No',
        cell: info => info.getValue(),
      }),
      transactionColumnHelper.accessor('date', {
        header: 'Date',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      }),
      transactionColumnHelper.accessor('description', {
        header: 'Description',
        cell: info => info.getValue(),
      }),
      transactionColumnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `₹${info.getValue().toLocaleString()}`,
      }),
      transactionColumnHelper.accessor('paymentmode', {
        header: 'Payment Mode',
        cell: info => info.getValue(),
      }),
      transactionColumnHelper.accessor('accid', {
        header: 'Account ID',
        cell: info => info.getValue(),
      }),
      transactionColumnHelper.accessor('department', {
        header: 'Department',
        cell: info => info.getValue(),
      }),
      transactionColumnHelper.accessor('category', {
        header: 'Category',
        cell: info => info.getValue(),
      }),
      transactionColumnHelper.accessor('reconciled', {
        header: 'Reconciled',
        cell: info => info.getValue(),
      }),
    ],
    [transactionColumnHelper]
  );

  // Define columns for accounts table
  const accountColumns = useMemo(
    () => [
      accountColumnHelper.accessor('slno', {
        header: 'Serial No',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('accountname', {
        header: 'Account Name',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('type', {
        header: 'Type',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('accid', {
        header: 'Account ID',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('balance', {
        header: 'Balance',
        cell: info => `₹${info.getValue().toLocaleString()}`,
      }),
      accountColumnHelper.accessor('intrate', {
        header: 'Interest Rate',
        cell: info => `${info.getValue()}%`,
      }),
      accountColumnHelper.accessor('nextduedate', {
        header: 'Next Due Date',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('bank', {
        header: 'Bank',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('tenure', {
        header: 'Tenure',
        cell: info => info.getValue(),
      }),
      accountColumnHelper.accessor('emiamt', {
        header: 'EMI Amount',
        cell: info => `₹${info.getValue().toLocaleString()}`,
      }),
    ],
    [accountColumnHelper]
  );

  // Define columns for freedom table
  const freedomColumns = useMemo(
    () => [
      freedomColumnHelper.accessor('trno', {
        header: 'Transaction No',
        cell: info => info.getValue(),
      }),
      freedomColumnHelper.accessor('date', {
        header: 'Date',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      }),
      freedomColumnHelper.accessor('description', {
        header: 'Description',
        cell: info => info.getValue(),
      }),
      freedomColumnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `₹${info.getValue().toLocaleString()}`,
      }),
      freedomColumnHelper.accessor('paymentmode', {
        header: 'Payment Mode',
        cell: info => info.getValue(),
      }),
      freedomColumnHelper.accessor('accid', {
        header: 'Account ID',
        cell: info => info.getValue(),
      }),
      freedomColumnHelper.accessor('department', {
        header: 'Department',
        cell: info => info.getValue(),
      }),
      freedomColumnHelper.accessor('category', {
        header: 'Category',
        cell: info => info.getValue(),
      }),
      freedomColumnHelper.accessor('paid', {
        header: 'Paid',
        cell: info => info.getValue(),
      }),
    ],
    [freedomColumnHelper]
  );

  // Initialize TanStack Tables
  const transactionTable = useReactTable({
    data: transactions,
    columns: transactionColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const accountTable = useReactTable({
    data: accounts,
    columns: accountColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const freedomTable = useReactTable({
    data: freedomTransactions,
    columns: freedomColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Fetch database information when component mounts
  useEffect(() => {
    const fetchDatabaseInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching database info...');
        const response = await fetch('http://localhost:8000/metadata/database', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Raw response:', text);
        
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
        
        if (!data.tables) {
          throw new Error('Invalid data structure received');
        }
        
        setDatabaseInfo(data);
      } catch (err) {
        console.error('Error fetching database info:', err);
        setError(`Failed to fetch database information: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabaseInfo();
  }, []);

  // Fetch data when table is selected
  useEffect(() => {
    const fetchData = async () => {
      if (selectedTable) {
        try {
          setLoading(true);
          setError(null);

          if (selectedTable === 'transactions') {
            const data = await transactionsApi.getTransactions({ limit: 100 });
            setTransactions(data);
          } else if (selectedTable === 'accounts') {
            const data = await accountsApi.getAccounts({ limit: 100 });
            setAccounts(data);
          } else if (selectedTable === 'freedom') {
            const data = await accountsApi.getFreedomTransactions({ limit: 100 });
            setFreedomTransactions(data);
          }
        } catch (err) {
          console.error(`Error fetching ${selectedTable}:`, err);
          setError(`Failed to fetch ${selectedTable}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedTable]);

  // Get the selected table information
  const selectedTableInfo = databaseInfo?.tables.find(t => t.name === selectedTable);

  const getTableDescription = (tableName: string): string => {
    switch (tableName.toLowerCase()) {
      case 'transactions':
        return 'Records of all financial transactions including EMIs, maintenance, and other expenses';
      case 'accounts':
        return 'Details of all accounts including loans, EMIs, and their associated information';
      case 'freedom':
        return 'Future transactions and planned payments tracking system';
      default:
        return 'Table information';
    }
  };

  const renderTable = () => {
    if (loading) return null;

    const tableClasses = `min-w-full border-collapse ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`;
    const headerClasses = `border px-4 py-2 text-left text-sm font-medium cursor-pointer ${themeClasses.header} ${themeClasses.cell}`;
    const cellClasses = `border px-4 py-2 ${themeClasses.cell}`;

    const renderTableContent = (table: any) => (
      <table className={tableClasses}>
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  className={headerClasses}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<any>) => (
            <tr key={row.id} className={themeClasses.row}>
              {row.getVisibleCells().map((cell: Cell<any, any>) => (
                <td key={cell.id} className={cellClasses}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );

    switch (selectedTable) {
      case 'transactions':
        return renderTableContent(transactionTable);
      case 'accounts':
        return renderTableContent(accountTable);
      case 'freedom':
        return renderTableContent(freedomTable);
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-8 p-8 min-h-screen ${themeClasses.container}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Data Models</h1>
          <p className={themeClasses.text}>
            Select a department, project, and database table to view the data structure.
          </p>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`px-4 py-2 rounded-md transition-colors ${themeClasses.button}`}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="flex gap-4">
        <Dropdown
          label="Department"
          options={DEPARTMENTS}
          value={selectedDepartment}
          onChange={(value) => {
            setSelectedDepartment(value);
            setSelectedProject('');
            setSelectedTable('');
          }}
        />

        {selectedDepartment && (
          <Dropdown
            label="Project"
            options={projects}
            value={selectedProject}
            onChange={(value) => {
              setSelectedProject(value);
              setSelectedTable('');
            }}
          />
        )}

        {selectedProject && (
          <Dropdown
            label="Table"
            options={tables}
            value={selectedTable}
            onChange={setSelectedTable}
          />
        )}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'} mx-auto`}></div>
          <p className={`mt-2 ${themeClasses.text}`}>Loading...</p>
        </div>
      )}

      {error && (
        <div className={`${isDarkMode ? 'bg-red-900 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'} px-4 py-3 rounded border`}>
          {error}
        </div>
      )}

      {selectedTableInfo && !['transactions', 'accounts', 'freedom'].includes(selectedTable) && (
        <div className={`p-6 rounded-lg shadow ${themeClasses.container}`}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{selectedTableInfo.name}</h2>
            <p className={themeClasses.text}>
              {getTableDescription(selectedTableInfo.name)}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className={`min-w-full border-collapse ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <thead>
                <tr className={themeClasses.header}>
                  <th className={`border px-4 py-2 text-left text-sm font-medium ${themeClasses.cell}`}>
                    Column Name
                  </th>
                  <th className={`border px-4 py-2 text-left text-sm font-medium ${themeClasses.cell}`}>
                    Type
                  </th>
                  <th className={`border px-4 py-2 text-left text-sm font-medium ${themeClasses.cell}`}>
                    Constraints
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedTableInfo.columns.map((column: TableColumn) => (
                  <tr key={column.name} className={themeClasses.row}>
                    <td className={`border px-4 py-2 ${themeClasses.cell}`}>{column.name}</td>
                    <td className={`border px-4 py-2 ${themeClasses.cell}`}>{column.type}</td>
                    <td className={`border px-4 py-2 ${themeClasses.cell}`}>
                      {[
                        column.primary_key ? 'Primary Key' : null,
                        !column.nullable ? 'Not Null' : null,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTable && ['transactions', 'accounts', 'freedom'].includes(selectedTable) && !loading && (
        <div className={`p-6 rounded-lg shadow ${themeClasses.container}`}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}</h2>
            <p className={themeClasses.text}>
              {getTableDescription(selectedTable)}
            </p>
          </div>

          <div className="overflow-x-auto">
            {renderTable()}
          </div>
        </div>
      )}
    </div>
  );
}
