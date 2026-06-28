import React from 'react'

// 1. Panoramic Glass Elevator - Tower / Shaft (Hero Image replacement)
export function HeroElevatorIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-gradient-to-b from-blue-50 to-white"
    >
      <defs>
        <linearGradient id="shaftGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="cabinGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grid Lines in Background */}
      <path d="M 50 0 L 50 500 M 100 0 L 100 500 M 150 0 L 150 500 M 200 0 L 200 500 M 250 0 L 250 500 M 300 0 L 300 500 M 350 0 L 350 500" stroke="#F1F5F9" strokeWidth="1" />
      <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 0 300 L 400 300 M 0 350 L 400 350 M 0 400 L 400 400 M 0 450 L 400 450" stroke="#F1F5F9" strokeWidth="1" />

      {/* Main Structural Shaft Columns */}
      <rect x="120" y="0" width="16" height="500" fill="url(#shaftGrad)" stroke="#94A3B8" strokeWidth="1" />
      <rect x="264" y="0" width="16" height="500" fill="url(#shaftGrad)" stroke="#94A3B8" strokeWidth="1" />

      {/* Shaft Horizontal Beams */}
      <rect x="120" y="80" width="160" height="12" fill="#E2E8F0" stroke="#94A3B8" />
      <rect x="120" y="220" width="160" height="12" fill="#E2E8F0" stroke="#94A3B8" />
      <rect x="120" y="360" width="160" height="12" fill="#E2E8F0" stroke="#94A3B8" />

      {/* Elevator Cables */}
      <line x1="180" y1="0" x2="180" y2="500" stroke="#64748B" strokeWidth="2" strokeDasharray="4 2" />
      <line x1="220" y1="0" x2="220" y2="500" stroke="#64748B" strokeWidth="2" strokeDasharray="4 2" />

      {/* Elevator Cabin (Moving up, positioned around center y=140) */}
      
      {/* Cabin Support Counterweights/Cables */}
      <rect x="156" y="100" width="88" height="8" fill="#475569" rx="2" />
      <rect x="156" y="272" width="88" height="8" fill="#475569" rx="2" />

      {/* Main Cabin Frame - Gold Accents */}
      <rect x="160" y="108" width="80" height="164" fill="url(#cabinGlass)" stroke="url(#goldGrad)" strokeWidth="4" rx="8" />

      {/* Internal Floor */}
      <rect x="164" y="254" width="72" height="12" fill="#1E293B" rx="1" />
      <rect x="164" y="250" width="72" height="4" fill="url(#goldGrad)" />

      {/* Glass Walls vertical lines */}
      <line x1="185" y1="116" x2="185" y2="250" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="215" y1="116" x2="215" y2="250" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.5" />

      {/* Handrail inside */}
      <rect x="170" y="190" width="60" height="6" fill="#E2E8F0" rx="3" stroke="#475569" strokeWidth="1" />

      {/* Passenger Silhouette */}
      <circle cx="200" cy="165" r="12" fill="#94A3B8" fillOpacity="0.6" />
      <path d="M 182 205 C 182 185, 218 185, 218 205 Z" fill="#94A3B8" fillOpacity="0.6" />

      {/* Cabin Ceiling & Lights */}
      <rect x="164" y="112" width="72" height="14" fill="#334155" rx="2" />
      {/* Glowing LEDs */}
      <circle cx="185" cy="119" r="3" fill="#FFF" />
      <circle cx="185" cy="119" r="8" fill="url(#glow)" />
      <circle cx="215" cy="119" r="3" fill="#FFF" />
      <circle cx="215" cy="119" r="8" fill="url(#glow)" />

      {/* Floor Indicator Display inside cabin */}
      <rect x="192" y="128" width="16" height="8" fill="#000" rx="1" />
      <text x="200" y="135" fill="#EF4444" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">3</text>

      {/* Bottom Ground Platform */}
      <rect x="0" y="470" width="400" height="30" fill="#334155" />
      <rect x="0" y="470" width="400" height="2" fill="url(#goldGrad)" />
      
      {/* Modern plants at the lobby base */}
      <path d="M 80 470 Q 75 440 60 435 Q 85 450 90 470 Z" fill="#10B981" />
      <path d="M 90 470 Q 95 435 110 430 Q 100 455 95 470 Z" fill="#059669" />
      <path d="M 310 470 Q 305 440 290 435 Q 315 450 320 470 Z" fill="#10B981" />
      <path d="M 320 470 Q 325 435 340 430 Q 330 455 325 470 Z" fill="#059669" />
    </svg>
  )
}

