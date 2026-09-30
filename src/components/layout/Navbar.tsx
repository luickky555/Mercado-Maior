import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  Search,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/common/Logo";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCartStore } from "@/hooks/useCartStore";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);

  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const getDashboardLink = () => {
    switch (user?.role) {
      case "buyer":
        return "/buyer";

      case "seller":
        return "/seller";

      case "delivery":
        return "/delivery";

      case "admin":
        return "/admin";

      default:
        return "/";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-carnauba/10 bg-bege-light/95 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-4 py-3">

        <div className="flex items-center gap-6">
          <Logo />

          <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
            <Link
              to="/produtos"
              className={
                isActive("/produtos")
                  ? "text-carnauba"
                  : "text-carnauba/70 hover:text-carnauba"
              }
            >
              Produtos
            </Link>

            <Link
              to="/lojas"
              className={
                isActive("/lojas")
                  ? "text-carnauba"
                  : "text-carnauba/70 hover:text-carnauba"
              }
            >
              Lojas
            </Link>

            <Link
              to="/vagas"
              className={
                isActive("/vagas")
                  ? "text-carnauba"
                  : "text-carnauba/70 hover:text-carnauba"
              }
            >
              Entregadores
            </Link>
          </nav>
        </div>

        <div className="hidden max-w-md flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carnauba/50" />

            <Input
              placeholder="Buscar produtos de Campo Maior..."
              className="bg-white pl-9 border-carnauba/20 focus-visible:ring-carnauba"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">

          <Link to="/carrinho" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-carnauba hover:bg-carnauba/10"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {cartItemsCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracota px-1 text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">

              <Link
                to={getDashboardLink()}
                className="hidden sm:block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-carnauba/20 text-carnauba"
                >
                  <Store className="mr-2 h-4 w-4" />
                  Meu painel
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-carnauba hover:bg-carnauba/10"
                aria-label="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>

            </div>
          ) : (
            <div className="flex items-center gap-2">

              <Link to="/login" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-carnauba hover:bg-carnauba/10"
                >
                  Entrar
                </Button>
              </Link>

              <Link to="/cadastro">
                <Button className="bg-carnauba text-white hover:bg-carnauba-light">
                  <User className="mr-2 h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">
                    Criar conta
                  </span>
                </Button>
              </Link>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}