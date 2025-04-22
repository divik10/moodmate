'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import MoodSelector from './MoodSelector';
import { saveEntry } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function MoodEntry({ userId }: { userId: string }) {
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood || !session) return;

    const newEntry = {
      userId,
      date: new Date().toISOString(),
      mood: selectedMood,
      note,
      weather: {
        temp: 22, // Would come from actual weather API
        condition: 'Sunny'
      }
    };

    await saveEntry(newEntry);
    setNote('');
    setSelectedMood(null);
    router.refresh();
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors">
      <h2 className="text-2xl font-semibold mb-2 dark:text-white">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        How are you feeling today?
      </p>
      
      <form onSubmit={handleSubmit}>
        <MoodSelector 
          selectedMood={selectedMood}
          onSelect={setSelectedMood}
        />
        
        <div className="mb-6">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            rows={4}
          />
        </div>
        
        <button
          type="submit"
          disabled={!selectedMood}
          className={`px-6 py-3 rounded-lg font-medium text-white transition-colors
            ${selectedMood ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Save Entry
        </button>
      </form>
    </section>
  );
}