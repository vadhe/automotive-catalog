"use client";

import { Heart, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/constants/menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(3);
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLinkClick(label: string) {
    setActiveLink(label);
    setMobileMenuOpen(false);
  }
  const getMenuListItemStyle = (isActive: boolean) => {
    return cn(
      "py-3.5 text-sm transition-colors duration-150",
      isActive
        ? "text-brand-deep font-semibold"
        : "text-text-muted hover:text-brand-deep",
    );
  };
  const getNavLinkStyle = (isActive: boolean) => {
    return cn(
      "text-sm transition-colors duration-150",
      isActive
        ? "text-brand-deep font-medium"
        : "text-text-muted hover:text-brand-deep font-normal",
    );
  };
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-brand font-bold text-xl tracking-tight shrink-0"
          >
            FakeStore
          </Link>
          <nav className="hidden md:flex items-center gap-7 ml-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                className={getMenuListItemStyle(activeLink === link.label)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5 ml-auto">
            <button
              type="button"
              aria-label="Search"
              className="text-gray-500 hover:text-brand transition-colors duration-150"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="text-gray-500 hover:text-brand transition-colors duration-150"
            >
              <User size={18} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="relative text-gray-500 hover:text-brand transition-colors duration-150"
            >
              <Heart size={18} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-4 h-4 flex items-center justify-center rounded-full bg-brand-accent text-white text-[10px] font-semibold leading-none px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4 ml-auto">
            <button
              type="button"
              aria-label="Search"
              className="text-gray-500 hover:text-brand transition-colors duration-150"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              aria-label="Wishlist"
              className="relative text-gray-500 hover:text-brand transition-colors duration-150"
            >
              <Heart size={20} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-4 h-4 flex items-center justify-center rounded-full bg-brand text-white text-[10px] font-semibold leading-none px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-gray-500 hover:text-brand transition-colors duration-150"
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.8} />
              ) : (
                <Menu size={22} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/25"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-white shadow-lg">
            <nav className="max-w-7xl mx-auto px-6 py-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  className={getNavLinkStyle(activeLink === link.label)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
