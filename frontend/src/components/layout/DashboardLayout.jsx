import { useEffect, useState } from "react";
import { Album, LogOut } from "Lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Profiledropdown from "../layout/Profiledropdown";

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const [ProfiledropdownOpen, setProfiledropdownOpen] = useState(false);

  // Close Dropdown when Clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (ProfiledropdownOpen) {
        setProfiledropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ProfiledropdownOpen]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col ">
        <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-30">
          <div className="flex items-center justify-between h-16 px-4 mx-auto w-full max-w-[1400px]">
            {/* Left side - Logo */}
            <Link className="flex items-center space-x-3" to="/dashboard">
              <div className="h-9 w-9 bg-linear-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Album className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 text-xl font-extrabold hover:text-blue-700 transition duration-150 text-[22px] tracking-tight">
                AI eBook Creator
              </span>
            </Link>

            {/* Right side - Profile */}
            <Profiledropdown
              isOpen={ProfiledropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfiledropdownOpen(!ProfiledropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
