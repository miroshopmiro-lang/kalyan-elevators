import { useState } from 'react'
import { BRAND } from '../constants'

const CABIN_FINISHES = [
  {
    name: 'Executive Gold PVD Steel',
    desc: 'Mirror-polished gold PVD stainless steel with decorative etching. Ideal for luxury villas, high-end commercial spaces, and premium hotels.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    tag: 'Luxury Accent',
  },
  {
    name: 'Panoramic Glass Capsule',
    desc: 'Panoramic curved glass walls for unobstructed views. Perfect for shopping malls, office atriums, and premium architecture.',
    image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&q=80&w=800',
    tag: 'Architectural Lifts',
  },
  {
    name: 'Classic Hardwood Panel',
    desc: 'Warm wooden veneers and custom polished panel finishes. Provides a cozy, vintage, and high-end residential touch.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    tag: 'Boutique Home',
  },
  {
    name: 'Brushed Silver Stainless Steel',
    desc: 'Durable, scratch-resistant brushed steel sheets. Highly recommended for commercial establishments, offices, and apartments with high traffic.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
    tag: 'Standard Commercial',
  },
]

export default function CabinGallery({ onQuote }) {
  const [selected, setSelected] = useState(0)
  const current = CABIN_FINISHES[selected]

  return (
    <section className="relative py-20 lg:py-28 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Gallery Info Left */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase">Cabin Customization</p>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-navy leading-tight">
              Premium Cabin <span className="text-gold">Interior Finishes</span>
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              We design and construct lift interiors that match your building's style. Choose from luxurious PVD gold, classic wood panel textures, and high-strength brushed stainless steel finishes.
            </p>

            {/* Selection Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              {CABIN_FINISHES.map((finish, index) => (
                <button
                  key={finish.name}
                  onClick={() => setSelected(index)}
                  className={`text-left px-5 py-4 rounded-xl border text-sm font-semibold transition-all ${
                    selected === index
                      ? 'border-gold bg-gold/5 text-navy shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-gold/30 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{finish.name}</span>
                    <span className="text-[9px] tracking-wider uppercase bg-zinc-100 text-zinc-500 border border-zinc-200 px-2 py-0.5 rounded">
                      {finish.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 text-xs text-zinc-500 leading-relaxed">
              <strong>Interactive Selection:</strong> Tap on any finish option above to instantly preview the interior cabin photo and description.
            </div>
          </div>

          {/* Gallery Display Right */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/10] bg-zinc-100 rounded-2xl overflow-hidden shadow-md border border-zinc-200">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            
            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
              <h3 className="font-display font-bold text-lg text-navy">{current.name}</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{current.desc}</p>
              
              <div className="mt-5 flex flex-wrap gap-4 items-center justify-between border-t border-zinc-200/60 pt-4">
                <span className="text-xs text-zinc-500">Includes LED Ceiling & Handrail</span>
                <button
                  onClick={onQuote}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-navy hover:bg-gold transition-all"
                >
                  Consult on This Cabin Finish
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
