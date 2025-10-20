"use client";

import { motion } from "framer-motion";

export default function DemoPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-full max-w-md h-80 bg-gray-200 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-gray-500">[Mockup Dashboard ERP]</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Lihat Integrata ERP Beraksi
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Dengan dashboard intuitif, Anda dapat memantau keuangan, inventori,
            karyawan, dan laporan bisnis dalam satu layar. Semuanya lebih cepat
            dan efisien.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Coba Demo Gratis
          </button>
        </motion.div>
      </div>
    </section>
  );
}
