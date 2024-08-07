import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { ThemeModeProvider } from "../context/themeModeContext.tsx";

const Layout = React.lazy(() => import("../component/LayoutComponent"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound.tsx"));
const LoaderPage = React.lazy(() => import("../component/Loader.tsx"));

const Sample = React.lazy(() => import("../pages/Sample"));
const ProductList = React.lazy(() => import("../pages/Productlist"));
const ProductById = React.lazy(() => import("../pages/ProductById.tsx"));

const AdminMenuList = React.lazy(
  () => import("../pages/backoffice/component/AdminMenuList.tsx")
);
const AdminProductList = React.lazy(
  () => import("../pages/backoffice/Products/Products.tsx")
);
const AdminProductsForm = React.lazy(
  () => import("../pages/backoffice/Products/ProductsForm.tsx")
);

const AppRouters: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoaderPage open={true} onClose={() => {}} />}>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeModeProvider>
                <Layout />
              </ThemeModeProvider>
            }
          >
            <Route index element={<Sample />} />
            <Route path="collections" element={<ProductList />} />
            <Route path="collections/:id" element={<ProductById />} />
          </Route>
          <Route path="admin" element={<AdminMenuList />}>
            <Route index element={<>Hello</>} />
            <Route path="products" element={<Outlet />}>
              <Route index element={<AdminProductList />} />
              <Route path="form" element={<AdminProductsForm />} />
              <Route path="form/:id" element={<AdminProductsForm />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouters;
