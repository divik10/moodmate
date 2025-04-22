'use client';

import { eachDayOfInterval, endOfMonth, format, isSameDay, startOfMonth } from 'date-fns';
import { useState, useEffect } from 'react';
import { Entry } from '@/types';

export default function Calendar({ userId }: { userId: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState<(Date | null)[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch(`/api/entries?userId=${userId}`);
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, [userId]);

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const startDay = monthStart.getDay();
    const paddedDays = [...Array(startDay).fill(null), ...daysInMonth];
    
    setDays(paddedDays);
  }, [currentMonth]);

  const getMoodForDate = (date: Date | null) => {
    if (!date) return null;
    return entries.find(entry => isSameDay(new Date(entry.date), date))?.mood;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium dark:text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            &lt;
          </button>
          <button 
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            &gt;
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-sm font-medium text-gray-500 dark:text-gray-400 py-1">{day}</div>
        ))}
        
        {days.map((day, i) => {
          const mood = getMoodForDate(day);
          return (
            <div 
              key={i} 
              className={`h-10 flex items-center justify-center rounded-full 
                ${day ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                ${day && isSameDay(day, new Date()) ? 'border-2 border-indigo-500' : ''}
              `}
            >
              {day ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm dark:text-white">{format(day, 'd')}</span>
                  {mood && (
                    <div className={`w-2 h-2 rounded-full ${
                      mood === 'happy' ? 'bg-happy' :
                      mood === 'sad' ? 'bg-sad' :
                      mood === 'angry' ? 'bg-angry' :
                      mood === 'tired' ? 'bg-tired' :
                      'bg-excited'
                    }`}></div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}