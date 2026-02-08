// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1A1A1A] text-[#F4F4F4] py-6">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm font-poppins">
        © {new Date().getFullYear()} Dental Clinic. Created by Karl Diether Ortega.
      </div>
    </footer>
  );
};

export default Footer;
