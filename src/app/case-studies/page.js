'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Search, ChevronRight, Filter, Calendar } from 'lucide-react';

export default function CaseStudies() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Only add mousemove listener if not on mobile
    if (!isMobile) {
      const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const industries = ['All', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Technology'];

  const caseStudies = [
    {
      title: "AI-Powered Workflow Automation for Global Healthcare Provider",
      description: "How we helped a leading healthcare provider reduce operational costs by 40% while improving patient care through intelligent automation.",
      industry: "Healthcare",
      results: "40% cost reduction, 60% faster processing times",
      image: "/api/placeholder/600/400",
      date: "April 10, 2025",
      slug: "healthcare-provider-workflow-automation"
    },
    {
      title: "Streamlining Financial Operations with Custom Software Solutions",
      description: "A mid-sized financial institution transformed their outdated systems with our bespoke software development, resulting in enhanced security and efficiency.",
      industry: "Finance",
      results: "85% reduction in manual processes, 99.9% uptime",
      image: "/api/placeholder/600/400",
      date: "March 22, 2025",
      slug: "financial-operations-transformation"
    },
    {
      title: "Data-Driven Manufacturing Optimization",
      description: "Implementing advanced analytics and IoT integration to streamline production and reduce waste for a global manufacturing company.",
      industry: "Manufacturing",
      results: "28% increase in productivity, 15% waste reduction",
      image: "/api/placeholder/600/400",
      date: "March 5, 2025",
      slug: "manufacturing-optimization"
    },
    {
      title: "Retail Chain Digital Transformation Journey",
      description: "End-to-end digital transformation for a nationwide retail chain, from customer experience to backend operations.",
      industry: "Retail",
      results: "45% increase in online sales, 30% operational efficiency",
      image: "/api/placeholder/600/400",
      date: "February 18, 2025",
      slug: "retail-digital-transformation"
    },
    {
      title: "Cybersecurity Overhaul for Tech Startup",
      description: "Implementing comprehensive security protocols and systems for a rapidly growing SaaS company facing increasing threats.",
      industry: "Technology",
      results: "Zero breaches, 99.5% threat detection rate",
      image: "/api/placeholder/600/400",
      date: "February 3, 2025",
      slug: "tech-startup-cybersecurity"
    },
    {
      title: "Healthcare Data Integration Platform",
      description: "Creating a unified data platform that connects disparate systems for a national healthcare network, improving patient care and operational efficiency.",
      industry: "Healthcare",
      results: "72% faster access to patient data, 35% cost savings",
      image: "/api/placeholder/600/400",
      date: "January 15, 2025",
      slug: "healthcare-data-integration"
    }
  ];

  const filteredCaseStudies = caseStudies
    .filter(cs => activeFilter === 'All' || cs.industry === activeFilter)
    .filter(cs => cs.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  cs.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  cs.industry.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Custom Cursor Effect - Only on desktop */}
      {!isMobile && (
        <>
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
        </>
      )}
      
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
            {['Home', 'Services', 'Case Studies', 'Blog', 'Contact', 'About'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                   className={`relative overflow-hidden group ${item === 'Case Studies' ? 'text-pink-400' : ''}`}>
                <span className="transition-colors duration-300 group-hover:text-pink-400">{item}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform ${item === 'Case Studies' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
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
            {['Home', 'Services', 'Case Studies', 'Blog', 'Contact', 'About'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                   className={`text-2xl font-bold ${item === 'Case Studies' ? 'text-pink-400' : ''}`}
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Reduced number of background elements for performance */}
          {[...Array(isMobile ? 2 : 4)].map((_, i) => (
            <div key={i} 
                 className="absolute rounded-full bg-gradient-to-r from-pink-600 to-purple-800 blur-3xl opacity-10"
                 style={{ 
                   width: `${Math.random() * 500 + 300}px`,
                   height: `${Math.random() * 500 + 300}px`,
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                 }}>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Success Stories
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">Real Results</span> for Real Businesses
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore how we have helped organizations across industries transform their operations and achieve remarkable outcomes through intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-2/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Search case studies by industry, solution, or outcome..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center md:justify-start">
              {industries.map((industry) => (
                <button
                  key={industry}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeFilter === industry
                      ? 'bg-pink-700 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveFilter(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No case studies found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy, index) => (
                <Link 
                  href={`/case-studies/${caseStudy.slug}`}
                  key={index} 
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-700 transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/10 group flex flex-col"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transitionDelay: `${(index % 3) * 100}ms`
                  }}
                >
                  <div className="relative overflow-hidden h-48">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 to-purple-900/20 z-10"></div>
                    <img 
                      src={caseStudy.image} 
                      alt={caseStudy.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-pink-900 bg-opacity-90 px-3 py-1 rounded-full text-xs z-20">
                      {caseStudy.industry}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {caseStudy.date}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors">
                      {caseStudy.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 flex-grow">
                      {caseStudy.description}
                    </p>
                    
                    <div className="border-t border-gray-800 pt-4 mt-auto">
                      <div className="text-pink-400 font-medium">Results:</div>
                      <div className="text-white">{caseStudy.results}</div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 flex items-center text-pink-400 group-hover:translate-x-2 transition-transform">
                    <span className="mr-2">Read case study</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-pink-900 to-purple-900 rounded-3xl p-12 relative overflow-hidden">
            {/* Background decoration - reduced for performance */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(isMobile ? 2 : 3)].map((_, i) => (
                <div key={i} 
                     className="absolute rounded-full bg-white opacity-10"
                     style={{ 
                       width: `${Math.random() * 300 + 100}px`,
                       height: `${Math.random() * 300 + 100}px`,
                       left: `${Math.random() * 100}%`,
                       top: `${Math.random() * 100}%`,
                       transform: 'translate(-50%, -50%)'
                     }}>
                </div>
              ))}
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Become Our Next Success Story?</h2>
              <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                Let us help you transform your business operations with intelligent automation solutions tailored to your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="bg-white text-pink-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg font-bold">
                  Schedule a Free Consultation
                </Link>
                <Link href="/services" className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-6">
                AutomatePro
              </div>
              <p className="text-gray-400 mb-6">
                Leading the way in intelligent automation solutions for businesses of all sizes.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-900 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-white opacity-70"></div>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Blog"]
              },
              {
                title: "Services",
                links: ["AI Automation", "Process Optimization", "Custom Solutions", "Consulting"]
              },
              {
                title: "Resources",
                links: ["Case Studies", "Documentation", "Help Center", "Privacy Policy"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-bold text-lg mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} AutomatePro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-pink-400 text-sm">Terms of Service</Link>
              <Link href="#" className="text-gray-500 hover:text-pink-400 text-sm">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-pink-400 text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}