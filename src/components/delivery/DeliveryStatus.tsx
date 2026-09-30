import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export function DeliveryStatus() {
  return (
    <Card className="border-carnauba/10 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-carnauba">Entrega Ativa</h3>
          <span className="px-2 py-1 bg-terracota/10 text-terracota text-xs font-bold rounded">Em Rota</span>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex gap-3 text-sm text-carnauba/80">
            <MapPin className="h-4 w-4 text-carnauba shrink-0 mt-0.5" />
            <p><span className="font-semibold block text-carnauba">Coleta:</span> Sabor da Terra (Centro)</p>
          </div>
          <div className="flex gap-3 text-sm text-carnauba/80">
            <MapPin className="h-4 w-4 text-terracota shrink-0 mt-0.5" />
            <p><span className="font-semibold block text-terracota">Entrega:</span> Rua da Glória, 123 (São João)</p>
          </div>
        </div>
        <Button className="w-full bg-carnauba text-white">Ver Rota no Mapa</Button>
      </CardContent>
    </Card>
  );
}