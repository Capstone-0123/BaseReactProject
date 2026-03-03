import DashboardProfile from '../../../pages/dashboard/DashboardProfile';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  "title": "Profile - Dashboard",
  "description": "User profile page"
};


export default function Page() {
  return (
    <DashboardProfile />
  );
}