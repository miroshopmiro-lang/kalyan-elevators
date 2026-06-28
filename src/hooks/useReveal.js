import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Reusable hook: fade + rise children on scroll into view.
export function useReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = options.selector
      ? el.querySelectorAll(options.selector)
      : [el]
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: options.y ?? 40,
        opacity: 0,
        duration: options.duration ?? 0.8,
        ease: 'power3.out',
        stagger: options.stagger ?? 0.12,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 80%',
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}
