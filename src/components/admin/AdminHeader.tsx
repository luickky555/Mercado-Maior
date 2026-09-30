export function AdminHeader() {
  return (
    <header className="bg-white border-b border-carnauba/10 px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-carnauba">Painel de Administração</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-carnauba/70">Admin Master</span>
        <div className="h-8 w-8 rounded-full bg-terracota text-white flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </header>
  );
}