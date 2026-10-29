import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CarCard } from './components/CarCard';
import { CarDetailsModal } from './components/CarDetailsModal';
import { LoanCalculator } from './components/LoanCalculator';
import { TestDriveModal } from './components/TestDriveModal';
import { Footer } from './components/Footer';
import { SlidersHorizontal } from 'lucide-react';

const CARS_FLEET = [
  {
    id: 1,
    name: 'Porsche 911 GT3 RS',
    category: 'Supercars',
    price: 223800,
    hp: 518,
    zeroSixty: '3.0s',
    fuel: 'Gasoline',
    badge: 'Flagship',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: '4.0L Naturally Aspirated Boxer-6',
      transmission: '7-speed Porsche Doppelkupplung (PDK)',
      drivetrain: 'Rear-Wheel Drive (RWD)',
      topSpeed: '184 MPH',
      mileageOrRange: '16 MPG combined',
      gallery: [
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'DRS (Drag Reduction System) active aerodynamics',
        'Carbon fiber bucket seats & roll cage prep',
        'Porsche Ceramic Composite Brakes (PCCB)',
        'Motorsport adjustable suspension dials on steering wheel'
      ]
    }
  },
  {
    id: 2,
    name: 'Ferrari 296 GTB',
    category: 'Supercars',
    price: 322986,
    hp: 819,
    zeroSixty: '2.7s',
    fuel: 'Twin-Turbo V6 Hybrid',
    badge: 'Hybrid Supercar',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: '3.0L 120° Twin-Turbo V6 + Electric Motor',
      transmission: '8-speed F1 Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive (RWD)',
      topSpeed: '205 MPH',
      mileageOrRange: '15.5 mi All-Electric / 47 MPGe',
      gallery: [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'Assetto Fiorano lightweight track package',
        'Side Slip Control 7.0 for optimal drift control',
        'Formula 1-derived MGU-K electric powertrain',
        'Full digital cockpit with haptic steering controls'
      ]
    }
  },
  {
    id: 3,
    name: 'BMW M4 Competition Coupe',
    category: 'Coupe',
    price: 82200,
    hp: 503,
    zeroSixty: '3.4s',
    fuel: 'Twin-Turbo I6',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: '3.0L BMW M TwinPower Turbo Inline-6',
      transmission: '8-speed M Steptronic with Drivelogic',
      drivetrain: 'M xDrive Intelligent All-Wheel Drive',
      topSpeed: '180 MPH (M Driver\'s)',
      mileageOrRange: '19 MPG combined',
      gallery: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'Carbon Fiber roof & M Carbon bucket seats',
        'Adaptive M Suspension with active M Differential',
        'Harman Kardon 16-speaker surround sound',
        'M Drift Analyzer & Laptimer telemetry'
      ]
    }
  },
  {
    id: 4,
    name: 'Lamborghini Urus Performante',
    category: 'SUV',
    price: 269885,
    hp: 657,
    zeroSixty: '3.1s',
    fuel: 'Twin-Turbo V8',
    badge: 'Super SUV',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c82661cb25?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: '4.0L Twin-Turbocharged V8',
      transmission: '8-speed Automatic with Torque Converter',
      drivetrain: 'Permanent 4WD with Active Rear Torque Vectoring',
      topSpeed: '190 MPH',
      mileageOrRange: '14 MPG combined',
      gallery: [
        'https://images.unsplash.com/photo-1541348263662-e0c82661cb25?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'Akrapovič titanium lightweight exhaust system',
        'Lowered sport steel-spring suspension setup',
        'RALLY drive mode for unpaved dirt tracks',
        'Carbon fiber vented hood & aero spoiler'
      ]
    }
  },
  {
    id: 5,
    name: 'Mercedes-AMG G63',
    category: 'SUV',
    price: 179000,
    hp: 577,
    zeroSixty: '4.5s',
    fuel: 'Twin-Turbo V8',
    badge: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: 'Handcrafted 4.0L AMG V8 Biturbo',
      transmission: 'AMG SPEEDSHIFT TCT 9-speed',
      drivetrain: 'AMG Performance 4MATIC with 3 Locking Diffs',
      topSpeed: '149 MPH',
      mileageOrRange: '14 MPG combined',
      gallery: [
        'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1541348263662-e0c82661cb25?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'Side-exit chrome AMG performance exhaust pipes',
        'Burmester High-End 3D Surround Sound System',
        'Designo Exclusive Nappa leather diamond quilting',
        'Portal axle chassis with unmatched off-road capability'
      ]
    }
  },
  {
    id: 6,
    name: 'Audi RS e-tron GT',
    category: 'Electric',
    price: 106500,
    hp: 637,
    zeroSixty: '3.1s',
    fuel: 'Electric (249 mi)',
    badge: 'Pure EV',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: 'Dual Synchronous Electric Motors',
      transmission: '2-speed automatic on rear axle',
      drivetrain: 'Electric quattro all-wheel drive',
      topSpeed: '155 MPH',
      mileageOrRange: '249 Miles Range (93.4 kWh battery)',
      gallery: [
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        '800-volt high-speed charging (5% to 80% in 22 min)',
        'All-wheel steering for effortless tight maneuvering',
        'Three-chamber adaptive air suspension',
        'Bang & Olufsen 3D Premium Sound with e-sound acoustics'
      ]
    }
  },
  {
    id: 7,
    name: 'Tesla Model S Plaid',
    category: 'Electric',
    price: 89990,
    hp: 1020,
    zeroSixty: '1.99s',
    fuel: 'Tri-Motor Electric',
    badge: 'Insane 1.99s',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: 'Tri-Motor All-Wheel Drive with Carbon-Sleeved Rotors',
      transmission: 'Single-speed fixed ratio',
      drivetrain: 'Torque Vectoring Tri-Motor AWD',
      topSpeed: '200 MPH',
      mileageOrRange: '359 Miles Range EPA',
      gallery: [
        'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'Fastest accelerating production sedan on earth',
        'Yoke steering option & 17" cinema touch display',
        'Supercharging speeds up to 200 miles in 15 minutes',
        'Full Self-Driving capability & active noise cancelling'
      ]
    }
  },
  {
    id: 8,
    name: 'Aston Martin Vantage',
    category: 'Supercars',
    price: 191000,
    hp: 656,
    zeroSixty: '3.4s',
    fuel: 'Twin-Turbo V8',
    badge: 'Exotic',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    specs: {
      engine: '4.0L Twin-Turbocharged V8',
      transmission: 'ZF 8-speed Automatic with E-Diff',
      drivetrain: 'Rear-Wheel Drive (50:50 weight distribution)',
      topSpeed: '202 MPH',
      mileageOrRange: '18 MPG combined',
      gallery: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80'
      ],
      features: [
        'Bespoke hand-stitched Bridge of Weir leather interior',
        'New generation touchscreen infotainment & physical dials',
        'Michelin Pilot Sport S 5 tailored compound tires',
        'Adaptive damping with Skyhook technology'
      ]
    }
  },
];

const CATEGORIES = ['All', 'Supercars', 'Coupe', 'SUV', 'Electric'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCar, setActiveModalCar] = useState(null);
  const [activeDetailsCar, setActiveDetailsCar] = useState(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
    <div className="flex min-h-screen flex-col bg-[#0b0f19] text-slate-100 selection:bg-rose-600 selection:text-white">
      {/* 1. Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onBookTestDrive={() => handleOpenTestDrive(CARS_FLEET[0])}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onExplore={scrollToInventory} />

        {/* 3. Inventory Section */}
        <section id="inventory" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                Available Fleet ({filteredCars.length})
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight mt-1">
                Explore Our Showroom
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <SlidersHorizontal className="h-4 w-4 text-slate-500 shrink-0 mr-1 hidden sm:block" />
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : 'border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onBookTestDrive={handleOpenTestDrive}
                  onViewDetails={handleOpenDetails}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
              <p className="text-slate-400 text-sm">No vehicles found matching "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-500"
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
      />

      {/* 7. Test Drive Booking Modal */}
      <TestDriveModal
        car={activeModalCar}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />
    </div>
  );
}

