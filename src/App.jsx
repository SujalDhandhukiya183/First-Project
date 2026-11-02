import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CarCard } from './components/CarCard';
import { CarDetailsModal } from './components/CarDetailsModal';
import { LoanCalculator } from './components/LoanCalculator';
import { TestDriveModal } from './components/TestDriveModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { SlidersHorizontal } from 'lucide-react';
import { CARS_FLEET, CATEGORIES } from './data/cars';

export default function App() {
  const [theme, setTheme] = useState('crimson');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCar, setActiveModalCar] = useState(null);
  const [activeDetailsCar, setActiveDetailsCar] = useState(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart State (loaded from localStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('autoshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('autoshop_cart', JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  const handleAddToCart = (car) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === car.id);
      if (existing) {
        return prev.map((item) =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...car, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleOpenTestDrive = (car) => {
    setActiveModalCar(car || CARS_FLEET[0]);
    setIsTestDriveOpen(true);
  };

  const handleOpenDetails = (car) => {
    setActiveDetailsCar(car);
    setIsDetailsOpen(true);
  };

  const filteredCars = useMemo(() => {
    return CARS_FLEET.filter((car) => {
      const matchesCategory =
        selectedCategory === 'All' || car.category === selectedCategory;
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 1. Header with Cart button & Theme Switcher */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onBookTestDrive={() => handleOpenTestDrive(CARS_FLEET[0])}
        currentTheme={theme}
        onThemeChange={setTheme}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onExplore={scrollToInventory} />

        {/* 3. Inventory Section */}
        <section id="inventory" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Available Fleet ({filteredCars.length})
              </span>
              <h2 className="text-3xl font-black text-foreground tracking-tight mt-1">
                Explore Our Showroom
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0 mr-1 hidden sm:block" />
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Cars Grid with Add to Cart */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onBookTestDrive={handleOpenTestDrive}
                  onViewDetails={handleOpenDetails}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground text-sm">No vehicles found matching "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                Clear filters
              </button>
            </div>
          )}

        </section>

        {/* 4. Financing & Loan Calculator */}
        <LoanCalculator onPreApproval={() => handleOpenTestDrive(CARS_FLEET[0])} />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Car Details Modal */}
      <CarDetailsModal
        car={activeDetailsCar}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onBookTestDrive={handleOpenTestDrive}
        onAddToCart={handleAddToCart}
      />

      {/* 7. Test Drive Booking Modal */}
      <TestDriveModal
        car={activeModalCar}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />

      {/* 8. Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 9. Secure Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleClearCart}
      />
    </div>
  );
}
