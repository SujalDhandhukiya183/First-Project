import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% estimated tax/fees
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border text-card-foreground shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Shopping Cart</h3>
                <p className="text-xs text-muted-foreground">
                  {items.length} {items.length === 1 ? 'vehicle' : 'vehicles'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">Your cart is empty</h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                    Explore our showroom and add your dream supercar or luxury SUV to the cart.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition hover:bg-primary/90"
                >
                  Browse Showroom
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border bg-secondary/40 p-4 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-24 object-cover rounded-xl border border-border bg-secondary shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-foreground block mt-1">
                      ${item.price.toLocaleString()}
                    </span>

                    {/* Quantity & Delete Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-2 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-muted-foreground hover:text-foreground transition"
                          title="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-foreground px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-muted-foreground hover:text-foreground transition"
                          title="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-muted-foreground hover:text-primary transition p-1"
                        title="Remove vehicle"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-card space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax & Dealer Prep (8%)</span>
                  <span className="font-semibold text-foreground">
                    ${Math.round(tax).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                  <span>Total Amount</span>
                  <span className="text-primary text-xl">
                    ${Math.round(total).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onProceedToCheckout) {
                    onProceedToCheckout();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onClearCart}
                className="w-full text-center text-xs text-muted-foreground hover:text-primary transition"
              >
                Clear Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

