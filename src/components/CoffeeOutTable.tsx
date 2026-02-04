'use client';

import { motion } from 'framer-motion';
import { formatDateTime } from '@/lib/conversions';
import { CoffeeQuantity } from '@prisma/client';

interface CoffeeOutRecord {
  id: number;
  product_id: number;
  quantity_pack: number;
  sender: string;
  note?: string | null;
  date_out: Date;
  product?: CoffeeQuantity;
}

interface CoffeeOutTableProps {
  data: CoffeeOutRecord[];
  isLoading?: boolean;
}

export function CoffeeOutTable({ data, isLoading }: CoffeeOutTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black text-white">
            <th className="px-4 py-3 text-left text-sm font-semibold">วันที่</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">สินค้า</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">แพ็ก</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">ผู้ส่ง</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, idx) => (
            <motion.tr
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateTime(record.date_out)}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {record.product?.name || 'N/A'}
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-700">
                {record.quantity_pack}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.sender}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {record.note || '-'}
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
