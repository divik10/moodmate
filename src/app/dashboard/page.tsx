import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import MoodEntry from '../../components/mood/MoodEntry';
import Calendar from '../../components/calendar/Calendar';
import NoteList from '../../components/notes/NoteList';
import Header from '../../components/shared/Header';
import WeatherDisplay from '@/components/ui/WeatherDisplay';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      
      <div className="mt-4">
        <WeatherDisplay />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <MoodEntry userId={session.user.id} />
          
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Recent Entries
            </h2>
            <NoteList userId={session.user.id} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-fit">
          <Calendar userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}