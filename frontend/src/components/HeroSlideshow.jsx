import React, { useState, useEffect } from 'react';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const slides = [
    {
      src: '/images/wheel-barrell.jpg',
      alt: 'Landscaping professionals working with wheelbarrow'
    },
    {
      src: '/images/courtyard.jpg',
      alt: 'Beautiful formal garden with ornamental urn and colorful flowers'
    },
    {
      src: '/images/mower.jpg',
      alt: 'Professional lawn mowing service with modern equipment'
    }
  ];

  const menuItems = [
    { name: 'Home', href: '#home', delay: 0 },
    { name: 'Services', href: '#services', delay: 100 },
    { name: 'About', href: '#about', delay: 200 },
    { name: 'Contact', href: '#contact', delay: 300 }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-animate');
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
        
        if (isInView) {
          // Section is in view - show it
          section.classList.add('opacity-100', 'translate-y-0');
          section.classList.remove('opacity-0', 'translate-y-20', '-translate-y-20');
        } else {
          // Section is out of view - hide it based on scroll direction
          section.classList.remove('opacity-100', 'translate-y-0');
          section.classList.add('opacity-0');
          
          if (rect.top > windowHeight) {
            // Section is below viewport - prepare to slide up
            section.classList.add('translate-y-20');
            section.classList.remove('-translate-y-20');
          } else if (rect.bottom < 0) {
            // Section is above viewport - prepare to slide down
            section.classList.add('-translate-y-20');
            section.classList.remove('translate-y-20');
          }
        }
      });
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          @keyframes shine {
            0% {
              transform: translateX(-100%) skewX(-15deg);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(200%) skewX(-15deg);
              opacity: 0;
            }
          }
          .animate-shine {
            animation: shine 3s ease-in-out infinite;
          }
          @keyframes wave {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-wave {
            animation: wave 4s ease-in-out infinite;
          }
          @keyframes gradient-border {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-border {
            background-size: 300% 300%;
            animation: gradient-border 3s ease infinite;
          }
          @keyframes cardDeal {
            0% {
              opacity: 0;
              transform: translateX(-120vw) translateY(-30vh) rotate(-15deg) scale(0.9);
              filter: blur(2px);
            }
            50% {
              opacity: 1;
              filter: blur(0px);
            }
            80% {
              transform: translateX(0) translateY(0) rotate(3deg) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(0) rotate(0deg) scale(1);
              filter: blur(0px);
            }
          }
          .service-card {
            animation: cardDeal 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            opacity: 0;
            transform-origin: center center;
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-wave"></div>
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <img 
              src="/favicon.png" 
              alt="EverSquirrel Logo" 
              className="h-16 w-16 object-contain rounded-lg"
            />
            <div className="text-2xl lg:text-3xl font-bold tracking-wide relative overflow-hidden rounded-xl px-4 py-2">
              <span className="relative z-10 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">EverSquirrel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine pointer-events-none rounded-xl"></div>
            </div>
          </div>
          
          <ul className="hidden md:flex items-center gap-6 ml-auto">
            <li>
              <a href="#home" className="relative px-4 py-1.5 text-white font-semibold transition-all duration-300 group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </a>
            </li>
            <li>
              <a href="#services" className="relative px-4 py-1.5 text-white font-semibold transition-all duration-300 group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </a>
            </li>
            <li>
              <a href="#about" className="relative px-4 py-1.5 text-white font-semibold transition-all duration-300 group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </a>
            </li>
            <li>
              <a href="#contact" className="relative px-5 py-1.5 bg-white text-orange-600 font-bold rounded-lg transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:scale-110 hover:-rotate-2">
                Contact
              </a>
            </li>
          </ul>

          <button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center z-50 touch-manipulation active:scale-95 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-emerald-700 rounded-full transition-all duration-500 ease-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-emerald-700 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></span>
              <span className={`block h-0.5 w-full bg-emerald-700 rounded-full transition-all duration-500 ease-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </nav>

        {/* Advanced Mobile Menu Overlay */}
        <div 
          className={`md:hidden fixed inset-0 z-40 transition-all duration-700 ease-in-out ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{
            background: menuOpen 
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(15, 23, 42, 0.98) 100%)'
              : 'transparent',
            backdropFilter: menuOpen ? 'blur(10px)' : 'blur(0px)',
            opacity: menuOpen ? 1 : 0
          }}
        >
          {/* Decorative animated background elements */}
          <div className={`absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ${menuOpen ? 'translate-x-0 translate-y-0 scale-100' : 'translate-x-full -translate-y-full scale-0'}`}></div>
          <div className={`absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transition-all duration-1000 delay-150 ${menuOpen ? 'translate-x-0 translate-y-0 scale-100' : '-translate-x-full translate-y-full scale-0'}`}></div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-8 safe-area-inset pt-40">
            {/* Logo at top of menu */}
            <div className={`absolute top-20 sm:top-24 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-200 z-50 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
              <div className="flex flex-col items-center gap-3 min-w-[200px] animate-float">
                <img 
                  src="/favicon.png" 
                  alt="EverSquirrel Logo" 
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3"
                />
                <div className="text-2xl sm:text-3xl font-bold tracking-wide bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent whitespace-nowrap px-4">
                  EverSquirrel
                </div>
              </div>
            </div>
            
            {/* Animated menu items with card design */}
            <nav className="flex flex-col items-stretch space-y-3 sm:space-y-4 w-full max-w-md mt-12">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`transform transition-all duration-500 ease-out ${
                    menuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: menuOpen ? `${item.delay + 100}ms` : '0ms'
                  }}
                >
                  <a
                    href={item.href}
                    onClick={handleMenuClick}
                    className="group relative block overflow-hidden touch-manipulation"
                  >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 via-emerald-500 via-teal-500 to-yellow-500 p-[2px] animate-gradient-border">
                      <div className="h-full w-full bg-gradient-to-r from-slate-700/95 to-slate-800/95 rounded-[10px]"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="relative bg-gradient-to-r from-slate-700/95 to-slate-800/95 backdrop-blur-md rounded-xl px-6 py-4 transition-all duration-300 group-active:scale-95 hover:from-slate-600/95 hover:to-slate-700/95">
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight relative z-10 transition-all duration-300 flex items-center justify-between group-hover:text-emerald-400">
                        {item.name}
                        <svg className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </nav>

            {/* Enhanced footer with social proof */}
            <div className={`absolute bottom-8 sm:bottom-12 left-0 right-0 text-center px-8 transition-all duration-700 delay-700 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 max-w-[260px] sm:max-w-[280px] mx-auto">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0"></div>
                <p className="text-white/90 text-[10px] sm:text-xs font-medium tracking-wide truncate leading-tight">
                  Transform Your Outdoor Paradise
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden bg-emerald-50">
        
        {/* Slideshow Container */}
        <div 
          className="relative w-full h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 blur-0 scale-100' 
                  : 'opacity-0 blur-sm scale-105'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.style.backgroundColor = '#14b8a6';
                }}
              />
            </div>
          ))}
        </div>

        {/* Dark Tint Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-emerald-500/20 z-10"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6" style={{ paddingTop: '60px' }}>
          <div className="text-center max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              Transform Your<br />
              <span className="text-orange-400 sm:text-orange-500">Outdoor Paradise</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-4">
              Expert landscaping services that bring your vision to life. From design to installation and maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-lg mx-auto px-4">
              <a 
                href="#contact" 
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl touch-manipulation text-sm sm:text-base"
              >
                Get Free Consultation
              </a>
              <a 
                href="#services" 
                className="bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-orange-500 active:border-orange-600 touch-manipulation text-sm sm:text-base"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Slideshow Navigation Dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? 'bg-white w-6 sm:w-8'
                  : 'bg-white/50 hover:bg-white/75 w-2 sm:w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-30 animate-bounce hidden sm:block">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50 overflow-hidden transition-all duration-1000 ease-out opacity-0 translate-y-20 section-animate">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">Services</span>
            </h2>
          </div>

          {/* Services Grid - 3 columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {/* Service Card 1 */}
            <div className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                Landscape Design
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Custom designs that blend aesthetics with functionality, creating outdoor spaces that reflect your vision.
              </p>
              <button className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300">
                Learn More →
              </button>
            </div>

            {/* Service Card 2 */}
            <div className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                Lawn Maintenance
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Regular mowing, edging, and care to keep your lawn looking pristine throughout the seasons.
              </p>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300">
                Learn More →
              </button>
            </div>

            {/* Service Card 3 */}
            <div className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                Installation
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Expert installation of plants, irrigation systems, and hardscaping elements for lasting beauty.
              </p>
              <button className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300">
                Learn More →
              </button>
            </div>

            {/* Service Card 4 */}
            <div className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                Seasonal Cleanup
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Spring and fall cleanup services to prepare your landscape for the changing seasons.
              </p>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300">
                Learn More →
              </button>
            </div>

            {/* Service Card 5 */}
            <div className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: '1s' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                Tree & Shrub Care
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Professional pruning, trimming, and health maintenance for all your trees and shrubs.
              </p>
              <button className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300">
                Learn More →
              </button>
            </div>

            {/* Service Card 6 */}
            <div className="service-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: '1.2s' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                Outdoor Lighting
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Enhance your landscape's beauty and safety with expertly designed outdoor lighting systems.
              </p>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white overflow-hidden transition-all duration-1000 ease-out opacity-0 translate-y-20 section-animate">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
                Why Choose <span className="bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent">EverSquirrel</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                We're passionate about creating beautiful outdoor spaces that enhance your lifestyle
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              {/* Left Column - Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-emerald-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="/images/aerial-landscape.jpg" 
                    alt="Aerial view of beautiful landscaping with curved pathways"
                    className="w-full h-full object-cover aspect-square transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 aspect-square items-center justify-center">
                    <svg className="w-48 h-48 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column - Text */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Expert Team</h3>
                    <p className="text-slate-600">Our certified professionals bring years of experience and passion to every project.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Quality Guaranteed</h3>
                    <p className="text-slate-600">We use only premium materials and proven techniques to ensure lasting results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">On-Time Service</h3>
                    <p className="text-slate-600">We respect your time with punctual arrivals and efficient project completion.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">500+</div>
                <div className="text-slate-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-2">15+</div>
                <div className="text-slate-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent mb-2">98%</div>
                <div className="text-slate-600 font-medium">Client Satisfaction</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-slate-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden transition-all duration-1000 ease-out opacity-0 translate-y-20 section-animate">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-emerald-50 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-emerald-400 to-orange-400"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
                Get In <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">Touch</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                Ready to transform your outdoor space? Let's discuss your landscaping project today
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Contact Form - Full Width Professional Layout */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Left Side - Contact Info */}
                  <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-10 text-white">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6">Contact Information</h3>
                    <p className="text-slate-300 mb-8 text-sm">Fill out the form and our team will get back to you within 24 hours.</p>
                    
                    <div className="space-y-6">
                      {/* Contact Card 1 */}
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center cursor-pointer transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-orange-500/50">
                          <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Phone</h4>
                          <p className="text-slate-300 text-sm">(555) 123-4567</p>
                        </div>
                      </div>

                      {/* Contact Card 2 */}
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center cursor-pointer transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-emerald-500/50">
                          <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="text-slate-300 text-sm">info@eversquirrel.com</p>
                        </div>
                      </div>

                      {/* Contact Card 3 */}
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 via-yellow-400 to-emerald-400 rounded-xl flex items-center justify-center cursor-pointer transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-yellow-500/50">
                          <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Location</h4>
                          <p className="text-slate-300 text-sm">123 Garden Avenue<br/>Los Angeles, CA 90001</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Form */}
                  <div className="md:col-span-3 p-8 lg:p-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Send us a message</h3>
                    <form className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-2 text-sm">Your Name</label>
                          <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-2 text-sm">Email Address</label>
                          <input 
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 text-sm">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 text-sm">Your Message</label>
                        <textarea 
                          rows="5"
                          placeholder="Tell us about your project..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300 resize-none"
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-500 hover:from-orange-600 hover:via-orange-500 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Company Info */}
              <div>
                <p className="text-base leading-relaxed bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent font-semibold mb-4">
                  Transform your outdoor paradise with professional landscaping services.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Home</a></li>
                  <li><a href="#services" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Services</a></li>
                  <li><a href="#about" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">About</a></li>
                  <li><a href="#contact" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Contact</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-bold mb-4 text-white">Get In Touch</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-slate-400">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    (555) 123-4567
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    info@eversquirrel.com
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-col items-center gap-6">
                {/* Logo and Copyright centered */}
                <div className="flex items-center gap-3">
                  <img 
                    src="/favicon.png" 
                    alt="EverSquirrel Logo" 
                    className="h-8 w-8 object-contain rounded-lg"
                  />
                  <div className="text-lg font-bold bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
                    EverSquirrel
                  </div>
                  <span className="text-slate-500">|</span>
                  <p className="text-slate-400 text-sm">
                    © 2025 All rights reserved.
                  </p>
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-emerald-500 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSlideshow;