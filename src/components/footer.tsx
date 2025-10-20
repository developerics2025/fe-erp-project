"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-400 py-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg">Integrata ERP</h3>
          <p className="mt-4 text-sm">
            Solusi ERP terpadu untuk membantu bisnis Anda tumbuh lebih cepat dan
            efisien.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold">Follow Us</h4>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-white">
              🌐
            </a>
            <a href="#" className="hover:text-white">
              🐦
            </a>
            <a href="#" className="hover:text-white">
              💼
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Integrata ERP. All rights reserved.
      </div>
    </motion.footer>
  );
}
