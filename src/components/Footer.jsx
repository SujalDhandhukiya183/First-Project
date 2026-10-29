import React from 'react';
import { Car, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#080b12] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600 text-white shadow-md shadow-rose-600/30">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-white uppercase italic">
                Auto<span className="text-rose-500">Shop</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premier destination for exotic supercars, luxury SUVs, and cutting-edge electric performance vehicles.
            </p>
            <div className="flex space-x-4 text-slate-500">
              <a href="#" className="hover:text-white transition"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Showroom</h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li><a href="#inventory" className="hover:text-rose-400 transition">Supercars</a></li>
              <li><a href="#inventory" className="hover:text-rose-400 transition">Performance SUVs</a></li>
              <li><a href="#inventory" className="hover:text-rose-400 transition">Electric Hypercars</a></li>
              <li><a href="#inventory" className="hover:text-rose-400 transition">Certified Pre-Owned</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ownership</h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li><a href="#calculator" className="hover:text-rose-400 transition">Financing & Lease</a></li>
              <li><a href="#" className="hover:text-rose-400 transition">Vehicle Trade-in</a></li>
              <li><a href="#" className="hover:text-rose-400 transition">Service & Maintenance</a></li>
              <li><a href="#" className="hover:text-rose-400 transition">Extended Warranty</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">VIP Club</h4>
            <p className="mt-4 text-xs text-slate-400">
              Be the first to receive notifications on private auctions and rare vehicle allocations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Enter VIP email"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-rose-500 shadow-md"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} AutoShop Inc. Built with React and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}