// 2. Elite Home Lifts - Custom Wooden Panels
export function HomeLiftIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-zinc-50"
    >
      <defs>
        {/* Rich wood grain gradient */}
        <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="30%" stopColor="#92400E" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="70%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="woodPanel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id="buttonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wall Texture Background */}
      <rect width="400" height="300" fill="#FAFAFA" />
      {/* Skirting board */}
      <rect x="0" y="275" width="400" height="25" fill="#E4E4E7" />
      <line x1="0" y1="275" x2="400" y2="275" stroke="#D4D4D8" strokeWidth="2" />

      {/* Elevator Outer Door Frame - Gold/Brass Finish */}
      <rect x="90" y="30" width="220" height="245" fill="none" stroke="url(#frameGrad)" strokeWidth="12" rx="4" />
      <rect x="96" y="36" width="208" height="239" fill="none" stroke="#78350F" strokeWidth="2" />

      {/* Elevator Doors (Closed sliding panels in teak wood) */}
      <rect x="102" y="42" width="97" height="233" fill="url(#woodGrad)" stroke="#451A03" strokeWidth="1" />
      <rect x="201" y="42" width="97" height="233" fill="url(#woodGrad)" stroke="#451A03" strokeWidth="1" />

      {/* Vertical Wood Grooves/Panels */}
      <line x1="135" y1="42" x2="135" y2="275" stroke="#451A03" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="168" y1="42" x2="168" y2="275" stroke="#451A03" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="234" y1="42" x2="234" y2="275" stroke="#451A03" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="267" y1="42" x2="267" y2="275" stroke="#451A03" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Center Door Seam */}
      <line x1="200.5" y1="42" x2="200.5" y2="275" stroke="#1C1917" strokeWidth="3" />

      {/* Gold Door Handles */}
      <rect x="190" y="120" width="6" height="50" fill="url(#frameGrad)" rx="3" stroke="#451A03" strokeWidth="0.5" />
      <rect x="204" y="120" width="6" height="50" fill="url(#frameGrad)" rx="3" stroke="#451A03" strokeWidth="0.5" />

      {/* Floor Indicator Display (Above the door) */}
      <rect x="175" y="10" width="50" height="16" fill="#1C1917" rx="3" stroke="url(#frameGrad)" strokeWidth="1.5" />
      {/* Up Arrow */}
      <path d="M 188 21 L 193 15 L 198 21 M 193 15 L 193 23" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Floor G */}
      <text x="212" y="22" fill="#F59E0B" fontSize="12" fontFamily="monospace" fontWeight="bold">G</text>

      {/* External Call Button Panel (Lobby wall right) */}
      <rect x="325" y="120" width="22" height="50" fill="#1C1917" rx="4" stroke="#E4E4E7" strokeWidth="1.5" />
      {/* Call button */}
      <circle cx="336" cy="145" r="5" fill="#FAFAFA" stroke="#D4D4D8" strokeWidth="1" />
      <circle cx="336" cy="145" r="5" fill="url(#buttonGlow)" />
      {/* Small triangle indicators */}
      <path d="M 333 133 L 336 129 L 339 133 Z" fill="#A1A1AA" />
      <path d="M 333 157 L 336 161 L 339 157 Z" fill="#A1A1AA" />
    </svg>
  )
}

