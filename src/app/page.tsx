'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const cards = [
    {
      icon: '📦',
      title: 'รับสินค้า',
      description: 'บันทึกการรับสินค้า',
      href: '/import',
      color: 'from-black to-gray-800',
    },
    {
      icon: '📤',
      title: 'ส่งสินค้า',
      description: 'บันทึกการส่งสินค้า',
      href: '/export',
      color: 'from-gray-800 to-gray-600',
    },
    {
      icon: '📊',
      title: 'สถิติ',
      description: 'ดูข้อมูลการรับสินค้า ส่งสินค้า และคลังสินค้า',
      href: '/statistics',
      color: 'from-gray-600 to-gray-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-6xl mb-4"
          >
            ☕
          </motion.div>
          <h1 className="text-4xl font-bold text-black mb-4">
            Coffee Stock Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ระบบจัดการคลังสินค้ากาแฟแบบมืออาชีพ สำหรับติดตามการรับ ส่ง และวิเคราะห์สินค้า
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              whileHover={{ y: -10 }}
            >
              <Link href={card.href}>
                <div
                  className={`h-full p-6 rounded-lg bg-gradient-to-br ${card.color} text-white cursor-pointer transition-shadow hover:shadow-xl`}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                  <p className="text-gray-100 text-sm">{card.description}</p>
                  <motion.div
                    className="mt-4 inline-block"
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-semibold text-sm">→ Go →</span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-6 bg-gray-50 rounded-lg text-center"
        >
          <h3 className="text-lg font-semibold text-black mb-2">ยินดีต้อนรับ!</h3>
          <p className="text-gray-600">
            เลือกหนึ่งในไฟล์เมนูข้างต้นเพื่อเริ่มต้นจัดการคลังสินค้ากาแฟของคุณ
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
