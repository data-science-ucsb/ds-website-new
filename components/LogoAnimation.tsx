"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LogoAnimation() {
  return (
    <div className="logo-animation-container">
      <div className="logo">
        <motion.img
          src="/logo.png"
          alt="Logo Animation"
          className="logo-image"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </div>
  );
}
