import React, { useState, useEffect } from 'react';
import { 
  Eye, Glasses, Baby, Heart, Droplets, Scan, Sun, Zap, 
  Phone, MapPin, Clock, ChevronRight, ChevronDown, X, 
  Star, Shield, Award, Users, ArrowRight, Menu, Play,
  CheckCircle2, BookOpen, Sparkles, Camera, Headphones, 
  MessageSquare, Instagram, Facebook, Mail
} from 'lucide-react';

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    PHOTOGRAPHY SHOT LIST FOR EYE Q HAWAII                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  HERO SECTION (Most Important - Sets the Tone)                               ║
║  ────────────────────────────────────────────────────────────────────────────║
║  • Option A: Dr. Fernandez in exam room, warm lighting, engaged with         ║
║    equipment (not looking at camera - candid professional moment)            ║
║  • Option B: Wide shot of modern office interior with natural light          ║
║  • Option C: Artistic close-up of premium frames with soft bokeh             ║
║                                                                              ║
║  DR. FERNANDEZ PORTRAITS (Need 2-3 shots)                                    ║
║  ────────────────────────────────────────────────────────────────────────────║
║  1. Professional headshot - warm smile, clean background, wearing white      ║
║     coat or professional attire. Natural light preferred.                    ║
║  2. Environmental portrait - in office with equipment visible                ║
║  3. Candid - interacting with patient (with permission) or team              ║
║                                                                              ║
║  OFFICE & EQUIPMENT (4-6 shots)                                              ║
║  ────────────────────────────────────────────────────────────────────────────║
║  • Reception/waiting area - clean, modern, welcoming                         ║
║  • Exam room with phoropter and chair - dramatic lighting works well         ║
║  • Optical dispensary - frames beautifully displayed                         ║
║  • Retinal imaging equipment close-up                                        ║
║  • OCT or visual field machine                                               ║
║  • Exterior of building with Hawaii elements (plants, architecture)          ║
║                                                                              ║
║  EYEWEAR & PRODUCTS (4-5 shots)                                              ║
║  ────────────────────────────────────────────────────────────────────────────║
║  • Premium frames arranged artistically (Ray-Ban, Oakley focal point)        ║
║  • Sunglasses collection - lifestyle arrangement                             ║
║  • Meta Ray-Ban smart glasses - hero product shot                            ║
║  • Close-up detail of frame craftsmanship                                    ║
║  • Contact lens products/packaging                                           ║
║                                                                              ║
║  HAWAII LIFESTYLE (5-6 shots - can use some stock for these)                 ║
║  ────────────────────────────────────────────────────────────────────────────║
║  • Surfer at sunrise/sunset (sunglasses context)                             ║
║  • Hiker on Mauna Kea trail                                                  ║
║  • Beach scene - Hilo Bay or local favorite                                  ║
║  • Person paddleboarding or kayaking                                         ║
║  • Driving coastal road (polarized lens context)                             ║
║  • Local Hilo street scene or farmers market                                 ║
║                                                                              ║
║  PATIENT MOMENTS (with signed permission - 2-3 shots)                        ║
║  ────────────────────────────────────────────────────────────────────────────║
║  • Child getting eye exam (pediatric care)                                   ║
║  • Adult trying on frames, smiling                                           ║
║  • Family in waiting area                                                    ║
║                                                                              ║
║  PHOTOGRAPHY TIPS FOR THE SHOOT                                              ║
║  ────────────────────────────────────────────────────────────────────────────║
║  • Hire a local Hawaii photographer who understands the light                ║
║  • Shoot during "golden hour" for warm, inviting tones                       ║
║  • Use natural light whenever possible                                       ║
║  • Consistent color grading across all photos (warm, not clinical)           ║
║  • Avoid sterile medical stock photos - aim for boutique/spa feel            ║
║  • Include subtle Hawaii elements (plants, ocean views, local art)           ║
║  • For Dr. Fernandez: authentic, approachable, confident                     ║
║  • Budget: $500-1500 for a half-day professional shoot                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// Placeholder images - REPLACE THESE WITH YOUR ACTUAL PHOTOS
const IMAGES = {
  // HERO - Stunning Hawaii coastline - warm, inviting, paradise feel
  hero: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?w=1600&q=80',
  
  // DOCTOR - Dr. Fernandez's actual headshot (in /public/images/)
  doctor: '/images/dr-fernandez.jpg',
  
  // OFFICE - Replace with actual office photos
  examRoom: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&q=80',
  opticalShop: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80',
  
  // HAWAII LIFESTYLE - Can keep some stock, local photos better
  surf: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
  hiking: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  ocean: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=800&q=80',
  palms: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  
  // EYEWEAR - Replace with actual product shots
  smartGlasses: 'https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=800&q=80',
};

