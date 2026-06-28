import { useEffect, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Jithin james',
    role: '5 stars',
    text: 'Really nice and professional experience with you guys, Your customer service, care and support is wonderful. It’s like an international level. Keep it up, all the best.',
    pfp: 'https://lh3.googleusercontent.com/a-/ALV-UjXqhT55M28ccz3hn3KRK1Kf8Sd5NHXjie7Nsqz1WBg0XaDmJ1g=w90-h90-p-rp-mo-br100',
  },
  {
    name: 'Mohamed Haris',
    role: '5 stars',
    text: 'Best service at best price. Most friendly staff. Team has great visionary planning on each works.',
    pfp: 'https://lh3.googleusercontent.com/a-/ALV-UjV8gvp87EtLqb2tx_EXeObyxEKFOptJpq2CKVq7n1O2blTtWzc5=w90-h90-p-rp-mo-ba12-br100',
  },
  {
    name: 'Gopakumar Raghavan',
    role: '5 stars',
    text: 'Best quality technical team, and have a wonderful managements. This company one of the good company at cochi👍. They are good annual maintenance lift company👍',
    pfp: 'https://lh3.googleusercontent.com/a-/ALV-UjUxnuIZPttSTGhh_p5wqrGrdPl2r6P8vlIA5HPxpuyFIWXXjpas=w90-h90-p-rp-mo-br100',
  },
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  const next = () => setI((v) => (v + 1) % REVIEWS.length)
  const prev = () => setI((v) => (v - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    const t = setInterval(next, 7000)
    return () => clearInterval(t)
  }, [])

  const r = REVIEWS[i]
  return (
    <section className="relative py-20 lg:py-28 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">

        <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-3">
          Client Testimonials
        </p>

        <Quote className="mx-auto text-gold/30" size={40} />

        <blockquote className="mt-6 font-display font-medium text-lg sm:text-2xl text-navy leading-relaxed min-h-[6rem]">
          “{r.text}”
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-3">
          {r.pfp ? (
            <img
              src={r.pfp}
              alt={`${r.name} profile`}
              className="w-10 h-10 rounded-full object-cover border border-zinc-200 bg-white"
              loading="lazy"
            />
          ) : null}
          <div className="text-left">
            <p className="text-gold font-bold text-base">{r.name}</p>
            <div className="flex items-center gap-1 mt-1" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-gold"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-gold hover:border-gold/40 transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-8 bg-gold' : 'w-2 bg-zinc-300'
                  }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-gold hover:border-gold/40 transition-all shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  )
}
