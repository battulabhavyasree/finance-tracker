
import React from 'react';
import Card from './Card';

interface SummaryCardProps {
  totalIncome: number;
  totalExpenses: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ totalIncome, totalExpenses }) => {
  const savings = totalIncome - totalExpenses;
  const savingsClass = savings >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Monthly Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div className="p-4 bg-indigo-50 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Income</p>
          <p className="text-xl font-bold text-green-700">€{totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Expenses</p>
          <p className="text-xl font-bold text-red-700">€{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-gray-600">Savings</p>
          <p className={`text-xl font-bold ${savingsClass}`}>€{savings.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
