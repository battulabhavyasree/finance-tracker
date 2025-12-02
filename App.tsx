
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Transaction, TransactionType, PieChartData } from './types';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCard from './components/SummaryCard';
import ExpensePieChart from './components/ExpensePieChart';
import SavingsTips from './components/SavingsTips';
import { EXPENSE_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((newTransaction: Transaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const expenseChartData = useMemo<PieChartData[]>(() => {
    const categoryMap: { [key: string]: number } = {};
    transactions
      .filter((t) => t.type === TransactionType.EXPENSE && t.category)
      .forEach((t) => {
        const categoryName = EXPENSE_CATEGORIES.find(cat => cat.id === t.category)?.name || t.category || 'Unknown';
        categoryMap[categoryName] = (categoryMap[categoryName] || 0) + t.amount;
      });

    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="min-h-screen container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-indigo-800 leading-tight">
          Monthly <span className="text-purple-600">Budget</span> Tracker
        </h1>
        <p className="text-lg text-gray-600 mt-2">Manage your money, effortlessly.</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1">
          <TransactionForm onAddTransaction={addTransaction} />
        </section>

        <section className="lg:col-span-2 space-y-8">
          <SummaryCard totalIncome={totalIncome} totalExpenses={totalExpenses} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExpensePieChart data={expenseChartData} />
            <SavingsTips />
          </div>
          <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
        </section>
      </main>

      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Monthly Budget Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
