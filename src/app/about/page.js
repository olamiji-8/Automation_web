'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Users, Award, Zap, Calendar, ChevronRight } from 'lucide-react';

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
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
                   className={`relative overflow-hidden group ${item === 'About' ? 'text-pink-400' : ''}`}>
                <span className="transition-colors duration-300 group-hover:text-pink-400">{item}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform ${item === 'About' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
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
                   className={`text-2xl font-bold ${item === 'About' ? 'text-pink-400' : ''}`}
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
                About AutomatePro
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Pioneering the Future of <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">Intelligent Automation</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                We are a team of passionate innovators dedicated to transforming how businesses operate through cutting-edge automation technologies.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-4">
                    <Users className="text-pink-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">50+</h4>
                    <p className="text-gray-400">Team Members</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-4">
                    <Award className="text-pink-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">25+</h4>
                    <p className="text-gray-400">Industry Awards</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-4">
                    <Calendar className="text-pink-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">8+ Years</h4>
                    <p className="text-gray-400">Experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-pink-600 to-purple-800 absolute inset-0 m-auto filter blur-3xl opacity-30"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden p-4 border border-gray-700">
                    <div className="w-full h-full bg-pink-900 rounded-xl"></div>
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden p-6 border border-gray-700 flex items-center justify-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">AP</div>
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden p-6 border border-gray-700 flex items-center justify-center">
                    <Zap className="text-pink-400" size={32} />
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden p-4 border border-gray-700">
                    <div className="w-full h-full bg-gradient-to-br from-pink-700 to-purple-800 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Our Journey
            </div>
            <h2 className="text-4xl font-bold mb-6">The AutomatePro Story</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              From a small startup to an industry leader, discover how we have evolved while staying true to our mission.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                year: "2017",
                title: "The Beginning",
                description: "Founded by a group of AI and automation specialists with a vision to make intelligent automation accessible to businesses of all sizes."
              },
              {
                year: "2020",
                title: "Growth & Innovation",
                description: "Expanded our team and product offerings, securing major partnerships with Fortune 500 companies and winning our first industry awards."
              },
              {
                year: "Today",
                title: "Industry Leadership",
                description: "Now a global leader in business process automation with offices in 5 countries, serving clients across various industries worldwide."
              }
            ].map((milestone, index) => (
              <div key={index} 
                   className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-pink-800 transition-all duration-500 group"
                   style={{ 
                     opacity: scrollY > 500 ? 1 : 0.3, 
                     transform: scrollY > 500 ? 'translateY(0)' : 'translateY(50px)',
                     transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                     transitionDelay: `${index * 150}ms`
                   }}>
                <div className="w-16 h-16 rounded-xl bg-pink-900 bg-opacity-30 flex items-center justify-center mb-6 text-2xl text-pink-400 font-bold group-hover:scale-110 transition-transform">
                  {milestone.year}
                </div>
                <h3 className="text-2xl font-bold mb-4">{milestone.title}</h3>
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-8 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-900/30 group">
              Learn more about our journey
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <Zap className="text-pink-400" size={28} />,
                    title: "Innovation",
                    description: "Constantly pushing boundaries to develop cutting-edge automation solutions."
                  },
                  {
                    icon: <Users className="text-pink-400" size={28} />,
                    title: "Collaboration",
                    description: "Working closely with clients to ensure our solutions meet their specific needs."
                  },
                  {
                    icon: <Award className="text-pink-400" size={28} />,
                    title: "Excellence",
                    description: "Committed to delivering the highest quality in everything we do."
                  },
                  {
                    icon: <Calendar className="text-pink-400" size={28} />,
                    title: "Adaptability",
                    description: "Evolving with technology to stay ahead of industry trends."
                  }
                ].map((value, index) => (
                  <div key={index} 
                       className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-pink-700 transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/10 group"
                       style={{
                         transform: scrollY > 1000 ? 'translateY(0)' : 'translateY(30px)',
                         opacity: scrollY > 1000 ? 1 : 0,
                         transition: 'all 0.5s ease',
                         transitionDelay: `${index * 100}ms`
                       }}>
                    <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
                Our Values
              </div>
              <h2 className="text-4xl font-bold mb-6">What Drives Us Forward</h2>
              <p className="text-gray-300 mb-8">
                At AutomatePro, our core values define how we operate and collaborate with our clients. These principles guide our decisions and shape our company culture.
              </p>
              <p className="text-gray-400 mb-6">
                We believe that true innovation comes from understanding our clients challenges deeply and working together to overcome them with elegant, effective solutions.
              </p>
              <div className="flex items-center">
                <div className="flex -space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-sm font-bold">
                      AP
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="font-bold">Our Amazing Team</p>
                  <p className="text-gray-400 text-sm">Passionate about automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
              Our Team
            </div>
            <h2 className="text-4xl font-bold mb-6">Meet The Experts</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Our diverse team brings together expertise from AI, software development, business operations, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Johnson",
                position: "CEO & Founder",
                image: "/api/placeholder/300/300"
              },
              {
                name: "Michael Chen",
                position: "CTO",
                image: "/api/placeholder/300/300"
              },
              {
                name: "Elena Rodriguez",
                position: "Head of AI Research",
                image: "/api/placeholder/300/300"
              },
              {
                name: "David Okafor",
                position: "Lead Product Designer",
                image: "/api/placeholder/300/300"
              }
            ].map((member, index) => (
              <div key={index} 
                   className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-700 transition-all duration-300 group"
                   style={{
                     transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(30px)',
                     opacity: scrollY > 1500 ? 1 : 0,
                     transition: 'all 0.5s ease',
                     transitionDelay: `${index * 100}ms`
                   }}>
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-pink-400">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/team" className="inline-flex items-center px-6 py-2 rounded-full border border-pink-700 text-pink-400 hover:bg-pink-900 hover:bg-opacity-20 transition-all duration-300 group">
              View All Team Members
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
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
        
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 bg-opacity-70 backdrop-blur-xl rounded-3xl p-12 border border-gray-800 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-pink-900 bg-opacity-30 border border-pink-800 text-pink-300 text-sm mb-6">
                  Our Mission
                </div>
                <h2 className="text-4xl font-bold mb-6">Transforming Business Through Intelligent Automation</h2>
                <p className="text-gray-300 mb-8">
                  We are on a mission to help businesses unlock their full potential by implementing smart automation solutions that streamline operations, reduce costs, and drive growth.
                </p>
                <div className="flex flex-col space-y-4">
                  {[
                    "Creating user-friendly automation tools",
                    "Solving complex business challenges",
                    "Supporting digital transformation initiatives"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-3">
                        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full aspect-video bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="AutomatePro Mission" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>
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