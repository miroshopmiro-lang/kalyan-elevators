import { useReveal } from '../hooks/useReveal'
import { MapPin, Phone, Mail, Globe, Send, MessageSquare } from 'lucide-react'
import { BRAND } from '../constants'

export default function ContactSection({ onQuote }) {
  const ref = useReveal({ selector: '.reveal', stagger: 0.1 })

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-zinc-200">
      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Contact details (matches Unified) */}
          <div className="reveal space-y-6">
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase block">
              GET IN TOUCH
            </span>
            <h2 className="font-display font-bold text-3xl text-navy">
              Request a Consultation
            </h2>
            <div className="w-12 h-1 bg-gold rounded-full my-3" />
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Partner with Kerala’s trusted name in vertical mobility. Reach out to our technical team today to discuss your project requirements, schedule a site inspection, or request a custom quote.
            </p>

            <ul className="space-y-4 pt-4 border-t border-zinc-100">
              <li className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Office Address</p>
                  <p className="text-sm font-medium">{BRAND.address}</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Call Us</p>
                  <p className="text-sm font-medium">{BRAND.phoneDisplay}</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Email Us</p>
                  <p className="text-sm font-medium">info@kalyanelevators.com</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-zinc-700">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Website</p>
                  <p className="text-sm font-medium">www.kalyanelevators.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Form and Map */}
          <div className="reveal space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onQuote()
              }}
              className="bg-zinc-50 border border-zinc-200 p-8 rounded-2xl shadow-sm space-y-4"
            >
              <h3 className="font-display font-semibold text-lg text-navy tracking-wide">
                Send a General Inquiry
              </h3>

              <div className="space-y-3">
                <input
                  required
                  placeholder="Your Name"
                  className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold outline-none transition-colors shadow-sm"
                />
                <input
                  required
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold outline-none transition-colors shadow-sm"
                />
                <textarea
                  rows={3}
                  placeholder="How can we help? (e.g. need a quote for villa elevator)"
                  className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold outline-none transition-colors resize-none shadow-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-5 py-3 rounded-lg text-sm font-bold text-white bg-gold transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Message
                </button>
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all"
                >
                  <MessageSquare size={16} /> WhatsApp
                </a>
              </div>
            </form>

            {/* Standard Map Embed */}
            <div className="bg-white border border-zinc-200 p-2 rounded-2xl overflow-hidden shadow-sm">
              <iframe
                title="Kalyan Elevators Thrissur location"
                src="https://www.google.com/maps?q=Thrissur,Kerala&output=embed"
                className="w-full h-60 rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
