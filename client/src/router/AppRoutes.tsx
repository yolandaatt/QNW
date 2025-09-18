import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage';
import CartPage from '@/pages/Cart/CartPage';
import ProductsPage from '@/pages/Products/ProductsPage';
import ProductDetailsPage from '@/pages/Products/ProductDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
