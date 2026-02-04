import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve('.env.local') });
dotenv.config({ path: path.resolve('.env') });

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or DIRECT_URL environment variable is not set');
}

console.log('Using DATABASE_URL:', connectionString.substring(0, 50) + '...');

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // Delete existing data
  await prisma.coffeeOut.deleteMany();
  await prisma.coffeeIn.deleteMany();
  await prisma.coffeeQuantity.deleteMany();

  // Seed Coffee Products
  const coffeeProducts = [
    { name: 'Black2.5*100', pack_per_box: 8 },
    { name: 'Black2.5*50', pack_per_box: 16 },
    { name: 'Black180', pack_per_box: 18 },
    { name: 'Original', pack_per_box: 20 },
    { name: 'Espresso', pack_per_box: 20 },
    { name: 'Black Coffee Mix', pack_per_box: 18 },
    { name: 'สูตรหญ้าหวาน', pack_per_box: 18 },
  ];

  for (const product of coffeeProducts) {
    await prisma.coffeeQuantity.create({
      data: {
        name: product.name,
        quantity_pack: 0,
        pack_per_box: product.pack_per_box,
      },
    });
    console.log(`✓ Created product: ${product.name}`);
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
