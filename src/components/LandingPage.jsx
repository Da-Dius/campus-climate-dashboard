import React, { useEffect } from 'react';
import { BarChart3, Users, TrendingUp, Shield, Download, ArrowRight } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Campus Climate Analytics</span>
            </div>
                         <div className="flex items-center space-x-4">
               <button 
                 onClick={() => document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' })}
                 className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
               >
                 Features
               </button>
               <button 
                 onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
                 className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
               >
                 About
               </button>
               <button 
                 onClick={onGetStarted}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
               >
                 Get Started
               </button>
             </div>
          </div>
        </div>
      </nav>

             {/* Hero Section */}
       <div className="relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
           <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
             <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
               <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                 {/* Left Column - Text Content */}
                 <div className="sm:text-center lg:text-left">
                   <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                     <span className="block xl:inline">Transform Campus</span>{' '}
                     <span className="block text-blue-600 xl:inline">Climate Data</span>
                   </h1>
                   <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                     Advanced analytics dashboard for educational institutions to analyze campus climate survey data with interactive visualizations, statistical analysis, and actionable insights.
                   </p>
                   <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                     <div className="rounded-md shadow">
                       <button 
                         onClick={onGetStarted}
                         className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                       >
                         Explore Dashboard
                         <ArrowRight className="ml-2 h-5 w-5" />
                       </button>
                     </div>
                     <div className="mt-3 sm:mt-0 sm:ml-3">
                       <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors">
                         <Download className="mr-2 h-5 w-5" />
                         Download Report
                       </button>
                     </div>
                   </div>
                 </div>

                 {/* Right Column - Animated Chart */}
                 <div className="mt-12 lg:mt-0 lg:flex lg:justify-center">
                   <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
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
                       <div className="text-center p-3 bg-blue-50 rounded-lg">
                         <div className="text-2xl font-bold text-blue-600 counter" data-target="1200">0</div>
                         <div className="text-xs text-gray-600">Survey Responses</div>
                       </div>
                       <div className="text-center p-3 bg-green-50 rounded-lg">
                         <div className="text-2xl font-bold text-green-600 counter" data-target="95">0</div>
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
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Interactive Visualizations</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Dynamic charts and graphs that update in real-time based on your data filters and analysis selections.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Statistical Analysis</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Advanced statistical tests including t-tests, ANOVA, regression analysis, and confidence intervals.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multi-dimensional Filtering</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Filter data by program, gender, academic year, and student organization membership.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Data Security</p>
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
               <div className="text-center">
                 <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                   </svg>
                 </div>
                 <h3 className="mt-4 text-lg font-medium text-gray-900">Data-Driven Insights</h3>
                 <p className="mt-2 text-base text-gray-500">
                   Transform raw survey data into actionable insights with advanced statistical analysis and visualization tools.
                 </p>
               </div>

               <div className="text-center">
                 <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                   </svg>
                 </div>
                 <h3 className="mt-4 text-lg font-medium text-gray-900">Customizable Analysis</h3>
                 <p className="mt-2 text-base text-gray-500">
                   Filter and analyze data by multiple dimensions including program, gender, academic year, and more.
                 </p>
               </div>

               <div className="text-center">
                 <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <h3 className="mt-4 text-lg font-medium text-gray-900">Professional Reports</h3>
                 <p className="mt-2 text-base text-gray-500">
                   Generate comprehensive PDF reports and export data in multiple formats for presentations and further analysis.
                 </p>
               </div>
             </div>

             <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Stack</h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li>• React.js with modern hooks and functional components</li>
                     <li>• Tailwind CSS for responsive design</li>
                     <li>• Recharts for interactive data visualization</li>
                     <li>• Statistical analysis with custom algorithms</li>
                     <li>• PDF generation with jsPDF</li>
                     <li>• Responsive design for all devices</li>
                   </ul>
                 </div>
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li>• Real-time data filtering and analysis</li>
                     <li>• Advanced statistical tests (T-tests, ANOVA, Regression)</li>
                     <li>• Interactive charts and visualizations</li>
                     <li>• Export functionality (PDF, CSV, Images)</li>
                     <li>• User authentication and role-based access</li>
                     <li>• Mobile-responsive dashboard</li>
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
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">1,200+</div>
              <div className="text-blue-100">Survey Responses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">10</div>
              <div className="text-blue-100">Academic Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">4</div>
              <div className="text-blue-100">Key Metrics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">95%</div>
              <div className="text-blue-100">Confidence Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">Start analyzing your data today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
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
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Campus Climate Analytics</span>
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
                     <li><button className="text-base text-gray-500 hover:text-gray-900">Data Visualization</button></li>
                     <li><button className="text-base text-gray-500 hover:text-gray-900">Statistical Analysis</button></li>
                     <li><button className="text-base text-gray-500 hover:text-gray-900">Export Reports</button></li>
                     <li><button className="text-base text-gray-500 hover:text-gray-900">Real-time Updates</button></li>
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
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center"
                       >
                         <span>GitHub Repository</span>
                         <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </li>
                     <li>
                       <a 
                         href="https://reactjs.org/docs/getting-started.html" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center"
                       >
                         <span>React Documentation</span>
                         <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </li>
                     <li>
                       <a 
                         href="https://recharts.org/en-US/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center"
                       >
                         <span>Recharts Library</span>
                         <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                       </a>
                     </li>
                     <li>
                       <a 
                         href="tel:+254743796584" 
                         className="text-base text-gray-500 hover:text-gray-900 flex items-center"
                       >
                         <span>+254 743 796 584</span>
                         <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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