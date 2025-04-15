'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, CheckCircle, Zap, Code, BarChart, Users, Shield, ChevronRight } from 'lucide-react';

export default function Services() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  
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

  const services = [
    {
      icon: <Zap className="text-pink-400" size={28} />,
      title: "AI Process Automation",
      description: "Transform your business operations with intelligent automation that adapts and learns from your workflows.",
      benefits: [
        "Reduce operational costs by up to 40%",
        "Eliminate human error in repetitive tasks",
        "Scale operations without increasing headcount",
        "Free up valuable employee time for strategic work"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      icon: <Code className="text-pink-400" size={28} />,
      title: "Custom Software Development",
      description: "Bespoke software solutions designed to address your specific business challenges and opportunities.",
      benefits: [
        "Purpose-built applications that fit your exact needs",
        "Seamless integration with existing systems",
        "Ongoing support and maintenance",
        "Future-proof technology stack"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      icon: <BarChart className="text-pink-400" size={28} />,
      title: "Data Analytics & Intelligence",
      description: "Turn your business data into actionable insights with our advanced analytics solutions.",
      benefits: [
        "Comprehensive data visualization dashboards",
        "Predictive analytics for business forecasting",
        "Real-time monitoring of KPIs",
        "Data-driven decision making support"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      icon: <Users className="text-pink-400" size={28} />,
      title: "Digital Transformation Consulting",
      description: "Strategic guidance to help your organization embrace digital technologies and processes.",
      benefits: [
        "Holistic digital transformation roadmap",
        "Change management expertise",
        "Technology selection and implementation",
        "Staff training and enablement"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      icon: <Shield className="text-pink-400" size={28} />,
      title: "Cybersecurity Solutions",
      description: "Protect your business assets with our comprehensive security services and solutions.",
      benefits: [
        "Threat detection and prevention",
        "Security audits and compliance",
        "Employee security training",
        "Incident response planning"
      ],
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white">
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
                   className={`relative overflow-hidden group ${item === 'Services' ? 'text-pink-400' : ''}`}>
                <span className="transition-colors duration-300 group-hover:text-pink-400">{item}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform ${item === 'Services' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
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
                   className={`text-2xl font-bold ${item === 'Services' ? 'text-pink-400' : ''}`}
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
          {[...Array(5)].map((_, i) => (
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
                Our Solutions
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">Intelligent Services</span> for Forward-Thinking Businesses
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                From AI-powered automation to custom software development, our comprehensive suite of services is designed to transform your business operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#explore-services" className="bg-gradient-to-r from-pink-600 to-pink-800 px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-900/30 flex items-center">
                  Explore Our Services
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-3 rounded-full border border-pink-700 text-pink-400 hover:bg-pink-900 hover:bg-opacity-20 transition-all duration-300 flex items-center">
                  Get a Free Consultation
                </Link>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-pink-600 to-purple-800 absolute inset-0 m-auto filter blur-3xl opacity-30"></div>
                <img 
                  src="/api/placeholder/600/500" 
                  alt="AutomatePro Services" 
                  className="relative z-10 rounded-2xl shadow-2xl shadow-pink-900/20 border border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="explore-services" className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              What We Offer
            </div>
            <h2 className="text-4xl font-bold mb-6">Our Services Portfolio</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We provide end-to-end solutions that help businesses optimize operations, drive innovation, and achieve their digital transformation goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} 
                   className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-pink-700 transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/10 group cursor-pointer"
                   onClick={() => setActiveService(index)}
                   style={{ 
                     opacity: scrollY > 500 ? 1 : 0.3, 
                     transform: scrollY > 500 ? 'translateY(0)' : 'translateY(50px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                     transitionDelay: `${index * 100}ms`
                   }}>
                <div className="w-16 h-16 rounded-xl bg-pink-900 bg-opacity-30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <div className="flex items-center text-pink-400 group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service View */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
                Featured Service
              </div>
              <h2 className="text-4xl font-bold mb-6">{services[activeService].title}</h2>
              <p className="text-gray-300 mb-8">{services[activeService].description}</p>
              
              <div className="space-y-4 mb-8">
                {services[activeService].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-pink-400 mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-900/30">
                Request This Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-pink-600 to-purple-800 absolute inset-0 m-auto filter blur-3xl opacity-20"></div>
              <img 
                src={services[activeService].image} 
                alt={services[activeService].title} 
                className="relative z-10 rounded-2xl shadow-2xl shadow-pink-900/20 border border-gray-800 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Our Approach
            </div>
            <h2 className="text-4xl font-bold mb-6">How We Work With You</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Our proven methodology ensures we deliver results that exceed expectations while maintaining clear communication throughout the process.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-pink-900 bg-opacity-30"></div>
            
            <div className="space-y-24">
              {[
                {
                  step: "01",
                  title: "Discovery & Assessment",
                  description: "We begin by understanding your business goals, challenges, and current processes to identify the best automation opportunities.",
                  align: "left"
                },
                {
                  step: "02",
                  title: "Solution Design",
                  description: "Our experts design a customized solution that addresses your specific needs, utilizing cutting-edge technologies and best practices.",
                  align: "right"
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "We develop and deploy your solution with minimal disruption to your operations, ensuring a smooth transition.",
                  align: "left"
                },
                {
                  step: "04",
                  title: "Training & Support",
                  description: "We provide comprehensive training for your team and ongoing support to ensure long-term success.",
                  align: "right"
                }
              ].map((process, index) => (
                <div key={index} className={`relative grid md:grid-cols-2 gap-8 items-center ${process.align === 'right' ? 'md:text-right' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 bg-pink-600 rounded-full transform -translate-x-1/2 z-10 border-4 border-gray-950"></div>
                  
                  {/* Content */}
                  <div className={`${process.align === 'right' ? 'md:order-2' : ''}`}>
                    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-pink-700 transition-all duration-300">
                      <div className="text-3xl font-bold text-pink-400 mb-4">{process.step}</div>
                      <h3 className="text-2xl font-bold mb-4">{process.title}</h3>
                      <p className="text-gray-400">{process.description}</p>
                    </div>
                  </div>
                  
                  {/* Image/Illustration - Empty div for layout in timeline */}
                  <div className={`${process.align === 'right' ? 'md:order-1' : ''} hidden md:block`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} 
                 className="absolute rounded-full bg-gradient-to-r from-pink-600 to-purple-800 blur-3xl opacity-10"
                 style={{ 
                   width: `${Math.random() * 600 + 400}px`,
                   height: `${Math.random() * 600 + 400}px`,
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                 }}>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Client Success
            </div>
            <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Hear from businesses that have transformed their operations with our services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "AutomatePro's AI process automation solution reduced our operational costs by 35% while improving accuracy across the board.",
                author: "Sarah Martinez",
                position: "COO, TechVision Inc.",
                image: "/api/placeholder/100/100"
              },
              {
                quote: "The custom software solution developed by AutomatePro has become the backbone of our operations. It's been a game-changer for our business.",
                author: "Michael Chen",
                position: "CTO, GrowthForce",
                image: "/api/placeholder/100/100"
              },
              {
                quote: "Working with AutomatePro on our digital transformation has given us a competitive edge in our industry. Their expertise is unmatched.",
                author: "Jessica Wilson",
                position: "CEO, InnovateNow",
                image: "/api/placeholder/100/100"
              }
            ].map((testimonial, index) => (
              <div key={index} 
                   className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-pink-700 transition-all duration-300"
                   style={{ 
                     opacity: scrollY > 1200 ? 1 : 0.3, 
                     transform: scrollY > 1200 ? 'translateY(0)' : 'translateY(30px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                     transitionDelay: `${index * 150}ms`
                   }}>
                <div className="text-4xl text-pink-600 opacity-50 mb-4">.</div>
                <p className="text-gray-300 mb-8">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-pink-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/case-studies" className="inline-flex items-center px-6 py-2 rounded-full border border-pink-700 text-pink-400 hover:bg-pink-900 hover:bg-opacity-20 transition-all duration-300 group">
              View All Case Studies
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-pink-900 to-purple-900 rounded-3xl p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
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
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                Let us discuss how our intelligent automation solutions can address your unique business challenges.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="bg-white text-pink-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg font-bold">
                  Schedule a Free Consultation
                </Link>
                <Link href="/case-studies" className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                  View Our Work
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
                    <div className="w-5 h-5 bg-white opacity-70 mask-icon"></div>
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
                links: ["Documentation", "Case Studies", "Help Center", "Privacy Policy"]
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