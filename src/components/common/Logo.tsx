import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconSize?: number;
}

export function Logo({ className, iconSize = 24 }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="bg-carnauba text-bege p-1.5 rounded-lg group-hover:bg-carnauba-light transition-colors">
        <Sprout size={iconSize} />
      </div>
      <span className="font-bold text-xl text-carnauba tracking-tight">
        Mercado <span className="text-terracota">Maior</span>
      </span>
    </Link>
  );
}