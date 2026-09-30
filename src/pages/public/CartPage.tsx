import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/hooks/useCartStore';
import { useAuthStore } from '@/hooks/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 5.00 : 0; // Taxa fixa simbólica
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info('Faça login para finalizar sua compra.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-carnauba/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-carnauba/30" />
        </div>
        <h2 className="text-2xl font-bold text-carnauba mb-2">Seu carrinho está vazio</h2>
        <p className="text-carnauba/60 mb-8">Aproveite para explorar os produtos da nossa terra.</p>
        <Link to="/produtos">
          <Button className="bg-terracota hover:bg-terracota-dark text-white px-8 h-12 text-lg">
            Explorar Produtos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-carnauba mb-8">Seu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-end mb-2">
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={clearCart}>
              Esvaziar Carrinho
            </Button>
          </div>
          
          {items.map((item) => (
            <Card key={item.product.id} className="border-carnauba/10 bg-white">
              <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="h-24 w-24 rounded-lg bg-carnauba/5 overflow-hidden shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left w-full">
                  <Link to={`/produtos/${item.product.id}`} className="font-bold text-carnauba hover:text-terracota line-clamp-1">
                    {item.product.name}
                  </Link>
                  <div className="text-terracota font-bold mt-1">{formatCurrency(item.product.price)}</div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center border border-carnauba/20 rounded-lg bg-bege-light">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-carnauba" onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold text-carnauba">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-carnauba" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-carnauba/50 hover:text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="border-carnauba/10 bg-white sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-carnauba border-b border-carnauba/10 pb-4">Resumo do Pedido</h3>
              
              <div className="space-y-2 text-sm text-carnauba/80">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} itens)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Entrega Local</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
              </div>

              <div className="border-t border-carnauba/10 pt-4 flex justify-between items-center font-bold text-lg text-carnauba">
                <span>Total</span>
                <span className="text-terracota">{formatCurrency(total)}</span>
              </div>

              <Button className="w-full bg-carnauba hover:bg-carnauba-light text-white h-12 mt-6 gap-2" onClick={handleCheckout}>
                Finalizar Compra <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Link to="/produtos" className="block text-center mt-4 text-sm text-carnauba/60 hover:text-terracota">
                Continuar comprando
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}