"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Integrata ERP <br />
            <span className="text-blue-600">Smart, Scalable, Seamless</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Kelola bisnis Anda dengan satu platform terpadu.
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Start Free Trial
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300">
              See Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            {/* Placeholder Gambar Dashboard ERP */}
            <span className="text-gray-500">[Mockup Dashboard]</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
