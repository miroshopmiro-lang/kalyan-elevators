import { useReveal } from '../hooks/useReveal'
import { Wrench, Siren, RefreshCw } from 'lucide-react'

const SERVICES = [
  {
    icon: Wrench,
    title: 'Preventive Care',
    text: 'Regularly scheduled lubrication, wear checks and full safety tests to keep your elevator running flawlessly year-round.',
  },
  {
    icon: Siren,
    title: '24/7 Emergency Response',
    text: 'A quick-response engineering team stationed in Thrissur for immediate troubleshooting, any hour, any day.',
  },
  {
    icon: RefreshCw,
    title: 'Modernization Services',
    text: 'Upgrade outdated cabins with modern stainless steel panels, silent V3F gearless motors and new ARD units — without replacing the entire shaft infrastructure.',
  },
]

export default function ServicesAMC({ onQuote }) {
  const ref = useReveal({ selector: '.svc', stagger: 0.12 })
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="max-w-2xl">
          <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-3">
            Services & AMC
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-navy leading-tight">
            Elevator Maintenance <span className="text-gold">& Modernization</span>
          </h2>
          <p className="mt-4 text-zinc-600 text-base">
            Protect your investment with lifelong support from our local Thrissur service desk. We support all brands.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="svc bg-white border border-zinc-200 p-8 rounded-2xl transition-all duration-300 hover:shadow-md hover:border-gold/30"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-6">
                <s.icon size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-navy tracking-wide">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-zinc-50 border border-zinc-200 p-8 lg:p-10 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl lg:text-2xl text-navy">
              Ready to secure your AMC plan?
            </h3>
            <p className="mt-2 text-zinc-600 text-sm">
              Get a tailored maintenance schedule for your residential or commercial building today.
            </p>
          </div>
          <button
            onClick={onQuote}
            className="px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-navy hover:bg-gold transition-all whitespace-nowrap shadow-sm"
          >
            Request AMC Quote
          </button>
        </div>

      </div>
    </section>
  )
}
