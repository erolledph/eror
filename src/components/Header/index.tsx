"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        <div
          className={`flex items-center justify-between ease-out duration-200 ${
            stickyMenu ? "py-4" : "py-6"
          }`}
        >
          {/* Logo */}
          <Link className="flex-shrink-0" href="/">
            <div className="text-2xl font-bold text-blue">TechMart</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="hover:text-blue text-custom-sm font-medium text-dark transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden block"
            onClick={() => setNavigationOpen(!navigationOpen)}
            aria-label="Toggle navigation"
          >
            <span className="block relative cursor-pointer w-5.5 h-5.5">
              <span className="block absolute right-0 w-full h-full">
                <span
                  className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                    !navigationOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                    !navigationOpen && "!w-full delay-400"
                  }`}
                ></span>
                <span
                  className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                    !navigationOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>

              <span className="block absolute right-0 w-full h-full rotate-45">
                <span
                  className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                    !navigationOpen && "!h-0 delay-[0] "
                  }`}
                ></span>
                <span
                  className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                    !navigationOpen && "!h-0 dealy-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          {/* Mobile Navigation */}
          <div
            className={`w-[288px] absolute right-4 top-full xl:hidden ${
              navigationOpen
                ? "visible bg-white shadow-lg border border-gray-3 h-auto max-h-[400px] overflow-y-scroll rounded-md p-5"
                : "invisible h-0"
            }`}
          >
            <nav>
              <ul className="flex flex-col gap-5">
                {menuItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="hover:text-blue text-custom-sm font-medium text-dark block"
                      onClick={() => setNavigationOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;