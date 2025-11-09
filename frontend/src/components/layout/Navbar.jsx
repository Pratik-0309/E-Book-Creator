import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileDropDown from "../layout/Profiledropdown.jsx";
import { Menu, X, BookOpen, LogOut } from "Lucide-react";

function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropDownOpen) {
        setProfileDropDownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropDownOpen]);

  return (
   <header className="sticky top-0 bg-white border-b border-gray-100 shadow-md z-30">
    <nav className="container mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
            <BookOpen size={30} className="text-blue-600" />
            <a href="/" className="text-xl font-extrabold text-gray-800 hover:text-blue-700 transition duration-150">
                E-Book Creator
            </a>
        </div>

        {/* Center: Navigation Links (hidden on small screens) */}
        <ul className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
                <li key={link.name}>
                    <a
                        href={link.href}
                        // NEW Hover Effect: Brighter text and subtle background change
                        className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50"
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>

        {/* Auth Button & Profile */}
        <div className="flex items-center space-x-4">
            {isAuthenticated ? (
                <div id="profile-dropdown-container">
                    <ProfileDropDown
                        isOpen={profileDropDownOpen}
                        onToggle={(e) => {
                            e.stopPropagation(); // prevent document click close
                            setProfileDropDownOpen(!profileDropDownOpen);
                        }}
                        avatar={user?.avatar || ""}
                        companyName={user?.name || ""}
                        email={user?.email || ""}
                        userRole={user?.role || "User"}
                        onLogout={() => console.log("logout")}
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
</header>
  );
}

export default Navbar;
