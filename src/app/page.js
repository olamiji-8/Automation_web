'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, MousePointer, ChevronDown } from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Custom Cursor Effect */}
      <div className="fixed w-6 h-6 rounded-full bg-pink-500 pointer-events-none z-50 transition-transform duration-75 opacity-50"
           style={{ 
             left: `${cursorPosition.x}px`, 
             top: `${cursorPosition.y}px`,
             transform: 'translate(-50%, -50%)'
           }}></div>
      <div className="fixed w-12 h-12 rounded-full border border-pink-500 pointer-events-none z-50 transition-transform duration-200 opacity-30"
           style={{ 
             left: `${cursorPosition.x}px`, 
             top: `${cursorPosition.y}px`,
             transform: 'translate(-50%, -50%) scale(1.5)'
           }}></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 transition-all duration-300"
           style={{ 
             backgroundColor: scrollY > 50 ? 'rgba(31, 12, 23, 0.95)' : 'transparent',
             backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none'
           }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            AutomatePro
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                   className="relative overflow-hidden group">
                <span className="transition-colors duration-300 group-hover:text-pink-400">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </div>
          
          <button className="hidden md:flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-5 py-2 rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-900/30">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-30 flex flex-col items-center justify-center space-y-8 animate-fadeIn">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                   className="text-2xl font-bold"
                   onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            ))}
            <button className="flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-6 py-3 rounded-full mt-6">
              Get Started
              <ArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section with Advanced Animations */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Animation */}
        <div className="absolute inset-0 bg-gray-900">
          {[...Array(10)].map((_, i) => (
            <div key={i} 
                 className="absolute rounded-full bg-gradient-to-r from-pink-600 to-purple-800 blur-3xl opacity-20 animate-blob"
                 style={{ 
                   width: `${Math.random() * 500 + 300}px`,
                   height: `${Math.random() * 500 + 300}px`,
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${i * 0.5}s`,
                   animationDuration: `${Math.random() * 10 + 15}s`,
                 }}>
            </div>
          ))}
        </div>
        
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-6 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-l border-pink-500 h-full"></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-t border-pink-500 w-full absolute" style={{ top: `${(i+1) * 16.666}%` }}></div>
          ))}
        </div>
        
        {/* Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div key={i}
                 className="absolute w-1 h-1 rounded-full bg-pink-400"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   opacity: Math.random() * 0.5 + 0.2,
                   animation: `particleFloat ${Math.random() * 10 + 20}s infinite alternate ease-in-out`,
                   animationDelay: `${Math.random() * 5}s`
                 }}>
            </div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Revolutionizing Automation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Powering Future</span>
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">With Intelligent Automation</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Transform your business operations with cutting-edge automation solutions tailored to your unique challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 transition-colors shadow-lg shadow-pink-900/30 group">
                Explore Solutions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center px-6 py-3 rounded-full border border-pink-700 hover:bg-pink-900 hover:bg-opacity-20 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-pink-600 to-purple-800 absolute inset-0 m-auto filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative z-10 bg-gray-800 bg-opacity-30 backdrop-blur-md p-4 rounded-2xl border border-gray-700 shadow-xl">
                <div className="h-6 flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-pink-700 rounded w-1/2"></div>
                  <div className="h-20 bg-gradient-to-r from-pink-800 to-pink-900 rounded-lg mt-6"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-pink-700 rounded-full flex items-center justify-center text-xs">01</div>
                    <div className="h-8 w-8 bg-pink-800 rounded-full flex items-center justify-center text-xs">02</div>
                    <div className="h-8 w-8 bg-pink-900 rounded-full flex items-center justify-center text-xs">03</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-pink-300 animate-bounce">
          <MousePointer className="mb-2" size={16} />
          <ChevronDown size={16} />
        </div>
      </section>

      {/* Features Section with Animations */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Our Capabilities
            </div>
            <h2 className="text-4xl font-bold mb-6">Intelligent Solutions For Your Business</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Leverage our advanced automation technology to transform your operations and drive growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Workflow",
                description: "Streamline complex workflows with intelligent process automation that learns and improves over time.",
                icon: "🤖"
              },
              {
                title: "Seamless Integration",
                description: "Connect all your existing systems and tools with our flexible integration framework.",
                icon: "🔄"
              },
              {
                title: "Data Analytics",
                description: "Transform raw data into actionable insights with our advanced analytics capabilities.",
                icon: "📊"
              }
            ].map((feature, index) => (
              <div key={index} 
                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 group hover:border-pink-800 transition-all duration-500 shadow-lg hover:shadow-pink-900/30"
                   style={{ 
                     opacity: scrollY > 200 ? 1 : 0.3, 
                     transform: scrollY > 200 ? 'translateY(0)' : 'translateY(50px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                     transitionDelay: `${index * 150}ms`
                   }}>
                <div className="w-16 h-16 rounded-xl bg-pink-900 bg-opacity-30 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="mt-8 flex items-center text-pink-400 group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-pink-900/30 to-purple-900/30 blur-xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-600 to-purple-800 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-600 to-purple-800 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="p-12 md:p-16 relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-center">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 text-center mb-10">
                Schedule a personalized demo to see how our automation solutions can work for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-pink-800 px-8 py-4 rounded-xl hover:from-pink-500 hover:to-pink-700 transition-colors shadow-lg shadow-pink-900/30 group">
                  <span>Schedule Demo</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center px-8 py-4 rounded-xl border border-pink-700 hover:bg-pink-900 hover:bg-opacity-20 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-4">
                AutomatePro
              </div>
              <p className="text-gray-400 mb-6">
                Revolutionizing business processes with intelligent automation solutions.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social, index) => (
                  <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-pink-900 hover:text-white transition-colors">
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press"]
              },
              {
                title: "Solutions",
                links: ["Workflow Automation", "Data Integration", "Analytics", "AI Services"]
              },
              {
                title: "Resources",
                links: ["Documentation", "Guides", "API Reference", "Support"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} AutomatePro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes particleFloat {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -30px) scale(2); }
          50% { transform: translate(-20px, 40px) scale(1.5); }
          75% { transform: translate(40px, 30px) scale(1); }
          100% { transform: translate(-30px, -40px) scale(2); }
        }
        
        @keyframes animate-blob {
          0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(30px, -50px) rotate(20deg) scale(1.1); opacity: 0.3; }
          66% { transform: translate(-20px, 20px) rotate(-10deg) scale(0.9); opacity: 0.1; }
          100% { transform: translate(0, 0) rotate(0) scale(1); opacity: 0.2; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .animate-blob {
          animation: animate-blob 20s infinite alternate;
        }
        
        body {
          cursor: none;
        }
        
        a, button {
          cursor: none;
        }
      `}</style>
    </main>
  );
}