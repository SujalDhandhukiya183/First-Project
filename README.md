# AutoShop - React (JSX) + Vite + Tailwind CSS

A clean, modern luxury & exotic car dealership storefront built with **pure React (.jsx)**, **Vite**, and **Tailwind CSS**.

## Getting Started

1. Navigate into the project folder:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure (.jsx)

- `src/App.jsx` - Main app connecting state (search filter, category filter, modals)
- `src/components/Header.jsx` - Responsive navigation bar, search bar, and test drive CTA
- `src/components/Hero.jsx` - Flagship supercar showcase banner with performance stats
- `src/components/CarCard.jsx` - Vehicle card with specs, image, and action triggers
- `src/components/CarDetailsModal.jsx` - Full technical specifications dialog & multi-angle gallery
- `src/components/TestDriveModal.jsx` - VIP test drive reservation dialog
- `src/components/LoanCalculator.jsx` - Real-time auto loan payment calculator
- `src/components/Footer.jsx` - Dealership footer with links and newsletter
