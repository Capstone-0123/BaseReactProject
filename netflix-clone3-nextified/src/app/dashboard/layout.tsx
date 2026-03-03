import DashboardLayout from '../../pages/dashboard/DashboardLayout';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  "title": "Dashboard - Netflix Clone",
  "description": "User dashboard"
};


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
}