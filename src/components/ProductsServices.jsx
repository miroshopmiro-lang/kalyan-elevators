import { Paintbrush, Shield, HelpCircle } from 'lucide-react'

const PILLARS = [
  {
    icon: Paintbrush,
    title: 'Best Elevator Designs',
    text: 'Our lift cabins feature premium stainless and gold PVD sheets imported directly from Europe, crafted using German cutting-edge precision manufacturing and finishing technology.',
  },
  {
    icon: Shield,
    title: 'Trust and Safety',
    text: 'Kalyan Elevators is a licensed manufacturer fully approved by the Department of Electrical Inspectorate, Government of Kerala. We guarantee hassle-free compliance and drawing approvals.',
  },
  {
    icon: HelpCircle,
    title: 'No More Breakdowns',
    text: 'We provide comprehensive lifetime service plans and preventative maintenance schedules at highly affordable rates, backed by our 24/7 rapid emergency repair dispatch.',
  },
]

export default function ProductsServices() {
  return (
    <section className="py-16 lg:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-2">Our Features</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-navy">
            Our Products and Services
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold/30 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
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
