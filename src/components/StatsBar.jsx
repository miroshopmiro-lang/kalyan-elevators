import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '2018+', label: 'Established' },
  { value: '1500+', label: 'Lifts Installed' },
  { value: '100%', label: 'Inspectorate Clearance' },
  { value: '24/7', label: 'AMC Support' },
]

export default function StatsBar() {
  const ref = useReveal({ selector: '.stat', stagger: 0.1 })
  return (
    <section className="bg-navy text-white">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-5 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {STATS.map((s) => (
          <div key={s.label} className="stat text-center">
            <div className="font-display text-2xl lg:text-3xl font-bold text-gold">
              {s.value}
            </div>
            <div className="mt-1 text-xs lg:text-sm text-zinc-200/90 font-semibold tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
