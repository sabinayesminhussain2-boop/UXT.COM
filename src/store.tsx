import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { products } from "./data/catalog";

export type CartItem = { productId: string; color: string; quantity: number };
type Notice = { message: string; action?: "cart" | "wishlist" };
type Store = {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  addToCart: (productId: string, quantity?: number, color?: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, color: string) => void;
  toggleWishlist: (productId: string) => void;
};

const StoreContext = createContext<Store | null>(null);
const CART_KEY = "uxt-demo-cart-v1";
const WISHLIST_KEY = "uxt-demo-wishlist-v1";

function readCart(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item: unknown) => {
      if (!item || typeof item !== "object") return [];
      const candidate = item as Partial<CartItem>;
      const product = products.find((p) => p.id === candidate.productId);
      if (
        !product ||
        typeof candidate.color !== "string" ||
        !product.colors.some((color) => color.name === candidate.color) ||
        typeof candidate.quantity !== "number" ||
        !Number.isFinite(candidate.quantity)
      )
        return [];
      return [
        {
          productId: product.id,
          color: candidate.color,
          quantity: Math.max(1, Math.min(99, Math.floor(candidate.quantity))),
        },
      ];
    });
  } catch {
    return [];
  }
}

function readWishlist(): string[] {
  try {
    const parsed: unknown = JSON.parse(
      localStorage.getItem(WISHLIST_KEY) || "[]",
    );
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed.filter(
          (id): id is string =>
            typeof id === "string" &&
            products.some((product) => product.id === id),
        ),
      ),
    ];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [wishlist, setWishlist] = useState<string[]>(readWishlist);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage may be unavailable */
    }
  }, [cart]);
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage may be unavailable */
    }
  }, [wishlist]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === CART_KEY) setCart(readCart());
      if (event.key === WISHLIST_KEY) setWishlist(readWishlist());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const addToCart = useCallback(
    (productId: string, quantity = 1, requestedColor?: string) => {
      const product = products.find((item) => item.id === productId);
      if (!product) return;
      const color =
        product.colors.find((item) => item.name === requestedColor)?.name ||
        product.colors[0].name;
      const amount = Math.max(1, Math.min(99, Math.floor(quantity)));
      setCart((current) => {
        const exists = current.some(
          (item) => item.productId === productId && item.color === color,
        );
        return exists
          ? current.map((item) =>
              item.productId === productId && item.color === color
                ? { ...item, quantity: Math.min(99, item.quantity + amount) }
                : item,
            )
          : [...current, { productId, color, quantity: amount }];
      });
      setNotice({
        message: `${product.name} added to your bag.`,
        action: "cart",
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, color: string, quantity: number) => {
      setCart((current) =>
        current.map((item) =>
          item.productId === productId && item.color === color
            ? {
                ...item,
                quantity: Math.max(1, Math.min(99, Math.floor(quantity))),
              }
            : item,
        ),
      );
    },
    [],
  );
  const removeFromCart = useCallback((productId: string, color: string) => {
    setCart((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.color === color),
      ),
    );
  }, []);
  const toggleWishlist = useCallback(
    (productId: string) => {
      const product = products.find((item) => item.id === productId);
      if (!product) return;
      const isSaved = wishlist.includes(productId);
      setWishlist((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId],
      );
      setNotice({
        message: isSaved
          ? `${product.name} removed from your wishlist.`
          : `${product.name} saved to your wishlist.`,
        action: isSaved ? undefined : "wishlist",
      });
    },
    [wishlist],
  );
  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
    }),
    [cart, wishlist, addToCart, updateQuantity, removeFromCart, toggleWishlist],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        className={`toast ${notice ? "toast--visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <span>{notice.message}</span>
            {notice.action && (
              <Link
                onClick={() => setNotice(null)}
                to={notice.action === "cart" ? "/cart" : "/wishlist"}
              >
                View {notice.action === "cart" ? "bag" : "wishlist"}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            )}
          </>
        )}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used within StoreProvider");
  return store;
}
