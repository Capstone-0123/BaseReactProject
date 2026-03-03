import Browse from '../../pages/Browse';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  "title": "Browse - Netflix Clone",
  "description": "Browse movies and TV shows",
  "openGraph": {
    "title": "Browse - Netflix Clone",
    "description": "Browse movies and TV shows"
  }
};


export default function Page() {
  return (
    <Browse />
  );
}