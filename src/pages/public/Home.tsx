import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Store, MapPin, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMarketStore } from '@/hooks/useMarketStore';
import { formatCurrency } from '@/lib/utils';
import { mockCategories } from '@/data/categories';
import { mockStores } from '@/data/stores';

export function Home() {
  const products = useMarketStore((state) => state.products);
  
  // Pegando os 4 produtos mais vendidos (Mock simples)
  const featuredProducts = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-carnauba text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
          <Badge className="bg-terracota text-white mb-6 hover:bg-terracota/90 text-sm py-1 px-4 border-none">
            📍 Exclusivo de Campo Maior, PI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
            Compre de quem <span className="text-dourado">produz</span> em Campo Maior.
          </h1>
          <p className="text-lg md:text-xl text-bege/90 max-w-2xl mb-10">
            Do artesanato em palha de carnaúba à tradicional carne de sol. 
            Apoie o comércio local, descubra sabores únicos e fortaleça nossa economia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/produtos">
              <Button size="lg" className="bg-terracota hover:bg-terracota-dark text-white w-full sm:w-auto h-14 px-8 text-lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explorar Produtos
              </Button>
            </Link>
            <Link to="/lojas">
              <Button size="lg" variant="outline" className="text-carnauba bg-white border-white hover:bg-bege w-full sm:w-auto h-14 px-8 text-lg">
                <Store className="mr-2 h-5 w-5" />
                Ver Lojas Locais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 bg-bege-light">
        <div className="container">
          <h2 className="text-2xl font-bold text-carnauba mb-8 text-center">Nossas Raízes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((cat) => (
              <Link key={cat.id} to={`/produtos?categoria=${cat.slug}`}>
                <Card className="hover:border-terracota hover:shadow-md transition-all cursor-pointer bg-white group h-full border-carnauba/10">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full gap-3">
                    <div className="p-3 bg-carnauba/5 rounded-full text-carnauba group-hover:bg-terracota group-hover:text-white transition-colors">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <span className="font-medium text-sm text-carnauba/80 group-hover:text-carnauba">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques (Produtos) */}
      <section className="py-16 bg-white border-t border-carnauba/10">
        <div className="container">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-carnauba">Destaques da Terra</h2>
              <p className="text-carnauba/60 mt-2">Os itens mais procurados pelos campo-maiorenses hoje.</p>
            </div>
            <Link to="/produtos" className="hidden sm:flex text-terracota font-medium hover:underline items-center gap-1">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group border-carnauba/10 flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-carnauba/5">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isCampoMaiorMade && (
                    <Badge className="absolute top-2 right-2 bg-carnauba text-white text-xs">
                      Feito Aqui
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-carnauba/50 mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Campo Maior
                  </div>
                  <h3 className="font-semibold text-carnauba line-clamp-2 mb-2 flex-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-lg text-terracota">{formatCurrency(product.price)}</span>
                    <Button size="sm" className="bg-carnauba hover:bg-carnauba-light text-white">Comprar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/produtos">
              <Button variant="outline" className="w-full text-terracota border-terracota hover:bg-terracota/10">
                Ver todos os produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chamadas para Ação Dupla (Produtores e Entregadores) */}
      <section className="py-20 bg-carnauba-dark text-white">
        <div className="container grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Você produz ou tem loja em Campo Maior?</h2>
            <p className="text-bege/80 text-lg">
              Digitalize seu negócio. Venda para toda a cidade e região sem pagar taxas abusivas. O Mercado Maior é o seu novo ponto comercial na internet.
            </p>
            <ul className="space-y-3 mb-8 text-bege/90">
              <li className="flex items-center gap-2"><ShieldCheck className="text-dourado h-5 w-5" /> Painel de gestão completo</li>
              <li className="flex items-center gap-2"><ShieldCheck className="text-dourado h-5 w-5" /> Vitrine otimizada para o comércio local</li>
              <li className="flex items-center gap-2"><ShieldCheck className="text-dourado h-5 w-5" /> Pagamentos facilitados</li>
            </ul>
            <Link to="/cadastro?type=seller">
              <Button className="bg-terracota hover:bg-terracota-dark text-white text-lg h-12 px-8">
                Criar minha loja grátis
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6 border-t md:border-t-0 md:border-l border-white/10 pt-12 md:pt-0 md:pl-12">
            <h2 className="text-3xl font-bold">Faça sua própria rota de entregas.</h2>
            <p className="text-bege/80 text-lg">
              Conhece bem os bairros de Campo Maior? Seja um entregador parceiro. Trabalhe nos horários que preferir e ajude os produtos locais a chegarem mais rápido.
            </p>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-dourado mb-1">Flexível</div>
                <div className="text-sm text-bege/70">Escolha seus turnos</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-dourado mb-1">Local</div>
                <div className="text-sm text-bege/70">Rotas curtas na cidade</div>
              </div>
            </div>
            <Link to="/vagas">
              <Button variant="outline" className="text-carnauba bg-white border-transparent hover:bg-bege text-lg h-12 px-8">
                Ver vagas de entrega
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}