'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useLayoutEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lazy initialization to prevent FOUC
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // useLayoutEffect runs synchronously before browser paint
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image
            src="/kc_logo.png"
            alt="K&C Logistics"
            width={80}
            height={80}
            priority
          />
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="navLinks">
          <li>
            <Link href="/#home" className="nav-link" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link href="/#about" className="nav-link" onClick={closeMobileMenu}>About</Link>
          </li>
          <li>
            <Link href="/#services" className="nav-link" onClick={closeMobileMenu}>Services</Link>
          </li>
          <li>
            <Link href="/#contact" className="contact-btn" onClick={closeMobileMenu}>Contact</Link>
          </li>
        </ul>

        <div className="nav-right">
          <Link href="tel:7145882005" className="emergency-call-btn">
            <i className="fas fa-phone-alt"></i>
            <span className="emergency-text">Emergency Call?</span>
          </Link>
          <button
            className="theme-toggle"
            id="themeToggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
