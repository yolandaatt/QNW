import AppRoutes from './router/AppRoutes';
import CartMenu from './components/Cartmenu/CartMenu';
import { useCartMenu } from './context/CartMenuContext';

function App() {
  const { isOpen, closeMenu } = useCartMenu();

  return (
    <>
      <AppRoutes />
      <CartMenu isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}

export default App;
