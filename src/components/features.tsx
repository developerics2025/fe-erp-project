"use client";

import { motion } from "framer-motion";

const features = [
  { title: "Akuntansi", desc: "Kelola laporan keuangan lebih efisien." },
  { title: "Inventory", desc: "Pantau stok barang secara real-time." },
  { title: "HR & Payroll", desc: "Kelola karyawan dan gaji dengan mudah." },
  { title: "Analytics", desc: "Data & laporan bisnis yang terukur." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Mengapa Integrata ERP?
        </h2>
        <p className="text-gray-600 mt-2">Solusi lengkap untuk bisnis Anda.</p>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
