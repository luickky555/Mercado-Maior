import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Store, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { mockStores } from '@/data/stores';

export function StoresPage() {
  const [search, setSearch] = useState('');

  const filteredStores = useMemo(() => {
    return mockStores.filter((store) => 
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-carnauba">Lojas e Produtores</h1>
          <p className="text-carnauba/60 mt-1">Conheça quem faz a economia de Campo Maior girar.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carnauba/50" />
          <Input
            placeholder="Buscar por nome ou segmento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-carnauba/20 focus-visible:ring-carnauba"
          />
        </div>
      </div>

      {filteredStores.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-carnauba/10 text-center p-8">
          <Store className="h-12 w-12 text-carnauba/30 mb-4" />
          <h3 className="text-lg font-bold text-carnauba mb-1">Nenhuma loja encontrada</h3>
          <p className="text-sm text-carnauba/60">Tente buscar por outros termos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <Card key={store.id} className="overflow-hidden group border-carnauba/10 hover:border-terracota transition-colors bg-white">
              <div className="h-32 bg-carnauba/10 relative overflow-hidden">
                {store.coverImage ? (
                  <img src={store.coverImage} alt="Capa" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full bg-carnauba/20" />
                )}
                <div className="absolute -bottom-6 left-6 h-16 w-16 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
                  <img src={store.logo || `https://ui-avatars.com/api/?name=${store.name}&background=13362A&color=fff`} alt={store.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-carnauba line-clamp-1">{store.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium text-dourado bg-dourado/10 px-2 py-0.5 rounded">
                    <Star className="h-3 w-3 fill-current" /> {store.rating || '5.0'}
                  </div>
                </div>
                <p className="text-sm text-carnauba/70 line-clamp-2 mb-4">{store.description}</p>
                <div className="flex items-center gap-2 text-xs text-carnauba/50 mb-6">
                  <MapPin className="h-3 w-3" /> {store.address?.city || 'Campo Maior'}, {store.address?.neighborhood}
                </div>
                <Link to={`/lojas/${store.id}`}>
                  <Button className="w-full bg-carnauba/5 hover:bg-carnauba hover:text-white text-carnauba border-none">
                    Visitar Loja
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}