import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProduct, priceOf, type Product } from '@/data/products';

const CART_KEY = 'lemam.cart';
const WARRANTY_KEY = 'lemam.warranty';
const ORDERS_KEY = 'lemam.orders';

export type CartLine = { productId: string; qty: number };

export type WarrantyRecord = {
  id: string;
  productId: string;
  invoice: string;
  serial: string;
  registeredAt: string;
};

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  createdAt: string;
  items: CartLine[];
};

type AppContextValue = {
  ready: boolean;
  cart: CartLine[];
  warranties: WarrantyRecord[];
  orders: Order[];
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  registerWarranty: (input: Omit<WarrantyRecord, 'id' | 'registeredAt'>) => void;
  placeOrder: (input: { name: string; phone: string; address: string }) => Order;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [warranties, setWarranties] = useState<WarrantyRecord[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [c, w, o] = await Promise.all([
          AsyncStorage.getItem(CART_KEY),
          AsyncStorage.getItem(WARRANTY_KEY),
          AsyncStorage.getItem(ORDERS_KEY),
        ]);
        if (c) setCart(JSON.parse(c));
        if (w) setWarranties(JSON.parse(w));
        if (o) setOrders(JSON.parse(o));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(WARRANTY_KEY, JSON.stringify(warranties));
  }, [warranties, ready]);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      cart,
      warranties,
      orders,
      addToCart: (productId, qty = 1) => {
        setCart((prev) => {
          const found = prev.find((l) => l.productId === productId);
          if (found) {
            return prev.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { productId, qty }];
        });
      },
      setQty: (productId, qty) => {
        setCart((prev) => {
          if (qty <= 0) return prev.filter((l) => l.productId !== productId);
          return prev.map((l) => (l.productId === productId ? { ...l, qty } : l));
        });
      },
      clearCart: () => setCart([]),
      registerWarranty: (input) => {
        setWarranties((prev) => [
          {
            ...input,
            id: `WR-${Date.now()}`,
            registeredAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      },
      placeOrder: ({ name, phone, address }) => {
        const total = cart.reduce((sum, line) => {
          const p = getProduct(line.productId);
          return p ? sum + priceOf(p) * line.qty : sum;
        }, 0);
        const order: Order = {
          id: `LM-${Date.now()}`,
          name,
          phone,
          address,
          total,
          createdAt: new Date().toISOString(),
          items: cart,
        };
        setOrders((prev) => [order, ...prev]);
        setCart([]);
        return order;
      },
    }),
    [ready, cart, warranties, orders],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function cartCount(cart: CartLine[]) {
  return cart.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(cart: CartLine[], catalog: Product[]) {
  return cart.reduce((sum, line) => {
    const p = catalog.find((x) => x.id === line.productId);
    return p ? sum + priceOf(p) * line.qty : sum;
  }, 0);
}
