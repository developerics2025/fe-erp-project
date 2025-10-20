"use client";

import { motion } from "framer-motion";

export default function MotionExample() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-10 bg-blue-600 text-white rounded-2xl shadow-xl text-center"
      >
        <h2 className="text-3xl font-bold">Framer Motion</h2>
        <p className="mt-4">
          Animasi UI sederhana, smooth, langsung React-friendly
        </p>
      </motion.div>
    </section>
  );
}
