import React, { useState } from 'react';

export function LoanCalculator({ onPreApproval }) {
  const [price, setPrice] = useState(120000);
  const [downPayment, setDownPayment] = useState(24000);
  const [term, setTerm] = useState(60);

  const principal = Math.max(0, price - downPayment);
  const monthlyRate = 0.059 / 12; // 5.9% APR
  const payment =
    principal > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1)
      : 0;

  return (
    <section id="calculator" className="border-t border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Fast & Transparent
          </span>
          <h2 className="text-3xl font-black text-foreground tracking-tight mt-1">
            Financing & Payment Calculator
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Calculate your estimated monthly payment at 5.9% competitive APR.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-6">
              {/* Vehicle Price */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-foreground mb-2">
                  <span>Vehicle Price</span>
                  <span className="font-bold text-foreground">${price.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="350000"
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-foreground mb-2">
                  <span>Down Payment ({Math.round((downPayment / price) * 100)}%)</span>
                  <span className="font-bold text-foreground">${downPayment.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={price}
                  step="2000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Term Duration */}
              <div>
                <span className="block text-xs font-semibold text-foreground mb-2">Loan Term</span>
                <div className="grid grid-cols-3 gap-2">
                  {[36, 48, 60].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTerm(t)}
                      className={`py-2 text-xs font-bold rounded-lg transition ${
                        term === t
                          ? 'bg-primary text-primary-foreground shadow'
                          : 'border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {t} Months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="rounded-2xl border border-border bg-secondary/40 p-8 text-center flex flex-col justify-center items-center">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Estimated Monthly Payment
              </span>
              <div className="text-4xl sm:text-5xl font-black text-primary mt-2">
                ${Math.round(payment).toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <span className="text-[11px] text-muted-foreground mt-2">
                Based on $0 dealer fees & 5.9% estimated APR
              </span>
              {onPreApproval && (
                <button
                  type="button"
                  onClick={onPreApproval}
                  className="mt-6 w-full rounded-xl bg-foreground text-background font-bold py-3 text-xs uppercase tracking-wider hover:bg-foreground/90 transition shadow"
                >
                  Apply For Pre-Approval
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
