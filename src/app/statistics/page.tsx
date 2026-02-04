'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoffeeInTable } from '@/components/CoffeeInTable';
import { CoffeeOutTable } from '@/components/CoffeeOutTable';
import { InventoryTable } from '@/components/InventoryTable';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import {
  getCoffeeInHistory,
  getCoffeeOutHistory,
  getCurrentInventory,
  getMonthlyTimeSeries,
} from '@/actions/coffeeActions';
import { exportToExcel } from '@/lib/excelExport';
import { CoffeeQuantity } from '@prisma/client';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#DDDDDD', '#EEEEEE'];

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState<'in' | 'out' | 'inventory' | 'charts'>('in');
  const [coffeeInData, setCoffeeInData] = useState([]);
  const [coffeeOutData, setCoffeeOutData] = useState([]);
  const [inventoryData, setInventoryData] = useState<CoffeeQuantity[]>([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<CoffeeQuantity[]>([]);

  // Filter states
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0); // 0 = all months
  const [selectedProduct, setSelectedProduct] = useState(0);

  useEffect(() => {
    fetchAllData();
  }, [year, month, selectedProduct]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch products first
      const prodResponse = await fetch('/api/products');
      const prodData = await prodResponse.json();
      if (prodData.success) {
        setProducts(prodData.data);
      }

      const filters: any = { year };
      if (month > 0) filters.month = month;
      if (selectedProduct > 0) filters.productId = selectedProduct;

      const [inResult, outResult, invResult, chartResult] = await Promise.all([
        getCoffeeInHistory(filters),
        getCoffeeOutHistory(filters),
        getCurrentInventory(),
        getMonthlyTimeSeries(year),
      ]);

      if (inResult.success) setCoffeeInData(inResult.data);
      if (outResult.success) setCoffeeOutData(outResult.data);
      if (invResult.success) setInventoryData(invResult.data);
      if (chartResult.success) setChartData(chartResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCoffeeIn = async () => {
    const exportData = coffeeInData.map((item: any) => ({
      'วันที่': new Date(item.date_in).toLocaleDateString('th-TH'),
      'สินค้า': item.product?.name || 'N/A',
      'กล่อง': item.quantity_box,
      'แพ็ก': item.quantity_pack,
      'ผู้รับ': item.receiver,
      'หมายเหตุ': item.note || '-',
    }));

    await exportToExcel(exportData, `coffee_in_${year}${month ? `_${month}` : ''}`, [
      { header: 'วันที่', key: 'วันที่', width: 15 },
      { header: 'สินค้า', key: 'สินค้า', width: 20 },
      { header: 'กล่อง', key: 'กล่อง', width: 10 },
      { header: 'แพ็ก', key: 'แพ็ก', width: 10 },
      { header: 'ผู้รับ', key: 'ผู้รับ', width: 15 },
      { header: 'หมายเหตุ', key: 'หมายเหตุ', width: 20 },
    ]);
  };

  const handleExportCoffeeOut = async () => {
    const exportData = coffeeOutData.map((item: any) => ({
      'วันที่': new Date(item.date_out).toLocaleDateString('th-TH'),
      'สินค้า': item.product?.name || 'N/A',
      'แพ็ก': item.quantity_pack,
      'ผู้ส่ง': item.sender,
      'หมายเหตุ': item.note || '-',
    }));

    await exportToExcel(exportData, `coffee_out_${year}${month ? `_${month}` : ''}`, [
      { header: 'วันที่', key: 'วันที่', width: 15 },
      { header: 'สินค้า', key: 'สินค้า', width: 20 },
      { header: 'แพ็ก', key: 'แพ็ก', width: 10 },
      { header: 'ผู้ส่ง', key: 'ผู้ส่ง', width: 15 },
      { header: 'หมายเหตุ', key: 'หมายเหตุ', width: 20 },
    ]);
  };

  const handleExportInventory = async () => {
    const exportData = inventoryData.map((item) => ({
      'สินค้า': item.name,
      'แพ็กเหลือ': item.quantity_pack,
      'ต่อ 1 กล่อง': item.pack_per_box,
    }));

    await exportToExcel(exportData, `inventory_${year}`, [
      { header: 'สินค้า', key: 'สินค้า', width: 20 },
      { header: 'แพ็กเหลือ', key: 'แพ็กเหลือ', width: 15 },
      { header: 'ต่อ 1 กล่อง', key: 'ต่อ 1 กล่อง', width: 15 },
    ]);
  };

  const tabs = [
    { id: 'in', label: 'สินค้าเข้า' },
    { id: 'out', label: 'สินค้าออก' },
    { id: 'inventory', label: 'จำนวนสินค้าคงเหลือ' },
    { id: 'charts', label: 'กราฟ' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">สถิติ</h1>
          <p className="text-gray-600">ดูข้อมูลการนำเข้า นำออก และคลังสินค้า</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 bg-gray-100 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ปี</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">เดือน</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value={0}>ทั้งหมด</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  เดือน {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">สินค้า</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value={0}>ทั้งหมด</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold text-sm transition ${
                activeTab === tab.id
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-600 hover:text-black'
              }`}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSkeleton rows={5} />
            </motion.div>
          )}

          {!loading && activeTab === 'in' && (
            <motion.div
              key="in"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex justify-end">
                <motion.button
                  onClick={handleExportCoffeeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                >
                  📥 Export to Excel
                </motion.button>
              </div>
              <CoffeeInTable data={coffeeInData} />
            </motion.div>
          )}

          {!loading && activeTab === 'out' && (
            <motion.div
              key="out"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex justify-end">
                <motion.button
                  onClick={handleExportCoffeeOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                >
                  📥 Export to Excel
                </motion.button>
              </div>
              <CoffeeOutTable data={coffeeOutData} />
            </motion.div>
          )}

          {!loading && activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex justify-end">
                <motion.button
                  onClick={handleExportInventory}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                >
                  📥 Export to Excel
                </motion.button>
              </div>
              <InventoryTable data={inventoryData} />
            </motion.div>
          )}

          {!loading && activeTab === 'charts' && (
            <motion.div
              key="charts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Monthly Chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-black mb-4">การนำเข้าและนำออกรายเดือน</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="in" name="นำเข้า" fill="#000000" />
                    <Bar dataKey="out" name="นำออก" fill="#999999" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Inventory Chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-black mb-4">สินค้าคงเหลือ</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={inventoryData.map((p) => ({
                      name: p.name,
                      quantity: p.quantity_pack,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity" name="แพ็ก" fill="#000000" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
