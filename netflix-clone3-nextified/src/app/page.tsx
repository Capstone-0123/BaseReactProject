import Home from '../pages/Home';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  "title": "Netflix Clone - Home",
  "description": "Welcome to Netflix Clone",
  "openGraph": {
    "title": "Netflix Clone - Home",
    "description": "Welcome to Netflix Clone"
  }
};


export default function Page() {
  return (
    <Home />
  );
}