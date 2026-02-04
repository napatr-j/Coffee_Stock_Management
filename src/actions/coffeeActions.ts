'use server';

import { prisma } from '@/lib/prisma';
import { convertBoxToPack } from '@/lib/conversions';
import { CoffeeInFormSchema, CoffeeOutFormSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createCoffeeIn(items: any[]) {
  try {
    // Validate all items
    const validatedItems = items.map((item) =>
      CoffeeInFormSchema.parse(item)
    );

    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      const createdItems = [];

      for (const item of validatedItems) {
        // Get product details
        const product = await tx.coffeeQuantity.findUnique({
          where: { id: item.product_id },
        });

        if (!product) {
          throw new Error(`Product ${item.product_id} not found`);
        }

        // Calculate quantity_pack
        const quantity_pack = convertBoxToPack(
          item.quantity_box,
          product.pack_per_box
        );

        // Create coffee in record
        const coffeeIn = await tx.coffeeIn.create({
          data: {
            product_id: item.product_id,
            quantity_box: item.quantity_box,
            quantity_pack,
            receiver: item.receiver,
            po_no: item.po_no || null,
            note: item.note || null,
          },
        });

        // Update coffee quantity
        await tx.coffeeQuantity.update({
          where: { id: item.product_id },
          data: {
            quantity_pack: {
              increment: quantity_pack,
            },
          },
        });

        createdItems.push(coffeeIn);
      }

      return createdItems;
    });

    revalidatePath('/statistics');
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating coffee in:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function createCoffeeOut(items: any[]) {
  try {
    // Validate all items
    const validatedItems = items.map((item) =>
      CoffeeOutFormSchema.parse(item)
    );

    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      const createdItems = [];

      for (const item of validatedItems) {
        // Get product details
        const product = await tx.coffeeQuantity.findUnique({
          where: { id: item.product_id },
        });

        if (!product) {
          throw new Error(`Product ${item.product_id} not found`);
        }

        // Calculate total quantity_pack from boxes (if provided)
        let totalQuantityPack = item.quantity_pack || 0;
        if (item.quantity_box && item.quantity_box > 0) {
          totalQuantityPack += convertBoxToPack(item.quantity_box, product.pack_per_box);
        }

        // Check if stock is available
        if (product.quantity_pack < totalQuantityPack) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${product.quantity_pack}, Requested: ${totalQuantityPack}`
          );
        }

        // Create coffee out record
        const coffeeOut = await tx.coffeeOut.create({
          data: {
            product_id: item.product_id,
            quantity_pack: totalQuantityPack,
            sender: 'N/A',
            note: item.note || null,
          },
        });

        // Update coffee quantity
        await tx.coffeeQuantity.update({
          where: { id: item.product_id },
          data: {
            quantity_pack: {
              decrement: totalQuantityPack,
            },
          },
        });

        createdItems.push(coffeeOut);
      }

      return createdItems;
    });

    revalidatePath('/statistics');
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating coffee out:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getCoffeeInHistory(filters?: {
  year?: number;
  month?: number;
  productId?: number;
  limit?: number;
  offset?: number;
}) {
  try {
    const where: any = {};

    if (filters?.year) {
      const startDate = new Date(filters.year, 0, 1);
      const endDate = new Date(filters.year + 1, 0, 1);
      where.date_in = { gte: startDate, lt: endDate };
    }

    if (filters?.month && filters?.year) {
      const startDate = new Date(filters.year, filters.month - 1, 1);
      const endDate = new Date(filters.year, filters.month, 1);
      where.date_in = { gte: startDate, lt: endDate };
    }

    if (filters?.productId) {
      where.product_id = filters.productId;
    }

    const data = await prisma.coffeeIn.findMany({
      where,
      include: { product: true },
      orderBy: { date_in: 'desc' },
      take: filters?.limit || 100,
      skip: filters?.offset || 0,
    });

    const total = await prisma.coffeeIn.count({ where });

    return { success: true, data, total };
  } catch (error) {
    console.error('Error fetching coffee in history:', error);
    return { success: false, error: 'Failed to fetch history' };
  }
}

export async function getCoffeeOutHistory(filters?: {
  year?: number;
  month?: number;
  productId?: number;
  limit?: number;
  offset?: number;
}) {
  try {
    const where: any = {};

    if (filters?.year) {
      const startDate = new Date(filters.year, 0, 1);
      const endDate = new Date(filters.year + 1, 0, 1);
      where.date_out = { gte: startDate, lt: endDate };
    }

    if (filters?.month && filters?.year) {
      const startDate = new Date(filters.year, filters.month - 1, 1);
      const endDate = new Date(filters.year, filters.month, 1);
      where.date_out = { gte: startDate, lt: endDate };
    }

    if (filters?.productId) {
      where.product_id = filters.productId;
    }

    const data = await prisma.coffeeOut.findMany({
      where,
      include: { product: true },
      orderBy: { date_out: 'desc' },
      take: filters?.limit || 100,
      skip: filters?.offset || 0,
    });

    const total = await prisma.coffeeOut.count({ where });

    return { success: true, data, total };
  } catch (error) {
    console.error('Error fetching coffee out history:', error);
    return { success: false, error: 'Failed to fetch history' };
  }
}

export async function getCurrentInventory() {
  try {
    const data = await prisma.coffeeQuantity.findMany({
      orderBy: { name: 'asc' },
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return { success: false, error: 'Failed to fetch inventory' };
  }
}

export async function getMonthlyStats(year: number) {
  try {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const [inData, outData] = await Promise.all([
      prisma.coffeeIn.groupBy({
        by: ['product_id'],
        where: {
          date_in: { gte: startDate, lt: endDate },
        },
        _sum: {
          quantity_pack: true,
        },
      }),
      prisma.coffeeOut.groupBy({
        by: ['product_id'],
        where: {
          date_out: { gte: startDate, lt: endDate },
        },
        _sum: {
          quantity_pack: true,
        },
      }),
    ]);

    const products = await prisma.coffeeQuantity.findMany();

    const stats = {
      in: inData.map((item) => ({
        productId: item.product_id,
        total: item._sum.quantity_pack || 0,
      })),
      out: outData.map((item) => ({
        productId: item.product_id,
        total: item._sum.quantity_pack || 0,
      })),
      products,
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching monthly stats:', error);
    return { success: false, error: 'Failed to fetch stats' };
  }
}

export async function getMonthlyTimeSeries(year: number) {
  try {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 1);

      const [inTotal, outTotal] = await Promise.all([
        prisma.coffeeIn.aggregate({
          where: {
            date_in: { gte: startDate, lt: endDate },
          },
          _sum: {
            quantity_pack: true,
          },
        }),
        prisma.coffeeOut.aggregate({
          where: {
            date_out: { gte: startDate, lt: endDate },
          },
          _sum: {
            quantity_pack: true,
          },
        }),
      ]);

      months.push({
        month: month + 1,
        in: inTotal._sum.quantity_pack || 0,
        out: outTotal._sum.quantity_pack || 0,
      });
    }

    return { success: true, data: months };
  } catch (error) {
    console.error('Error fetching time series:', error);
    return { success: false, error: 'Failed to fetch time series' };
  }
}

export async function getDailyTimeSeries(year: number, month: number) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStart = new Date(year, month - 1, day);
      const dayEnd = new Date(year, month - 1, day + 1);

      const [inTotal, outTotal] = await Promise.all([
        prisma.coffeeIn.aggregate({
          where: {
            date_in: { gte: dayStart, lt: dayEnd },
          },
          _sum: {
            quantity_pack: true,
          },
        }),
        prisma.coffeeOut.aggregate({
          where: {
            date_out: { gte: dayStart, lt: dayEnd },
          },
          _sum: {
            quantity_pack: true,
          },
        }),
      ]);

      days.push({
        day: day,
        in: inTotal._sum.quantity_pack || 0,
        out: outTotal._sum.quantity_pack || 0,
      });
    }

    return { success: true, data: days };
  } catch (error) {
    console.error('Error fetching daily time series:', error);
    return { success: false, error: 'Failed to fetch daily time series' };
  }
}
