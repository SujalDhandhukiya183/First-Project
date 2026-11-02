import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  CreditCard,
  Truck,
  Building,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  Wallet,
  Coins,
  FileText,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';

export function CheckoutModal({ isOpen, onClose, items = [], onOrderComplete }) {
  const [step, setStep] = useState(1); // 1: Delivery & Contact, 2: Payment, 3: Success
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' or 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('deposit'); // 'deposit' | 'card' | 'applepay' | 'wire' | 'financing' | 'crypto'
  const [copiedWire, setCopiedWire] = useState(false);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    ssnLast4: '',
    employmentStatus: 'Employed',
    annualIncome: '',
  });

  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' ? 1200 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + tax + deliveryFee;
  const depositAmount = 2500; // Standard refundable vehicle reservation deposit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleAutoFillDemo = () => {
    setFormData({
      firstName: 'Alexander',
      lastName: 'Sterling',
      email: 'alex.sterling@apexmotors.com',
      phone: '+1 (555) 789-2401',
      address: '742 Ocean Boulevard, Suite 500',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210',
      cardNumber: '4532 8920 1938 8921',
      cardExpiry: '08/29',
      cardCvc: '849',
      cardName: 'Alexander Sterling',
      ssnLast4: '8842',
      employmentStatus: 'Executive',
      annualIncome: '350000',
    });
    setErrors({});
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';

    if (deliveryType === 'delivery') {
      if (!formData.address.trim()) errs.address = 'Street address is required';
      if (!formData.city.trim()) errs.city = 'City is required';
      if (!formData.state.trim()) errs.state = 'State is required';
      if (!formData.zip.trim()) errs.zip = 'ZIP code is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (paymentMethod === 'card' || paymentMethod === 'deposit') {
      if (!formData.cardName.trim()) errs.cardName = 'Cardholder name is required';
      if (!formData.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) errs.cardExpiry = 'Expiry date (MM/YY) is required';
      if (!formData.cardCvc.trim()) errs.cardCvc = 'CVC code is required';
    } else if (paymentMethod === 'financing') {
      if (!formData.ssnLast4.trim()) errs.ssnLast4 = 'SSN last 4 is required';
      if (!formData.annualIncome.trim()) errs.annualIncome = 'Annual income is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateStep1()) return;
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setErrors({});
      // Complete Order
      const newOrderId = 'APX-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      setStep(3);
      if (onOrderComplete) onOrderComplete();
    }
  };

  const handleClose = () => {
    setStep(1);
    setErrors({});
    onClose();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedWire(true);
    setTimeout(() => setCopiedWire(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-secondary/30">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Secure Checkout</h3>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                256-Bit SSL Encrypted Escrow Protection
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        {step < 3 && (
          <div className="grid grid-cols-2 border-b border-border text-center text-xs font-semibold">
            <div
              className={`py-3 border-r border-border flex items-center justify-center gap-2 ${
                step === 1 ? 'bg-primary/10 text-primary border-b-2 border-b-primary' : 'text-muted-foreground'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold">1</span>
              <span>1. Contact & Delivery</span>
            </div>
            <div
              className={`py-3 flex items-center justify-center gap-2 ${
                step === 2 ? 'bg-primary/10 text-primary border-b-2 border-b-primary' : 'text-muted-foreground'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold">2</span>
              <span>2. Payment & Financing</span>
            </div>
          </div>
        )}

        {/* STEP 1 & 2: Main Layout */}
        {step < 3 ? (
          <form onSubmit={handleNextStep}>
            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[75vh] overflow-y-auto">
              
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                
                {/* STEP 1: CONTACT & DELIVERY */}
                {step === 1 && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                          Contact Information
                        </h4>
                        <button
                          type="button"
                          onClick={handleAutoFillDemo}
                          className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-primary/20 transition active:scale-95"
                          title="Click to automatically fill sample client details"
                        >
                          <Sparkles className="h-3 w-3" />
                          Auto-Fill Demo Info
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Alexander"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.firstName && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.firstName}</span>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Sterling"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.lastName && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.lastName}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="alex.sterling@apexmotors.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.email && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.email}</span>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 789-2401"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.phone ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.phone && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.phone}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Method Options */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                        Fulfillment Option
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <label
                          onClick={() => setDeliveryType('delivery')}
                          className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                            deliveryType === 'delivery'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Enclosed Delivery</span>
                            <span className="block text-[11px] text-muted-foreground mt-0.5">
                              White-glove covered home transport (+$1,200)
                            </span>
                          </div>
                        </label>

                        <label
                          onClick={() => setDeliveryType('pickup')}
                          className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                            deliveryType === 'pickup'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <Building className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Showroom Pickup</span>
                            <span className="block text-[11px] text-muted-foreground mt-0.5">
                              Pick up at Flagship Dealership (Free)
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Shipping Address (if delivery) */}
                    {deliveryType === 'delivery' && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder="742 Ocean Boulevard, Suite 500"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.address ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.address && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.address}</span>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              placeholder="Beverly Hills"
                              value={formData.city}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                                errors.city ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.city && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.city}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              State *
                            </label>
                            <input
                              type="text"
                              name="state"
                              placeholder="CA"
                              value={formData.state}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                                errors.state ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.state && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.state}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              name="zip"
                              placeholder="90210"
                              value={formData.zip}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition ${
                                errors.zip ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.zip && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.zip}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* STEP 2: PAYMENT METHODS */}
                {step === 2 && (
                  <>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                        Select Payment Method
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Choose your preferred vehicle reservation or purchase method.
                      </p>

                      {/* Payment Methods Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        
                        {/* 1. VIP Deposit */}
                        <label
                          onClick={() => setPaymentMethod('deposit')}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            paymentMethod === 'deposit'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-foreground">VIP Deposit ($2,500)</span>
                              <span className="text-[9px] font-bold text-primary bg-primary/20 px-1.5 py-0.5 rounded-full">POPULAR</span>
                            </div>
                            <span className="block text-[10px] text-muted-foreground mt-0.5">
                              Locks VIN allocation immediately
                            </span>
                          </div>
                        </label>

                        {/* 2. Credit / Debit Card */}
                        <label
                          onClick={() => setPaymentMethod('card')}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            paymentMethod === 'card'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Credit / Debit Card</span>
                            <span className="block text-[10px] text-muted-foreground mt-0.5">
                              Visa, MasterCard, Amex
                            </span>
                          </div>
                        </label>

                        {/* 3. Apple Pay / Google Pay */}
                        <label
                          onClick={() => setPaymentMethod('applepay')}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            paymentMethod === 'applepay'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <Smartphone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Apple Pay / GPay</span>
                            <span className="block text-[10px] text-muted-foreground mt-0.5">
                              Instant 1-Click Authorization
                            </span>
                          </div>
                        </label>

                        {/* 4. Bank Wire / Escrow */}
                        <label
                          onClick={() => setPaymentMethod('wire')}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            paymentMethod === 'wire'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <Building className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Bank Wire / ACH</span>
                            <span className="block text-[10px] text-muted-foreground mt-0.5">
                              Direct Dealership Wire Instructions
                            </span>
                          </div>
                        </label>

                        {/* 5. Financing / Lease */}
                        <label
                          onClick={() => setPaymentMethod('financing')}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            paymentMethod === 'financing'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Financing / Lease</span>
                            <span className="block text-[10px] text-muted-foreground mt-0.5">
                              From 5.9% APR • Instant check
                            </span>
                          </div>
                        </label>

                        {/* 6. Crypto / Bitcoin */}
                        <label
                          onClick={() => setPaymentMethod('crypto')}
                          className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                            paymentMethod === 'crypto'
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-secondary/40 hover:bg-secondary/70'
                          }`}
                        >
                          <Coins className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground">Crypto (BTC / USDT)</span>
                            <span className="block text-[10px] text-muted-foreground mt-0.5">
                              Zero fee direct crypto settlement
                            </span>
                          </div>
                        </label>

                      </div>
                    </div>

                    {/* METHOD 1 & 2: Card Inputs (Deposit or Card) */}
                    {(paymentMethod === 'deposit' || paymentMethod === 'card') && (
                      <div className="space-y-3 pt-2 rounded-2xl border border-border bg-secondary/20 p-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
                          <span>Enter Card Details</span>
                          <span className="text-[10px] text-primary">256-Bit SSL Encrypted</span>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Cardholder Full Name *
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            placeholder="Alexander Sterling"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.cardName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.cardName && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.cardName}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="4532 •••• •••• 8921"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                              errors.cardNumber ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                            }`}
                          />
                          {errors.cardNumber && (
                            <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.cardNumber}</span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              Expiry (MM/YY) *
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              placeholder="08/29"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                                errors.cardExpiry ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.cardExpiry && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.cardExpiry}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              CVC / CVV *
                            </label>
                            <input
                              type="text"
                              name="cardCvc"
                              placeholder="849"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                                errors.cardCvc ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.cardCvc && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.cardCvc}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* METHOD 3: Apple Pay / GPay */}
                    {paymentMethod === 'applepay' && (
                      <div className="rounded-2xl border border-border bg-secondary/30 p-6 text-center space-y-3">
                        <Smartphone className="h-10 w-10 text-primary mx-auto" />
                        <h5 className="text-sm font-bold text-foreground">Express Digital Wallet</h5>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                          Click below to authorize your purchase securely using Apple Pay, Google Wallet, or biometric passkey.
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full py-3 rounded-xl bg-foreground text-background font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90"
                          >
                            Pay with Pay / GPay
                          </button>
                        </div>
                      </div>
                    )}

                    {/* METHOD 4: Bank Wire Instructions */}
                    {paymentMethod === 'wire' && (
                      <div className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground">Escrow Wire Account Details</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('Routing: 021000021 | Acct: 9481029412')}
                            className="text-[11px] text-primary flex items-center gap-1 hover:underline"
                          >
                            {copiedWire ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copiedWire ? 'Copied' : 'Copy Info'}
                          </button>
                        </div>
                        <div className="space-y-1.5 text-muted-foreground font-mono text-[11px] bg-background/60 p-3 rounded-xl border border-border">
                          <div>Bank: JPMorgan Chase NA (New York)</div>
                          <div>Beneficiary: AutoShop Dealership Escrow LLC</div>
                          <div>Routing Number: 021000021</div>
                          <div>Account Number: 9481029412</div>
                          <div>SWIFT/BIC: CHASUS33XXX</div>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Your vehicle will be reserved for 48 hours awaiting wire transfer confirmation.
                        </p>
                      </div>
                    )}

                    {/* METHOD 5: Financing Application */}
                    {paymentMethod === 'financing' && (
                      <div className="space-y-3 pt-2 rounded-2xl border border-border bg-secondary/20 p-4">
                        <span className="text-xs font-bold text-foreground block">
                          Instant Credit Pre-Approval Application
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              Last 4 of SSN *
                            </label>
                            <input
                              type="password"
                              maxLength={4}
                              name="ssnLast4"
                              placeholder="••••"
                              value={formData.ssnLast4}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                                errors.ssnLast4 ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.ssnLast4 && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.ssnLast4}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                              Annual Income (USD) *
                            </label>
                            <input
                              type="number"
                              name="annualIncome"
                              placeholder="$180,000"
                              value={formData.annualIncome}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl border bg-secondary px-3.5 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none transition ${
                                errors.annualIncome ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                              }`}
                            />
                            {errors.annualIncome && (
                              <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.annualIncome}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Applying will not affect your credit score. 5.9% estimated APR with tier-1 lenders.
                        </p>
                      </div>
                    )}

                    {/* METHOD 6: Crypto Settlement */}
                    {paymentMethod === 'crypto' && (
                      <div className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-3 text-xs">
                        <span className="font-bold text-foreground block">
                          Direct Crypto Settlement (BTC / USDT)
                        </span>
                        <div className="flex items-center gap-3 bg-background/60 p-3 rounded-xl border border-border font-mono text-[11px] break-all">
                          <Coins className="h-6 w-6 text-primary shrink-0" />
                          <span className="text-muted-foreground">
                            0x71C...B294819A4f91048e91
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Exchange rate locked at current live market rate for 30 minutes upon reservation.
                        </p>
                      </div>
                    )}

                  </>
                )}

              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-secondary/30 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                    Order Summary ({items.length})
                  </h4>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 items-center rounded-xl border border-border bg-card p-2.5 text-xs"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-16 object-cover rounded-lg border border-border bg-secondary shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-foreground truncate">{item.name}</h5>
                          <span className="text-muted-foreground text-[11px]">
                            Qty: {item.quantity} × ${item.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="font-bold text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Vehicle Subtotal</span>
                      <span className="font-semibold text-foreground">${subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Fulfillment</span>
                      <span className="font-semibold text-foreground">
                        {deliveryFee > 0 ? `$${deliveryFee.toLocaleString()}` : 'Free Showroom Pickup'}
                      </span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimated Tax & Registration (8%)</span>
                      <span className="font-semibold text-foreground">${Math.round(tax).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-foreground pt-3 border-t border-border">
                      <span>Total Vehicle Cost</span>
                      <span className="text-primary">${Math.round(total).toLocaleString()}</span>
                    </div>

                    {paymentMethod === 'deposit' && (
                      <div className="flex justify-between text-xs font-bold text-accent pt-1">
                        <span>Due Today (VIP Deposit)</span>
                        <span>${depositAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-2 pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95"
                  >
                    <span>
                      {step === 1
                        ? 'Continue to Payment'
                        : paymentMethod === 'deposit'
                        ? `Pay $${depositAmount.toLocaleString()} Deposit & Reserve`
                        : paymentMethod === 'wire'
                        ? 'Reserve with Wire Transfer'
                        : paymentMethod === 'financing'
                        ? 'Submit Financing Pre-Approval'
                        : `Confirm & Complete Order`}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back to Delivery Info
                    </button>
                  )}
                </div>

              </div>

            </div>
          </form>
        ) : (
          /* STEP 3: Order Confirmation / Success Screen */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary shadow-lg shadow-primary/20">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Order Confirmed
              </span>
              <h3 className="text-3xl font-black text-foreground mt-1">
                Congratulations, {formData.firstName || 'Valued Client'}!
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Your allocation is locked in with Order ID <strong className="text-foreground">{orderId}</strong>.
                A confirmation receipt has been dispatched to <strong className="text-foreground">{formData.email || 'your email'}</strong>.
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-bold text-foreground">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fulfillment:</span>
                <span className="font-bold text-foreground">
                  {deliveryType === 'delivery' ? 'Enclosed Home Delivery' : 'Dealership Pickup'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold text-primary uppercase">
                  {paymentMethod === 'deposit'
                    ? 'VIP Deposit Paid ($2,500)'
                    : paymentMethod === 'wire'
                    ? 'Bank Wire Pending'
                    : paymentMethod === 'financing'
                    ? 'Financing Pre-Approved'
                    : paymentMethod === 'crypto'
                    ? 'Crypto Settlement'
                    : 'Credit Card Paid in Full'}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-bold text-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  Within 5-7 Business Days
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-xl bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition"
              >
                Back to Showroom
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
