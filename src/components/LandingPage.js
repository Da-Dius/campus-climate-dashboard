import React, { useEffect, useState } from 'react';
import { BarChart3, Users, TrendingUp, Shield, Download, ArrowRight, Menu, X } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add enhanced animation styles with mobile-first responsive design
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        50% { transform: translateY(-20px) rotate(5deg) scale(1.05); }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        50% { transform: translateY(-15px) rotate(-3deg) scale(1.03); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        50% { transform: translateY(-10px) rotate(2deg) scale(1.02); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
      }
      @keyframes slideInFromBottom {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes bounce-in {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes slide-in-left {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slide-in-right {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes rotate-in {
        from { transform: rotate(-180deg) scale(0); opacity: 0; }
        to { transform: rotate(0deg) scale(1); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
      }
      
      .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
      .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
      .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
      .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
      .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
      .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      .animate-slide-in-bottom { animation: slideInFromBottom 0.8s ease-out forwards; }
      .animate-bounce-in { animation: bounce-in 0.8s ease-out forwards; }
      .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
      .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
      .animate-rotate-in { animation: rotate-in 0.8s ease-out forwards; }
      .animate-shimmer { animation: shimmer 2s linear infinite; }
      .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
      .animate-wave { animation: wave 3s ease-in-out infinite; }
      
      /* Enhanced hover effects and transitions */
      .hover-lift { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover-lift:hover { transform: translateY(-8px); }
      
      .hover-scale { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover-scale:hover { transform: scale(1.05); }
      
      .hover-glow { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover-glow:hover { 
        box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        transform: translateY(-4px);
      }
      
      .hover-rotate { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover-rotate:hover { transform: rotate(5deg); }
      
      .hover-bounce { transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      .hover-bounce:hover { transform: scale(1.1) translateY(-5px); }
      
      .hover-slide { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover-slide:hover { transform: translateX(5px); }
      
      .hover-pulse { transition: all 0.3s ease; }
      .hover-pulse:hover { 
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
      }
      
      .hover-glow-text { transition: all 0.3s ease; }
      .hover-glow-text:hover { 
        text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        color: #2563eb;
      }
      
      .hover-border-glow { transition: all 0.3s ease; }
      .hover-border-glow:hover { 
        border-color: #3b82f6;
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
      }
      
      .hover-bg-gradient { transition: all 0.3s ease; }
      .hover-bg-gradient:hover { 
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        transform: translateY(-2px);
      }
      
      /* Smooth transitions for all interactive elements */
      * { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
      
      /* Enhanced button hover effects */
      .btn-primary { 
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      .btn-primary:hover::before {
        left: 100%;
      }
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
      }
      
      /* Card hover effects */
      .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .card-hover:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }
      
      /* Icon hover effects */
      .icon-hover { transition: all 0.3s ease; }
      .icon-hover:hover {
        transform: rotate(15deg) scale(1.2);
        color: #3b82f6;
      }
      
      /* Text hover effects */
      .text-hover { transition: all 0.3s ease; }
      .text-hover:hover {
        color: #3b82f6;
        transform: translateX(3px);
      }
      
      /* Mobile-first responsive optimizations */
      @media (max-width: 640px) {
        .animate-float-slow, .animate-float-medium, .animate-float-fast {
          animation-duration: 8s;
        }
        .mobile-text-sm { font-size: 0.875rem; }
        .mobile-text-base { font-size: 1rem; }
        .mobile-text-lg { font-size: 1.125rem; }
        .hover-lift:hover { transform: translateY(-4px); }
        .hover-scale:hover { transform: scale(1.03); }
      }
      
      @media (min-width: 641px) and (max-width: 1024px) {
        .tablet-text-base { font-size: 1rem; }
        .tablet-text-lg { font-size: 1.125rem; }
        .tablet-text-xl { font-size: 1.25rem; }
      }
      
      @media (min-width: 1025px) {
        .desktop-text-lg { font-size: 1.125rem; }
        .desktop-text-xl { font-size: 1.25rem; }
        .desktop-text-2xl { font-size: 1.5rem; }
      }
      
      /* Touch-friendly mobile interactions */
      @media (max-width: 640px) {
        .touch-target { min-height: 44px; min-width: 44px; }
        .mobile-spacing { margin: 0.75rem 0; padding: 0.75rem; }
      }
      
      /* Staggered animation delays */
      .stagger-1 { animation-delay: 0.1s; }
      .stagger-2 { animation-delay: 0.2s; }
      .stagger-3 { animation-delay: 0.3s; }
      .stagger-4 { animation-delay: 0.4s; }
      .stagger-5 { animation-delay: 0.5s; }
      
      /* Gradient text effect */
      .gradient-text {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* Shimmer effect */
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.width = bar.getAttribute('data-width');
      }, 500 + (index * 200));
    });

    // Animate counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };
      
      setTimeout(updateCounter, 1000);
    });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 icon-hover" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 hover-glow-text">Campus Climate Analytics</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover-lift hover-scale text-hover"
              >
                Features
              </button>
              <button 
                onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover-lift hover-scale text-hover"
              >
                About
              </button>
              <button 
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover-lift hover-glow btn-primary"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors duration-200 hover-bounce"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 icon-hover" />
                ) : (
                  <Menu className="h-6 w-6 icon-hover" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 animate-slide-in-bottom">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={() => {
                    document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover-lift hover-scale"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover-lift hover-scale"
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    onGetStarted();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium hover-lift hover-glow"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

             {/* Hero Section */}
       <div className="relative overflow-hidden">
         {/* Floating Campus Icons */}
         <div className="absolute inset-0 pointer-events-none">
           {/* Graduation Cap */}
           <div className="absolute top-20 left-10 text-blue-400 opacity-20 animate-float-slow">
             <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 14l9-5-9-5-9 5 9 5z"/>
               <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
             </svg>
           </div>
           
           {/* Book */}
           <div className="absolute top-32 right-16 text-green-400 opacity-20 animate-float-medium">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
             </svg>
           </div>
           
           {/* Building */}
           <div className="absolute top-40 left-20 text-purple-400 opacity-20 animate-float-fast">
             <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z"/>
             </svg>
           </div>
           
           {/* Chart */}
           <div className="absolute top-24 right-24 text-orange-400 opacity-20 animate-float-slow">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
             </svg>
           </div>
           
           {/* Users */}
           <div className="absolute top-36 left-32 text-indigo-400 opacity-20 animate-float-medium">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
               <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0018.54 8H16c-.8 0-1.54.37-2.01 1l-2.7 3.6c-.39.53-.59 1.17-.59 1.82V18h-2v-4c0-.65.2-1.29.59-1.82L15.99 9c.47-.63 1.21-1 2.01-1h2.46c.67 0 1.27.34 1.63.87L24 16H21.5V22h-1.5z"/>
             </svg>
           </div>
         </div>
         
         <div className="max-w-7xl mx-auto">
           <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
             <main className="mt-6 sm:mt-10 mx-auto max-w-7xl px-4 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
               <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                 {/* Left Column - Text Content */}
                 <div className="text-center lg:text-left animate-fade-in-left">
                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-extrabold text-gray-900 mobile-spacing">
                     <span className="block xl:inline hover-glow-text">Transform Campus</span>{' '}
                     <span className="block text-blue-600 xl:inline hover-scale gradient-text">Climate Data</span>
                   </h1>
                   <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0 mobile-spacing">
                     Advanced analytics dashboard for educational institutions to analyze campus climate survey data with interactive visualizations, statistical analysis, and actionable insights.
                   </p>
                   <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-3 mobile-spacing">
                     <div className="rounded-md shadow hover-lift hover-glow">
                       <button 
                         onClick={onGetStarted}
                         className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 md:py-4 border border-transparent text-sm sm:text-base md:text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover-scale animate-pulse-glow touch-target btn-primary"
                       >
                         Explore Dashboard
                         <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 icon-hover" />
                       </button>
                     </div>
                     <div className="hover-lift hover-glow">
                       <button className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 md:py-4 border border-transparent text-sm sm:text-base md:text-lg font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 hover-scale touch-target hover-bg-gradient">
                         <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 icon-hover" />
                         Download Report
                       </button>
                     </div>
                   </div>
                 </div>

                 {/* Right Column - Animated Chart */}
                 <div className="mt-12 lg:mt-0 lg:flex lg:justify-center animate-fade-in-right">
                   <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md hover-lift hover-glow card-hover">
                     <div className="text-center mb-4">
                       <h3 className="text-lg font-semibold text-gray-800">Campus Climate Metrics</h3>
                       <p className="text-sm text-gray-600">Real-time data visualization</p>
                     </div>
                     
                                           {/* Animated Bar Chart */}
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-20">Inclusivity</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3 ml-3">
                            <div 
                              className="progress-bar bg-blue-500 h-3 rounded-full transition-all duration-2000 ease-out"
                              style={{ width: '0%' }}
                              data-width="78%"
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-800 ml-2 w-8">3.9</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-20">Safety</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3 ml-3">
                            <div 
                              className="progress-bar bg-green-500 h-3 rounded-full transition-all duration-2000 ease-out"
                              style={{ width: '0%' }}
                              data-width="82%"
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-800 ml-2 w-8">4.1</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-20">Support</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3 ml-3">
                            <div 
                              className="progress-bar bg-purple-500 h-3 rounded-full transition-all duration-2000 ease-out"
                              style={{ width: '0%' }}
                              data-width="76%"
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-800 ml-2 w-8">3.8</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-20">Satisfaction</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3 ml-3">
                            <div 
                              className="progress-bar bg-orange-500 h-3 rounded-full transition-all duration-2000 ease-out"
                              style={{ width: '0%' }}
                              data-width="84%"
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-800 ml-2 w-8">4.2</span>
                        </div>
                      </div>

                     {/* Animated Stats */}
                     <div className="mt-6 grid grid-cols-2 gap-4">
                       <div className="text-center p-3 bg-blue-50 rounded-lg hover-pulse">
                         <div className="text-2xl font-bold text-blue-600 counter hover-glow-text" data-target="1200">0</div>
                         <div className="text-xs text-gray-600">Survey Responses</div>
                       </div>
                       <div className="text-center p-3 bg-green-50 rounded-lg hover-pulse">
                         <div className="text-2xl font-bold text-green-600 counter hover-glow-text" data-target="95">0</div>
                         <div className="text-xs text-gray-600">Confidence %</div>
                       </div>
                     </div>

                     {/* Pulse Animation */}
                     <div className="mt-4 flex justify-center">
                       <div className="flex space-x-1">
                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                         <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </main>
           </div>
         </div>
       </div>

             {/* Features Section */}
       <div id="features-section" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for data analysis
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Comprehensive tools for analyzing campus climate survey data with professional-grade statistical analysis and visualization.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative hover-lift hover-glow animate-fade-in-up stagger-1 card-hover" style={{ animationDelay: '0.1s' }}>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white hover-scale icon-hover">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 hover-glow-text">Interactive Visualizations</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Dynamic charts and graphs that update in real-time based on your data filters and analysis selections.
                </p>
              </div>

              <div className="relative hover-lift hover-glow animate-fade-in-up stagger-2 card-hover" style={{ animationDelay: '0.2s' }}>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white hover-scale icon-hover">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 hover-glow-text">Statistical Analysis</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Advanced statistical tests including t-tests, ANOVA, regression analysis, and confidence intervals.
                </p>
              </div>

              <div className="relative hover-lift hover-glow animate-fade-in-up stagger-3 card-hover" style={{ animationDelay: '0.3s' }}>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white hover-scale icon-hover">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 hover-glow-text">Multi-dimensional Filtering</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Filter data by program, gender, academic year, and student organization membership.
                </p>
              </div>

              <div className="relative hover-lift hover-glow animate-fade-in-up stagger-4 card-hover" style={{ animationDelay: '0.4s' }}>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white hover-scale icon-hover">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 hover-glow-text">Data Security</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Secure authentication and data persistence with user-specific dashboards and reports.
                </p>
              </div>
            </div>
          </div>
                 </div>
       </div>

       {/* About Section */}
       <div id="about-section" className="py-12 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="lg:text-center">
             <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">About</h2>
             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
               Built for Educational Excellence
             </p>
             <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
               A comprehensive analytics platform designed to help educational institutions understand and improve their campus climate through data-driven insights.
             </p>
           </div>

           <div className="mt-10">
             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                 <div className="text-center hover-lift hover-glow card-hover">
                   <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto icon-hover">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                   </svg>
                 </div>
                   <h3 className="mt-4 text-lg font-medium text-gray-900 hover-glow-text">Data-Driven Insights</h3>
                 <p className="mt-2 text-base text-gray-500">
                   Transform raw survey data into actionable insights with advanced statistical analysis and visualization tools.
                 </p>
               </div>

                                <div className="text-center hover-lift hover-glow card-hover">
                   <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto icon-hover">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                   </svg>
                 </div>
                   <h3 className="mt-4 text-lg font-medium text-gray-900 hover-glow-text">Customizable Analysis</h3>
                 <p className="mt-2 text-base text-gray-500">
                   Filter and analyze data by multiple dimensions including program, gender, academic year, and more.
                 </p>
               </div>

                                <div className="text-center hover-lift hover-glow card-hover">
                   <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto icon-hover">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                   <h3 className="mt-4 text-lg font-medium text-gray-900 hover-glow-text">Professional Reports</h3>
                 <p className="mt-2 text-base text-gray-500">
                   Generate comprehensive PDF reports and export data in multiple formats for presentations and further analysis.
                 </p>
               </div>
             </div>

             <div className="mt-12 bg-white rounded-lg shadow-lg p-8 card-hover hover-lift">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4 hover-glow-text">Technical Stack</h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li className="hover-slide">• React.js with modern hooks and functional components</li>
                     <li className="hover-slide">• Tailwind CSS for responsive design</li>
                     <li className="hover-slide">• Recharts for interactive data visualization</li>
                     <li className="hover-slide">• Statistical analysis with custom algorithms</li>
                     <li className="hover-slide">• PDF generation with jsPDF</li>
                     <li className="hover-slide">• Responsive design for all devices</li>
                   </ul>
                 </div>
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4 hover-glow-text">Key Features</h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li className="hover-slide">• Real-time data filtering and analysis</li>
                     <li className="hover-slide">• Advanced statistical tests (T-tests, ANOVA, Regression)</li>
                     <li className="hover-slide">• Interactive charts and visualizations</li>
                     <li className="hover-slide">• Export functionality (PDF, CSV, Images)</li>
                     <li className="hover-slide">• User authentication and role-based access</li>
                     <li className="hover-slide">• Mobile-responsive dashboard</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center hover-lift hover-glow card-hover">
              <div className="text-4xl font-extrabold text-white animate-heartbeat">1,200+</div>
              <div className="text-blue-100">Survey Responses</div>
            </div>
            <div className="text-center hover-lift hover-glow card-hover">
              <div className="text-4xl font-extrabold text-white animate-heartbeat" style={{ animationDelay: '0.2s' }}>10</div>
              <div className="text-blue-100">Academic Programs</div>
            </div>
            <div className="text-center hover-lift hover-glow card-hover">
              <div className="text-4xl font-extrabold text-white animate-heartbeat" style={{ animationDelay: '0.4s' }}>4</div>
              <div className="text-blue-100">Key Metrics</div>
            </div>
            <div className="text-center hover-lift hover-glow card-hover">
              <div className="text-4xl font-extrabold text-white animate-heartbeat" style={{ animationDelay: '0.6s' }}>95%</div>
              <div className="text-blue-100">Confidence Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl animate-fade-in-up">
            <span className="block hover-glow-text">Ready to dive in?</span>
            <span className="block text-blue-600 hover-scale gradient-text">Start analyzing your data today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex rounded-md shadow hover-lift hover-glow">
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover-scale animate-pulse-glow btn-primary"
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5 icon-hover" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600 icon-hover" />
                <span className="ml-2 text-xl font-bold text-gray-900 hover-glow-text">Campus Climate Analytics</span>
              </div>
              <p className="text-gray-500 text-base">
                Advanced analytics platform for educational institutions to understand and improve campus climate through data-driven insights.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
                  <ul className="mt-4 space-y-4">
                     <li><button className="text-base text-gray-500 hover:text-gray-900 hover-slide text-hover">Data Visualization</button></li>
                     <li><button className="text-base text-gray-500 hover:text-gray-900 hover-slide text-hover">Statistical Analysis</button></li>
                     <li><button className="text-base text-gray-500 hover:text-gray-900 hover-slide text-hover">Export Reports</button></li>
                     <li><button className="text-base text-gray-500 hover:text-gray-900 hover-slide text-hover">Real-time Updates</button></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                     <li>
                       <a 
                         href="https://github.com/yourusername/campus-climate-dashboard" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center hover-slide text-hover"
                       >
                         <span>GitHub Repository</span>
                         <svg className="ml-1 h-4 w-4 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </li>
                     <li>
                       <a 
                         href="https://reactjs.org/docs/getting-started.html" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center hover-slide text-hover"
                       >
                         <span>React Documentation</span>
                         <svg className="ml-1 h-4 w-4 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </li>
                     <li>
                       <a 
                         href="https://recharts.org/en-US/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center hover-slide text-hover"
                       >
                         <span>Recharts Library</span>
                         <svg className="ml-1 h-4 w-4 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" stroke-linejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </li>
                     <li>
                       <a 
                         href="tel:+254743796584" 
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center hover-slide text-hover"
                       >
                         <span>+254 743 796 584</span>
                         <svg className="ml-1 h-4 w-4 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                         </svg>
                       </a>
                     </li>
                     <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 Campus Climate Analytics. All rights reserved.
            </p>
            {/* built by Ainda */}
            <p className="text-base text-gray-400 xl:text-center">
              Built by Ainda
            </p>
            <p className="text-base text-gray-400 xl:text-center">
              <a href="https://www.linkedin.com/in/ainda" className="text-base text-gray-400 hover:text-gray-900">LinkedIn</a>
            </p>
          
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 