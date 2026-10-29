import React, { useState } from 'react';
import { Search, Menu, X, Car, Phone } from 'lucide-react';

export function Header({ searchQuery, setSearchQuery, onBookTestDrive }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0b0f19]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-600/30">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white uppercase italic">
              Auto<span className="text-rose-500">Shop</span>
            </span>
          </a>

          <nav className="hidden md:flex md:gap-x-8 text-sm font-semibold tracking-wide text-slate-300">
            <a href="#inventory" className="transition hover:text-rose-400">Inventory</a>
            <a href="#inventory" className="transition hover:text-rose-400">Supercars</a>
            <a href="#inventory" className="transition hover:text-rose-400">Electric</a>
            <a href="#calculator" className="transition hover:text-rose-400">Financing</a>
          </nav>
        </div>

        <div className="hidden sm:block flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Porsche, Ferrari, Electric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 transition focus:border-rose-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+18005550199"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <Phone className="h-4 w-4 text-rose-500" />
            <span>(800) 555-AUTO</span>
          </a>

          {onBookTestDrive && (
            <button
              type="button"
              onClick={onBookTestDrive}
              className="rounded-full bg-rose-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 active:scale-95"
            >
              Book Test Drive
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0b0f19] px-4 pt-3 pb-6 md:hidden">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
          <nav className="flex flex-col space-y-3 font-semibold text-slate-300">
            <a href="#inventory" className="rounded-md px-3 py-2 hover:bg-slate-800">Inventory</a>
            <a href="#inventory" className="rounded-md px-3 py-2 hover:bg-slate-800">Supercars</a>
            <a href="#inventory" className="rounded-md px-3 py-2 hover:bg-slate-800">Electric</a>
            <a href="#calculator" className="rounded-md px-3 py-2 hover:bg-slate-800">Financing</a>
          </nav>
        </div>
      )}
    </header>
  );
}

