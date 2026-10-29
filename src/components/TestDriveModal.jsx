import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export function TestDriveModal({ car, isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', date: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 shadow-2xl text-slate-100">
        
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              VIP Experience
            </span>
            <h3 className="text-2xl font-black text-white mt-1">Book a Test Drive</h3>
            <p className="text-xs text-slate-400 mt-1">
              Vehicle: <span className="font-semibold text-slate-200">{car ? car.name : 'Selected Vehicle'}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Preferred Date
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-rose-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 active:scale-95"
              >
                Confirm Test Drive Reservation
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-rose-500 mx-auto" />
            <h4 className="text-xl font-bold text-white">Reservation Confirmed!</h4>
            <p className="text-xs text-slate-400">
              Thank you, {formData.name}. Our concierge will contact you at {formData.phone} to finalize your test drive for {car?.name}.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

