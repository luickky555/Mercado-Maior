import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}