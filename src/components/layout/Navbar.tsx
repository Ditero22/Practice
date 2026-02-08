// src/components/Navbar.tsx
import { Bell, Search, User, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLoggedUser } from "@/hooks/fakeAuth";

interface NavbarProps {
  hideExtras?: boolean; // hide logo/search/bell/user
  toggleSidebar?: () => void; // for mobile hamburger
}

const Navbar: React.FC<NavbarProps> = ({ hideExtras = false, toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getLoggedUser(); // check if logged in

  const isLanding = location.pathname === "/";

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        {!hideExtras && (
          <div
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            LOGO
          </div>
        )}

        {/* Desktop Menu */}
        {!hideExtras && (
          <div className="hidden md:flex items-center gap-6">

            {/* Search */}
            <div className="flex items-center border rounded-lg px-3 py-1">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none ml-2"
              />
            </div>

            {/* Notification */}
            <Bell className="cursor-pointer hover:text-blue-500" />

            {/* User */}
            <User className="cursor-pointer hover:text-blue-500" />
          </div>
        )}

        {/* Login Button (only if not logged in) */}
        {!user && isLanding && (
          <button
            className="ml-4 px-4 py-1 rounded text-white bg-green-500"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {/* Mobile Hamburger */}
        {!hideExtras && (
          <Menu
            className="md:hidden cursor-pointer ml-4"
            onClick={toggleSidebar ? toggleSidebar : () => setOpen(!open)}
          />
        )}
      </div>

      {/* Mobile Dropdown for extra menu */}
      {open && !hideExtras && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-3 py-2"
          />
          <button className="flex items-center gap-2">
            <Bell size={18} /> Notifications
          </button>
          <button className="flex items-center gap-2">
            <User size={18} /> Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
