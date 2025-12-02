
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import Button from './Button';
import InputField from './InputField';
import SelectField from './SelectField';
import { EXPENSE_CATEGORIES } from '../constants';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      type,
      category: type === TransactionType.EXPENSE ? category : undefined,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    onAddTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setType(TransactionType.EXPENSE);
    setCategory(EXPENSE_CATEGORIES[0]?.id || '');
  };

  const categoryOptions = EXPENSE_CATEGORIES.map(cat => ({ value: cat.id, label: cat.name }));

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Transaction</h2>
      <InputField
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g., Groceries, Salary"
        required
      />
      <InputField
        id="amount"
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        placeholder="e.g., 50.00"
        required
      />
      <SelectField
        id="type"
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        options={[
          { value: TransactionType.EXPENSE, label: 'Expense' },
          { value: TransactionType.INCOME, label: 'Income' },
        ]}
      />
      {type === TransactionType.EXPENSE && (
        <SelectField
          id="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoryOptions}
          required
        />
      )}
      <Button type="submit" className="w-full mt-4">
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
