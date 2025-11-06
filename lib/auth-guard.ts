import { redirect } from 'next/navigation';
import { isAdmin } from './auth';

export function adminGuard() {
  if (!isAdmin()) {
    return redirect('/login');
  }
}

export function publicGuard() {
  if (isAdmin()) {
    return redirect('/admin');
  }
}