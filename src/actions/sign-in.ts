'use server';

import * as auth from '@/auth';

export async function SignIn() {
  return auth.signIn('github');
}
