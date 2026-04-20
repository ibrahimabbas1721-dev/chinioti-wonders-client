import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-amber-900 text-white shadow-md sticky top-0 z-40">
      
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo1.png"
            alt="Chinioti Wonders"
            className="h-14 md:h-16 w-40 object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-amber-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" className="hover:text-amber-300 transition">
              Catalog
            </Link>
          </li>
          <li>
            <a href="#about" className="hover:text-amber-300 transition">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-amber-300 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-amber-800 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-amber-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-amber-300">
              Catalog
            </Link>
          </li>
          <li>
            <a href="#about" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-amber-300">
              About
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-amber-300">
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}