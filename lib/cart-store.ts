"use client";

import { useSyncExternalStore, useCallback } from "react";
import type { Product, CartItem } from "@/lib/types";

type CartListener = () => void;

let cartItems: CartItem[] = [];
const listeners = new Set<CartListener>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: CartListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  return cartItems;
}

const EMPTY_CART: CartItem[] = [];

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function addToCart(product: Product) {
  const existing = cartItems.find((item) => item.product._id === product._id);
  if (existing) {
    cartItems = cartItems.map((item) =>
      item.product._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  } else {
    cartItems = [...cartItems, { product, quantity: 1 }];
  }
  emitChange();
}

export function removeFromCart(productId: string) {
  cartItems = cartItems.filter((item) => item.product._id !== productId);
  emitChange();
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  cartItems = cartItems.map((item) =>
    item.product._id === productId ? { ...item, quantity } : item,
  );
  emitChange();
}

export function clearCart() {
  cartItems = [];
  emitChange();
}

export function getCartTotal(): number {
  return cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const add = useCallback((product: Product) => addToCart(product), []);
  const remove = useCallback(
    (productId: string) => removeFromCart(productId),
    [],
  );
  const update = useCallback(
    (productId: string, quantity: number) =>
      updateQuantity(productId, quantity),
    [],
  );
  const clear = useCallback(() => clearCart(), []);

  return { items, total, itemCount, add, remove, update, clear };
}
