import { NextResponse } from 'next/server';

/**
 * GET handler for transactions endpoint
 * Returns mock transaction data for demonstration
 */
export async function GET() {
  // Mock transaction data
  const transactions = [
    {
      trno: 1,
      date: '2024-12-01',
      description: 'Client Payment',
      amount: 5000.00,
      paymentmode: 'Bank Transfer',
      department: 'Serendipity',
      category: 'Income',
      reconciled: 'Yes'
    },
    {
      trno: 2,
      date: '2024-12-03',
      description: 'Office Supplies',
      amount: -250.50,
      paymentmode: 'Credit Card',
      department: 'Serendipity',
      category: 'Expenses',
      reconciled: 'No'
    },
    {
      trno: 3,
      date: '2024-12-05',
      description: 'Software License',
      amount: -899.99,
      paymentmode: 'Credit Card',
      department: 'Serendipity',
      category: 'Software',
      reconciled: 'Yes'
    },
    {
      trno: 4,
      date: '2024-12-10',
      description: 'Consulting Fee',
      amount: 3500.00,
      paymentmode: 'Bank Transfer',
      department: 'Serendipity',
      category: 'Income',
      reconciled: 'Yes'
    }
  ];

  return NextResponse.json(transactions);
}
