// components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "CEO PT Maju Jaya",
    message:
      "Integrata ERP benar-benar membantu perusahaan kami mengelola keuangan dan inventori dengan lebih efisien. Sangat direkomendasikan!",
  },
  {
    name: "Siti Rahma",
    role: "HR Manager CV Sejahtera",
    message:
      "Modul HR & Payroll-nya sangat mempermudah pengelolaan karyawan. User friendly dan hemat waktu.",
  },
  {
    name: "Andi Pratama",
    role: "Owner Toko Sukses",
    message:
      "Laporan real-time membuat saya bisa mengambil keputusan bisnis dengan lebih cepat dan akurat.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Apa Kata Pengguna Kami
        </h2>
        <p className="mt-2 text-gray-600">
          Beberapa pengalaman dari pengguna Integrata ERP
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 border rounded-xl shadow hover:shadow-lg bg-gray-50"
            >
              <p className="text-gray-700 italic">“{t.message}”</p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
