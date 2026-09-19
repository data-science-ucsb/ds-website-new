"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { getProductById } from "@/app/data/products";
import type { CartItem, Product } from "@/types/ecommerce";

const CART_STORAGE_KEY = "ds-store-cart-v1";
const CART_COOKIE_KEY = "ds_cart_id";
const TEE_PRODUCT_ID = "ds-shirt-2026";
const MEMBERSHIP_PRODUCT_ID = "ds-membership-2026";
const BUNDLE_PRODUCT_ID = "ds-bundle-2026";

interface CartState {
  cartId: string;
  items: CartItem[];
  hasHydrated: boolean;
}

type CartAction =
  | { type: "HYDRATE"; payload: { cartId: string; items: CartItem[] } }
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "SET_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextValue {
  cartId: string;
  hasHydrated: boolean;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (
    product: Product,
    quantity?: number
  ) => {
    bundleResolved: boolean;
    blockedReason?: "bundle" | "membership" | "membership_included";
  };
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function combineEligibleItems(items: CartItem[]) {
  const normalizedItems = items.map((item) =>
    item.id === MEMBERSHIP_PRODUCT_ID || item.id === BUNDLE_PRODUCT_ID
      ? { ...item, quantity: 1 }
      : item
  );

  if (normalizedItems.some((item) => item.id === BUNDLE_PRODUCT_ID)) {
    return normalizedItems.filter((item) => item.id !== MEMBERSHIP_PRODUCT_ID);
  }

  const tee = normalizedItems.find((item) => item.id === TEE_PRODUCT_ID);
  const membership = normalizedItems.find((item) => item.id === MEMBERSHIP_PRODUCT_ID);
  const bundleQuantity = Math.min(tee?.quantity || 0, membership?.quantity || 0);

  if (!bundleQuantity) {
    return normalizedItems;
  }

  const itemsById = new Map(normalizedItems.map((item) => [item.id, { ...item }]));
  const bundle = getProductById(BUNDLE_PRODUCT_ID);

  if (!bundle) {
    return items;
  }

  const remainingTeeQuantity = (itemsById.get(TEE_PRODUCT_ID)?.quantity || 0) - bundleQuantity;
  const remainingMembershipQuantity =
    (itemsById.get(MEMBERSHIP_PRODUCT_ID)?.quantity || 0) - bundleQuantity;

  if (remainingTeeQuantity > 0) {
    itemsById.set(TEE_PRODUCT_ID, {
      ...itemsById.get(TEE_PRODUCT_ID)!,
      quantity: remainingTeeQuantity,
    });
  } else {
    itemsById.delete(TEE_PRODUCT_ID);
  }

  if (remainingMembershipQuantity > 0) {
    itemsById.set(MEMBERSHIP_PRODUCT_ID, {
      ...itemsById.get(MEMBERSHIP_PRODUCT_ID)!,
      quantity: remainingMembershipQuantity,
    });
  } else {
    itemsById.delete(MEMBERSHIP_PRODUCT_ID);
  }

  const bundleInCart = itemsById.get(BUNDLE_PRODUCT_ID);
  itemsById.set(BUNDLE_PRODUCT_ID, {
    ...(bundleInCart || bundle),
    quantity: (bundleInCart?.quantity || 0) + bundleQuantity,
  });

  return Array.from(itemsById.values());
}

function consumeBundleComponent(items: CartItem[], bundleQuantity: number) {
  const tee = items.find((item) => item.id === TEE_PRODUCT_ID);
  const membership = items.find((item) => item.id === MEMBERSHIP_PRODUCT_ID);
  const componentId = tee && !membership
    ? TEE_PRODUCT_ID
    : membership && !tee
      ? MEMBERSHIP_PRODUCT_ID
      : null;

  if (!componentId) {
    return items;
  }

  return items
    .map((item) =>
      item.id === componentId
        ? { ...item, quantity: item.quantity - bundleQuantity }
        : item
    )
    .filter((item) => item.quantity > 0);
}

