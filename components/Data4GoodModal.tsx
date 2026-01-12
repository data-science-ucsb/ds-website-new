"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Data4GoodModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown in this session
    const hasSeenModal = sessionStorage.getItem("data4good-modal-seen");
    
    if (!hasSeenModal) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("data4good-modal-seen", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto border-4 border-blue-500">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Logo */}
                <div className="relative w-32 h-32">
                  <Image
                    src="/datathon2026logo.jpg"
                    alt="Data Science UCSB Logo"
                    fill
                    className="object-contain animate-pulse-slow"
                  />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Interested in Data4Good?
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base">
                  Join us for our annual datathon! Apply your data science skills to solve real-world problems for social good.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href="https://datathon.datascienceucsb.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Visit Website
                  </a>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-all duration-300"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}