// Service data
const services = [
  { 
    id: 'exams', 
    title: 'Comprehensive Eye Exams', 
    icon: Eye,
    duration: '45-60 min',
    description: 'Complete vision and eye health assessment using advanced diagnostic technology.',
    details: ['Visual acuity testing', 'Refraction assessment', 'Eye pressure measurement', 'Retinal imaging', 'Personalized treatment plan'],
    forWho: 'Everyone 6 months and older',
    image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&q=80'
  },
  { 
    id: 'glasses', 
    title: 'Glasses & Contact Lenses', 
    icon: Glasses,
    duration: '30 min fitting',
    description: 'Expert fitting for prescription glasses and contact lenses with premium frame selection.',
    details: ['Frame styling consultation', 'Lens customization options', 'Contact lens trials', 'Progressive lens fitting', 'Sports & specialty lenses'],
    forWho: 'Anyone needing vision correction',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80'
  },
  { 
    id: 'pediatric', 
    title: 'Pediatric Eye Care', 
    icon: Baby,
    duration: '30-45 min',
    description: 'Gentle, child-friendly exams to catch vision problems early.',
    details: ['Early detection screening', 'Learning-related vision tests', 'Myopia management', 'Child-friendly environment', 'School vision requirements'],
    forWho: 'Infants through teens',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'
  },
  { 
    id: 'diabetic', 
    title: 'Diabetic Eye Exams', 
    icon: Heart,
    duration: '45-60 min',
    description: 'Critical monitoring for diabetic retinopathy and related conditions.',
    details: ['Dilated eye examination', 'Retinal photography', 'Blood vessel assessment', 'Annual monitoring', 'Coordination with your physician'],
    forWho: 'All diabetic patients',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'
  },
  { 
    id: 'dryeye', 
    title: 'Dry Eye Treatment', 
    icon: Droplets,
    duration: 'Varies',
    description: "Advanced treatments for chronic dry eye—especially important in Hawaii's climate.",
    details: ['Tear film analysis', 'Meibomian gland evaluation', 'Prescription treatments', 'Lifestyle recommendations', 'Ongoing management'],
    forWho: 'Those experiencing discomfort or irritation',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80'
  },
  { 
    id: 'specialty', 
    title: 'Glaucoma & Cataract Care', 
    icon: Scan,
    duration: '30-45 min',
    description: 'Early detection and management of glaucoma, cataracts, and macular degeneration.',
    details: ['Visual field testing', 'OCT imaging', 'Pressure monitoring', 'Surgery referrals when needed', 'Post-operative care'],
    forWho: 'Age 40+ or those with family history',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
  },
];

// Education content
const lessons = [
  {
    id: 'bluelight',
    title: 'Blue Light: Fact vs Fiction',
    duration: '2 min read',
    category: 'Digital Eye Health',
    content: 'Learn the truth about blue light from screens and what actually matters for your eye health.',
    keyPoints: ["Blue light from screens isn't as harmful as marketed", 'Digital eye strain is real but caused by focusing, not light', 'The 20-20-20 rule actually works', 'When blue light glasses make sense']
  },
  {
    id: 'sunprotection',
    title: 'UV Protection for Island Life',
    duration: '3 min read',
    category: 'Sun & Outdoors',
    content: "Hawaii's intense sun requires serious eye protection. Here's what you need to know.",
    keyPoints: ['UV exposure is 25% higher in Hawaii', 'Polarization vs UV protection—the difference matters', 'Why cheap sunglasses can be worse than none', 'Best lens colors for different activities']
  },
  {
    id: 'contacts101',
    title: 'Contact Lens Care Essentials',
    duration: '2 min read',
    category: 'Contacts',
    content: 'Avoid infections and discomfort with proper contact lens hygiene.',
    keyPoints: ['Never sleep in daily contacts', 'Replace your case monthly', 'No tap water, ever', 'Signs you need to take a break']
  },
  {
    id: 'smartglasses',
    title: 'Smart Glasses Guide',
    duration: '4 min read',
    category: 'Technology',
    content: 'Everything you need to know about Meta Ray-Ban smart glasses and prescription options.',
    keyPoints: ['What smart glasses can actually do', 'Prescription compatibility', 'Ideal for Hawaii activities', 'Battery life and privacy']
  },
];

