import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Header from '../components/shared/Header';


export default async function Home() {
  
  const session = await getServerSession(authOptions);

  if (session) {
   
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Header />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MoodMate</h1>
        <p className="text-xl mb-8">
          Track your mood and see how it correlates with the weather
        </p>
        <a
          href="/login"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
