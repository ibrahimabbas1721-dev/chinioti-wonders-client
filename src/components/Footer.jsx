import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../config'
import { STORE_ADDRESS } from '../config'
import { STORE_HOURS } from '../config'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100">

      {/* ── TRUST STRIP ── */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-3 hover:transform hover:scale-105 transition duration-300">
            <span className="text-4xl">🌳</span>
            <p className="text-sm font-bold text-white">100% Solid Wood</p>
            <p className="text-xs text-amber-200">Premium quality guaranteed</p>
          </div>
          <div className="flex flex-col items-center gap-3 hover:transform hover:scale-105 transition duration-300">
            <span className="text-4xl">🚚</span>
            <p className="text-sm font-bold text-white">Nationwide Delivery</p>
            <p className="text-xs text-amber-200">All across Pakistan</p>
          </div>
          <div className="flex flex-col items-center gap-3 hover:transform hover:scale-105 transition duration-300">
            <span className="text-4xl">🛠️</span>
            <p className="text-sm font-bold text-white">Custom Orders</p>
            <p className="text-xs text-amber-200">Built to your specs</p>
          </div>
          <div className="flex flex-col items-center gap-3 hover:transform hover:scale-105 transition duration-300">
            <span className="text-4xl">💬</span>
            <p className="text-sm font-bold text-white">WhatsApp Support</p>
            <p className="text-xs text-amber-200">Quick response time</p>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Chinioti Wonders</h2>
            <p className="text-xs text-amber-400 font-semibold tracking-widest">FURNITURE LEGACY</p>
          </div>
          <p className="text-sm text-amber-100 leading-relaxed">
            Master craftsmen from Chiniot — the furniture capital of Pakistan.
            Every piece is handcrafted using premium sheesham and mango wood.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-6 py-3 rounded-lg w-full transition duration-300 shadow-lg"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-amber-700 pb-3">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/" className="text-amber-100 hover:text-white hover:translate-x-1 transition duration-300">→ Home</Link></li>
            <li><Link to="/catalog" className="text-amber-100 hover:text-white hover:translate-x-1 transition duration-300">→ All Products</Link></li>
            <li><Link to="/catalog?newArrival=true" className="text-amber-100 hover:text-white hover:translate-x-1 transition duration-300">→ New Arrivals</Link></li>
            <li><Link to="/catalog?bestSeller=true" className="text-amber-100 hover:text-white hover:translate-x-1 transition duration-300">→ Best Sellers</Link></li>
            <li><a href="#about" className="text-amber-100 hover:text-white hover:translate-x-1 transition duration-300">→ About Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="contact" className="flex flex-col gap-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-amber-700 pb-3">
            Contact Info
          </h3>

          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex gap-3 items-start">
              <span className="text-lg">📍</span>
              <div>
                <p className="text-amber-100">{STORE_ADDRESS}</p>
              </div>
            </li>

            <li className="flex gap-3 items-start">
              <span className="text-lg">📞</span>
              <div>
                <p className="text-amber-100">
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white transition">
                    +92 327 7865145
                  </a>
                </p>
              </div>
            </li>

            <li className="flex gap-3 items-start">
              <span className="text-lg">🕐</span>
              <div>
                <p className="text-amber-100">{STORE_HOURS}</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-amber-700 pb-3">Follow Us</h3>

          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href="https://www.facebook.com/p/Chinioti-Wonders-61550562365243/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-amber-100 hover:text-white hover:translate-x-1 transition duration-300"
              >
                <FaFacebook size={18} />
                Facebook
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/furniturechiniotiwonders/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-amber-100 hover:text-white hover:translate-x-1 transition duration-300"
              >
                <FaInstagram size={18} />
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://www.tiktok.com/@chiniotiwondersfurniture"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-amber-100 hover:text-white hover:translate-x-1 transition duration-300"
              >
                <FaTiktok size={18} />
                TikTok
              </a>
            </li>

            <li>
              <a
                href="https://www.youtube.com/@ChiniotiWonders"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-amber-100 hover:text-white hover:translate-x-1 transition duration-300"
              >
                <FaYoutube size={18} />
                YouTube
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-amber-800 bg-gradient-to-r from-amber-950 to-amber-900 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-amber-300 font-medium">
          © 2026 Chinioti Wonders Furniture. All rights reserved. | Handcrafted with ❤️ from Pakistan
        </div>
      </div>

    </footer>
  )
}