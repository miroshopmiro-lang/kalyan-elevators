import { Phone, MapPin, Instagram, MessageSquare } from 'lucide-react'
import { BRAND } from '../constants'

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 bg-zinc-900 text-zinc-400 pt-16 pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl font-bold tracking-wider text-white">
              {BRAND.shortName}
            </span>
            <sub className="text-gold text-[10px] tracking-wider font-semibold">ELEVATORS</sub>
          </div>
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
            {BRAND.altSlogan}. Premium elevator and escalator manufacturers serving Thrissur, Kozhikode, and all of Kerala.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm text-white font-bold tracking-widest uppercase mb-4">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex gap-3">
              <MapPin size={18} className="text-gold shrink-0" />
              <span>{BRAND.address}</span>
            </li>
            <li>
              <a href={BRAND.phoneLink} className="flex gap-3 hover:text-gold transition-colors">
                <Phone size={18} className="text-gold shrink-0" />
                {BRAND.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-gold transition-colors"
              >
                <Instagram size={18} className="text-gold shrink-0" />
                @kalyanelevators
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm text-white font-bold tracking-widest uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
            <li><a href="#catalog" className="hover:text-gold transition-colors">Elevator Range</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors">Services & AMC</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
          </ul>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare size={16} /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  )
}
