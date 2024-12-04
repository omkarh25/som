'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface BaseTransaction {
  trno: number;
  date: string;
  description: string;
  amount: number;
  paymentmode: string;
  department: string;
  category: string;
}

interface RegularTransaction extends BaseTransaction {
  type: 'transaction';
  reconciled: string;
}

interface FreedomTransaction extends BaseTransaction {
  type: 'freedom';
  paid: string;
}

type Transaction = RegularTransaction | FreedomTransaction;

/**
 * CalendarView Component
 * Displays financial transactions and events in a calendar format with dark mode support
 */
export default function CalendarView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both transactions and freedom entries
        const [transactionsRes, freedomRes] = await Promise.all([
          fetch('http://localhost:8000/transactions/'),
          fetch('http://localhost:8000/accounts/freedom/')
        ]);

        if (!transactionsRes.ok) {
          throw new Error('Failed to fetch transactions');
        }
        if (!freedomRes.ok) {
          throw new Error('Failed to fetch freedom transactions');
        }

        const transactionsData = await transactionsRes.json();
        const freedomData = await freedomRes.json();

        // Combine both types of transactions with proper typing
        const allTransactions: Transaction[] = [
          ...transactionsData.map((t: BaseTransaction) => ({ ...t, type: 'transaction' } as RegularTransaction)),
          ...freedomData.map((t: BaseTransaction) => ({ ...t, type: 'freedom' } as FreedomTransaction))
        ];

        if (allTransactions.length === 0) {
          setError('No transactions found');
          return;
        }

        setTransactions(allTransactions);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load transaction data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format transactions for calendar events
  const events = transactions.map(transaction => {
    const isIncome = transaction.amount > 0;
    const isFreedom = transaction.type === 'freedom';

    // Define colors based on transaction type and amount
    let backgroundColor, borderColor;
    if (isFreedom) {
      backgroundColor = isIncome 
        ? resolvedTheme === 'dark' ? '#0d9488' : '#14b8a6'  // Teal for future income
        : resolvedTheme === 'dark' ? '#9333ea' : '#a855f7'; // Purple for future expenses
      borderColor = isIncome
        ? resolvedTheme === 'dark' ? '#0f766e' : '#0d9488'
        : resolvedTheme === 'dark' ? '#7e22ce' : '#9333ea';
    } else {
      backgroundColor = isIncome
        ? resolvedTheme === 'dark' ? '#22c55e' : '#16a34a'  // Green for income
        : resolvedTheme === 'dark' ? '#ef4444' : '#dc2626'; // Red for expenses
      borderColor = isIncome
        ? resolvedTheme === 'dark' ? '#16a34a' : '#15803d'
        : resolvedTheme === 'dark' ? '#dc2626' : '#b91c1c';
    }

    return {
      id: transaction.trno.toString(),
      title: `${transaction.description} - ${transaction.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })}`,
      start: transaction.date,
      backgroundColor,
      borderColor,
      textColor: resolvedTheme === 'dark' ? '#f3f4f6' : '#ffffff',
      classNames: ['transaction-event', isFreedom ? 'freedom-event' : ''],
      extendedProps: {
        type: transaction.type,
        status: isFreedom ? (transaction as FreedomTransaction).paid : (transaction as RegularTransaction).reconciled
      }
    };
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financial Calendar
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            View and manage your financial transactions and events
          </p>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Expense</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-600"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Future Income</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Future Expense</span>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading transactions...</p>
            </div>
          </div>
        )}

        {error ? (
          <div className="flex items-center justify-center min-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-center">
              <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="calendar-container bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              eventClick={(info) => {
                const transaction = transactions.find(t => t.trno.toString() === info.event.id);
                if (transaction) {
                  const isFreedom = transaction.type === 'freedom';
                  alert(`
                    Transaction Details:
                    Type: ${isFreedom ? 'Future Transaction' : 'Transaction'}
                    Description: ${transaction.description}
                    Amount: ${transaction.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                    Payment Mode: ${transaction.paymentmode}
                    Category: ${transaction.category}
                    Department: ${transaction.department}
                    Status: ${isFreedom 
                      ? `Paid: ${(transaction as FreedomTransaction).paid}`
                      : `Reconciled: ${(transaction as RegularTransaction).reconciled}`
                    }
                  `);
                }
              }}
              height="auto"
              themeSystem="standard"
              dayMaxEvents={3}
              eventDisplay="block"
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              allDaySlot={false}
              nowIndicator={true}
              weekNumbers={true}
              weekNumberFormat={{ week: 'numeric' }}
              firstDay={1}
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        .fc {
          --fc-border-color: ${resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'};
          --fc-button-text-color: ${resolvedTheme === 'dark' ? '#fff' : '#374151'};
          --fc-button-bg-color: ${resolvedTheme === 'dark' ? '#374151' : '#f9fafb'};
          --fc-button-border-color: ${resolvedTheme === 'dark' ? '#4b5563' : '#d1d5db'};
          --fc-button-hover-bg-color: ${resolvedTheme === 'dark' ? '#4b5563' : '#f3f4f6'};
          --fc-button-hover-border-color: ${resolvedTheme === 'dark' ? '#6b7280' : '#9ca3af'};
          --fc-button-active-bg-color: ${resolvedTheme === 'dark' ? '#6b7280' : '#e5e7eb'};
          --fc-today-bg-color: ${resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
          --fc-page-bg-color: ${resolvedTheme === 'dark' ? '#1f2937' : '#ffffff'};
          --fc-neutral-bg-color: ${resolvedTheme === 'dark' ? '#374151' : '#f9fafb'};
          --fc-list-event-hover-bg-color: ${resolvedTheme === 'dark' ? '#374151' : '#f3f4f6'};
          --fc-theme-standard-border-color: ${resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'};
        }

        .fc .fc-toolbar-title {
          color: ${resolvedTheme === 'dark' ? '#fff' : '#111827'};
        }

        .fc .fc-daygrid-day-number,
        .fc .fc-col-header-cell-cushion {
          color: ${resolvedTheme === 'dark' ? '#fff' : '#111827'};
        }

        .transaction-event {
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          margin: 2px 0;
          font-size: 0.875rem;
        }

        .freedom-event {
          border-style: dashed;
        }

        .transaction-event:hover {
          filter: brightness(110%);
        }

        .fc-event-title {
          font-weight: 500;
          padding: 2px 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fc-day-today {
          background-color: ${resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'} !important;
        }

        .fc-button {
          font-weight: 500;
          text-transform: capitalize;
        }

        .fc-button:focus {
          box-shadow: 0 0 0 2px ${resolvedTheme === 'dark' ? '#3b82f6' : '#3b82f6'};
        }
      `}</style>
    </div>
  );
}
