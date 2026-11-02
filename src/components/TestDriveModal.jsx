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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-card-foreground">
        
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              VIP Experience
            </span>
            <h3 className="text-2xl font-black text-foreground mt-1">Book a Test Drive</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Vehicle: <span className="font-semibold text-foreground">{car ? car.name : 'Selected Vehicle'}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Preferred Date
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95"
              >
                Confirm Test Drive Reservation
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
            <h4 className="text-xl font-bold text-foreground">Reservation Confirmed!</h4>
            <p className="text-xs text-muted-foreground">
              Thank you, {formData.name}. Our concierge will contact you at {formData.phone} to finalize your test drive for {car?.name}.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 rounded-xl bg-secondary px-6 py-2.5 text-xs font-bold text-secondary-foreground hover:bg-secondary/80"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
