import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the dashboard page when accessing the root URL
  redirect('/upload');
}