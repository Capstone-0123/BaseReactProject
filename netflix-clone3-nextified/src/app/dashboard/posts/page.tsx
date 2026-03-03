import DashboardPosts from '../../../pages/dashboard/DashboardPosts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  "title": "Posts - Dashboard",
  "description": "User posts page"
};


export default function Page() {
  return (
    <DashboardPosts />
  );
}