// Configuration and customization guide
// This file documents where to make common customizations

/**
 * CUSTOMIZATION GUIDE
 * ===================
 * 
 * This guide shows where to customize various parts of the application.
 */

// 1. COFFEE PRODUCTS
// Location: prisma/seed.ts
// Customize the coffee products list:
// const coffeeProducts = [
//   { name: 'Your Product Name', pack_per_box: 8 },
//   // Add more products...
// ];

// 2. COLORS & STYLING
// Location: src/components/*.tsx
// Search for "bg-black", "text-white", etc. and replace with your colors
// TailwindCSS color options: black, white, gray, red, green, etc.

// 3. ANIMATIONS TIMING
// Location: src/components/*.tsx
// Customize in motion.div/button elements:
// transition={{ duration: 0.2 }} // Change duration
// initial={{ opacity: 0, y: 20 }} // Change starting state
// animate={{ opacity: 1, y: 0 }} // Change ending state

// 4. TABLE COLUMNS
// Location: src/components/CoffeeInTable.tsx, CoffeeOutTable.tsx, InventoryTable.tsx
// Add/remove <th> and <td> elements to change columns

// 5. CHART COLORS
// Location: src/app/statistics/page.tsx
// Modify COLORS array for different shades

// 6. FORM FIELDS
// Location: src/components/FormRow.tsx
// Add more input fields or modify existing ones:
// <input type="text" value={...} onChange={...} />

// 7. EXCEL COLUMNS
// Location: src/lib/excelExport.ts
// Customize column definitions:
// { header: 'Your Header', key: 'your_key', width: 15 }

// 8. DATE FORMAT
// Location: src/lib/conversions.ts
// Modify toLocaleDateString options:
// toLocaleDateString('th-TH', { year: 'numeric', month: 'long' })

// 9. DATABASE SCHEMA
// Location: prisma/schema.prisma
// Add new fields or tables, then run:
// npx prisma migrate dev --name your_migration_name

// 10. API ENDPOINTS
// Location: src/app/api/
// Create new folder for new routes
// Example: src/app/api/statistics/route.ts

// 11. SERVER ACTIONS
// Location: src/actions/coffeeActions.ts
// Add new async functions for new operations

// 12. VALIDATION RULES
// Location: src/lib/validations.ts
// Modify Zod schemas to add/change validation rules

// 13. NAVIGATION ITEMS
// Location: src/components/Navbar.tsx
// Modify navItems array to change menu items

// 14. PAGE TITLES & DESCRIPTIONS
// Location: src/app/layout.tsx and individual pages
// Modify metadata and h1/p elements

// 15. LANGUAGE
// Location: Search for Thai text in all components
// Replace Thai text with your language
// Common translations:
// - "นำสินค้าเข้า" = Import
// - "นำสินค้าออก" = Export
// - "สถิติ" = Statistics

/**
 * COMMON CUSTOMIZATIONS EXAMPLES
 */

// Example 1: Change primary color from black to blue
// Before: className="bg-black text-white"
// After: className="bg-blue-600 text-white"

// Example 2: Add a new form field
// In FormRow.tsx, add:
// <input 
//   type="date" 
//   value={values.new_field} 
//   onChange={(e) => onChange(index, 'new_field', e.target.value)}
// />

// Example 3: Change animation duration
// Before: transition={{ duration: 0.2 }}
// After: transition={{ duration: 0.5 }}

// Example 4: Add more table columns
// In CoffeeInTable.tsx, add:
// <th className="px-4 py-3 text-left text-sm font-semibold">New Column</th>
// <td className="px-4 py-3 text-sm">{record.new_field}</td>

// Example 5: Add new chart
// In statistics page, add:
// <ResponsiveContainer width="100%" height={300}>
//   <PieChart data={inventoryData}>
//     <Pie dataKey="quantity_pack" />
//   </PieChart>
// </ResponsiveContainer>

/**
 * DEPLOYMENT CUSTOMIZATIONS
 */

// 1. Environment Variables (.env.local)
//    DATABASE_URL="your_database_connection_string"
//    NEXT_PUBLIC_APP_NAME="Your App Name"

// 2. Meta Tags (src/app/layout.tsx)
//    title: "Your App Title"
//    description: "Your app description"

// 3. Favicon
//    Replace favicon.ico in src/app/

/**
 * DEVELOPMENT TIPS
 */

// 1. Adding a new page:
//    - Create folder: src/app/your-page/
//    - Create file: src/app/your-page/page.tsx
//    - Add to Navbar in src/components/Navbar.tsx

// 2. Creating new component:
//    - Create file: src/components/YourComponent.tsx
//    - Import in pages: import { YourComponent } from '@/components/YourComponent'

// 3. Adding database field:
//    - Update: prisma/schema.prisma
//    - Run: npx prisma migrate dev --name add_field_name
//    - Update server actions

// 4. Changing validation:
//    - Update: src/lib/validations.ts
//    - Update: server actions that use the schema

// 5. Testing locally:
//    - npm run dev
//    - npm run prisma:studio (view database)
//    - Check browser console for errors

/**
 * USEFUL LINKS
 */

// Documentation:
// - Next.js: https://nextjs.org/docs
// - Prisma: https://www.prisma.io/docs
// - TailwindCSS: https://tailwindcss.com/docs
// - Framer Motion: https://www.framer.com/motion
// - Recharts: https://recharts.org/en-US/guide
// - Zod: https://zod.dev

// Deployment:
// - Vercel: https://vercel.com
// - AWS: https://aws.amazon.com
// - DigitalOcean: https://www.digitalocean.com
// - Railway: https://railway.app

/**
 * SUPPORT
 */

// If you need help:
// 1. Check README.md
// 2. Check SETUP.md
// 3. Check specific page/component comments
// 4. Check browser console for errors
// 5. Check Prisma docs for database issues

export const APP_CONFIG = {
  APP_NAME: 'Coffee Stock Management',
  VERSION: '1.0.0',
  THEME: {
    PRIMARY: 'black',
    SECONDARY: 'gray',
    ACCENT: 'white',
  },
  ANIMATION: {
    DURATION: 0.2,
    EASE: 'easeInOut',
  },
  DATABASE: {
    TIMEOUT: 30000,
  },
  PAGINATION: {
    PAGE_SIZE: 100,
  },
};
