import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, MapPin, ShieldCheck, Heart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMarketStore } from '@/hooks/useMarketStore';
import { useCartStore } from '@/hooks/useCartStore';
import { formatCurrency } from '@/lib/utils';
import { ShareDialog } from '@/components/sharing/ShareDialog';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const products = useMarketStore((state) => state.products);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { toggleFavorite, isFavorite } = useMarketStore();

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-carnauba mb-4">Produto não encontrado</h2>
        <Link to="/produtos">
          <Button className="bg-carnauba text-white">Voltar ao catálogo</Button>
        </Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="container py-8">
      <Link to="/produtos">
        <Button variant="ghost" className="mb-6 text-carnauba hover:bg-carnauba/10 gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar aos produtos
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 md:p-8 rounded-2xl border border-carnauba/10 shadow-sm">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-carnauba/5 border border-carnauba/10">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-terracota' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-carnauba/60 flex items-center gap-1">
              <MapPin className="h-4 w-4 text-terracota" /> {product.origin || 'Campo Maior - PI'}
            </span>
            {product.isCampoMaiorMade && (
              <Badge className="bg-carnauba text-white">Selo Campo Maior Autêntico</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-carnauba mb-4">{product.name}</h1>
          <div className="text-3xl font-black text-terracota mb-6">{formatCurrency(product.price)}</div>

          <p className="text-carnauba/80 leading-relaxed mb-6">{product.description}</p>

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-6 p-4 bg-bege-light rounded-xl border border-carnauba/10">
              <h4 className="font-semibold text-carnauba text-sm mb-1">Ingredientes:</h4>
              <p className="text-sm text-carnauba/70">{product.ingredients.join(', ')}</p>
            </div>
          )}

          {/* Seletor de Quantidade e Compra */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto pt-6 border-t border-carnauba/10">
            <div className="flex items-center border border-carnauba/20 rounded-lg bg-bege-light w-fit">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-carnauba hover:bg-carnauba/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-bold text-carnauba">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="text-carnauba hover:bg-carnauba/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-carnauba hover:bg-carnauba-light text-white h-11 gap-2"
            >
              <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(product.id)}
              className={`h-11 w-11 border-carnauba/20 text-carnauba ${fav ? 'text-destructive bg-destructive/10' : ''}`}
            >
              <Heart className={`h-5 w-5 ${fav ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-carnauba/10">
            <div className="flex items-center gap-2 text-xs text-carnauba/70">
              <ShieldCheck className="h-4 w-4 text-carnauba" /> Compra segura e entregadores locais
            </div>
            <ShareDialog
              title={product.name}
              text={`Olha esse produto incrível de Campo Maior: ${product.name}`}
              url={window.location.href}
            />
          </div>
        </div>
      </div>
    </div>
  );
}