import Login from '../../pages/Login';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  "title": "Login - Netflix Clone",
  "description": "Sign in to your Netflix account",
  "openGraph": {
    "title": "Login - Netflix Clone"
  }
};


export default function Page() {
  return (
    <Login />
  );
}