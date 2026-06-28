import { useReveal } from '../hooks/useReveal'
import { Home, Building2, Gem, Package, Stethoscope, Car, MessageSquare } from 'lucide-react'
import { BRAND, waLink } from '../constants'

const PRODUCTS = [
  {
    icon: Home,
    name: 'Elite Home Lifts',
    tag: 'Residential Hydraulic',
    desc: 'Premium glass capsule or enclosed cabins. No deep pit or headroom needed. Operates on single-phase power. Ideal for Kerala villas.',
    specs: ['Pit: 50–150 mm', 'Power: Single-phase', 'Capacity: 2–4 persons'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Building2,
    name: 'Passenger Elevators',
    tag: 'Residential & Commercial',
    desc: 'High-speed, gearless traction motor systems with smooth deceleration, low vibration, and up to 20-passenger capacity for apartments.',
    specs: ['Speed: up to 1.75 m/s', 'Capacity: up to 20 persons', 'Drive: Gearless V3F'],
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Gem,
    name: 'Capsule & Panoramic Glass Lifts',
    tag: 'Architectural Lifts',
    desc: 'Elegant glass backing with custom structural gold/stainless steel framing. Adds significant aesthetic value to showrooms and premium villas.',
    specs: ['Custom steel/gold framing', 'Curved glass shell', '360° panoramic view'],
    image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Package,
    name: 'Commercial Cargo Elevators',
    tag: 'Heavy Payload',
    desc: 'Robust heavy-payload cage designs with reinforced steel chequered floors, double-sided controls, built for heavy warehousing and manufacturing.',
    specs: ['Reinforced steel floor', 'Double-sided controls', 'Load: up to 5000 kg'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Stethoscope,
    name: 'Hospital Stretcher Lifts',
    tag: 'Healthcare Lifts',
    desc: 'Jerk-free V3F drive system with extra-long interior to accommodate hospital beds, stretchers, medical gear, and priority emergency override.',
    specs: ['Jerk-free V3F drive', 'Stretcher-length cabin', 'Emergency override priority'],
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600&auto=format&fit=crop',
  },
  {
    icon: Car,
    name: 'Heavy-Duty Car Elevators',
    tag: 'Showrooms & Parking',
    desc: 'Specialized vehicle platforms for multi-level car showrooms and modern multi-parking complexes. Dual operating panels and infra-red safety grids.',
    specs: ['Dual operating panels', 'Infra-red safety grids', 'Load: up to 3000 kg'],
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop',
  },
]

export default function Catalog({ onQuote }) {
  const ref = useReveal({ selector: '.card', stagger: 0.1 })
  return (
    <section id="catalog" className="relative py-20 lg:py-28 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="max-w-3xl">
          <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-3">Elevator Range</p>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-navy leading-tight">
            Our Premium <span className="text-gold">Elevator Solutions</span>
          </h2>
          <p className="mt-4 text-zinc-600 text-base">
            Engineered for Kerala homes, hospitals, commercial complexes, and showrooms. Every model complies with Lift Inspectorate standards and includes an Automatic Rescue Device (ARD) as standard.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="card bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:border-gold/30 hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="h-52 w-full relative bg-zinc-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 bg-navy text-white text-[10px] tracking-wider uppercase font-semibold rounded px-2.5 py-1">
                  {p.tag}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold">
                    <p.icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-navy tracking-wide">
                    {p.name}
                  </h3>
                </div>
                
                <p className="mt-4 text-sm text-zinc-600 leading-relaxed flex-1">
                  {p.desc}
                </p>
                
                <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-4">
                  {p.specs.map((s) => (
                    <li key={s} className="text-xs text-zinc-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={onQuote}
                    className="flex-1 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-navy hover:bg-gold transition-all"
                  >
                    Get Quote
                  </button>
                  <a
                    href={waLink(`Hi Kalyan Elevators, I am interested in the ${p.name}. Please share details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all"
                  >
                    <MessageSquare size={14} /> Inquire
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
