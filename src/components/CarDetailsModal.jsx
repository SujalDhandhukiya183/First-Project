import React, { useState } from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';

export function CarDetailsModal({ car, isOpen, onClose, onBookTestDrive, onAddToCart }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !car) return null;

  const images = car.specs?.gallery?.length ? car.specs.gallery : [car.image];
  const currentImage = images[activeImageIndex] || car.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image & Gallery */}
          <div className="lg:col-span-7 p-6 bg-background flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-secondary">
                <img
                  src={currentImage}
                  alt={car.name}
                  className="h-full w-full object-cover"
                />
                {car.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                    {car.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        activeImageIndex === idx ? 'border-primary scale-105' : 'border-border opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Angle thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Performance Grid */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border mt-6 text-center">
              <div className="rounded-xl border border-border bg-card/60 p-3">
                <span className="block text-xl sm:text-2xl font-black text-primary">{car.zeroSixty}</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">0-60 MPH</span>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-3">
                <span className="block text-xl sm:text-2xl font-black text-foreground">{car.hp} HP</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Horsepower</span>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-3">
                <span className="block text-xl sm:text-2xl font-black text-accent">{car.specs?.topSpeed || '195 MPH'}</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Top Speed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vehicle Specs & Booking */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {car.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1 leading-tight">
                {car.name}
              </h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">
                  ${car.price.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">MSRP</span>
              </div>

              {/* Technical Specifications Table */}
              <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-muted-foreground text-[11px] mb-3">
                  Technical Specifications
                </h4>

                <div className="flex justify-between py-1.5 border-b border-border/60">
                  <span className="text-muted-foreground">Engine / Powertrain</span>
                  <span className="font-semibold text-foreground">{car.specs?.engine || car.fuel}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/60">
                  <span className="text-muted-foreground">Transmission</span>
                  <span className="font-semibold text-foreground">{car.specs?.transmission || 'Dual-Clutch Auto'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/60">
                  <span className="text-muted-foreground">Drivetrain</span>
                  <span className="font-semibold text-foreground">{car.specs?.drivetrain || 'All-Wheel Drive'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/60">
                  <span className="text-muted-foreground">Efficiency / Range</span>
                  <span className="font-semibold text-foreground">{car.specs?.mileageOrRange || '19 MPG / 320 mi'}</span>
                </div>
              </div>

              {/* Key Features */}
              {car.specs?.features && car.specs.features.length > 0 && (
                <div className="mt-6 border-t border-border pt-4">
                  <h4 className="font-bold uppercase tracking-wider text-muted-foreground text-[11px] mb-2.5">
                    Standard Equipment & Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-card-foreground">
                    {car.specs.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-border space-y-2.5">
              <div className="flex gap-2">
                {onAddToCart && (
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(car);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary/80 transition"
                  >
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    Add to Cart
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookTestDrive(car);
                  }}
                  className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95 text-center"
                >
                  Book Test Drive
                </button>
              </div>
              
              <p className="text-center text-[11px] text-muted-foreground">
                150-Point Certified Inspection • 2-Year Complimentary Warranty included
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
