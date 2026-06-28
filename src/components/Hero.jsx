import { useState, useEffect } from 'react'
import { MessageSquare, PhoneCall } from 'lucide-react'
import { BRAND } from '../constants'

const TYPED_TEXTS = [
  'BEST HOME ELEVATORS IN KERALA',
  'LEADING ELEVATOR MANUFACTURER',
  'GOVERNMENT APPROVED LIFT COMPANY',
]

export default function Hero({ onQuote }) {
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer
    const fullText = TYPED_TEXTS[textIndex]

    const tick = () => {
      setDisplayText((current) => {
        if (!isDeleting) {
          // Typing
          if (current.length < fullText.length) {
            return fullText.slice(0, current.length + 1)
          } else {
            // Wait before starting to delete
            timer = setTimeout(() => setIsDeleting(true), 2500)
            return current
          }
        } else {
          // Deleting
          if (current.length > 0) {
            return fullText.slice(0, current.length - 1)
          } else {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % TYPED_TEXTS.length)
            return ''
          }
        }
      })
    }

    if (!timer) {
      timer = setTimeout(tick, isDeleting ? 40 : 100)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, textIndex])

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center bg-zinc-50 border-b border-zinc-200 pt-20"
    >
      {/* Banner image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/e3703535-8b40-447a-b5d2-a671e65220fe.webp"
          alt="Kalyan Elevators Modern Glass Capsule Elevator"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 w-full relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copywriting Left */}
          <div className="lg:col-span-12 space-y-6 text-left">

            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-amber-900 uppercase bg-amber-100/80 border border-amber-200 rounded-md">
              Kalyan Elevators Private Limited
            </span>
            <div className="min-h-[7rem] sm:min-h-[8rem] lg:min-h-[10rem] flex flex-col justify-center">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6.5xl text-white leading-tight">
                {displayText}
                <span className="animate-pulse text-gold ml-1">|</span>
              </h1>
            </div>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-[60%] sm:max-w-[52%]">
              We are the leading elevator manufacturing, installation, and services company in Thrissur, Kozhikode, and all across Kerala. Elevating your home with safety, reliability, and precision engineering.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onQuote}
                className="px-8 py-3.5 rounded-lg text-sm font-bold text-white bg-gold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} /> Get Free Quote
              </button>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-lg text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
