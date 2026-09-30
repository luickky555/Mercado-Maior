import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Topo do Dashboard */}
      <header className="bg-blue-900 text-white p-5 sticky top-0 z-10 shadow-md rounded-b-xl">
        <h1 className="text-xl font-bold text-center">Painel do Vendedor</h1>
      </header>

      {/* 
        O <Outlet /> é fundamental no React Router! 
        É aqui dentro que as páginas (Início, Vendas, Estoque) vão aparecer.
      */}
      <main className="max-w-md mx-auto min-h-screen">
        <Outlet /> 
      </main>
      
      {/* Você pode colocar o seu BottomNav (Menu inferior) aqui embaixo depois */}
    </div>
  );
}