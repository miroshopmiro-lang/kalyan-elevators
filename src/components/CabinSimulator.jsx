import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowUp } from 'lucide-react'

const CABINS = {
  'Executive Gold PVD Stainless Steel': {
    bg: 'linear-gradient(135deg, #3a2f12, #6b5417, #c9a24a)',
    border: '#D4AF37',
    desc: 'Mirror-polished gold PVD steel. Ideal for luxury villas and premium hotel lobbies seeking a statement finish.',
  },
  'Panoramic Glass Capsule': {
    bg: 'linear-gradient(135deg, rgba(120,170,200,0.25), rgba(200,230,255,0.12))',
    border: '#9fd0ff',
    desc: 'Curved glass backing for unobstructed views. Perfect for showrooms, atriums and architectural centrepieces.',
  },
  'Classic Wooden Panel': {
    bg: 'linear-gradient(135deg, #2a1c10, #5a3a1e, #8a5a2e)',
    border: '#C5A880',
    desc: 'Warm hardwood inlays for a residential, boutique feel. Suited to heritage homes and luxury apartments.',
  },
  'Brushed Silver Stainless Steel': {
    bg: 'linear-gradient(135deg, #2b2b2e, #4a4a4f, #9a9aa0)',
    border: '#E5E5EA',
    desc: 'Durable, fingerprint-resistant brushed steel. The reliable choice for commercial and high-traffic buildings.',
  },
}

const LIGHTING = {
  'Warm Ambience': 'radial-gradient(circle at 50% 0%, rgba(255,200,120,0.45), transparent 70%)',
  'Futuristic Blue Neo': 'radial-gradient(circle at 50% 0%, rgba(90,160,255,0.45), transparent 70%)',
  'Bright Daylight LED': 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.55), transparent 70%)',
}

const FLOORS = [4, 3, 2, 1, 0]

// Synthesize a short elevator "ding" using the Web Audio API.
function playDing() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.6)
    osc.onended = () => ctx.close()
  } catch (e) {
    /* audio not available */
  }
}

export default function CabinSimulator({ onQuote }) {
  const [cabin, setCabin] = useState('Executive Gold PVD Stainless Steel')
  const [light, setLight] = useState('Warm Ambience')
  const [floor, setFloor] = useState(0)
  const arrowRef = useRef(null)
  const cabinRef = useRef(null)

  const cfg = CABINS[cabin]

  // Animate the floor indicator arrow vertically when the floor changes.
  useEffect(() => {
    if (!arrowRef.current) return
    const index = FLOORS.indexOf(floor)
    gsap.to(arrowRef.current, {
      y: index * 44,
      duration: 0.7,
      ease: 'power3.inOut',
    })
  }, [floor])

  // Cross-fade the cabin preview whenever a finish or lighting is changed.
  useEffect(() => {
    if (!cabinRef.current) return
    gsap.fromTo(
      cabinRef.current,
      { opacity: 0.4, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    )
  }, [cabin, light])

  const selectFloor = (f) => {
    setFloor(f)
    playDing()
  }

  return (
    <section className="relative py-24 lg:py-32 bg-charcoal/30 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">
            Interactive Experience
          </p>
          <h2 className="font-display font-light text-3xl lg:text-5xl text-white leading-tight">
            Design Your{' '}
            <span className="text-gradient-gold">Cabin Interior</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Configure your finish, lighting and floor stops. Preview updates in
            real time with smooth motion and an authentic arrival chime.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Preview */}
          <div className="relative flex justify-center">
            <div
              ref={cabinRef}
              className="relative w-64 sm:w-72 h-96 rounded-2xl overflow-hidden"
              style={{ background: cfg.bg, border: `2px solid ${cfg.border}` }}
            >
              <div
                className="absolute inset-0"
                style={{ background: LIGHTING[light] }}
              />
              {/* Cabin side rails */}
              <div className="absolute inset-y-6 left-4 w-px bg-white/20" />
              <div className="absolute inset-y-6 right-4 w-px bg-white/20" />
              {/* Floor display */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                <span className="font-display text-gold text-lg tracking-widest">
                  {floor === 0 ? 'G' : floor}
                </span>
              </div>
              {/* Cabin doors */}
              <div className="absolute bottom-0 inset-x-0 h-2/3 flex">
                <div className="flex-1 border-r border-white/10 bg-white/[0.04]" />
                <div className="flex-1 bg-white/[0.04]" />
              </div>
            </div>

            {/* Floor indicator rail */}
            <div className="ml-6 relative flex flex-col gap-3 justify-center">
              <div
                ref={arrowRef}
                className="absolute -left-7 top-1 text-gold"
              >
                <ArrowUp size={20} />
              </div>
              {FLOORS.map((f) => (
                <button
                  key={f}
                  onClick={() => selectFloor(f)}
                  className={`w-11 h-11 rounded-full text-sm font-medium transition-all duration-300 ${
                    floor === f
                      ? 'bg-metallic-gold text-obsidian shadow-gold-strong'
                      : 'glass text-zinc-300 hover:border-gold/40'
                  }`}
                >
                  {f === 0 ? 'G' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm tracking-wide text-zinc-300 mb-3">Cabin Style</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(CABINS).map((name) => (
                  <button
                    key={name}
                    onClick={() => setCabin(name)}
                    className={`text-left text-xs px-4 py-3 rounded-xl transition-all duration-300 ${
                      cabin === name
                        ? 'bg-white/[0.06] border border-gold/50 text-white'
                        : 'glass text-zinc-400 hover:border-gold/30'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm tracking-wide text-zinc-300 mb-3">Lighting Scheme</h4>
              <div className="flex flex-wrap gap-3">
                {Object.keys(LIGHTING).map((name) => (
                  <button
                    key={name}
                    onClick={() => setLight(name)}
                    className={`text-xs px-4 py-2.5 rounded-full transition-all duration-300 ${
                      light === name
                        ? 'bg-metallic-gold text-obsidian'
                        : 'glass text-zinc-400 hover:border-gold/30'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass p-5">
              <p className="text-sm text-zinc-300 leading-relaxed">{cfg.desc}</p>
            </div>

            <button
              onClick={onQuote}
              className="px-7 py-3 rounded-full text-sm font-medium text-obsidian bg-metallic-gold hover:shadow-gold-strong transition-all duration-300"
            >
              Request This Configuration
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
