'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Mail, Phone, MapPin, Send, MessageSquare, Check } from 'lucide-react';

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  // 1. Remove or conditionally render cursor effects
// Add this check at the beginning of your components
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Then in your JSX, conditionally render cursor elements
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

// 2. Only add mousemove event listener if not on mobile
useEffect(() => {
  setIsLoaded(true);
  
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Only add mousemove listener on desktop
  if (!isMobile) {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// 3. Reduce the number of animated background elements
// Instead of 10 blobs, use 3-4 maximum
{!isMobile && [...Array(isMobile ? 2 : 5)].map((_, i) => (
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

// 4. Remove or simplify particle effects on mobile
{!isMobile && [...Array(isMobile ? 5 : 30)].map((_, i) => (
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
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <nav className="fixed top-0 left-0 w-full z-40 bg-gray-900 bg-opacity-90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            AutomatePro
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Services', 'Case Studies', 'Blog', 'Contact', 'About'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                   className={`relative overflow-hidden group ${item === 'Contact' ? 'text-pink-400' : ''}`}>
                <span className="transition-colors duration-300 group-hover:text-pink-400">{item}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform ${item === 'Contact' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
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
                 className={`text-2xl font-bold ${item === 'Contact' ? 'text-pink-400' : ''}`}
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

      {/* Header */}
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
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Get in <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className={`text-lg text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Have questions or ready to transform your business with automation? Our team is here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-4">
                      <Mail className="text-pink-400" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Email</h3>
                      <p className="text-lg">hello@automatepro.com</p>
                    </div>
                  </div>
                <div className="flex">
                    <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-4">
                      <Phone className="text-pink-400" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Phone</h3>
                      <p className="text-lg">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-12 h-12 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mr-4">
                      <MapPin className="text-pink-400" size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Office</h3>
                      <p className="text-lg">123 Innovation Drive, Suite 400</p>
                      <p className="text-lg">San Francisco, CA 94103</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social, index) => (
                      <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-pink-900 hover:text-white transition-colors">
                        {social[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-pink-900 bg-opacity-30 flex items-center justify-center mb-6">
                      <Check className="text-pink-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-center mb-6">
                      Thank you for reaching out. We wll get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-500 hover:to-pink-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-pink-900/30 flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2" size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our automation solutions and services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can you implement automation solutions?",
                answer: "Implementation timelines vary based on your specific needs and existing systems. Typically, our basic solutions can be implemented within 2-4 weeks, while more complex enterprise integrations may take 1-3 months. We work closely with your team to ensure minimal disruption to your operations."
              },
              {
                question: "Do you offer custom solutions or only pre-built packages?",
                answer: "We specialize in creating custom automation solutions tailored to your unique business needs. While we do have pre-built components that can accelerate deployment, every solution we deliver is customized to integrate with your existing systems and address your specific challenges."
              },
              {
                question: "What industries do you typically work with?",
                answer: "Our automation solutions have been successfully implemented across various industries including finance, healthcare, manufacturing, retail, logistics, and professional services. Our expertise is adaptable to virtually any industry that can benefit from workflow optimization."
              },
              {
                question: "How do you handle data security concerns?",
                answer: "Data security is our top priority. We employ industry-leading encryption standards, regular security audits, and strict access controls. Our systems are compliant with major regulations like GDPR, HIPAA, and SOC 2. We also provide comprehensive documentation of our security measures."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-pink-800 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-start">
                  <span className="text-pink-400 mr-3"><MessageSquare size={20} /></span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-400 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400">
              Donot see your question here? <Link href="/contact" className="text-pink-400 hover:text-pink-300 transition-colors">Reach out to our team</Link>.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer (same as in home page) */}
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
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