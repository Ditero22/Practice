// src/components/layout/Sidebar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

interface Link {
  label: string;
  path: string;
}

interface SidebarProps {
  links: Link[];
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ links, mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedUser"); // remove user from local storage
    navigate("/"); // go to landing page
    setMobileOpen(false); // close mobile sidebar if open
  };

  const SidebarLinks = () => (
    <div className="flex flex-col flex-1">
      <nav className="flex flex-col space-y-4 flex-1">
        {links.map((link) => (
          <button
            key={link.path}
            className="text-left px-3 py-2 rounded hover:bg-[#A0522D] hover:text-[#1A1A1A] transition-colors"
            onClick={() => {
              navigate(link.path);
              setMobileOpen(false);
            }}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Logout at the bottom */}
      <button
        className="mt-auto flex items-center gap-2 px-3 py-2 rounded hover:bg-red-500 hover:text-white transition-colors"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#1A1A1A] text-[#F4F4F4] h-screen fixed top-0 left-0 flex flex-col px-4 py-6">
        <div
          className="text-2xl font-bold mb-10 cursor-pointer font-poppins hover:text-[#A0522D] transition-colors"
          onClick={() => navigate("/")}
        >
          Dental Clinic
        </div>
        <SidebarLinks />
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#1A1A1A] text-[#F4F4F4] z-50 flex items-center justify-between px-4 py-3">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Dental Clinic
        </div>
        <Menu className="cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-[#1A1A1A] text-[#F4F4F4] z-50 flex flex-col px-4 py-6 animate-slide-in">
            <div className="flex items-center justify-between mb-10">
              <div
                className="text-2xl font-bold cursor-pointer font-poppins hover:text-[#A0522D] transition-colors"
                onClick={() => {
                  navigate("/");
                  setMobileOpen(false);
                }}
              >
                Dental Clinic
              </div>
              <X className="cursor-pointer" onClick={() => setMobileOpen(false)} />
            </div>
            <SidebarLinks />
          </div>
        </>
      )}

      {/* Tailwind animation for slide-in */}
      <style>
        {`
          @keyframes slide-in {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out forwards;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
