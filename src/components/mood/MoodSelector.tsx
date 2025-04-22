'use client';

import { moods } from '@/config/theme';

export default function MoodSelector({
  selectedMood,
  onSelect,
}: {
  selectedMood: string | null;
  onSelect: (mood: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {moods.map((mood) => (
        <button
          key={mood.id}
          type="button"
          onClick={() => onSelect(mood.id)}
          className={`flex items-center px-4 py-2 rounded-full border-2 transition-all 
            ${selectedMood === mood.id 
              ? `border-indigo-500 ${mood.color} text-white` 
              : 'border-gray-200 hover:border-indigo-300 dark:border-gray-600'}`}
        >
          <span className="mr-2 text-xl">{mood.emoji}</span>
          {mood.label}
        </button>
      ))}
    </div>
  );
}