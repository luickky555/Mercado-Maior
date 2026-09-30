import { Navigate, Route, Routes } from "react-router-dom";

import { PublicLayout } from "@/components/layout/PublicLayout";

import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";

import { Home } from "@/pages/public/Home";
import { ProductsPage } from "@/pages/public/ProductsPage";
import { ProductDetail } from "@/pages/public/ProductDetail";
import { StoresPage } from "@/pages/public/StoresPage";
import { StoreDetail } from "@/pages/public/StoreDetail";
import { VacanciesPage } from "@/pages/public/VacanciesPage";
import { CartPage } from "@/pages/public/CartPage";

export function AppRoutes() {
  return (
    <Routes>

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/produtos"
          element={<ProductsPage />}
        />

        <Route
          path="/produtos/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/lojas"
          element={<StoresPage />}
        />

        <Route
          path="/lojas/:id"
          element={<StoreDetail />}
        />

        <Route
          path="/vagas"
          element={<VacanciesPage />}
        />

        <Route
          path="/carrinho"
          element={<CartPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cadastro"
          element={<Register />}
        />

      </Route>

      {/* Dashboards ainda não possuem telas completas */}
      <Route
        path="/buyer"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/buyer/orders"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/seller"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/delivery"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/admin"
        element={<Navigate to="/" replace />}
      />

      {/* Qualquer rota inexistente volta para a Home */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}