// 3. Passenger Elevators - Sleek Brushed Stainless Steel
export function PassengerElevatorIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-zinc-100"
    >
      <defs>
        {/* Stainless Steel Brushed Gradients */}
        <linearGradient id="steelGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="25%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="75%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="steelDark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wall Texture */}
      <rect width="400" height="300" fill="#E2E8F0" />
      
      {/* Architrave / Structural wall tiles */}
      <line x1="60" y1="0" x2="60" y2="300" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="340" y1="0" x2="340" y2="300" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="0" y1="100" x2="400" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="0" y1="200" x2="400" y2="200" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Skirting board */}
      <rect x="0" y="270" width="400" height="30" fill="#94A3B8" />
      <line x1="0" y1="270" x2="400" y2="270" stroke="#64748B" strokeWidth="2" />

      {/* Elevator Frame */}
      <rect x="90" y="40" width="220" height="230" fill="none" stroke="url(#steelDark)" strokeWidth="10" rx="2" />
      <rect x="95" y="45" width="210" height="225" fill="none" stroke="#334155" strokeWidth="1.5" />

      {/* Elevator Doors */}
      <rect x="100" y="50" width="99" height="220" fill="url(#steelGrad)" stroke="#64748B" strokeWidth="0.5" />
      <rect x="201" y="50" width="99" height="220" fill="url(#steelGrad)" stroke="#64748B" strokeWidth="0.5" />

      {/* Brushed Texture Lines */}
      <line x1="120" y1="50" x2="120" y2="270" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="150" y1="50" x2="150" y2="270" stroke="#64748B" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="170" y1="50" x2="170" y2="270" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="230" y1="50" x2="230" y2="270" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="250" y1="50" x2="250" y2="270" stroke="#64748B" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="280" y1="50" x2="280" y2="270" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />

      {/* Door Seam */}
      <line x1="200" y1="50" x2="200" y2="270" stroke="#1E293B" strokeWidth="2.5" />

      {/* Modern Horizontal Display (above door frame) */}
      <rect x="165" y="15" width="70" height="18" fill="#020617" rx="3" stroke="#64748B" strokeWidth="1.5" />
      {/* LED Indicator: Floor 5 */}
      <text x="208" y="29" fill="#10B981" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="2">05</text>
      {/* Up Icon */}
      <path d="M 179 26 L 183 21 L 187 26 M 183 21 L 183 28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="183" cy="24" r="6" fill="url(#ledGlow)" />

      {/* External Call Panel (Right Wall) */}
      <rect x="322" y="130" width="20" height="46" fill="#1E293B" rx="3" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Call Buttons */}
      <circle cx="332" cy="142" r="4" fill="#E2E8F0" />
      <circle cx="332" cy="154" r="4" fill="#E2E8F0" />
      {/* Small arrows on buttons */}
      <path d="M 330 143 L 332 140 L 334 143" stroke="#1E293B" strokeWidth="1" fill="none" />
      <path d="M 330 153 L 332 156 L 334 153" stroke="#1E293B" strokeWidth="1" fill="none" />
    </svg>
  )
}

