"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "Rp 299.000/bulan",
    features: ["1 User", "Modul Akuntansi", "Support via Email"],
  },
  {
    name: "Standard",
    price: "Rp 599.000/bulan",
    features: ["5 Users", "Inventory + HR", "Priority Support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited Users", "All Modules", "Dedicated Support"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Paket Harga</h2>
        <p className="text-gray-600 mt-2">
          Pilih paket yang sesuai dengan kebutuhan bisnis Anda
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`p-8 border rounded-2xl shadow transition hover:shadow-lg ${
                plan.highlight ? "bg-blue-600 text-white scale-105" : "bg-white"
              }`}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p
                className={`mt-4 text-xl font-semibold ${
                  plan.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {plan.price}
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {plan.features.map((f, idx) => (
                  <li key={idx}>✅ {f}</li>
                ))}
              </ul>
              <button
                className={`mt-6 px-6 py-3 rounded-lg font-medium w-full transition ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
