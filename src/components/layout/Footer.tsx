import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-carnauba-dark text-bege-light border-t border-carnauba/20 pt-16 pb-8">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Logo className="text-bege-light" iconSize={32} />
          <p className="text-bege-light/70 text-sm mt-4">
            Fortalecendo os produtores, comerciantes e pequenos empreendedores de Campo Maior, Piauí. Compre local, cresça junto.
          </p>
          <div className="flex space-x-4 pt-2">
            <Button variant="ghost" size="icon" className="text-bege-light hover:text-white hover:bg-carnauba">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-bege-light hover:text-white hover:bg-carnauba">
              <Facebook className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Navegação</h3>
          <ul className="space-y-2 text-sm text-bege-light/70">
            <li><Link to="/produtos" className="hover:text-terracota transition-colors">Produtos Locais</Link></li>
            <li><Link to="/lojas" className="hover:text-terracota transition-colors">Lojas Parceiras</Link></li>
            <li><Link to="/produtores" className="hover:text-terracota transition-colors">Nossos Produtores</Link></li>
            <li><Link to="/sobre" className="hover:text-terracota transition-colors">Sobre o Mercado Maior</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Oportunidades</h3>
          <ul className="space-y-2 text-sm text-bege-light/70">
            <li><Link to="/cadastro?type=seller" className="hover:text-terracota transition-colors">Quero Vender</Link></li>
            <li><Link to="/vagas" className="hover:text-terracota transition-colors">Vagas para Entregadores</Link></li>
            <li><Link to="/cadastro?type=delivery" className="hover:text-terracota transition-colors">Seja um Entregador</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Contato</h3>
          <ul className="space-y-4 text-sm text-bege-light/70">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-terracota" />
              Centro, Campo Maior - PI
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-terracota" />
              (86) 99999-0000
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-terracota" />
              contato@mercadomaior.com.br
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-xs mb-2">Receba novidades locais:</p>
            <div className="flex gap-2">
              <Input placeholder="Seu e-mail" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-9" />
              <Button size="sm" className="bg-terracota hover:bg-terracota-dark text-white">Ok</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-bege-light/50">
        <p>© {new Date().getFullYear()} Mercado Maior. Feito com orgulho em Campo Maior, PI.</p>
        <div className="flex gap-4">
          <Link to="/termos" className="hover:text-white">Termos de Uso</Link>
          <Link to="/privacidade" className="hover:text-white">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}