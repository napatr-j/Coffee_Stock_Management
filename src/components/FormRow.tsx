'use client';

import { motion } from 'framer-motion';
import { CoffeeQuantity } from '@prisma/client';

interface FormRowProps {
  index: number;
  products: CoffeeQuantity[];
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: any) => void;
  values: {
    product_id: number | '';
    quantity_box_or_pack: number | '';
    receiver_or_sender: string;
    note: string;
  };
  isExport?: boolean;
}

export function FormRow({
  index,
  products,
  onRemove,
  onChange,
  values,
  isExport = false,
}: FormRowProps) {
  const selectedProduct = products.find((p) => p.id === values.product_id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col sm:flex-row gap-3 p-4 bg-white border border-gray-200 rounded-lg"
    >
      {/* Product Dropdown */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          สินค้า
        </label>
        <select
          value={values.product_id || ''}
          onChange={(e) => onChange(index, 'product_id', e.target.value ? parseInt(e.target.value) : 0)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">เลือกสินค้า</option>
          {products.length > 0 ? (
            products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (เหลือ: {product.quantity_pack} แพ็ก)
              </option>
            ))
          ) : (
            <option disabled>ไม่มีสินค้า</option>
          )}
        </select>
      </div>

      {/* Quantity */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          {isExport ? 'จำนวน (แพ็ก)' : 'จำนวน (กล่อง)'}
        </label>
        <input
          type="number"
          min="1"
          value={values.quantity_box_or_pack}
          onChange={(e) =>
            onChange(
              index,
              'quantity_box_or_pack',
              e.target.value ? parseInt(e.target.value) : ''
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="0"
        />
      </div>

      {/* Receiver/Sender */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          {isExport ? 'ผู้ส่ง' : 'ผู้รับ'}
        </label>
        <input
          type="text"
          value={values.receiver_or_sender}
          onChange={(e) => onChange(index, 'receiver_or_sender', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="ชื่อ"
        />
      </div>

      {/* Note */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          หมายเหตุ
        </label>
        <input
          type="text"
          value={values.note}
          onChange={(e) => onChange(index, 'note', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="ไม่บังคับ"
        />
      </div>

      {/* Remove Button */}
      <div className="flex items-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(index)}
          className="px-3 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition"
        >
          ลบ
        </motion.button>
      </div>
    </motion.div>
  );
}
