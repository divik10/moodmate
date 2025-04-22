'use client';

import { Entry } from '@/types';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

export default function NoteList({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch(`/api/entries?userId=${userId}`);
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, [userId]);

  if (entries.length === 0) {
    return <p className="text-gray-500 italic">No entries yet. Add your first mood entry!</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border-l-4 border-indigo-500 pl-4 py-2">
          <div className="flex justify-between items-start">
            <p className="font-medium dark:text-white">{entry.note}</p>
            <span className={`inline-block w-4 h-4 rounded-full ${
              entry.mood === 'happy' ? 'bg-happy' :
              entry.mood === 'sad' ? 'bg-sad' :
              entry.mood === 'angry' ? 'bg-angry' :
              entry.mood === 'tired' ? 'bg-tired' :
              'bg-excited'
            }`}></span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>{formatDate(entry.date)}</span>
            {entry.weather && (
              <span>
                {entry.weather.temp}°C, {entry.weather.condition}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}