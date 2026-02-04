# ☕ Coffee Stock Management System

A modern, minimalist web application for managing coffee inventory. Record stock imports and exports, track quantities, view analytics, and export data to Excel.

## 🎯 Features

- **Import Management**: Record coffee stock coming into warehouse with multi-row support
- **Export Management**: Record coffee stock going out with stock validation
- **Real-time Inventory Tracking**: View current stock quantities
- **Advanced Statistics**: Filter by year, month, and product
- **Data Visualization**: Charts for monthly trends and current stock
- **Excel Export**: Export filtered data from any statistics tab
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Modern UI with Framer Motion transitions
- **Transaction Support**: Atomic database operations for data integrity

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **exceljs** - Excel export

### Backend
- **Next.js Server Actions** - Backend logic
- **Prisma ORM** - Database abstraction
- **Zod** - Validation

### Database
- **PostgreSQL** (via Supabase)
- Prisma migrations for schema management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create `.env.local`:
   ```
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

3. **Set up the database**
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Visit `http://localhost:3000`

## 📚 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed initial data
npm run prisma:studio    # Open Prisma Studio
npm run lint             # Run ESLint
```

## 📋 Features Overview

### Import Page (นำสินค้าเข้า)
- Multi-row form for adding multiple products
- Auto-convert boxes to packs based on product ratios
- Receiver name and notes
- Transaction-based saving for data integrity

### Export Page (นำสินค้าออก)
- Multi-row form for removing stock
- Stock availability validation
- Sender name and notes
- Prevents negative inventory

### Statistics Page (สถิติ)
- **Tab 1**: Import history with filtering and export
- **Tab 2**: Export history with filtering and export
- **Tab 3**: Current inventory snapshot
- **Tab 4**: Charts showing trends and current stock

## 🎨 Design

- **Black & White** minimalist theme
- **Responsive** layouts for all screen sizes
- **Framer Motion** animations throughout
- **Modern UI** with smooth transitions
- **Thai Language** support

## 📝 Initial Products

7 coffee products pre-seeded:
- Black2.5*100 (8 packs/box)
- Black2.5*50 (16 packs/box)
- Black180 (18 packs/box)
- Original (20 packs/box)
- Espresso (20 packs/box)
- Black Coffee Mix (18 packs/box)
- สูตรหญ้าหวาน (18 packs/box)

## 🔒 Validation

- Required fields enforcement
- Stock availability checks
- Positive quantity validation
- Transaction rollback on errors

## 📊 Charts

- Monthly import vs export bar chart
- Current inventory by product
- Data visualization with Recharts
- Excel export for all data

## 🚀 Deployment

Deploy to Vercel, AWS, or any Node.js host:
1. Push to GitHub
2. Connect repository
3. Set DATABASE_URL environment variable
4. Deploy!

## 📄 License

MIT License

**Built with ❤️ for coffee inventory management**
