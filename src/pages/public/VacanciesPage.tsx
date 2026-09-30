import { Link } from 'react-router-dom';
import { Bike, Map, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock simples para vagas
const mockVacancies = [
  { id: 1, title: 'Entregador Rota Centro-Fátima', type: 'Fixo', payment: 'R$ 80/dia + taxas', time: '08h às 14h' },
  { id: 2, title: 'Cobertura de Fim de Semana', type: 'Freelancer', payment: 'R$ 15/entrega', time: 'Sáb e Dom' },
  { id: 3, title: 'Entregador Rota São Luís', type: 'Fixo', payment: 'R$ 90/dia', time: '14h às 20h' },
];

export function VacanciesPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Badge className="bg-terracota mb-4">Seja um Parceiro</Badge>
        <h1 className="text-3xl md:text-5xl font-bold text-carnauba mb-4">Gere renda pedalando ou pilotando em Campo Maior</h1>
        <p className="text-lg text-carnauba/70">
          Ajude os comércios locais a chegarem mais longe. Escolha suas rotas, defina seus horários e fortaleça a logística da nossa cidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-carnauba text-white border-none">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><Clock className="h-6 w-6 text-dourado" /></div>
            <h3 className="font-bold text-lg">Flexibilidade</h3>
            <p className="text-bege/80 text-sm">Trabalhe nos turnos que melhor se adaptam à sua rotina.</p>
          </CardContent>
        </Card>
        <Card className="bg-carnauba text-white border-none">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><DollarSign className="h-6 w-6 text-dourado" /></div>
            <h3 className="font-bold text-lg">Ganhos Diretos</h3>
            <p className="text-bege/80 text-sm">Pagamentos semanais sem taxas abusivas da plataforma.</p>
          </CardContent>
        </Card>
        <Card className="bg-carnauba text-white border-none">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><Map className="h-6 w-6 text-dourado" /></div>
            <h3 className="font-bold text-lg">Rotas Curtas</h3>
            <p className="text-bege/80 text-sm">Entregas focadas dentro de Campo Maior, otimizando seu tempo.</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-carnauba mb-6 flex items-center gap-2">
        <Bike className="h-6 w-6 text-terracota" /> Oportunidades em Aberto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVacancies.map((vacancy) => (
          <Card key={vacancy.id} className="border-carnauba/10 hover:border-carnauba transition-colors bg-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-carnauba">{vacancy.title}</CardTitle>
                <Badge variant="outline" className="text-terracota border-terracota">{vacancy.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-carnauba/70"><DollarSign className="h-4 w-4" /> {vacancy.payment}</div>
                <div className="flex items-center gap-2 text-sm text-carnauba/70"><Clock className="h-4 w-4" /> {vacancy.time}</div>
              </div>
              <Link to="/cadastro?type=delivery">
                <Button className="w-full bg-carnauba/5 text-carnauba hover:bg-carnauba hover:text-white transition-colors">
                  Candidatar-se <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}