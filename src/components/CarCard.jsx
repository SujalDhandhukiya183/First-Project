import React from 'react';
import { Gauge, Zap, Eye, ShoppingBag } from 'lucide-react';

export function CarCard({ car, onBookTestDrive, onViewDetails, onAddToCart }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
      
      {/* Car Image & Badges */}
      <div 
        onClick={() => onViewDetails(car)}
        className="relative aspect-video w-full overflow-hidden bg-secondary cursor-pointer"
      >
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {car.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow">
            {car.badge}
          </span>
        )}

        <span className="absolute bottom-3 right-3 rounded-md bg-background/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-foreground">
          {car.fuel}
        </span>
      </div>

      {/* Car Details */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            {car.category}
          </span>

          <h3 
            onClick={() => onViewDetails(car)}
            className="mt-1 text-xl font-bold text-foreground line-clamp-1 transition hover:text-primary cursor-pointer"
          >
            {car.name}
          </h3>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4 py-3 border-y border-border text-xs">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Power</span>
                <span className="font-bold text-foreground">{car.hp} HP</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">0-60 MPH</span>
                <span className="font-bold text-foreground">{car.zeroSixty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-6 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
              Starting at
            </span>
            <span className="text-xl sm:text-2xl font-black text-foreground">
              ${car.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onViewDetails(car)}
              className="inline-flex items-center gap-1 rounded-xl border border-border bg-secondary px-2.5 py-2 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/80 hover:text-foreground"
              title="View full specs"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Specs</span>
            </button>

            {onAddToCart && (
              <button
                type="button"
                onClick={() => onAddToCart(car)}
                className="flex items-center justify-center rounded-xl border border-border bg-secondary px-2.5 py-2 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition active:scale-95 shadow-xs"
                title="Add to Cart"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onBookTestDrive(car)}
              className="rounded-xl bg-primary px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 active:scale-95"
            >
              Drive
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
