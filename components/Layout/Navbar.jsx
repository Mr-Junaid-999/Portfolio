"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (data) {
      setUserRole(data.role);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await fetchUserRole(user.id);
      }
    };
    getCurrentUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setUserRole("user");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowProfile(false);
    router.push("/");
    router.refresh();
  };

  const menuItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex shrink-0">
            <Link
              href="/"
              className={`text-2xl font-bold transition-all duration-300 ${
                isScrolled
                  ? "text-gray-800 hover:text-emerald-600"
                  : "text-white hover:text-emerald-200"
              }`}
            >
              Portfolio
            </Link>
          </div>

          {/* Center Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "text-gray-700 hover:text-gray-600 hover:bg-gray-200"
                      : "text-gray-700 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Profile */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isScrolled
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg"
                      : "bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg"
                  }`}
                >
                  <span className="text-sm font-semibold text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {!isScrolled && (
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ) : (
              <div className="flex space-x-3 gap-2">
                <Link
                  href="/#contact"
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-emerald-200 hover:from-emerald-600 hover:to-teal-700"
                      : "bg-white text-emerald-600 shadow-lg hover:bg-emerald-50 hover:shadow-emerald-200"
                  }`}
                >
                  Contact Us
                </Link>
              </div>
            )}

            {/* Profile Dropdown */}
            {showProfile && user && (
              <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl py-2 z-50 border border-gray-100">
                {/* User Info */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-emerald-600 font-medium capitalize bg-emerald-50 px-2 py-1 rounded-full inline-block mt-1">
                        {userRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {userRole === "admin" && (
                    <button
                      onClick={() => {
                        router.push("/admin");
                        setShowProfile(false);
                      }}
                      className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                    >
                      <span className="mr-3">👑</span>
                      <span className="font-medium">Admin Panel</span>
                      <span className="ml-auto bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded-full">
                        Pro
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setShowProfile(false);
                    }}
                    className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                  >
                    <span className="mr-3">👤</span>
                    <span className="font-medium">My Profile</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                  >
                    <span className="mr-3">🚪</span>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>

                {/* Dropdown Arrow */}
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white/95 backdrop-blur-md transform rotate-45 border-t border-l border-gray-100"></div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (Optional) */}
        <div className="md:hidden flex justify-center pt-2 pb-4">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-2xl p-1">
            {menuItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Background Blur Effect */}
      {!isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent -z-10"></div>
      )}
    </nav>
  );
}
