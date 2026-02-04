# ☕ Coffee Stock Management System - Setup Guide

## Complete Setup Instructions

### Step 1: Database Setup on Supabase

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up with email or GitHub

2. **Create New Project**
   - Click "New Project"
   - Enter project name (e.g., "coffee-stock")
   - Set a secure database password
   - Select your region
   - Click "Create new project"

3. **Get Connection String**
   - Go to Settings > Database
   - Copy the "Connection string" (PostgreSQL)
   - It should look like: `postgresql://postgres:[password]@[host]:5432/postgres`

### Step 2: Local Environment Setup

1. **Navigate to project folder**
   ```bash
   cd managing_coffee_stock
   ```

2. **Create `.env.local` file**
   ```bash
   # Windows PowerShell
   New-Item .env.local
   
   # Or manually create the file in root directory
   ```

3. **Add your database URL**
   ```
   DATABASE_URL="postgresql://postgres:[your-password]@[your-host]:5432/postgres"
   ```

4. **Save the file**

### Step 3: Initialize Database

1. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

2. **Run Migrations**
   ```bash
   npm run prisma:migrate
   ```
   - Follow the prompt
   - Enter migration name (e.g., "init")
   - This creates all tables in your database

3. **Seed Initial Data**
   ```bash
   npm run prisma:seed
   ```
   - This adds 7 coffee products to your database

4. **Verify Setup**
   ```bash
   npm run prisma:studio
   ```
   - Opens Prisma Studio to visualize your data
   - Close with Ctrl+C

### Step 4: Run Application

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open in Browser**
   - Visit `http://localhost:3000`
   - You should see the home page with 3 cards

3. **Test Features**
   - Try navigating to each page
   - Test the import/export forms
   - Check the statistics page

## Troubleshooting

### "Error: connect ECONNREFUSED"
- Verify DATABASE_URL in `.env.local`
- Check PostgreSQL server is running
- Ensure Supabase database is active

### "Prisma Client not generated"
```bash
npx prisma generate
npx prisma db push
```

### "Tables don't exist"
```bash
npm run prisma:migrate
npm run prisma:seed
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## Project Structure

```
managing_coffee_stock/
├── src/
│   ├── app/
│   │   ├── api/products/        # Product API endpoint
│   │   ├── import/              # Import page
│   │   ├── export/              # Export page
│   │   ├── statistics/          # Statistics page
│   │   ├── layout.tsx           # Root layout with Navbar
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── FormRow.tsx
│   │   ├── CoffeeInTable.tsx
│   │   ├── CoffeeOutTable.tsx
│   │   ├── InventoryTable.tsx
│   │   └── LoadingSkeleton.tsx
│   ├── actions/
│   │   └── coffeeActions.ts     # Server actions
│   └── lib/
│       ├── prisma.ts            # Prisma client
│       ├── conversions.ts        # Utility functions
│       ├── validations.ts        # Zod schemas
│       └── excelExport.ts        # Excel export logic
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Seed script
├── .env.local                   # Environment variables (create this)
├── package.json
└── README.md
```

## Key Features Explained

### Import Flow
1. User fills form with product, quantity (boxes), receiver, note
2. Click "บันทึกสินค้าเข้า" (Save)
3. System validates data
4. Converts boxes → packs (packs = boxes × pack_per_box)
5. Updates database in transaction
6. Redirects to Statistics

### Export Flow
1. User fills form with product, quantity (packs), sender, note
2. Click "บันทึกสินค้าออก" (Save)
3. System validates stock availability
4. Prevents if insufficient stock
5. Updates database in transaction
6. Redirects to Statistics

### Statistics
- **Tab 1**: View all imports with filters
- **Tab 2**: View all exports with filters
- **Tab 3**: Current stock levels
- **Tab 4**: Charts showing trends

### Excel Export
Each tab has "Export to Excel" button that:
- Exports visible/filtered data only
- Creates properly formatted spreadsheet
- Downloads as XLSX file

## Database Design

### Coffee_Quantity
- Tracks current stock
- `pack_per_box`: conversion factor (8, 16, 18, or 20)

### Coffee_In
- Records imports
- Auto-calculates `quantity_pack`
- Updates `Coffee_Quantity`

### Coffee_Out
- Records exports
- Validates stock availability
- Updates `Coffee_Quantity`

## Animations Used

- ✨ Page fade transitions
- 🔘 Button hover/tap effects
- ➕ Form row add/remove animations
- 📊 Loading skeleton animations
- 📈 Table row stagger animations
- 🎯 Icon hover effects

## Next Steps

1. **Test All Features**
   - Import some stock
   - Export some stock
   - View statistics
   - Export to Excel

2. **Customize**
   - Edit `src/lib/conversions.ts` for custom logic
   - Modify colors in components
   - Update product list in seed.ts

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Set DATABASE_URL in environment

## Support

- Check README.md for feature documentation
- Review component files for implementation details
- Check Prisma docs: https://www.prisma.io/docs/

---

**Enjoy managing your coffee stock!** ☕
