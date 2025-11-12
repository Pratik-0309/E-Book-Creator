import React from "react";
import { useState, useEffect, useRef } from "react"; // <-- Import useRef
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileDropDown from "../layout/Profiledropdown.jsx";
import { Menu, X, BookOpen, LogOut } from "Lucide-react"; 

function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);
  const dropdownRef = useRef(null); // <-- Ref for the dropdown container

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  useEffect(() => {
    // 🛠️ FIX: Close dropdown only if the click is OUTSIDE the container
    const handleClickOutside = (event) => {
      // Check if the dropdown is open AND if the click target is NOT inside the ref's current element
      if (profileDropDownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropDownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside); // Use mousedown for better compatibility
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropDownOpen]);

  // Helper function to close the menu on link click
  const closeMenu = () => setIsOpen(false);

  // Helper function for logout (use onLogout prop in ProfileDropDown)
  const handleLogout = () => {
    console.log("Logout initiated");
    // You would typically call a logout function from your AuthContext here:
    // logout(); 
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 shadow-md z-30">
      <nav className="container mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <BookOpen size={30} className="text-blue-600" />
          <a
            href="/"
            className="text-xl font-extrabold text-gray-800 hover:text-blue-700 transition duration-150"
          >
            E-Book Creator
          </a>
        </div>

        {/* Center: Navigation Links (hidden on small screens) */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={closeMenu} // Close menu on click
                className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Auth Button & Profile */}
        <div className="flex items-center space-x-4">
          {/* Desktop/Tablet (md breakpoint and up) */}
          {isAuthenticated ? (
            <div ref={dropdownRef} className="hidden md:block"> 
              <ProfileDropDown
                isOpen={profileDropDownOpen}
                onToggle={() => setProfileDropDownOpen(!profileDropDownOpen)}
                avatar={user?.avatar || ""}
                companyName={user?.name || "User"}
                email={user?.email || "user@example.com"}
                onLogout={handleLogout} // Use the new handler
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get Started
              </a>
            </div>
          )}
          {/* Mobile menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="text-gray-700" size={24} />
            ) : (
              <Menu className="text-gray-700" size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 px-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                {link.name}
              </a>
            </li>
          ))}

          {/* Mobile Auth/Profile Links - Simplified for mobile */}
          <li className="pt-2 border-t border-gray-100 mt-2">
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <a
                  href="/login"
                  onClick={closeMenu}
                  className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150 text-center"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  onClick={closeMenu}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 text-center shadow-md"
                >
                  Get Started
                </a>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogout(); // Use the handler
                  closeMenu();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition duration-150"
              >
                <LogOut size={18} /> <span>Logout</span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;