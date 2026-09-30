import { Card, CardContent } from '@/components/ui/card';

export function StoreStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-white border-carnauba/10">
        <CardContent className="p-6">
          <p className="text-sm text-carnauba/60 font-medium">Vendas Hoje</p>
          <h4 className="text-2xl font-bold text-carnauba mt-1">R$ 450,00</h4>
        </CardContent>
      </Card>
      <Card className="bg-white border-carnauba/10">
        <CardContent className="p-6">
          <p className="text-sm text-carnauba/60 font-medium">Pedidos Pendentes</p>
          <h4 className="text-2xl font-bold text-terracota mt-1">12</h4>
        </CardContent>
      </Card>
      <Card className="bg-white border-carnauba/10">
        <CardContent className="p-6">
          <p className="text-sm text-carnauba/60 font-medium">Visitas na Loja</p>
          <h4 className="text-2xl font-bold text-carnauba mt-1">1.204</h4>
        </CardContent>
      </Card>
    </div>
  );
}