import { Paintbrush, Shield, Clock4 } from 'lucide-react'

const PILLARS = [
  {
    icon: Paintbrush,
    title: 'Precision European Engineering',
    text: 'Featuring premium stainless steel and gold PVD cladding, our cabins are crafted using advanced German finishing technology for a dignified, world-class aesthetic.',
  },
  {
    icon: Shield,
    title: 'Certified Regulatory Compliance',
    text: 'Fully licensed and approved by the Kerala Department of Electrical Inspectorate. We ensure strict adherence to all statutory safety codes with hassle-free drawing approvals.',
  },
  {
    icon: Clock4,
    title: 'Lifetime Operational Assurance',
    text: 'Backed by 24/7 rapid-dispatch emergency support and comprehensive preventative maintenance schedules, guaranteeing smooth, uninterrupted vertical mobility.',
  },
]

export default function ProductsServices() {
  return (
    <section className="py-16 lg:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2">Our Features</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-navy">
            Why Choose Kalyan Elevators
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-8 shadow-standard ring-1 ring-black/5 transition-all duration-300 hover:shadow-gold hover:ring-gold/30 flex flex-col items-center text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
            >
              <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-gold mb-6">
                <p.icon size={26} />
              </div>
              <h3 className="font-display font-bold text-lg text-navy tracking-wide mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {p.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
