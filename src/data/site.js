// Single source of truth for NAP (name/address/phone), hours, and nav.
export const site = {
  name: 'Eye Q Hawaii',
  legalName: 'Eye Q Hawaii',
  tagline: 'Sharper Vision. Smarter Care.',
  description:
    "Hilo's destination for comprehensive eye care, premium eyewear, and advanced vision technology, delivered with genuine aloha by Dr. Caron Fernandez, O.D.",
  url: 'https://eyeqhawaii.com',
  phone: '(808) 464-4468',
  phoneHref: 'tel:+18084644468',
  email: 'info@eyeqhawaii.com',
  address: {
    locality: 'Hilo',
    region: 'HI',
    regionName: 'Hawaii',
    area: 'Big Island',
    country: 'US',
  },
  geo: { lat: 19.7297, lng: -155.09 },
  hours: [
    { day: 'Monday', open: '08:00', close: '17:00' },
    { day: 'Tuesday', open: '08:00', close: '17:00' },
    { day: 'Wednesday', open: '08:00', close: '17:00' },
    { day: 'Thursday', open: '08:00', close: '17:00' },
    { day: 'Friday', open: '08:00', close: '17:00' },
  ],
  hoursLabel: 'Mon-Fri 8am-5pm',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },
  // Patient self-service portals (external)
  orderContacts: 'https://eyeqhawaii.myclstore.com/Order/Welcome?aN=412817',
  payOnline: 'https://securepymt.net/?id=EovxsjPdi4',
  visionSource: true,
};

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Eyewear', href: '/eyewear' },
  { label: 'Smart Glasses', href: '/smart-glasses' },
  { label: 'Vision Test', href: '/vision-test' },
  { label: 'Dr. Fernandez', href: '/about' },
  { label: 'Resources', href: '/resources' },
];
