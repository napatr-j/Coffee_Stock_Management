'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/import', label: 'รับสินค้า' },
    { href: '/export', label: 'ส่งสินค้า' },
    { href: '/statistics', label: 'stock' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-8"
          >
            <Link href="/" className="text-sm font-bold hover:text-gray-300 transition">
              <div>บริษัท ทริลเลียนอิเทอร์นิตี้ จำกัด</div>
              <div className="text-xs">Trillion Eternity</div>
            </Link>
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-sm font-medium hover:text-gray-300 transition"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