function willResolveToBundle(items: CartItem[], product: Product) {
  const hasBundle = items.some((item) => item.id === BUNDLE_PRODUCT_ID);
  const hasTee = items.some((item) => item.id === TEE_PRODUCT_ID);
  const hasMembership = items.some((item) => item.id === MEMBERSHIP_PRODUCT_ID);

  if (product.id === BUNDLE_PRODUCT_ID) {
    return hasTee || hasMembership;
  }

  return (
    (product.id === TEE_PRODUCT_ID && hasMembership) ||
    (product.id === MEMBERSHIP_PRODUCT_ID && hasTee)
  );
}

function createCartId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `cart_${Math.random().toString(36).slice(2, 12)}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return {
        cartId: action.payload.cartId,
        items: combineEligibleItems(action.payload.items),
        hasHydrated: true,
      };
    case "ADD_ITEM": {
      const itemsBeforeAdd =
        action.payload.product.id === BUNDLE_PRODUCT_ID
          ? consumeBundleComponent(state.items, action.payload.quantity)
          : state.items;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: combineEligibleItems(
            itemsBeforeAdd.map((item) =>
              item.id === action.payload.product.id
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            )
          ),
        };
      }

      return {
        ...state,
        items: combineEligibleItems([
          ...itemsBeforeAdd,
          { ...action.payload.product, quantity: action.payload.quantity },
        ]),
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.productId),
      };
    case "SET_QUANTITY":
      return {
        ...state,
        items: combineEligibleItems(
          state.items
            .map((item) =>
              item.id === action.payload.productId
                ? { ...item, quantity: action.payload.quantity }
                : item
            )
            .filter((item) => item.quantity > 0)
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}

const initialState: CartState = {
  cartId: "",
  items: [],
  hasHydrated: false,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : null;

    const cartId =
      parsedCart?.cartId ||
      document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(`${CART_COOKIE_KEY}=`))
        ?.split("=")[1] ||
      createCartId();

    dispatch({
      type: "HYDRATE",
      payload: {
        cartId,
        items: Array.isArray(parsedCart?.items) ? parsedCart.items : [],
      },
    });
  }, []);

  useEffect(() => {
    if (!state.hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ cartId: state.cartId, items: state.items })
    );
    document.cookie = `${CART_COOKIE_KEY}=${state.cartId}; path=/; max-age=2592000; samesite=lax`;
  }, [state.cartId, state.hasHydrated, state.items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return {
      cartId: state.cartId,
      hasHydrated: state.hasHydrated,
      items: state.items,
      itemCount,
      subtotal,
      addItem: (product, quantity = 1) => {
        const hasBundle = state.items.some((item) => item.id === BUNDLE_PRODUCT_ID);
        const hasMembership = state.items.some(
          (item) => item.id === MEMBERSHIP_PRODUCT_ID
        );

        if (product.id === BUNDLE_PRODUCT_ID && hasBundle) {
          return { bundleResolved: false, blockedReason: "bundle" };
        }

        if (product.id === MEMBERSHIP_PRODUCT_ID && hasBundle) {
          return { bundleResolved: false, blockedReason: "membership_included" };
        }

        if (product.id === MEMBERSHIP_PRODUCT_ID && hasMembership) {
          return { bundleResolved: false, blockedReason: "membership" };
        }

        const bundleResolved = willResolveToBundle(state.items, product);

        dispatch({
          type: "ADD_ITEM",
          payload: { product, quantity: Math.max(1, quantity) },
        });

        return { bundleResolved };
      },
      removeItem: (productId) =>
        dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
      setQuantity: (productId, quantity) =>
        dispatch({
          type: "SET_QUANTITY",
          payload: { productId, quantity: Math.max(0, quantity) },
        }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.cartId, state.hasHydrated, state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
