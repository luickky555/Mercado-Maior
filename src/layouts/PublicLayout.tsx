import { Outlet, Link } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bege-light font-sans">
      {/* Navbar Temporária para navegação fácil durante o desenvolvimento */}
      <header className="bg-carnauba text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-dourado">Mercado Maior</Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/produtos" className="hover:text-terracota transition">Produtos</Link>
            <Link to="/lojas" className="hover:text-terracota transition">Lojas</Link>
            <Link to="/vagas" className="hover:text-terracota transition">Vagas</Link>
            <Link to="/carrinho" className="hover:text-terracota transition">Carrinho</Link>
          </nav>
        </div>
      </header>

      {/* Onde as páginas vão ser renderizadas */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer Temporário */}
      <footer className="bg-carnauba-dark text-white/60 p-6 text-center text-sm">
        <p>© 2024 Mercado Maior. Desenvolvido para Campo Maior - PI.</p>
      </footer>
    </div>
  );
}