import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-red-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          DealManager
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 absolute md:static bg-red-600 md:bg-transparent left-0 top-16 w-full md:w-auto px-4 py-2 md:p-0`}
        >
          {user ? (
            <>
              {user.role === "Seller" && (
                <Link to="/seller/dashboard" className="hover:underline">
                  Seller Dashboard
                </Link>
              )}
              {user.role === "Buyer" && (
                <Link to="/buyer/dashboard" className="hover:underline">
                  Buyer Dashboard
                </Link>
              )}
              <Link to="/deals" className="hover:underline">
                My Deals
              </Link>
              <Link to="/chats" className="hover:underline">
                Chats
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
