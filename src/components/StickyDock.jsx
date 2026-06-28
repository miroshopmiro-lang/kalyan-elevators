import { Phone, MessageSquare, FileText } from 'lucide-react'
import { BRAND } from '../constants'

export default function StickyDock({ onQuote }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 lg:px-0 lg:pb-6 pointer-events-none">
      <div className="mx-auto max-w-md lg:max-w-lg pointer-events-auto">
        <div className="bg-white border border-zinc-200 shadow-xl flex items-stretch gap-2 p-2 rounded-2xl">
          <a
            href={BRAND.phoneLink}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-zinc-700 hover:text-gold hover:bg-zinc-50 transition-all"
          >
            <Phone size={18} />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">Call Now</span>
          </a>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <span className="relative">
              <MessageSquare size={18} />
              <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">WhatsApp</span>
          </a>
          <button
            onClick={onQuote}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-white bg-gold transition-all"
          >
            <FileText size={18} />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">Free Quote</span>
          </button>
        </div>
      </div>
    </div>
  )
}
