export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Premium 70/30 text-only layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 lg:gap-16 items-start">
          {/* Left Column: Core Pitch */}
          <div className="space-y-4 lg:space-y-6">
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase block">
              About Kalyan Elevators
            </span>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-navy">
              Kerala's Trusted Partner in Vertical Mobility
            </h2>
            <div className="w-12 h-1 bg-gold rounded-full my-3" />

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Kalyan Elevators Private Limited is the leading elevator manufacturing company in Thrissur and Kerala. We specialize in customized home elevators, residential hydraulic lifts, passenger elevators, capsule glass lifts, cargo lifts, and car elevators.
            </p>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Our engineering center is based locally in Thrissur, Jomsons Tower, from where we serve our residential and commercial clients across Thrissur, Kozhikode, Ernakulam, and all of Kerala.
            </p>
          </div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gold" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Government Approved</p>
                    <p className="text-xs text-zinc-600 font-semibold mt-1">
                      Dept. of Electrical Inspectorate Certified
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gold" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 21h8l1-4H7l1 4z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 2l7 7-3 3-4-4-4 4-3-3 7-7z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Smart Rescue</p>
                    <p className="text-xs text-zinc-600 font-semibold mt-1">
                      Automatic Rescue Device - ARD
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gold" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18a7 7 0 1 1 6 0"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12l3-3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 21l12-12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Silent Operation</p>
                    <p className="text-xs text-zinc-600 font-semibold mt-1">
                      Advanced V3F Drive Control
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gold" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 7h10v14H7V7z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 3h6v4H9V3z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12h6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">Turnkey Service</p>
                    <p className="text-xs text-zinc-600 font-semibold mt-1">
                      End-to-end clearance & drawing approvals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
