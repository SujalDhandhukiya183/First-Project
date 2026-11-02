import React, { useState } from 'react';
import { Search, Menu, X, Car, Phone, ShoppingBag } from 'lucide-react';

export function Header({
  searchQuery,
  setSearchQuery,
  onBookTestDrive,
  currentTheme,
  onThemeChange,
  cartCount = 0,
  onOpenCart,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground uppercase italic">
              Auto<span className="text-primary">Shop</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-x-8 text-sm font-semibold tracking-wide text-muted-foreground">
            <a href="#inventory" className="transition hover:text-primary">Inventory</a>
            <a href="#inventory" className="transition hover:text-primary">Supercars</a>
            <a href="#inventory" className="transition hover:text-primary">Electric</a>
            <a href="#calculator" className="transition hover:text-primary">Financing</a>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Porsche, Ferrari, Electric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-card/80 py-2.5 pl-10 pr-4 text-xs text-foreground placeholder-muted-foreground transition focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Action Buttons & Cart */}
        <div className="flex items-center gap-3">
          {/* Theme Color Selector */}
          {onThemeChange && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 p-1">
              <button
                type="button"
                onClick={() => onThemeChange('crimson')}
                title="Crimson Theme"
                className={`h-5 w-5 rounded-full bg-rose-600 transition ${currentTheme === 'crimson' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button
                type="button"
                onClick={() => onThemeChange('cyan')}
                title="Electric Cyan Theme"
                className={`h-5 w-5 rounded-full bg-cyan-500 transition ${currentTheme === 'cyan' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
              <button
                type="button"
                onClick={() => onThemeChange('gold')}
                title="Prestige Gold Theme"
                className={`h-5 w-5 rounded-full bg-amber-500 transition ${currentTheme === 'gold' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
            </div>
          )}

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground hover:bg-secondary/80 hover:text-primary transition"
            title="Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="tel:+18005550199"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>(800) 555-AUTO</span>
          </a>

          {onBookTestDrive && (
            <button
              type="button"
              onClick={onBookTestDrive}
              className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95"
            >
              Book Test Drive
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 pt-3 pb-6 md:hidden">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <nav className="flex flex-col space-y-3 font-semibold text-muted-foreground">
            <a href="#inventory" className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground">Inventory</a>
            <a href="#inventory" className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground">Supercars</a>
            <a href="#inventory" className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground">Electric</a>
            <a href="#calculator" className="rounded-md px-3 py-2 hover:bg-secondary hover:text-foreground">Financing</a>
          </nav>
        </div>
      )}
    </header>
  );
}
