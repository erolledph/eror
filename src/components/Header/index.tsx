"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
  ];

  // SVG Logo Component
  const TechMartLogo = () => (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3C50E0" />
              <stop offset="100%" stopColor="#1C3FB7" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="20" fill="url(#logoGradient)" />
          
          {/* Tech circuit pattern */}
          <path
            d="M12 16H16V12H24V16H28V20H24V28H16V20H12V16Z"
            fill="white"
            fillOpacity="0.9"
          />
          <circle cx="16" cy="16" r="1.5" fill="white" />
          <circle cx="24" cy="16" r="1.5" fill="white" />
          <circle cx="20" cy="24" r="1.5" fill="white" />
          
          {/* Corner accents */}
          <path d="M8 8L12 8L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M32 8L28 8L28 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M8 32L12 32L12 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M32 32L28 32L28 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue to-blue-dark bg-clip-text text-transparent tracking-tight">
          TechMart
        </span>
        <span className="text-xs font-medium text-dark-4 tracking-wider uppercase -mt-1">
          Premium Tech
        </span>
      </div>
    </div>
  );
  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white/95 backdrop-blur-md border-b border-gray-2/50 transition-all ease-in-out duration-300 ${
        stickyMenu ? "shadow-lg bg-white/98" : "shadow-sm"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div
          className={`flex items-center justify-between transition-all ease-out duration-300 ${
            stickyMenu ? "py-4" : "py-5"
          }`}
        >
          {/* Logo */}
          <Link className="flex-shrink-0 group" href="/">
            <div className="transform transition-transform duration-200 group-hover:scale-105">
              <TechMartLogo />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-10">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="relative text-base font-semibold text-dark hover:text-blue transition-all duration-300 tracking-wide uppercase text-sm group"
                  >
                    <span className="relative z-10">{item.title}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue to-blue-dark transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden xl:flex items-center gap-4">
            <Link
              href="/products"
              className="bg-gradient-to-r from-blue to-blue-dark text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue/25 transform hover:scale-105 transition-all duration-200 text-sm tracking-wide"
            >
              Shop Now
            </Link>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden block p-2 rounded-lg hover:bg-gray-1 transition-colors duration-200"
            onClick={() => setNavigationOpen(!navigationOpen)}
            aria-label="Toggle navigation"
          >
            <span className="block relative cursor-pointer w-6 h-6">
              <span className="block absolute right-0 w-full h-full">
                <span
                  className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1.5 ease-in-out duration-200 delay-[0] ${
                    !navigationOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1.5 ease-in-out duration-200 delay-150 ${
                    !navigationOpen && "!w-full delay-400"
                  }`}
                ></span>
                <span
                  className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1.5 ease-in-out duration-200 delay-200 ${
                    !navigationOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>

              <span className="block absolute right-0 w-full h-full rotate-45">
                <span
                  className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-3 top-0 w-0.5 h-full ${
                    !navigationOpen && "!h-0 delay-[0] "
                  }`}
                ></span>
                <span
                  className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-3 w-full h-0.5 ${
                    !navigationOpen && "!h-0 dealy-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          {/* Mobile Navigation */}
          <div
            className={`w-[320px] absolute right-4 top-full xl:hidden ${
              navigationOpen
                ? "visible bg-white/95 backdrop-blur-md shadow-xl border border-gray-3/50 h-auto max-h-[400px] overflow-y-scroll rounded-xl p-6"
                : "invisible h-0"
            }`}
          >
            <nav>
              <ul className="flex flex-col gap-6">
                {menuItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="hover:text-blue text-base font-semibold text-dark block py-2 px-3 rounded-lg hover:bg-blue/5 transition-all duration-200 tracking-wide uppercase text-sm"
                      onClick={() => setNavigationOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-3">
                  <Link
                    href="/products"
                    className="bg-gradient-to-r from-blue to-blue-dark text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue/25 transform hover:scale-105 transition-all duration-200 text-sm tracking-wide block text-center"
                    onClick={() => setNavigationOpen(false)}
                  >
                    Shop Now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;