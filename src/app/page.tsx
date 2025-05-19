import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
  return null; // redirect() throws an error, so this line is not strictly necessary but good for clarity
}
