import { useMemo } from 'react'

const VIDEO_ITEMS = [
    {
        type: 'video',
        src: '/gallery/WhatsApp Video 2026-06-28 at 13.32.16.webm',
        poster: '/gallery/WhatsApp Image 2026-06-28 at 13.45.47.webp',
    },
    {
        type: 'video',
        src: '/gallery/WhatsApp Video 2026-06-28 at 13.46.11.webm',
        poster: '/gallery/WhatsApp Image 2026-06-28 at 13.46.10.webp',
    },
    {
        type: 'video',
        src: '/gallery/WhatsApp Video 2026-06-28 at 13.46.13.webm',
        poster: '/gallery/WhatsApp Image 2026-06-28 at 13.46.12 (1).webp',
    },
    {
        type: 'video',
        src: '/gallery/WhatsApp Video 2026-06-28 at 13.46.13 (1).webm',
        poster: '/gallery/WhatsApp Image 2026-06-28 at 13.46.14.webp',
    },
    {
        type: 'video',
        src: '/gallery/WhatsApp Video 2026-06-28 at 13.32.17.webm',
        poster: '/gallery/WhatsApp Image 2026-06-28 at 13.45.47.webp',
    },
]

const IMAGE_ITEMS = [
    {
        type: 'image',
        src: '/gallery/WhatsApp Image 2026-06-28 at 13.45.47.webp',
        alt: 'Kalyan Elevators installation',
    },
    {
        type: 'image',
        src: '/gallery/WhatsApp Image 2026-06-28 at 13.46.10.webp',
        alt: 'Kalyan Elevators installation',
    },
    {
        type: 'image',
        src: '/gallery/WhatsApp Image 2026-06-28 at 13.46.12 (1).webp',
        alt: 'Kalyan Elevators installation',
    },
    {
        type: 'image',
        src: '/gallery/WhatsApp Image 2026-06-28 at 13.46.14.webp',
        alt: 'Kalyan Elevators installation',
    },
    {
        type: 'image',
        src: '/gallery/WhatsApp Image 2026-06-28 at 13.46.12.webp',
        alt: 'Kalyan Elevators installation',
    },
]

export default function InstallationsInMotion() {
    const items = useMemo(() => [...VIDEO_ITEMS, ...IMAGE_ITEMS], [])

    return (
        <section className="py-16 lg:py-24 bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="text-center">
                    <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase">Featured Installations</p>
                    <h2 className="font-display font-bold text-3xl lg:text-5xl text-navy leading-tight mt-3">
                        Our Installations in Motion
                    </h2>
                    <div className="w-12 h-1 bg-gold rounded-full my-4 mx-auto" />
                </div>

                <div className="mt-10">
                    <div className="relative">
                        <div
                            className="flex gap-4 overflow-x-auto pb-6 pr-6 scroll-smooth snap-x snap-mandatory"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                            aria-label="Horizontal gallery of installations (videos and photos)"
                        >
                            {items.map((it, idx) => {
                                const key = `${it.type}-${idx}`

                                if (it.type === 'video') {
                                    return (
                                        <figure
                                            key={key}
                                            className="snap-start shrink-0 w-[320px] sm:w-[380px] md:w-[440px] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm"
                                        >
                                            <div className="relative aspect-[16/10] bg-zinc-100">
                                                <video
                                                    src={it.src}
                                                    poster={it.poster}
                                                    preload="none"
                                                    muted
                                                    controls
                                                    playsInline
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </figure>
                                    )
                                }

                                return (
                                    <figure
                                        key={key}
                                        className="snap-start shrink-0 w-[320px] sm:w-[380px] md:w-[440px] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm"
                                    >
                                        <div className="relative aspect-[16/10] bg-zinc-100">
                                            <img
                                                src={it.src}
                                                alt={it.alt}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </figure>
                                )
                            })}
                        </div>

                        {/* Right-side peek gradient to reinforce the “swipe/scroll” affordance */}
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white/95 to-white/0" />
                    </div>
                </div>
            </div>
        </section>
    )
}
