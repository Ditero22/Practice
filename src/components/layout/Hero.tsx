import React from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "@/hooks/fakeAuth";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const user = getLoggedUser(); // check if user is logged in

  const handleClick = () => {
    if (user) {
      navigate("/dashboard"); // if logged in, go to dashboard
    } else {
      navigate("/login"); // if not logged in, go to login
    }
  };

  return (
    <section className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center text-white px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 -z-10"></div>

      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        Dental Clinic Management System
      </h1>

      <p className="text-lg md:text-2xl mb-6">
        Smooth, liquid-like animated hero background
      </p>

      <button
        onClick={handleClick}
        className="bg-[#A0522D] text-[#F4F4F4] px-6 py-3 rounded-lg font-poppins hover:bg-[#8B3E1B] transition-colors"
      >
        Go to Dashboard
      </button>
    </section>
  );
};

export default Hero;
