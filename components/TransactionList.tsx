
import React from 'react';
import { Transaction, TransactionType } from '../types';
import Button from './Button';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 italic">No transactions added yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="py-3 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {transaction.type === TransactionType.EXPENSE ? `Category: ${transaction.category}` : 'Income'} - {transaction.date}
                </p>
              </div>
              <div className="flex items-center">
                <span
                  className={`text-lg font-semibold ${
                    transaction.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === TransactionType.INCOME ? '+' : '-'}€{transaction.amount.toFixed(2)}
                </span>
                <Button 
                  variant="danger" 
                  onClick={() => onDeleteTransaction(transaction.id)} 
                  className="ml-4 p-1 px-3 bg-red-500 hover:bg-red-600 focus:ring-red-400 text-sm"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