const brands = [
  { name: 'Ray-Ban', featured: true },
  { name: 'Oakley', featured: true },
  { name: 'Versace', featured: false },
  { name: 'Coach', featured: false },
  { name: 'Michael Kors', featured: false },
  { name: 'Armani', featured: false },
  { name: 'Matsuda', featured: false },
  { name: 'Tura', featured: false },
];

export default function App() {
  const [activeService, setActiveService] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
          : 'bg-slate-900/20 backdrop-blur-sm py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm tracking-wide transition-all duration-500 ${
              scrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}>
              EQ
            </div>
            <div className="hidden sm:block">
              <span className={`font-semibold text-lg tracking-tight transition-colors duration-500 ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}>Eye Q Hawaii</span>
            </div>
          </a>
          
          <div className="hidden lg:flex items-center gap-10">
            <a href="#services" className={`transition text-sm font-medium ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Services</a>
            <a href="#eyewear" className={`transition text-sm font-medium ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Eyewear</a>
            <a href="#smart-glasses" className={`transition text-sm font-medium ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Smart Glasses</a>
            <a href="#about" className={`transition text-sm font-medium ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Dr. Fernandez</a>
            <a href="#education" className={`transition text-sm font-medium ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Resources</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="tel:+18084644468" className={`hidden md:flex items-center gap-2 transition ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">(808) 464-4468</span>
            </a>
            <button 
              onClick={() => setShowBooking(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                scrolled 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-white text-slate-900 hover:bg-white/90'
              }`}
            >
              Book Appointment
            </button>
            <button 
              className={`lg:hidden p-2 -mr-2 transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
            <div className="p-6">
              <button 
                className="absolute top-6 right-6"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mt-12 space-y-1">
                {['Services', 'Eyewear', 'Smart Glasses', 'Dr. Fernandez', 'Resources'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-').replace('.', '')}`} 
                    className="block py-3 text-lg font-medium text-slate-800 hover:text-slate-600 transition border-b border-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <a href="tel:+18084644468" className="flex items-center gap-3 text-slate-600 mb-4">
                  <Phone className="w-5 h-5" />
                  <span>(808) 464-4468</span>
                </a>
                <button 
                  onClick={() => { setShowBooking(true); setMobileMenuOpen(false); }}
                  className="w-full bg-slate-900 text-white py-3 rounded-full font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen relative">
        <div className="absolute inset-0">
          <img 
            src={IMAGES.hero}
            alt="Eye Q Hawaii - Premium Eye Care in Hilo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-32">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
                <MapPin className="w-4 h-4" />
                <span>Hilo, Big Island</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-6">
                Sharper Vision.
                <br />
                <span className="text-white/80">Smarter Care.</span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
                Where advanced eye care meets aloha spirit. Hilo's destination for comprehensive vision services, premium eyewear, and personalized attention.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowBooking(true)}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition flex items-center justify-center gap-2 group"
                >
                  <span>Schedule Your Visit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="#services"
                  className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition flex items-center justify-center"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="bg-white/10 backdrop-blur-md rounded-t-2xl border border-white/20 border-b-0">
              <div className="grid grid-cols-3 divide-x divide-white/20">
                {[
                  { value: '15+', label: 'Years in Hilo' },
                  { value: '1k+', label: 'Patients Served' },
                  { value: '5.0', label: 'Google Rating' },
                ].map((stat, i) => (
                  <div key={i} className="py-6 px-8 text-center">
                    <div className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Shield, title: 'Board Certified', desc: 'Hawaii Licensed Optometrist' },
              { icon: Zap, title: 'Advanced Technology', desc: 'Latest Diagnostic Equipment' },
              { icon: Users, title: 'Family Practice', desc: 'All Ages Welcome' },
              { icon: Award, title: 'Locally Trusted', desc: 'Serving Big Island Families' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Dr. Fernandez */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src={IMAGES.doctor}
                  alt="Dr. Caron Fernandez - Optometrist at Eye Q Hawaii"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[240px]">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 text-sm italic">"Dr. Fernandez is incredibly thorough and genuinely cares about her patients."</p>
                <p className="text-slate-400 text-xs mt-2">— Google Review</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Meet Your Doctor</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight mb-6">
                Dr. Caron Fernandez
              </h2>
              <p className="text-slate-500 mb-2 font-medium">O.D. — Doctor of Optometry</p>
              
              <div className="prose prose-lg text-slate-600 mt-8">
                <p>
                  With deep roots in the Big Island community, Dr. Fernandez brings both clinical excellence and genuine aloha to every patient interaction.
                </p>
                <p>
                  After completing her doctorate at the University of the Incarnate Word's Rosenberg School of Optometry, she returned to Hawaii with a mission: to provide Hilo with eye care that matches the quality of any mainland practice, while maintaining the warmth and personal attention that island families deserve.
                </p>
                <p>
                  From keiki to kūpuna, every patient is treated like family.
                </p>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-3">
                {['Comprehensive Eye Exams', 'Pediatric Specialist', 'Diabetic Eye Care', 'Dry Eye Expert'].map((specialty, i) => (
                  <span key={i} className="text-sm bg-slate-100 text-slate-600 px-4 py-2 rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => setShowBooking(true)}
                className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition flex items-center gap-2 group"
              >
                <span>Schedule with Dr. Fernandez</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Our Services</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
              Comprehensive Vision Care
            </h2>
            <p className="text-lg text-slate-600 mt-6">
              From routine exams to specialized treatment, we provide complete eye care for the whole family.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;
              
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(isActive ? null : service.id)}
                  className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                    isActive ? 'ring-2 ring-slate-900' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-700" />
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                        {service.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-600 text-sm">{service.description}</p>
                    
                    {isActive && (
                      <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 mb-3">What's Included</h4>
                          <ul className="space-y-2">
                            {service.details.map((detail, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                          <span className="text-xs text-slate-500">Recommended for: </span>
                          <span className="text-sm font-medium text-slate-700">{service.forWho}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowBooking(true); }}
                          className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
                        >
                          Book This Service
                        </button>
                      </div>
                    )}
                    
                    {!isActive && (
                      <div className="mt-4 flex items-center text-slate-900 text-sm font-medium">
                        <span>Learn more</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eyewear Section */}
      <section id="eyewear" className="relative">
        <div className="h-[60vh] lg:h-[70vh] relative">
          <img 
            src={IMAGES.surf}
            alt="Hawaii lifestyle - premium sunglasses for island life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full">
              <div className="max-w-xl">
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Optical Boutique</p>
                <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
                  Style Meets Protection
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  From Mauna Kea summits to Hilo Bay surf, our curated collection of premium frames and sunglasses keeps you looking sharp and seeing clearly.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {['100% UV Protection', 'Polarized Options', 'Prescription Available'].map((feature, i) => (
                    <span key={i} className="text-sm bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
                      {feature}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setShowBooking(true)}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition"
                >
                  Browse Collection
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              {brands.map((brand) => (
                <div 
                  key={brand.name}
                  className={`text-lg font-medium ${brand.featured ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Glasses Section */}
      <section id="smart-glasses" className="py-24 lg:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Performance AI Glasses – Now in Your Prescription</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                Oakley Meta
                <br />
                <span className="text-white/60">Smart Glasses</span>
              </h2>
              
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Built for athletes who push limits. Capture your Hawaii adventures in stunning 3K video, hands-free. Take calls while paddleboarding. Get real-time AI assistance on the trail. With IPX4 water resistance and 8-hour battery life, these aren't just sunglasses—they're your AI-powered performance partner.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Camera, label: '12MP camera, 3K video', desc: 'Ultra-wide POV capture' },
                  { icon: Headphones, label: '8-hour battery life', desc: 'Plus 48hrs in case' },
                  { icon: Droplets, label: 'IPX4 water resistant', desc: 'Sweat & splash proof' },
                  { icon: MessageSquare, label: 'Meta AI built-in', desc: 'Visual intelligence on demand' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <item.icon className="w-6 h-6 text-white/60 mb-3" />
                    <div className="font-medium text-white mb-1">{item.label}</div>
                    <div className="text-sm text-white/50">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                {['Prizm Lens Technology', 'Garmin & Strava Integration', 'Prescription Available'].map((feature, i) => (
                  <span key={i} className="text-xs bg-white/10 text-white/80 px-3 py-1.5 rounded-full border border-white/10">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowBooking(true)}
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition"
                >
                  Book a Demo
                </button>
                <button className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-black">
                <img 
                  src="/images/oakley-meta.png"
                  alt="Oakley Meta Smart Glasses"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 rounded-2xl shadow-2xl p-6">
                <div className="text-sm text-slate-500 mb-1">Starting at</div>
                <div className="text-3xl font-bold">$399</div>
                <div className="text-sm text-slate-500">+ prescription lenses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hawaii Lifestyle Gallery */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-4">
              Protect Your Vision in Paradise
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hawaii's intense UV exposure demands serious eye protection. Whatever your island adventure, we have the right eyewear.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { img: IMAGES.surf, label: 'Surfing', desc: 'Polarized water lenses' },
              { img: IMAGES.hiking, label: 'Hiking', desc: 'UV400 protection' },
              { img: IMAGES.beach, label: 'Beach', desc: 'Anti-glare coating' },
              { img: IMAGES.ocean, label: 'Ocean Sports', desc: 'Impact resistant' },
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img 
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-semibold text-white">{item.label}</div>
                  <div className="text-sm text-white/70">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Patient Resources</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
                Eye Health Education
              </h2>
            </div>
            <p className="text-lg text-slate-600 lg:max-w-md">
              Quick, helpful guides to understand and protect your vision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {lessons.map((lesson) => {
              const isActive = activeLesson === lesson.id;
              
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(isActive ? null : lesson.id)}
                  className={`bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                    isActive ? 'ring-2 ring-slate-900' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {lesson.category}
                    </span>
                    <span className="text-xs text-slate-400">{lesson.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{lesson.title}</h3>
                  <p className="text-slate-600">{lesson.content}</p>
                  
                  {isActive && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-sm font-semibold text-slate-900">Key Takeaways</h4>
                      <ul className="space-y-3">
                        {lesson.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </div>
                            <span className="text-sm text-slate-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {!isActive && (
                    <div className="mt-4 flex items-center text-slate-900 text-sm font-medium">
                      <span>Read more</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={IMAGES.palms}
            alt="Hawaii palm trees"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Ready for Clearer Vision?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Schedule your comprehensive eye exam today. Same-week appointments typically available.
          </p>
          <button 
            onClick={() => setShowBooking(true)}
            className="bg-white text-slate-900 px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/90 transition shadow-lg"
          >
            Schedule Your Appointment
          </button>
          
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60">
            <a href="tel:+18084644468" className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-5 h-5" />
              <span>(808) 464-4468</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Hilo, Hawaii</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Mon–Fri 8am–5pm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-900 font-semibold text-sm">
                  EQ
                </div>
                <span className="font-semibold text-xl">Eye Q Hawaii</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Hilo's trusted eye care destination. Comprehensive vision services with aloha spirit, serving Big Island families since 2008.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#services" className="hover:text-white transition">Eye Exams</a></li>
                <li><a href="#services" className="hover:text-white transition">Glasses & Contacts</a></li>
                <li><a href="#services" className="hover:text-white transition">Pediatric Care</a></li>
                <li><a href="#services" className="hover:text-white transition">Diabetic Eye Care</a></li>
                <li><a href="#smart-glasses" className="hover:text-white transition">Smart Glasses</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+18084644468" className="hover:text-white transition">(808) 464-4468</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@eyeqhawaii.com" className="hover:text-white transition">info@eyeqhawaii.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Hilo, Hawaii</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon–Fri 8am–5pm</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2025 Eye Q Hawaii. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowBooking(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Book Your Appointment</h3>
              <p className="text-slate-500">Fill out the form below and we'll contact you to confirm your visit.</p>
            </div>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Service</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition bg-white">
                  <option>Comprehensive Eye Exam</option>
                  <option>Contact Lens Fitting</option>
                  <option>Glasses Consultation</option>
                  <option>Smart Glasses Demo</option>
                  <option>Diabetic Eye Exam</option>
                  <option>Dry Eye Consultation</option>
                  <option>Pediatric Eye Exam</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(808) 555-0000" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email (optional)</label>
                <input 
                  type="email" 
                  placeholder="you@email.com" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition" 
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition mt-2"
              >
                Request Appointment
              </button>
              
              <p className="text-center text-sm text-slate-500">
                Or call us directly at{' '}
                <a href="tel:+18084644468" className="text-slate-900 font-medium">(808) 464-4468</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
