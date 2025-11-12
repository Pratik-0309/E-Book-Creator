import React from "react";
import { ChevronDown } from "Lucide-react";
import { useNavigate } from "react-router-dom";

const Profiledropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative inline-block text-left">
      {/* Button: Flex layout, hover effect, rounded corners */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {/* Avatar/Fallback */}
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-lg font-semibold text-white">
            <span className="">{companyName.charAt(0).toUpperCase()}</span>
          </div>
        )}

        {/* Text Container: Hidden on smaller screens (optional) */}
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-gray-900">{companyName}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>

        {/* Chevron Icon: Animated based on 'isOpen' state */}
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu: Absolute positioning, styling for shadow and border */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {/* User Info (Header) */}
          <div className="px-4 py-3">
            <p className="truncate text-sm font-medium text-gray-900">
              {companyName}
            </p>
            <p className="truncate text-sm text-gray-500">{email}</p>
          </div>

          {/* Menu Item: View Profile */}
          <div className="py-1">
            <a
              onClick={() => {
                navigate("/api/auth/profile");
                onToggle(); // Close dropdown after clicking
              }}
              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              View Profile
            </a>
          </div>

          {/* Menu Item: Sign Out */}
          <div className="py-1">
            <a
              onClick={() => {
                onLogout();
                onToggle(); // Close dropdown after clicking
              }}
              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href="#"
              role="menuitem"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profiledropdown;
