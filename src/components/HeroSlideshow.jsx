import React, { useState, useEffect } from 'react';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 shadow-md transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex justify-between items-center min-h-[80px] sm:min-h-[90px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/favicon.png" 
              alt="EverSquirrel Landscaping Logo" 
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain rounded-lg"
            />
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
              EverSquirrel
            </div>
          </div>
          
          <ul className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 text-emerald-600 font-medium">
            <li>
              <a href="#home" className="px-3 py-2 lg:px-4 rounded-lg transition-all duration-300 hover:bg-emerald-500 hover:text-orange-500 text-sm lg:text-base">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="px-3 py-2 lg:px-4 rounded-lg transition-all duration-300 hover:bg-emerald-500 hover:text-orange-500 text-sm lg:text-base">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="px-3 py-2 lg:px-4 rounded-lg transition-all duration-300 hover:bg-emerald-500 hover:text-orange-500 text-sm lg:text-base">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="px-3 py-2 lg:px-4 rounded-lg transition-all duration-300 hover:bg-emerald-500 hover:text-orange-500 text-sm lg:text-base">
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
          className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-out ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {/* Layered gradient backgrounds */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-emerald-500/20"></div>
          </div>
          
          {/* Animated geometric patterns */}
          <div className={`absolute inset-0 overflow-hidden transition-opacity duration-700 delay-100 ${menuOpen ? 'opacity-20' : 'opacity-0'}`}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-transparent rounded-full blur-3xl transform transition-transform duration-1000" 
              style={{ transform: menuOpen ? 'translate(0, 0) scale(1)' : 'translate(100%, -100%) scale(0)' }}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500 to-transparent rounded-full blur-3xl transform transition-transform duration-1000 delay-200" 
              style={{ transform: menuOpen ? 'translate(0, 0) scale(1)' : 'translate(-100%, 100%) scale(0)' }}></div>
          </div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-8 safe-area-inset pt-40">
            {/* Logo at top of menu */}
            <div className={`absolute top-20 sm:top-24 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-200 z-50 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
              <div className="flex flex-col items-center gap-3">
                <img 
                  src="/favicon.png" 
                  alt="EverSquirrel Logo" 
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3"
                />
                <div className="text-2xl sm:text-3xl font-bold tracking-wide bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
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
                    {/* Card container with glassmorphism */}
                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 transition-all duration-300 group-hover:bg-white/10 group-hover:border-orange-500/50 group-active:scale-95">
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight relative z-10 transition-all duration-300 group-hover:text-orange-400 flex items-center justify-between">
                        {item.name}
                        <svg className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section id="services" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-transparent"></div>
        <div className="absolute -top-20 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">Premium Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Transform your outdoor space with our comprehensive landscaping solutions
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Service Card 1 - Landscape Design */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  Landscape Design & Installation
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Create stunning outdoor spaces with our expert design and installation services. From concept to completion, we bring your vision to life with carefully selected plants, hardscaping, and custom features.
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Custom garden design & planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Hardscape installation (patios, walkways)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Plant selection & installation</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg">
                  Learn More
                </button>
              </div>
            </div>

            {/* Service Card 2 - Lawn Care & Maintenance */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-emerald-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  Lawn Care & Maintenance
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Keep your outdoor space looking pristine year-round with our comprehensive maintenance services. We handle everything from mowing to seasonal cleanups, ensuring your landscape stays healthy and beautiful.
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Regular mowing & edging services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Seasonal cleanup & debris removal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">Fertilization & weed control</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
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
      <section id="contact" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
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

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-slate-100">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Send us a message</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">Your Message</label>
                    <textarea 
                      rows="4"
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

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Contact Card 1 */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Phone</h4>
                      <p className="text-slate-600">(555) 123-4567</p>
                      <p className="text-slate-500 text-sm mt-1">Mon-Fri, 8am-6pm</p>
                    </div>
                  </div>
                </div>

                {/* Contact Card 2 */}
                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Email</h4>
                      <p className="text-slate-600">info@eversquirrel.com</p>
                      <p className="text-slate-500 text-sm mt-1">We reply within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Contact Card 3 */}
                <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-emerald-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 via-yellow-400 to-emerald-400 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Location</h4>
                      <p className="text-slate-600">123 Garden Avenue</p>
                      <p className="text-slate-600">Los Angeles, CA 90001</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/favicon.png" 
                  alt="EverSquirrel Logo" 
                  className="h-12 w-12 object-contain rounded-lg"
                />
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
                  EverSquirrel
                </div>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Transform your outdoor paradise with professional landscaping services. We bring beauty, functionality, and value to every project.
              </p>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-slate-400">Available for new projects</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">Home</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">Services</a></li>
                <li><a href="#about" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">About</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">Landscape Design</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">Lawn Maintenance</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">Installation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">Seasonal Cleanup</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center sm:text-left">
              © 2025 EverSquirrel Landscaping. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSlideshow;