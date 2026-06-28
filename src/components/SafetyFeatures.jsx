import { useReveal } from '../hooks/useReveal'
import { LifeBuoy, Zap, ScanLine, BadgeCheck } from 'lucide-react'

const FEATURES = [
  {
    icon: LifeBuoy,
    title: 'Automatic Rescue Device (ARD)',
    text: 'Embedded as standard in all Kalyan models. Guarantees safe floor landing and automatic door opening during power failures — our highest-priority safety feature.',
    highlight: true,
  },
  {
    icon: Zap,
    title: 'German-Engineered Drive & V3F System',
    text: 'Jerk-free starts, silent cabin operation and up to 40% energy savings through precision variable-frequency control.',
  },
  {
    icon: ScanLine,
    title: 'Advanced Door Sensors',
    text: 'Full-height light-curtain infrared beams prevent door-contact and accidental entrapment for total passenger safety.',
  },
  {
    icon: BadgeCheck,
    title: 'Kerala Electrical Inspectorate Approval',
    text: 'Guaranteed support for licensing, drawing clearance and fitness inspections with the Department of Electrical Inspectorate, Kerala.',
  },
]

export default function SafetyFeatures() {
  const ref = useReveal({ selector: '.feat', stagger: 0.1 })
  return (
    <section className="relative py-20 lg:py-28 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="max-w-2xl">
          <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-3">
            Technical USPs & Safety
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-navy leading-tight">
            Safety Engineered <span className="text-gold">Into Every Layer</span>
          </h2>
        </div>

        <div ref={ref} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`feat bg-white border border-zinc-200 rounded-2xl p-7 flex gap-5 transition-all duration-300 hover:shadow-md ${
                f.highlight ? 'border-gold bg-gold/[0.02]' : ''
              }`}
            >
              <div
                className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  f.highlight ? 'bg-gold text-white' : 'bg-gold/10 text-gold'
                }`}
              >
                <f.icon size={22} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-navy tracking-wide flex items-center gap-2">
                  {f.title}
                  {f.highlight && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-gold rounded-full px-2 py-0.5">
                      Standard
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
