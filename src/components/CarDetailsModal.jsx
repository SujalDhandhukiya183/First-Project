import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export function CarDetailsModal({ car, isOpen, onClose, onBookTestDrive }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !car) return null;

  const images = car.specs?.gallery?.length ? car.specs.gallery : [car.image];
  const currentImage = images[activeImageIndex] || car.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-800 bg-[#0f172a] shadow-2xl text-slate-100 overflow-hidden my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          <div className="lg:col-span-7 p-6 bg-slate-950 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <img
                  src={currentImage}
                  alt={car.name}
                  className="h-full w-full object-cover"
                />
                {car.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow">
                    {car.badge}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        activeImageIndex === idx ? 'border-rose-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Angle thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 mt-6 text-center">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="block text-xl sm:text-2xl font-black text-rose-500">{car.zeroSixty}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">0-60 MPH</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="block text-xl sm:text-2xl font-black text-white">{car.hp} HP</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Horsepower</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <span className="block text-xl sm:text-2xl font-black text-amber-400">{car.specs?.topSpeed || '195 MPH'}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Top Speed</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                {car.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
                {car.name}
              </h2>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">
                  ${car.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">MSRP</span>
              </div>

              <div className="mt-6 space-y-2 border-t border-slate-800 pt-4 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px] mb-3">
                  Technical Specifications
                </h4>

                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Engine / Powertrain</span>
                  <span className="font-semibold text-white">{car.specs?.engine || car.fuel}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Transmission</span>
                  <span className="font-semibold text-white">{car.specs?.transmission || 'Dual-Clutch Auto'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Drivetrain</span>
                  <span className="font-semibold text-white">{car.specs?.drivetrain || 'All-Wheel Drive'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Efficiency / Range</span>
                  <span className="font-semibold text-white">{car.specs?.mileageOrRange || '19 MPG / 320 mi'}</span>
                </div>
              </div>

              {car.specs?.features && car.specs.features.length > 0 && (
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px] mb-2.5">
                    Standard Equipment & Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300">
                    {car.specs.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookTestDrive(car);
                }}
                className="w-full rounded-xl bg-rose-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 active:scale-95"
              >
                Book VIP Test Drive
              </button>
              
              <p className="text-center text-[11px] text-slate-500">
                150-Point Certified Inspection • 2-Year Complimentary Warranty included
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

