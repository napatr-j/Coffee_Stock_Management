'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FormRow } from '@/components/FormRow';
import { createCoffeeOut } from '@/actions/coffeeActions';
import { CoffeeQuantity } from '@prisma/client';

export default function ExportPage() {
  const router = useRouter();
  const [products, setProducts] = useState<CoffeeQuantity[]>([]);
  type Row = {
    product_id: number | '';
    quantity_pack: number | '';
    quantity_box: number | '';
    supplier: string;
    note: string;
  };

  const [rows, setRows] = useState<Row[]>([
    {
      product_id: '',
      quantity_pack: '',
      quantity_box: '',
      supplier: '',
      note: '',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        product_id: '',
        quantity_pack: '',
        quantity_box: '',
        supplier: '',
        note: '',
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      [field]: value,
    };
    setRows(newRows);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const validRows = rows.filter(
        (row) =>
          row.product_id &&
          (row.quantity_pack || row.quantity_box) &&
          row.supplier
      );

      if (validRows.length === 0) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const formattedData = validRows.map((row) => ({
        product_id: row.product_id,
        quantity_pack: row.quantity_pack ? parseInt(row.quantity_pack.toString()) : 0,
        quantity_box: row.quantity_box ? parseInt(row.quantity_box.toString()) : 0,
        supplier: row.supplier,
        note: row.note || undefined,
      }));

      const result = await createCoffeeOut(formattedData);

      if (result.success) {
        setSuccess('นำสินค้าออกสำเร็จ!');
        setTimeout(() => {
          router.push('/statistics');
        }, 1500);
      } else {
        setError(result.error || 'Failed to export');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-24 pb-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-black mb-2">ส่งสินค้า</h1>
          <p className="text-gray-600">บันทึกการส่งสินค้า</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-300"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-100 text-green-700 rounded-lg border border-green-300"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Rows */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {rows.map((row, index) => (
                <FormRow
                  key={`${index}`}
                  index={index}
                  products={products}
                  onRemove={handleRemoveRow}
                  onChange={handleChange}
                  values={row}
                  isExport={true}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Add Row Button */}
          <motion.button
            type="button"
            onClick={handleAddRow}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
          >
            + เพิ่มรายการ
          </motion.button>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'กำลังบันทึก...' : 'บันทึกการส่งสินค้า'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
