import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingBag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { mockCategories } from "@/data/categories";
import { useCartStore } from "@/hooks/useCartStore";
import { useMarketStore } from "@/hooks/useMarketStore";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

import { toast } from "sonner";

export function ProductsPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const products = useMarketStore(
    (state) => state.products,
  );

  const addItemToCart = useCartStore(
    (state) => state.addItem,
  );

  const toggleFavorite = useMarketStore(
    (state) => state.toggleFavorite,
  );

  const favoriteIds = useMarketStore(
    (state) => state.favoriteIds,
  );

  const [search, setSearch] = useState(
    searchParams.get("busca") ?? "",
  );

  const [selectedCategory, setSelectedCategory] =
    useState(
      searchParams.get("categoria") ?? "all",
    );

  const [onlyCampoMaiorMade, setOnlyCampoMaiorMade] =
    useState(false);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name
          .toLowerCase()
          .includes(term) ||
        product.description
          .toLowerCase()
          .includes(term) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(term),
        );

      const matchesCategory =
        selectedCategory === "all" ||
        product.categoryId === selectedCategory ||
        mockCategories.some(
          (category) =>
            category.id === product.categoryId &&
            category.slug === selectedCategory,
        );

      const matchesOrigin =
        !onlyCampoMaiorMade ||
        product.isCampoMaiorMade;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOrigin &&
        product.isActive
      );
    });
  }, [
    products,
    search,
    selectedCategory,
    onlyCampoMaiorMade,
  ]);

  const applyCategory = (category: string) => {
    setSelectedCategory(category);

    const next = new URLSearchParams(
      searchParams,
    );

    if (category === "all") {
      next.delete("categoria");
    } else {
      next.set("categoria", category);
    }

    setSearchParams(next);
  };

  const updateSearch = (value: string) => {
    setSearch(value);

    const next = new URLSearchParams(
      searchParams,
    );

    if (value.trim()) {
      next.set("busca", value);
    } else {
      next.delete("busca");
    }

    setSearchParams(next);
  };

  const handleAddToCart = (product: Product) => {
    addItemToCart(product, 1);

    toast.success(
      `${product.name} adicionado ao carrinho!`,
    );
  };

  const isFavorite = (productId: string) =>
    favoriteIds.includes(productId);

  const FilterContent = () => (
    <div className="space-y-6">

      <div>
        <h3 className="mb-3 font-semibold text-carnauba">
          Categorias
        </h3>

        <div className="space-y-1">

          <Button
            variant={
              selectedCategory === "all"
                ? "secondary"
                : "ghost"
            }
            className="w-full justify-start text-carnauba"
            onClick={() => applyCategory("all")}
          >
            Todas as Categorias
          </Button>

          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.id ||
                selectedCategory === category.slug
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start text-carnauba/80"
              onClick={() =>
                applyCategory(category.slug)
              }
            >
              {category.name}
            </Button>
          ))}

        </div>
      </div>

      <div className="border-t border-carnauba/10 pt-6">
        <h3 className="mb-3 font-semibold text-carnauba">
          Origem
        </h3>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-carnauba">
          <input
            type="checkbox"
            checked={onlyCampoMaiorMade}
            onChange={(event) =>
              setOnlyCampoMaiorMade(
                event.target.checked,
              )
            }
            className="rounded border-carnauba/30 text-carnauba focus:ring-carnauba"
          />

          Feito em Campo Maior
        </label>
      </div>

    </div>
  );

  return (
    <div className="container py-8">

      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-carnauba">
            Produtos Locais
          </h1>

          <p className="mt-1 text-carnauba/60">
            Explore mercadorias autênticas de Campo Maior.
          </p>
        </div>

        <div className="flex w-full items-center gap-2 md:w-auto">

          <div className="relative flex-1 md:w-80">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-carnauba/50" />

            <Input
              placeholder="Buscar produtos..."
              value={search}
              onChange={(event) =>
                updateSearch(event.target.value)
              }
              className="bg-white pl-9 border-carnauba/20 focus-visible:ring-carnauba"
            />

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

        <aside className="sticky top-24 hidden h-fit rounded-xl border border-carnauba/10 bg-white p-6 md:col-span-1 md:block">
          <FilterContent />
        </aside>

        <div className="md:col-span-3">

          {filteredProducts.length === 0 ? (

            <div className="flex flex-col items-center justify-center rounded-xl border border-carnauba/10 bg-white p-8 py-16 text-center">

              <ShoppingBag className="mb-4 h-12 w-12 text-carnauba/30" />

              <h3 className="mb-1 text-lg font-bold text-carnauba">
                Nenhum produto encontrado
              </h3>

              <p className="text-sm text-carnauba/60">
                Tente buscar por outro termo ou remover os filtros.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => {

                const favorite = isFavorite(
                  product.id,
                );

                return (
                  <Card
                    key={product.id}
                    className="group flex flex-col overflow-hidden border-carnauba/10 bg-white"
                  >

                    <div className="relative aspect-square overflow-hidden bg-carnauba/5">

                      <Link
                        to={`/produtos/${product.id}`}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      <div className="absolute left-3 top-3">
                        {product.isCampoMaiorMade && (
                          <Badge className="bg-carnauba text-white">
                            Feito Aqui
                          </Badge>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          toggleFavorite(product.id)
                        }
                        className={`absolute right-2 top-2 rounded-full bg-white/90 text-carnauba hover:bg-white ${
                          favorite
                            ? "text-terracota"
                            : ""
                        }`}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            favorite
                              ? "fill-current"
                              : ""
                          }`}
                        />

                        <span className="sr-only">
                          Favoritar {product.name}
                        </span>
                      </Button>

                    </div>

                    <CardContent className="flex flex-1 flex-col p-4">

                      <p className="mb-1 text-xs text-carnauba/50">
                        Campo Maior - PI
                      </p>

                      <Link
                        to={`/produtos/${product.id}`}
                        className="flex-1"
                      >
                        <h3 className="line-clamp-2 font-semibold text-carnauba hover:text-terracota">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-4 flex items-center justify-between gap-3">

                        <span className="text-lg font-black text-terracota">
                          {formatCurrency(
                            product.price,
                          )}
                        </span>

                        <Button
                          size="sm"
                          onClick={() =>
                            handleAddToCart(product)
                          }
                          className="bg-carnauba text-white hover:bg-carnauba-light"
                        >
                          Comprar
                        </Button>

                      </div>

                    </CardContent>

                  </Card>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}