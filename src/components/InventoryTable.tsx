'use client';

import { motion } from 'framer-motion';
import { CoffeeQuantity } from '@prisma/client';

interface InventoryTableProps {
  data: CoffeeQuantity[];
  isLoading?: boolean;
}

export function InventoryTable({ data, isLoading }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black text-white">
            <th className="px-4 py-3 text-left text-sm font-semibold">สินค้า</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">แพ็กเหลือ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, idx) => (
            <motion.tr
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                product.quantity_pack === 0 ? 'bg-red-50' : ''
              }`}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {product.name}
              </td>
              <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                {product.quantity_pack}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          ไม่มีข้อมูล
        </div>
      )}
    </div>
  );
}
