import React from 'react';
import { Car, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-foreground uppercase italic">
                Auto<span className="text-primary">Shop</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Premier destination for exotic supercars, luxury SUVs, and cutting-edge electric performance vehicles.
            </p>
            <div className="flex space-x-4 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Showroom</h4>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li><a href="#inventory" className="hover:text-primary transition">Supercars</a></li>
              <li><a href="#inventory" className="hover:text-primary transition">Performance SUVs</a></li>
              <li><a href="#inventory" className="hover:text-primary transition">Electric Hypercars</a></li>
              <li><a href="#inventory" className="hover:text-primary transition">Certified Pre-Owned</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Ownership</h4>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li><a href="#calculator" className="hover:text-primary transition">Financing & Lease</a></li>
              <li><a href="#" className="hover:text-primary transition">Vehicle Trade-in</a></li>
              <li><a href="#" className="hover:text-primary transition">Service & Maintenance</a></li>
              <li><a href="#" className="hover:text-primary transition">Extended Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">VIP Club</h4>
            <p className="mt-4 text-xs text-muted-foreground">
              Be the first to receive notifications on private auctions and rare vehicle allocations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Enter VIP email"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90 shadow-md"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AutoShop Inc. Built with React and standard Tailwind theme tokens.
        </div>
      </div>
    </footer>
  );
}
