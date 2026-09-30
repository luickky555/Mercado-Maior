import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserPlus, Loader2, Store, Bike, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
  document: z.string().min(11, 'Documento inválido'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'buyer');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    reset(); // Limpa o form ao trocar de aba
  }, [activeTab, reset]);

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    // Simulação de chamada de API para registro
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Cadastro de ${activeTab === 'buyer' ? 'Comprador' : activeTab === 'seller' ? 'Vendedor' : 'Entregador'} realizado com sucesso! Faça login.`);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center p-4 py-12">
      <Card className="w-full max-w-lg border-carnauba/20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-carnauba">Crie sua conta</CardTitle>
          <CardDescription>Junte-se ao maior marketplace de Campo Maior.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-carnauba/10 text-carnauba">
              <TabsTrigger value="buyer" className="data-[state=active]:bg-carnauba data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2 hidden sm:block" /> Comprar
              </TabsTrigger>
              <TabsTrigger value="seller" className="data-[state=active]:bg-carnauba data-[state=active]:text-white">
                <Store className="h-4 w-4 mr-2 hidden sm:block" /> Vender
              </TabsTrigger>
              <TabsTrigger value="delivery" className="data-[state=active]:bg-carnauba data-[state=active]:text-white">
                <Bike className="h-4 w-4 mr-2 hidden sm:block" /> Entregar
              </TabsTrigger>
            </TabsList>

            {/* O formulário engloba os TabsContent para reaproveitar os campos básicos */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-carnauba">Nome Completo {activeTab === 'seller' && '/ Razão Social'}</Label>
                <Input id="name" placeholder="João da Silva" className="border-carnauba/30 focus-visible:ring-carnauba" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-carnauba">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" className="border-carnauba/30 focus-visible:ring-carnauba" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="document" className="text-carnauba">
                  {activeTab === 'seller' ? 'CNPJ ou CPF' : 'CPF'}
                </Label>
                <Input id="document" placeholder={activeTab === 'seller' ? '00.000.000/0000-00' : '000.000.000-00'} className="border-carnauba/30 focus-visible:ring-carnauba" {...register('document')} />
                {errors.document && <p className="text-sm text-destructive">{errors.document.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-carnauba">Senha</Label>
                <Input id="password" type="password" placeholder="******" className="border-carnauba/30 focus-visible:ring-carnauba" {...register('password')} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-carnauba hover:bg-carnauba-light text-white mt-6" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                Cadastrar como {activeTab === 'buyer' ? 'Comprador' : activeTab === 'seller' ? 'Vendedor' : 'Entregador'}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-carnauba/70">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-semibold text-terracota hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}