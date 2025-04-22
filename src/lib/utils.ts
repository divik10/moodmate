'use client';

import { Entry } from '@/types';

export const saveEntry = async (entry: Entry) => {
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error('Failed to save entry');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving entry:', error);
    throw error;
  }
};

export const getEntries = async (userId: string) => {
  try {
    const response = await fetch(`/api/entries?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};