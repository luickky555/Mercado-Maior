import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockStores } from '@/data/stores';
import { useMarketStore } from '@/hooks/useMarketStore';
import { formatCurrency } from '@/lib/utils';
import { ShareDialog } from '@/components/sharing/ShareDialog';

export function StoreDetail() {
  const { id } = useParams();
  const products = useMarketStore((state) => state.products);
  
  const store = mockStores.find((s) => s.id === id);
  const storeProducts = products.filter((p) => p.storeId === id);

  if (!store) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-carnauba mb-4">Loja não encontrada</h2>
        <Link to="/lojas"><Button className="bg-carnauba text-white">Ver outras lojas</Button></Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Banner da Loja */}
      <div className="h-48 md:h-64 bg-carnauba relative">
        {store.coverImage && (
          <img src={store.coverImage} alt="Capa" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container absolute bottom-0 left-0 right-0 translate-y-1/2 flex items-end gap-6">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-xl border-4 border-white bg-white overflow-hidden shadow-lg shrink-0">
            <img src={store.logo || `https://ui-avatars.com/api/?name=${store.name}&background=13362A&color=fff`} alt={store.name} className="w-full h-full object-cover" />
          </div>
          <div className="pb-8 md:pb-10 text-white flex-1 flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold drop-shadow-md">{store.name}</h1>
              <div className="flex items-center gap-4 text-sm mt-2 opacity-90">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {store.address?.neighborhood}</span>
                <span className="flex items-center gap-1 text-dourado"><Star className="h-4 w-4 fill-current" /> {store.rating || '5.0'}</span>
              </div>
            </div>
            <div className="hidden md:block">
              <ShareDialog title={store.name} text={`Confira os produtos da loja ${store.name} no Mercado Maior!`} url={window.location.href} />
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-20 md:pt-24 pb-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Info */}
        <aside className="lg:col-span-1 space-y-6">
          <Card className="border-carnauba/10 bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-carnauba border-b border-carnauba/10 pb-2">Sobre a Loja</h3>
              <p className="text-sm text-carnauba/80">{store.description}</p>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-carnauba/70">
                  <Phone className="h-4 w-4 text-terracota" /> {store.phone || '(86) 99999-9999'}
                </div>
                <div className="flex items-center gap-3 text-sm text-carnauba/70">
                  <Mail className="h-4 w-4 text-terracota" /> {store.email || 'contato@loja.com'}
                </div>
              </div>
              <div className="md:hidden pt-4">
                <ShareDialog title={store.name} text={`Confira os produtos da loja ${store.name} no Mercado Maior!`} url={window.location.href} />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Produtos da Loja */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-carnauba mb-6 flex items-center gap-2">
            <Package className="h-6 w-6 text-terracota" /> Produtos ({storeProducts.length})
          </h2>

          {storeProducts.length === 0 ? (
            <div className="p-8 text-center bg-white border border-carnauba/10 rounded-xl">
              <p className="text-carnauba/60">Esta loja ainda não cadastrou produtos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group border-carnauba/10 flex flex-col bg-white">
                  <div className="relative aspect-square bg-carnauba/5">
                    <Link to={`/produtos/${product.id}`}>
                      <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                    </Link>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <Link to={`/produtos/${product.id}`} className="flex-1">
                      <h3 className="font-semibold text-carnauba line-clamp-2 hover:text-terracota transition-colors">{product.name}</h3>
                    </Link>
                    <div className="mt-4 pt-2 border-t border-carnauba/5 font-bold text-lg text-terracota">
                      {formatCurrency(product.price)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}