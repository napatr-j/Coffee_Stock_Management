# 🚀 Quick Start Guide

## 5-Minute Setup

### 1. Database Connection (2 min)
```bash
# Create .env.local in project root
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### 2. Database Setup (2 min)
```bash
npm run prisma:migrate
npm run prisma:seed
```

### 3. Run Application (1 min)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## First Time Using the App

### Try Import
1. Click **นำสินค้าเข้า** (Import)
2. Select a product from dropdown
3. Enter quantity (boxes)
4. Enter receiver name
5. Click **บันทึกสินค้าเข้า** (Save)

### Try Export
1. Click **นำสินค้าออก** (Export)
2. Select a product from dropdown
3. Enter quantity (packs)
4. Enter sender name
5. Click **บันทึกสินค้าออก** (Save)

### View Statistics
1. Click **สถิติ** (Statistics)
2. Try each tab:
   - **สินค้าเข้า**: View imports
   - **สินค้าออก**: View exports
   - **จำนวนสินค้าคงเหลือ**: View current stock
   - **กราฟ**: View charts
3. Use filters to explore data
4. Click **Export to Excel** on any tab

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Database
npm run prisma:migrate   # Create/update tables
npm run prisma:seed      # Add initial products
npm run prisma:studio    # Open database GUI

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Check code style
```

---

## Keyboard Shortcuts

- **Tab** - Navigate form fields
- **Enter** - Submit form
- **Escape** - Close messages

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find DATABASE_URL" | Create `.env.local` with your connection string |
| "Tables don't exist" | Run `npm run prisma:migrate` |
| "No products shown" | Run `npm run prisma:seed` |
| "Port 3000 in use" | Run `npm run dev -- -p 3001` |
| "Prisma Client error" | Run `npx prisma generate` |

---

## File Locations

- **Pages**: `src/app/` (import, export, statistics)
- **Components**: `src/components/`
- **Server Actions**: `src/actions/coffeeActions.ts`
- **Database Schema**: `prisma/schema.prisma`
- **Styling**: `src/app/globals.css` + TailwindCSS

---

## What's Included

✅ Complete UI with animations
✅ Database schema & migrations
✅ Server actions with validation
✅ Excel export functionality
✅ Charts & analytics
✅ Responsive design
✅ Thai language support
✅ Error handling

---

## Next Steps

1. **Configure Database** (SETUP.md)
2. **Run Application** (npm run dev)
3. **Test All Features** (CHECKLIST.md)
4. **Deploy** (to Vercel, AWS, etc.)

---

## Need Help?

- Read **README.md** for full documentation
- Check **SETUP.md** for detailed setup
- Review **CHECKLIST.md** for verification

---

**You're ready to manage coffee stock! ☕**
