import { MessageSquare } from 'lucide-react'
import { waLink } from '../constants'
import {
  HomeLiftIllustration,
  PassengerElevatorIllustration,
  CapsuleLiftIllustration,
  HospitalElevatorIllustration,
  StructuralElevatorIllustration,
  CarElevatorIllustration,
} from './ElevatorIllustrations'

const PRODUCTS = [
  {
    name: 'Home Elevator',
    desc: 'Bespoke, compact residential elevators running on standard single-phase power. Fits multi-level villas, duplexes, and older houses with minimal pit requirements.',
    illustration: HomeLiftIllustration,
    tag: 'Residential Focus',
  },
  {
    name: 'Commercial Elevator',
    desc: 'Heavy-traffic gearless passenger lifts for commercial centers, offices, retail spaces, and apartments. Engineered for smooth acceleration and high power efficiency.',
    illustration: PassengerElevatorIllustration,
    tag: 'Business & Office',
  },
  {
    name: 'Hospital Elevator',
    desc: 'Specially sized stretcher and bed elevators designed with precise micro-leveling, silent motor controls, and emergency backup options for hospital and clinic facilities.',
    illustration: HospitalElevatorIllustration,
    tag: 'Healthcare Service',
  },
  {
    name: 'Structural Elevator',
    desc: 'Self-standing structural glass elevators requiring zero masonry concrete wall construction. Can be installed indoors or externally with minimal modifications.',
    illustration: StructuralElevatorIllustration,
    tag: 'Independent Shaft',
  },
  {
    name: 'Car Elevator',
    desc: 'Heavy-duty vehicle elevators and automobile hoist platforms for showrooms, multi-level garage parkings, and logistics warehouses.',
    illustration: CarElevatorIllustration,
    tag: 'Industrial Load',
  },
  {
    name: 'Capsule Lifts',
    desc: 'Scenic glass elevators with panoramic views, matching luxury showrooms, hotels, and luxury villas. Customizable with gold PVD cladding and custom designs.',
    illustration: CapsuleLiftIllustration,
    tag: 'Luxury Panoramic',
  },
]

export default function ProductRange({ onQuote }) {
  return (
    <section id="catalog" className="py-16 lg:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2">Our Range</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-navy">
            Our Products and Ranges
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:border-gold/30"
            >
              {/* Premium Generated Illustration */}
              <div className="h-56 relative bg-zinc-50 border-b border-zinc-100 overflow-hidden">
                <p.illustration />
                <span className="absolute top-4 right-4 bg-navy text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                  {p.tag}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-lg text-navy mb-3">
                  {p.name}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1">
                  {p.desc}
                </p>
                
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={onQuote}
                    className="flex-1 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-gold transition-colors"
                  >
                    Request Quote
                  </button>
                  <a
                    href={waLink(`Hi Kalyan Elevators, I am interested in the ${p.name}. Please contact me.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all"
                  >
                    <MessageSquare size={14} /> WhatsApp
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
