import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  sv: {
    translation: {
      error: 'Något gick fel. Försök igen.',
      loading: 'Laddar',
      unknownError: 'Ett okänt fel inträffade',

      // Navigation
      home: 'Hem',
      products: 'Produkter',
      cart: 'Varukorg',
      myPage: 'Mina sidor',
      logout: 'Logga ut',
      login: 'Logga in',
      adminPanel: 'Adminpanel',

      // Produkter
      addToCart: 'Lägg i varukorg',
      outOfStock: 'Slutsåld',
      onlyLeft: 'Endast {{count}} kvar i lager',
      allProducts: 'Produkter',
      searchProducts: 'Sök produkter...',
      noProductsFound: 'Inga produkter matchade din sökning',
      sortBy: 'Sortera',
      priceAsc: 'Pris: Lågt till högt',
      priceDesc: 'Pris: Högt till lågt',
      nameAsc: 'Namn: A till Ö',
      allCategories: 'Alla kategorier',
      inStockOnly: 'Visa endast i lager',
      reset: 'Återställ',
      results: '{{count}} produkter',
      backToProducts: '← Tillbaka till produkter',
      addedToCart: '✓ Tillagd i varukorg',
      loadingProducts: 'Laddar produkter...',

      // Varukorg
      yourCart: 'Din varukorg',
      cartEmpty: 'Din varukorg är tom',
      continueShopping: 'Fortsätt handla',
      total: 'Totalt',
      checkout: 'Gå till checkout',
      clearCart: 'Töm varukorg',
      remove: 'Ta bort',
      freeShipping: '✓ Du har fri frakt!',
      freeShippingLeft: 'Handla för {{amount}} kr till för fri frakt',
      closeCart: 'Stäng varukorg',
      decreaseQuantity: 'Minska kvantitet',
      increaseQuantity: 'Öka kvantitet',

      // Checkout
      checkoutTitle: 'Checkout',
      deliveryInfo: 'Leveransinformation',
      name: 'Namn',
      phone: 'Telefon',
      streetAddress: 'Gatuadress',
      postalCode: 'Postnummer',
      city: 'Stad',
      country: 'Land',
      paymentMethod: 'Betalsätt',
      card: 'Kort',
      swish: 'Swish',
      invoice: 'Faktura',
      placeOrder: 'Lägg beställning',
      processing: 'Bearbetar...',
      yourOrder: 'Din beställning',

      // Orderbekräftelse
      orderReceived: 'Beställning mottagen',
      thankYou: 'Tack för din beställning!',
      orderConfirmationText: 'Din order har lagts och du kan följa den under Mina sidor → Ordrar.',
      viewOrders: 'Se mina ordrar',

      // Login/Register
      loginTitle: 'Logga in',
      welcomeBack: 'Välkommen tillbaka',
      email: 'Email',
      password: 'Lösenord',
      loginButton: 'Logga in',
      createAccount: 'Skapa konto',
      registerTitle: 'Skapa konto',
      welcomeToShop: 'Välkommen till Lumière',
      confirmPassword: 'Bekräfta lösenord',
      registerButton: 'Skapa konto',
      alreadyHaveAccount: 'Har du redan ett konto? Logga in',
      passwordMismatch: 'Lösenorden matchar inte',

      // MyPage
      myPageTitle: 'Mina sidor',
      myDetails: 'Mina uppgifter',
      favorites: 'Favoriter',
      orders: 'Ordrar',
      loggedInAs: 'Inloggad som',
      deliveryAddress: 'Leveransadress',
      save: 'Spara',
      saved: '✓ Uppgifterna har sparats',
      noFavorites: 'Du har inga favoritprodukter än',
      exploreProdcuts: 'Utforska produkter',
      noOrders: 'Du har inte lagt några beställningar än',
      startShopping: 'Börja shoppa',

      // Orderstatus
      pending: 'Bearbetas',
      confirmed: 'Bekräftad',
      shipped: 'Skickad',
      delivered: 'Levererad',

      // Footer
      footerTagline: 'Kvalitetsprodukter för dig som värdesätter dig själv.',
      navigation: 'Navigation',
      customerService: 'Kundservice',
      freeShippingOver: 'Fri frakt över 500 kr',
      openPurchase: '14 dagars öppet köp',
      securePayment: 'Säker betalning',
      copyright: '© {{year}} Lumière. Alla rättigheter förbehållna.',

      // Hero
      welcomeTo: 'Välkommen till',
      discoverProducts: 'Upptäck våra produkter',
      shopNow: 'Shoppa nu',
      ourProducts: 'Våra produkter',
      seeAll: 'Se alla',
      topBar: 'FRI FRAKT VID KÖP ÖVER 500 KR',
    },
  },
  en: {
    translation: {
      error: 'Something went wrong. Please try again.',
      loading: 'Loading',
      unknownError: 'An unknown error occured',

      // Navigation
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      myPage: 'My Page',
      logout: 'Log out',
      login: 'Log in',
      adminPanel: 'Admin Panel',

      // Products
      addToCart: 'Add to cart',
      outOfStock: 'Out of stock',
      onlyLeft: 'Only {{count}} left in stock',
      allProducts: 'Products',
      searchProducts: 'Search products...',
      noProductsFound: 'No products matched your search',
      sortBy: 'Sort',
      priceAsc: 'Price: Low to high',
      priceDesc: 'Price: High to low',
      nameAsc: 'Name: A to Z',
      allCategories: 'All categories',
      inStockOnly: 'In stock only',
      reset: 'Reset',
      results: '{{count}} products',
      backToProducts: '← Back to products',
      addedToCart: '✓ Added to cart',
      loadingProducts: 'Loading products...',

      // Cart
      yourCart: 'Your cart',
      cartEmpty: 'Your cart is empty',
      continueShopping: 'Continue shopping',
      total: 'Total',
      checkout: 'Go to checkout',
      clearCart: 'Clear cart',
      remove: 'Remove',
      freeShipping: '✓ You have free shipping!',
      freeShippingLeft: 'Shop for {{amount}} more for free shipping',
      closeCart: 'Close cart',
      decreaseQuantity: 'Decrease quantity',
      increaseQuantity: 'Increase quantity',

      // Checkout
      checkoutTitle: 'Checkout',
      deliveryInfo: 'Delivery information',
      name: 'Name',
      phone: 'Phone',
      streetAddress: 'Street address',
      postalCode: 'Postal code',
      city: 'City',
      country: 'Country',
      paymentMethod: 'Payment method',
      card: 'Card',
      swish: 'Swish',
      invoice: 'Invoice',
      placeOrder: 'Place order',
      processing: 'Processing...',
      yourOrder: 'Your order',

      // Order confirmation
      orderReceived: 'Order received',
      thankYou: 'Thank you for your order!',
      orderConfirmationText:
        'Your order has been placed and you can track it under My Page → Orders.',
      viewOrders: 'View my orders',

      // Login/Register
      loginTitle: 'Log in',
      welcomeBack: 'Welcome back',
      email: 'Email',
      password: 'Password',
      loginButton: 'Log in',
      createAccount: 'Create account',
      registerTitle: 'Create account',
      welcomeToShop: 'Welcome to Lumière',
      confirmPassword: 'Confirm password',
      registerButton: 'Create account',
      alreadyHaveAccount: 'Already have an account? Log in',
      passwordMismatch: 'Passwords do not match',

      // MyPage
      myPageTitle: 'My Page',
      myDetails: 'My details',
      favorites: 'Favorites',
      orders: 'Orders',
      loggedInAs: 'Logged in as',
      deliveryAddress: 'Delivery address',
      save: 'Save',
      saved: '✓ Details saved',
      noFavorites: 'You have no favorite products yet',
      exploreProdcuts: 'Explore products',
      noOrders: 'You have not placed any orders yet',
      startShopping: 'Start shopping',

      // Order status
      pending: 'Processing',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered',

      // Footer
      footerTagline: 'Quality products for those who value themselves.',
      navigation: 'Navigation',
      customerService: 'Customer service',
      freeShippingOver: 'Free shipping over 500 kr',
      openPurchase: '14 day returns',
      securePayment: 'Secure payment',
      copyright: '© {{year}} Lumière. All rights reserved.',

      // Hero
      welcomeTo: 'Welcome to',
      discoverProducts: 'Discover our products',
      shopNow: 'Shop now',
      ourProducts: 'Our products',
      seeAll: 'See all',
      topBar: 'FREE SHIPPING ON ORDERS OVER 500 KR',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') ?? 'sv',
  fallbackLng: 'sv',
  interpolation: {},
});

export default i18n;
