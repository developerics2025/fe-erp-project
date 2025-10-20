"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 bg-blue-600 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold">
          Mulai transformasi bisnis Anda bersama Integrata ERP
        </h2>
        <p className="mt-4 text-lg">
          Sederhanakan manajemen, percepat pertumbuhan, dan buat keputusan lebih
          tepat dengan satu platform terpadu.
        </p>
        <button className="mt-6 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow hover:bg-gray-100 transition">
          Get Started Free
        </button>
      </motion.div>
    </section>
  );
}
