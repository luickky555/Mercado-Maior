import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  LogIn,
  Loader2,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthStore } from "@/hooks/useAuthStore";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: "E-mail inválido",
    }),

  password: z
    .string()
    .min(6, {
      message:
        "A senha deve ter no mínimo 6 caracteres",
    }),
});

type LoginForm = z.infer<
  typeof loginSchema
>;

export function Login() {
  const [isLoading, setIsLoading] =
    useState(false);

  const login = useAuthStore(
    (state) => state.login,
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginForm,
  ) => {
    try {
      setIsLoading(true);

      await login(
        data.email,
        data.password,
      );

      toast.success(
        "Login realizado com sucesso!",
      );

      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao realizar login.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center p-4">

      <Card className="w-full max-w-md border-carnauba/20 shadow-lg">

        <CardHeader className="space-y-2 text-center">

          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-carnauba p-3 text-white">
              <Sprout size={32} />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold text-carnauba">
            Bem-vindo de volta
          </CardTitle>

          <CardDescription>
            Entre com sua conta para acessar o Mercado Maior.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            <div className="space-y-2">

              <Label
                htmlFor="email"
                className="text-carnauba"
              >
                E-mail
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="border-carnauba/30 focus-visible:ring-carnauba"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}

            </div>

            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <Label
                  htmlFor="password"
                  className="text-carnauba"
                >
                  Senha
                </Label>

                <Link
                  to="/recuperar-senha"
                  className="text-xs text-carnauba/70 hover:text-terracota"
                >
                  Esqueceu a senha?
                </Link>

              </div>

              <Input
                id="password"
                type="password"
                placeholder="******"
                className="border-carnauba/30 focus-visible:ring-carnauba"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}

            </div>

            <Button
              type="submit"
              className="w-full bg-carnauba text-white hover:bg-carnauba-light"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>

          </form>

        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">

          <div className="text-sm text-carnauba/70">
            <strong>Contas de teste:</strong>
            <br />
            comprador@mercadomaior.dev
            <br />
            vendedor@mercadomaior.dev
            <br />
            entregador@mercadomaior.dev
            <br />
            admin@mercadomaior.dev
            <br />
            <strong>Senha: 123456</strong>
          </div>

          <div className="text-sm text-carnauba/70">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="font-semibold text-terracota hover:underline"
            >
              Cadastre-se
            </Link>
          </div>

        </CardFooter>

      </Card>

    </div>
  );
}