// 4. Panoramic Glass Elevator (Product category image)
export function CapsuleLiftIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-gradient-to-tr from-slate-50 to-zinc-100"
    >
      <defs>
        <linearGradient id="goldCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="glassCap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="lightSpot" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Structural Glass Wall Panels Behind */}
      <line x1="200" y1="0" x2="200" y2="300" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="100" y1="0" x2="100" y2="300" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="300" y1="0" x2="300" y2="300" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" strokeWidth="1" />

      {/* Main Structural Guide Rails */}
      <rect x="135" y="0" width="10" height="300" fill="#64748B" />
      <rect x="255" y="0" width="10" height="300" fill="#64748B" />
      
      {/* Main Steel Cables */}
      <line x1="165" y1="0" x2="165" y2="300" stroke="#475569" strokeWidth="1.5" />
      <line x1="235" y1="0" x2="235" y2="300" stroke="#475569" strokeWidth="1.5" />

      {/* Curved Capsule Glass Cabin (Center y=60 to y=240) */}
      
      {/* Cabin Bottom base (Gold/Amber steel cladding) */}
      <path d="M 140 215 C 140 240, 260 240, 260 215 Z" fill="url(#goldCap)" stroke="#78350F" strokeWidth="1" />
      <rect x="140" y="210" width="120" height="6" fill="#1E293B" />

      {/* Cabin Glass body */}
      <path d="M 140 85 C 140 85, 140 210, 140 210 C 140 210, 260 210, 260 210 C 260 210, 260 85, 260 85 Z" fill="url(#glassCap)" stroke="url(#goldCap)" strokeWidth="2.5" />
      <path d="M 140 85 C 140 85, 170 65, 200 65 C 230 65, 260 85, 260 85 Z" fill="none" stroke="url(#goldCap)" strokeWidth="3" />

      {/* Cabin Roof Cladding (Gold dome) */}
      <path d="M 140 85 C 140 60, 260 60, 260 85 Z" fill="url(#goldCap)" stroke="#78350F" strokeWidth="1" />
      <rect x="140" y="84" width="120" height="5" fill="#1E293B" />

      {/* Glowing spotlight effect from cabin ceiling */}
      <path d="M 155 89 L 145 210 L 255 210 L 245 89 Z" fill="url(#lightSpot)" opacity="0.3" />

      {/* Panoramic curved glass vertical division lines */}
      <path d="M 175 88 C 175 88, 170 210, 170 210" stroke="#BAE6FD" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M 225 88 C 225 88, 230 210, 230 210" stroke="#BAE6FD" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Curved Handrail inside */}
      <path d="M 155 170 C 155 185, 245 185, 245 170" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
      <path d="M 155 170 C 155 185, 245 185, 245 170" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

      {/* Inner Floor display */}
      <rect x="190" y="93" width="20" height="9" fill="#000" rx="1.5" />
      <text x="200" y="100" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2</text>
    </svg>
  )
}

// 5. Hospital Elevator
export function HospitalElevatorIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-slate-50"
    >
      <defs>
        <linearGradient id="hospSteel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* Clinic/Hospital Wall lines */}
      <rect width="400" height="300" fill="#F8FAFC" />
      <rect x="0" y="270" width="400" height="30" fill="#E2E8F0" />
      
      {/* Wide Door Frame */}
      <rect x="60" y="40" width="280" height="230" fill="none" stroke="#64748B" strokeWidth="8" rx="2" />
      
      {/* Wide Doors (Slightly Open) */}
      {/* Inside Cabin Background */}
      <rect x="68" y="48" width="264" height="222" fill="#0F172A" />
      
      {/* Stretcher/Red Cross Icon on the interior wall */}
      <rect x="185" y="100" width="30" height="30" fill="#EF4444" rx="4" />
      <rect x="197" y="105" width="6" height="20" fill="#FFF" rx="1" />
      <rect x="190" y="112" width="20" height="6" fill="#FFF" rx="1" />
      
      {/* Interior Handrails */}
      <line x1="80" y1="170" x2="320" y2="170" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
      
      {/* Left Door Panel */}
      <rect x="68" y="48" width="100" height="222" fill="url(#hospSteel)" stroke="#475569" strokeWidth="0.5" />
      {/* Right Door Panel */}
      <rect x="232" y="48" width="100" height="222" fill="url(#hospSteel)" stroke="#475569" strokeWidth="0.5" />
      
      {/* Door Seam when closed (virtual) */}
      <line x1="168" y1="48" x2="168" y2="270" stroke="#334155" />
      <line x1="232" y1="48" x2="232" y2="270" stroke="#334155" />

      {/* Emergency Text Indicator above */}
      <rect x="170" y="15" width="60" height="18" fill="#1E293B" rx="3" stroke="#94A3B8" strokeWidth="1" />
      <text x="200" y="27" fill="#EF4444" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">EMERGENCY</text>
    </svg>
  )
}

