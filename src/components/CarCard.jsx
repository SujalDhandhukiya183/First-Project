import React from 'react';
import { Gauge, Zap, Eye } from 'lucide-react';

export function CarCard({ car, onBookTestDrive, onViewDetails }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-xl transition-all duration-300 hover:border-slate-700 hover:-translate-y-1">
      
      <div 
        onClick={() => onViewDetails(car)}
        className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {car.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-bold text-white shadow">
            {car.badge}
          </span>
        )}

        <span className="absolute bottom-3 right-3 rounded-md bg-black/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-slate-300">
          {car.fuel}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
            {car.category}
          </span>

          <h3 
            onClick={() => onViewDetails(car)}
            className="mt-1 text-xl font-bold text-white line-clamp-1 transition hover:text-rose-400 cursor-pointer"
          >
            {car.name}
          </h3>

          <div className="grid grid-cols-2 gap-3 mt-4 py-3 border-y border-slate-800 text-xs">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-slate-500" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Power</span>
                <span className="font-bold text-slate-200">{car.hp} HP</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-slate-500" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">0-60 MPH</span>
                <span className="font-bold text-slate-200">{car.zeroSixty}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-medium">
              Starting at
            </span>
            <span className="text-xl sm:text-2xl font-black text-white">
              ${car.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(car)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
              title="View full specs"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Specs</span>
            </button>

            <button
              type="button"
              onClick={() => onBookTestDrive(car)}
              className="rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-500 active:scale-95"
            >
              Test Drive
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

