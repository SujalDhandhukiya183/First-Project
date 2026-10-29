import React from 'react';
import { ArrowRight, Zap, Shield, Award } from 'lucide-react';

export function Hero({ onExplore }) {
  return (
    <div className="relative overflow-hidden bg-[#0b0f19] pt-12 pb-24 border-b border-slate-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          <div className="space-y-6 text-center lg:text-left lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <Zap className="h-3.5 w-3.5" />
              <span>2026 Exotic Collection</span>
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl leading-none">
              Pure Precision. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400">
                Unrivaled Power.
              </span>
            </h1>

            <p className="max-w-xl text-base text-slate-400 sm:text-lg">
              Explore an extraordinary fleet of hand-curated exotic supercars, high-performance coupes, and luxury electric vehicles engineered for exhilaration.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="block text-2xl font-black text-rose-500 sm:text-3xl">2.7s</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">0-60 MPH</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="block text-2xl font-black text-white sm:text-3xl">640 HP</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Horsepower</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="block text-2xl font-black text-amber-400 sm:text-3xl">205 MPH</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Top Speed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onExplore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-rose-600/30 transition hover:bg-rose-500 active:scale-95"
              >
                Explore Inventory
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:bg-slate-800"
              >
                Finance Calculator
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-rose-500" />
                <span>150-Point Inspection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-rose-500" />
                <span>Certified Warranty</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:col-span-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1000&auto=format&fit=crop&q=80"
                  alt="Porsche 911 GT3 RS"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold text-white shadow">
                  Flagship
                </span>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-slate-200">
                  4.0L Naturally Aspirated
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold">Featured Supercar</span>
                  <h3 className="text-xl font-bold text-white">Porsche 911 GT3 RS</h3>
                </div>
                <span className="text-2xl font-black text-white">$223,800</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