// 6. Structural & Shaft-Free Elevator
export function StructuralElevatorIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-zinc-50"
    >
      <defs>
        <linearGradient id="metalStr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      
      {/* Glass Backing grids */}
      <path d="M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke="#E2E8F0" strokeWidth="1" />

      {/* Structural Framing Columns (Shaft-Free Standalone) */}
      <rect x="110" y="0" width="12" height="300" fill="url(#metalStr)" />
      <rect x="278" y="0" width="12" height="300" fill="url(#metalStr)" />

      {/* Diagonal Structural Cross Braces */}
      <line x1="122" y1="20" x2="278" y2="120" stroke="#475569" strokeWidth="2.5" />
      <line x1="278" y1="20" x2="122" y2="120" stroke="#475569" strokeWidth="2.5" />
      <line x1="122" y1="140" x2="278" y2="240" stroke="#475569" strokeWidth="2.5" />
      <line x1="278" y1="140" x2="122" y2="240" stroke="#475569" strokeWidth="2.5" />

      {/* Standalone Elevator Cabin (Middle y=80 to y=220) */}
      <rect x="130" y="70" width="140" height="150" fill="#F1F5F9" fillOpacity="0.85" stroke="#475569" strokeWidth="3" rx="4" />
      <rect x="140" y="80" width="120" height="130" fill="none" stroke="#D97706" strokeWidth="2" rx="2" />
      <line x1="190" y1="80" x2="190" y2="210" stroke="#94A3B8" strokeWidth="1" />
      
      {/* Floor and glass highlights */}
      <rect x="134" y="200" width="132" height="16" fill="#1E293B" />
      <path d="M 140 100 L 170 160" stroke="#BAE6FD" strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}

// 7. Automobile & Car Elevator
export function CarElevatorIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-slate-900"
    >
      <defs>
        <linearGradient id="ironPlate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      
      {/* Industrial framing background */}
      <rect width="400" height="300" fill="#0F172A" />
      
      {/* Vertical heavy guide rails */}
      <rect x="30" y="0" width="16" height="300" fill="#475569" />
      <rect x="354" y="0" width="16" height="300" fill="#475569" />
      
      {/* Heavy Cable pulleys */}
      <line x1="38" y1="0" x2="38" y2="230" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 2" />
      <line x1="362" y1="0" x2="362" y2="230" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 2" />
      
      {/* Car Lift Platform (Positioned at y=220) */}
      <rect x="30" y="220" width="340" height="15" fill="url(#ironPlate)" stroke="#64748B" strokeWidth="2" />
      <rect x="30" y="215" width="340" height="5" fill="#D97706" />
      
      {/* Diagonal platform struts */}
      <line x1="30" y1="220" x2="80" y2="270" stroke="#475569" strokeWidth="4" />
      <line x1="370" y1="220" x2="320" y2="270" stroke="#475569" strokeWidth="4" />

      {/* Car Outline Silhouette (Centered on platform) */}
      {/* Wheels */}
      <circle cx="120" cy="205" r="14" fill="#020617" stroke="#64748B" strokeWidth="3" />
      <circle cx="280" cy="205" r="14" fill="#020617" stroke="#64748B" strokeWidth="3" />
      {/* Car Body */}
      <path d="M 80 200 L 95 180 L 130 176 L 160 152 L 240 152 L 270 176 L 310 180 L 320 200 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
      {/* Car Windshield & Glass */}
      <path d="M 162 156 L 180 176 L 240 176 L 235 156 Z" fill="#BAE6FD" opacity="0.7" />
      
      {/* Safety Laser/Light Barrier */}
      <line x1="46" y1="180" x2="354" y2="180" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
    </svg>
  )
}

