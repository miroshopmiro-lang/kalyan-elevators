// Central brand + business constants used across the site.
export const BRAND = {
  name: 'Kalyan Elevators Private Limited',
  shortName: 'KALYAN',
  slogan: "Elevating Kerala's Architectural Standards",
  altSlogan: "Kerala's Trusted Partner in Vertical Mobility",
  address:
    'TMC 36/2551, Third Floor, Jomsons Tower, Chettiynagdi Junction, Post Office Rd, opposite Lavish Electronics, Thrissur, Kerala 680001',
  phoneDisplay: '079949 99926',
  phoneLink: 'tel:+917994999926',
  hours: 'Monday to Saturday: 9:30 AM \u2013 6:00 PM | Sunday: Closed',
  instagram: 'https://www.instagram.com/kalyanelevators/',
  whatsapp:
    'https://wa.me/917994999926?text=Hi%20Kalyan%20Elevators%2C%20I%20am%20interested%20in%20a%20quote%20for%20an%20elevator%20installation.%20Please%20contact%20me.',
  whatsappBase: 'https://wa.me/917994999926',
  bio:
    'Kalyan Elevators Private Limited is the leading and Best Elevator manufacturing company in Thrissur and Escalators Manufacturers In Kerala. We specialize in customized home elevators, high-speed passenger lifts, residential hydraulic elevators, commercial cargo lifts, architectural capsule lifts, car elevators, and automatic rescue device (ARD) systems. We are trusted across Thrissur, Kozhikode, and all of Kerala for our superior engineering and safety-first philosophy.',
}

// Build a WhatsApp deep link from an arbitrary message string.
export const waLink = (message) =>
  `${BRAND.whatsappBase}?text=${encodeURIComponent(message)}`
