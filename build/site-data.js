/* ============================================================
   KALYAN ELEVATORS — single source of truth for site structure
   Consumed by build/build-layout.js to bake static markup into
   every page. Nothing here is rendered at runtime.
   ============================================================ */

/* [slug, display name, hero image, product family]
   Families group the range into four accent identities so the nine
   product pages read as distinct without inventing nine palettes. */
const PRODUCTS = [
  ['passenger-elevators.html',  'Passenger Elevators',  'images/passenger-hero.webp',      'residential'],
  ['home-elevators.html',       'Home Elevators',       'images/home-elevator-hero.webp',  'residential'],
  ['glass-elevators.html',      'Glass Elevators',      'images/glass-hero.webp',          'scenic'],
  ['capsule-elevators.html',    'Capsule Elevators',    'images/capsule-hero.webp',        'scenic'],
  ['commercial-elevators.html', 'Commercial Elevators', 'images/commercial-hero.webp',     'commercial'],
  ['hospital-elevators.html',   'Hospital Elevators',   'images/hospital-hero.webp',       'commercial'],
  ['car-elevators.html',        'Car Elevators',        'images/car-hero.webp',            'utility'],
  ['freight-elevators.html',    'Freight Elevators',    'images/freight-hero.webp',        'utility'],
  ['structural-elevators.html', 'Structural Elevators', 'images/structural-hero.webp',     'utility']
];

/* Blurbs are lifted verbatim from each page's own meta description —
   no new copy is introduced anywhere in the build. */
const BLURBS = {
  'passenger-elevators.html':  'Passenger elevators for residential towers and high-rise apartments — engineered for ride comfort, noise reduction and refined cabin aesthetics.',
  'home-elevators.html':       'Machine-room-less home elevators for villas, penthouses and private estates — ultra-quiet, compact and finished in bespoke interiors.',
  'glass-elevators.html':      'Panoramic glass elevators with sleek steel and brass frames — designed for natural light and open-concept architecture.',
  'capsule-elevators.html':    'Iconic curved-glass capsule elevators for hotels, malls and building exteriors — a scenic passenger experience with architectural impact.',
  'commercial-elevators.html': 'High-traffic commercial elevators with smart dispatching, destination control and high travel speeds for corporate lobbies and office complexes.',
  'hospital-elevators.html':   'Hospital elevators engineered for medical logistics — smooth start/stop curves, stretcher accessibility, hygienic stainless interiors and emergency priority control.',
  'car-elevators.html':        'Car elevators for luxury showrooms and residential garages — high load capacity, dual control panels, structural floor locks and vertical parking technology.',
  'freight-elevators.html':    'Heavy-duty freight elevators with reinforced steel floors, bi-parting doors and industrial-grade durability for demanding cargo transport.',
  'structural-elevators.html': 'Self-supporting structural elevators for outdoor installations and buildings without concrete shafts — weatherproof glass and steel towers, engineered on site.'
};

const NAV = [
  ['index.html',   'Home'],
  ['about.html',   'About'],
  ['gallery.html', 'Gallery'],
  ['contact.html', 'Contact']
];

const CONTACT = {
  phoneDisplay: '+91 79949 98880',
  phoneHref:    'tel:+917994998880',
  whatsapp:     'https://wa.me/917994998880',
  email:        'info@kalyanelevators.in',
  headOffice:   '2nd Floor, Ruqia Chambers, Kovilvattam Junction, TD Road, Kochi, Kerala - 682035',
  branchOffice: 'TMC 36/2551, Third Floor, Jomsons Tower, Chettiynagdi Junction, Post Office Rd, Opposite Lavish Electronics, Thrissur, Kerala - 680001'
};

/* Every page the build touches. */
const PAGES = ['index.html', 'about.html', 'gallery.html', 'contact.html', 'elevators.html']
  .concat(PRODUCTS.map(p => p[0]));

module.exports = { PRODUCTS, BLURBS, NAV, CONTACT, PAGES };
