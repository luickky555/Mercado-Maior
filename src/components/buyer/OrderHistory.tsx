import { Badge } from '@/components/ui/badge';

export function OrderHistory() {
  return (
    <div className="bg-white rounded-lg border border-carnauba/10 overflow-hidden">
      <div className="p-4 border-b border-carnauba/10 bg-slate-50">
        <h3 className="font-bold text-carnauba">Últimos Pedidos</h3>
      </div>
      <div className="p-4 flex justify-between items-center border-b border-carnauba/5">
        <div>
          <p className="font-medium text-carnauba">Pedido #10294</p>
          <p className="text-sm text-carnauba/60">Sabor da Terra - 2 itens</p>
        </div>
        <div className="text-right">
          <Badge className="bg-green-600 mb-1">Entregue</Badge>
          <p className="text-sm font-bold text-carnauba">R$ 85,00</p>
        </div>
      </div>
    </div>
  );
}