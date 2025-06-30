"use client";

import Link from "next/link";
import {
  MdOutlineStadium,
  MdOutlineDashboard,
  MdOutlineHome,
  MdMenu,
  MdClose,
  MdLogin,
  MdLogout,
  MdOutlineRequestPage,
} from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export const publicLinks = [
  {
    name: "Home",
    path: "/",
    icon: <MdOutlineHome className="text-xl" />,
  },
  {
    name: "Stadiums",
    path: "/stadiums",
    icon: <MdOutlineStadium />,
  },
];

const userLinks = [
  {
    name: "Matches",
    path: "/matches",
    icon: <IoIosFootball className="text-xl" />,
  },
];

const adminLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Stadium",
    path: "/dashboard/stadium",
    icon: <MdOutlineStadium />,
  },
  {
    name: "Requests",
    path: "/dashboard/requests",
    icon: <MdOutlineRequestPage />,
  },
];

const guestLinks = [
  {
    name: "Sign In",
    path: "/signin",
    icon: <MdLogin />,
  },
];

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getNavigationLinks = () => {
    let links = [...publicLinks];

    if (user) {
      // Check user role and add appropriate links
      if (user.role === 'admin' || user.role === 'owner') {
        // Stadium owners get admin links
        links = [...links, ...adminLinks];
      } else {
        // Regular users get user links
        links = [...links, ...userLinks];
      }
    } else {
      // User is not authenticated - show guest links
      links = [...links, ...guestLinks];
    }

    return links;
  };

  const navigationLinks = getNavigationLinks();

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-50">
        <nav className="h-full bg-black/30 backdrop-blur-md border-r border-white/10 p-4">
          {/* Logo/Brand */}
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold text-white">Easy Foot</h2>
            <p className="text-sm text-white/60">Stadium Manager</p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group ${
                    pathname === link.path ? "bg-white/10" : ""
                  }`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom Section */}
          <div className="absolute bottom-4 left-4 right-4">
            {/* Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500/80 hover:text-red-500 bg-red-500/10 hover:bg-red-500/15 transition-all cursor-pointer duration-200 group mb-2"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  <MdLogout />
                </span>
                <span className="font-medium">Sign out</span>
              </button>
            )}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-white/60 mb-1">Quick Stats</p>
              <p className="text-sm text-white font-medium">
                {user?.role === 'admin' || user?.role === 'owner' 
                  ? '5 Active Bookings' 
                  : '3 Upcoming Matches'
                }
              </p>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Header - Visible only on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-lg font-bold text-white">Easy Foot</h2>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 p-4">
            <ul className="flex flex-col gap-2">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 group ${
                      pathname === link.path ? "bg-white/10" : ""
                    }`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500/80 hover:text-red-500 bg-red-500/10 hover:bg-red-500/15 transition-all cursor-pointer duration-200 group mb-2 mt-4"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  <MdLogout />
                </span>
                <span className="font-medium">Sign out</span>
              </button>
            )}

            {/* Mobile Quick Stats */}
            <div className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-white/60 mb-1">Quick Stats</p>
              <p className="text-sm text-white font-medium">
                {user?.role === 'admin' || user?.role === 'owner' 
                  ? '5 Active Bookings' 
                  : '3 Upcoming Matches'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;