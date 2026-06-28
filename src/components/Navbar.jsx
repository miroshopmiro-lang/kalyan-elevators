import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BRAND } from '../constants'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Elevator Range', href: '#catalog' },
  { label: 'Services & AMC', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onQuote }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white shadow-md border-b border-zinc-100'
          : 'bg-white/95 lg:bg-white/90 backdrop-blur-sm border-b border-zinc-100'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 select-none">
          <img
            src="/logoo.jpeg"
            alt="Kalyan Elevators"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-gold/40"
          />
          <span className="font-display text-xl lg:text-2xl font-bold tracking-wider text-navy">
            {BRAND.shortName}
          </span>
          <sub className="text-gold text-[10px] lg:text-xs tracking-[0.25em] font-semibold">
            ELEVATORS
          </sub>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm font-medium tracking-wide text-zinc-600 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={BRAND.phoneLink}
            className="text-sm font-semibold text-zinc-700 hover:text-gold transition-colors mr-2"
          >
            📞 {BRAND.phoneDisplay}
          </a>
          <button
            onClick={onQuote}
            className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-gold transition-all duration-300 shadow-sm"
          >
            Get a Quote
          </button>
        </div>

        <button
          className="lg:hidden text-zinc-800"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-zinc-100 px-5 py-6 shadow-xl">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-zinc-700 hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-4">
            <a
              href={BRAND.phoneLink}
              className="text-center text-sm font-semibold text-zinc-700 py-3 border border-zinc-200 rounded-lg"
            >
              Call: {BRAND.phoneDisplay}
            </a>
            <button
              onClick={() => {
                setOpen(false)
                onQuote()
              }}
              className="w-full px-5 py-3 rounded-lg text-sm font-bold text-white bg-gold transition-colors"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
