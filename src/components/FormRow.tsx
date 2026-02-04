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
    quantity_box_or_pack?: number | '';
    quantity_pack?: number | '';
    quantity_box?: number | '';
    receiver_or_sender?: string;
    supplier?: string;
    po_no?: string;
    note: string;
  };
  isExport?: boolean;
  showPoNo?: boolean;
}

export function FormRow({
  index,
  products,
  onRemove,
  onChange,
  values,
  isExport = false,
  showPoNo = false,
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

      {/* Quantity - For Import: boxes, For Export: packs + boxes */}
      {!isExport ? (
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            จำนวน (กล่อง)
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
      ) : (
        <>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              จำนวน (แพ็ก)
            </label>
            <input
              type="number"
              min="0"
              value={values.quantity_pack}
              onChange={(e) =>
                onChange(
                  index,
                  'quantity_pack',
                  e.target.value ? parseInt(e.target.value) : ''
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="0"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              จำนวน (กล่อง)
            </label>
            <input
              type="number"
              min="0"
              value={values.quantity_box}
              onChange={(e) =>
                onChange(
                  index,
                  'quantity_box',
                  e.target.value ? parseInt(e.target.value) : ''
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="0"
            />
          </div>
        </>
      )}

      {/* P/O NO - แสดงเฉพาะ import */}
      {showPoNo && (
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            P/O NO.
          </label>
          <input
            type="text"
            value={values.po_no || ''}
            onChange={(e) => onChange(index, 'po_no', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="P/O NO."
          />
        </div>
      )}

      {/* Receiver/Sender (Supplier for export) */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          {isExport ? 'ผู้ส่งออก' : 'ผู้รับ'}
        </label>
        <input
          type="text"
          value={values.receiver_or_sender || values.supplier || ''}
          onChange={(e) => onChange(index, isExport ? 'supplier' : 'receiver_or_sender', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          placeholder={isExport ? 'ผู้ส่งออก' : 'ชื่อ'}
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
