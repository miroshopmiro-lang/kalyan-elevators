import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { X, Check, Copy, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react'
import { BRAND, waLink } from '../constants'

const INSTALL_TYPES = [
  'Home Lift',
  'Passenger Elevator',
  'Glass Capsule',
  'Cargo / Car Lift',
  'Hospital Lift',
]
const FINISHES = ['Gold PVD', 'Glass Panoramic', 'Brushed Steel', 'Wood Inlays']
const CITIES = ['Thrissur', 'Kochi', 'Kozhikode', 'Trivandrum', 'Kannur', 'Other']
const FLOOR_OPTIONS = ['2', '3', '4', '5', '6', '7', '8+']

const EMPTY = {
  types: [],
  floors: '2',
  capacity: '',
  finish: 'Gold PVD',
  name: '',
  mobile: '',
  email: '',
  city: 'Thrissur',
  message: '',
}

export default function QuoteModal({ open, onClose }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(EMPTY)
  const [done, setDone] = useState(false)
  const panelRef = useRef(null)

  // Lock body scroll while the modal is open and reset state on open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setStep(1)
      setDone(false)
      setData(EMPTY)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Entrance animation for the panel.
  useEffect(() => {
    if (open && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
    }
  }, [open])

  if (!open) return null

  const toggleType = (t) =>
    setData((d) => ({
      ...d,
      types: d.types.includes(t)
        ? d.types.filter((x) => x !== t)
        : [...d.types, t],
    }))

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }))

  const summary = () =>
    [
      'New Elevator Quote Request — Kalyan Elevators',
      `Installation Type: ${data.types.join(', ') || 'Not specified'}`,
      `Number of Floors: ${data.floors}`,
      `Load / Passengers: ${data.capacity || 'Not specified'}`,
      `Cabin Finish: ${data.finish}`,
      `Name: ${data.name}`,
      `Mobile: ${data.mobile}`,
      `Email: ${data.email || 'Not provided'}`,
      `City: ${data.city}`,
      `Message: ${data.message || '-'}`,
    ].join('\n')

  const handleSubmit = () => {
    console.log('Kalyan Elevators — Quote Request:', data)
    setDone(true)
  }

  const copySummary = () => {
    navigator.clipboard?.writeText(summary())
  }

  const canProceed =
    (step === 1 && data.types.length > 0) ||
    (step === 2) ||
    (step === 3) ||
    (step === 4 && data.name.trim() && data.mobile.trim())

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto border border-zinc-200 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-zinc-400 hover:text-gold transition-colors"
        >
          <X size={22} />
        </button>

        {done ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg animate-pulse">
              <Check size={32} className="text-white" />
            </div>
            <h3 className="mt-6 font-display font-bold text-2xl text-navy">Thank You!</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Your request is ready. Send it to us instantly on WhatsApp or copy the summary below.
            </p>
            <pre className="mt-5 text-left text-xs text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl p-4 whitespace-pre-wrap">
              {summary()}
            </pre>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(summary())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-gold transition-all"
              >
                <MessageSquare size={16} /> Send on WhatsApp
              </a>
              <button
                onClick={copySummary}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-zinc-700 border border-zinc-300 hover:bg-zinc-50 transition-all"
              >
                <Copy size={16} /> Copy Summary
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gold tracking-[0.3em] text-[10px] font-bold uppercase">
                Free Quote Builder
              </p>
              <h3 className="mt-1 font-display font-bold text-xl text-navy">
                Step {step} of 4
              </h3>
              <div className="mt-4 flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <span
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      s <= step ? 'bg-gold' : 'bg-zinc-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div>
                <h4 className="text-sm font-semibold text-zinc-700 mb-4">Installation Type</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INSTALL_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left border transition-all ${
                        data.types.includes(t)
                          ? 'border-gold bg-gold/5 text-navy font-semibold'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-gold/30 hover:bg-zinc-50'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          data.types.includes(t)
                            ? 'bg-gold border-gold'
                            : 'border-zinc-300 bg-white'
                        }`}
                      >
                        {data.types.includes(t) && (
                          <Check size={12} className="text-white" />
                        )}
                      </span>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-700 mb-3">Number of Floors</h4>
                  <div className="flex flex-wrap gap-2">
                    {FLOOR_OPTIONS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setData((d) => ({ ...d, floors: f }))}
                        className={`w-12 h-12 rounded-xl text-sm border font-semibold transition-all ${
                          data.floors === f
                            ? 'border-gold bg-gold/10 text-navy font-bold'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-gold/30 hover:bg-zinc-50'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-700 mb-3">
                    Load Capacity / Passengers
                  </h4>
                  <input
                    value={data.capacity}
                    onChange={set('capacity')}
                    placeholder="e.g. 6 passengers or 408 kg"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold focus:bg-white outline-none"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h4 className="text-sm font-semibold text-zinc-700 mb-4">Cabin Finish Preference</h4>
                <div className="grid grid-cols-2 gap-3">
                  {FINISHES.map((f) => (
                    <button
                      key={f}
                      onClick={() => setData((d) => ({ ...d, finish: f }))}
                      className={`px-4 py-4 rounded-xl text-sm border font-semibold transition-all ${
                        data.finish === f
                          ? 'border-gold bg-gold/5 text-navy font-bold shadow-sm'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-gold/30 hover:bg-zinc-50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <input
                  value={data.name}
                  onChange={set('name')}
                  placeholder="Full Name *"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold focus:bg-white outline-none"
                />
                <input
                  value={data.mobile}
                  onChange={set('mobile')}
                  type="tel"
                  placeholder="Mobile Number *"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold focus:bg-white outline-none"
                />
                <input
                  value={data.email}
                  onChange={set('email')}
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold focus:bg-white outline-none"
                />
                <select
                  value={data.city}
                  onChange={set('city')}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 focus:border-gold focus:bg-white outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <textarea
                  value={data.message}
                  onChange={set('message')}
                  rows={3}
                  placeholder="Additional project details"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-gold focus:bg-white outline-none resize-none"
                />
              </div>
            )}

            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm text-zinc-600 border border-zinc-200 disabled:opacity-30 hover:bg-zinc-50 transition-all"
              >
                <ArrowLeft size={16} /> Back
              </button>
               {step < 4 ? (
                <button
                  onClick={() => canProceed && setStep((s) => s + 1)}
                  disabled={!canProceed}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gold disabled:opacity-40 transition-all shadow-sm"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => canProceed && handleSubmit()}
                  disabled={!canProceed}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gold disabled:opacity-40 transition-all shadow-sm"
                >
                  Submit Request <Check size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
