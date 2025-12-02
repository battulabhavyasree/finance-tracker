
import React, { useEffect, useState, useCallback } from 'react';
import Card from './Card';
import Button from './Button';
import { fetchSavingsTips } from '../services/geminiService';

const SavingsTips: React.FC = () => {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTips = await fetchSavingsTips();
      setTips(fetchedTips);
    } catch (err) {
      console.error('Failed to load savings tips:', err);
      setError('Failed to load savings tips. Please try again.');
      setTips([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    loadTips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount to fetch initial tips

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Savings Tips</h2>
      {loading && <p className="text-center text-indigo-600">Loading tips...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && tips.length > 0 && (
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      )}
      {!loading && tips.length === 0 && !error && (
        <p className="text-gray-500 italic text-center">No tips available. Click 'Generate More Tips' to get started!</p>
      )}
      <Button onClick={loadTips} disabled={loading} className="mt-6 w-full">
        {loading ? 'Generating...' : 'Generate More Tips'}
      </Button>
    </Card>
  );
};

export default SavingsTips;
