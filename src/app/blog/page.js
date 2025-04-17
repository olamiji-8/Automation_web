'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Search, ChevronRight, Calendar, Clock, User } from 'lucide-react';

export default function Blog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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

  const categories = ['All', 'Automation', 'AI', 'Digital Transformation', 'Cybersecurity', 'Industry Insights'];

  const blogPosts = [
    {
      title: "5 Ways AI is Revolutionizing Process Automation in 2025",
      excerpt: "Explore the latest AI advancements that are transforming how businesses approach process automation and the benefits they're achieving.",
      category: "Automation",
      readTime: "6 min read",
      date: "April 15, 2025",
      author: "Sarah Johnson",
      image: "/api/placeholder/600/400",
      slug: "ai-revolutionizing-process-automation-2025",
      featured: true
    },
    {
      title: "The Business Leader's Guide to Digital Transformation",
      excerpt: "A comprehensive guide for executives and business leaders on how to navigate the complexities of digital transformation successfully.",
      category: "Digital Transformation",
      readTime: "9 min read",
      date: "April 8, 2025",
      author: "Michael Chen",
      image: "/api/placeholder/600/400",
      slug: "business-leaders-guide-digital-transformation",
      featured: false
    },
    {
      title: "Cybersecurity in the Age of Automation: Best Practices for 2025",
      excerpt: "How to maintain robust security protocols while implementing automation solutions across your organization.",
      category: "Cybersecurity",
      readTime: "7 min read",
      date: "March 30, 2025",
      author: "David Robinson",
      image: "/api/placeholder/600/400",
      slug: "cybersecurity-automation-best-practices-2025",
      featured: false
    },
    {
      title: "The Role of Data Analytics in Modern Business Decision Making",
      excerpt: "How data-driven insights are transforming business strategies and enabling more informed decision-making processes.",
      category: "Industry Insights",
      readTime: "5 min read",
      date: "March 25, 2025",
      author: "Jennifer Lee",
      image: "/api/placeholder/600/400",
      slug: "data-analytics-business-decision-making",
      featured: false
    },
    {
      title: "Implementing RPA: Lessons Learned from 100+ Deployments",
      excerpt: "Practical insights and best practices gathered from our experience implementing Robotic Process Automation across various industries.",
      category: "Automation",
      readTime: "8 min read",
      date: "March 18, 2025",
      author: "Robert Wilson",
      image: "/api/placeholder/600/400",
      slug: "rpa-implementation-lessons-learned",
      featured: false
    },
    {
      title: "The Future of AI in Business: Trends to Watch in 2025 and Beyond",
      excerpt: "From natural language processing to predictive analytics, discover the AI trends that will shape business operations in the coming years.",
      category: "AI",
      readTime: "6 min read",
      date: "March 10, 2025",
      author: "Lisa Park",
      image: "/api/placeholder/600/400",
      slug: "future-ai-business-trends-2025",
      featured: false
    },
    {
      title: "How Manufacturing is Leading the Way in Digital Transformation",
      excerpt: "Case studies and examples of how the manufacturing sector is embracing digital technologies to improve efficiency and competitiveness.",
      category: "Digital Transformation",
      readTime: "7 min read",
      date: "March 3, 2025",
      author: "Thomas Garcia",
      image: "/api/placeholder/600/400",
      slug: "manufacturing-digital-transformation-leadership",
      featured: false
    },
    {
      title: "The Human Side of Automation: Managing Change and Adoption",
      excerpt: "Strategies for effectively managing the human aspects of technological change when implementing automation solutions.",
      category: "Industry Insights",
      readTime: "6 min read",
      date: "February 24, 2025",
      author: "Rachel Kim",
      image: "/api/placeholder/600/400",
      slug: "human-side-automation-change-management",
      featured: false
    }
  ];

  const filteredPosts = blogPosts
    .filter(post => activeCategory === 'All' || post.category === activeCategory)
    .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const featuredPost = blogPosts.find(post => post.featured);

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
            {['Home', 'Services', 'Case Studies', 'Blog', 'Contact','About'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                   className={`relative overflow-hidden group ${item === 'Blog' ? 'text-pink-400' : ''}`}>
                <span className="transition-colors duration-300 group-hover:text-pink-400">{item}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform ${item === 'Blog' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            ))}
          </div>
          
          <button className="hidden md:flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-5 py-2 rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-900/30">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-900/95 z-30 pt-20 px-6">
          <div className="flex flex-col space-y-6 items-center">
            {['Home', 'Services', 'Case Studies', 'Blog', 'Contact', 'About'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                   className={`text-xl ${item === 'Blog' ? 'text-pink-400' : 'text-white'}`}
                   onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            ))}
            <button className="flex items-center bg-gradient-to-r from-pink-600 to-pink-800 px-5 py-2 rounded-full mt-6">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Page Content */}
      <div className={`pt-24 px-6 max-w-7xl mx-auto transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-4">
            AutomatePro Blog
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Insights, trends, and expert perspectives on automation, AI, and digital transformation
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-3 px-6 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          />
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-pink-600 text-white font-medium' 
                  : 'bg-gray-800/70 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 inline-flex items-center">
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                Featured Article
              </span>
              <span className="ml-2 inline-block w-12 h-0.5 bg-gradient-to-r from-pink-500 to-transparent"></span>
            </h2>
            
            <div className="grid md:grid-cols-5 gap-8 bg-gray-800/30 rounded-xl p-6 border border-gray-800 hover:border-pink-800/30 transition-all duration-300 group">
              <div className="md:col-span-2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="rounded-lg w-full h-64 object-cover shadow-lg shadow-pink-900/10 group-hover:shadow-pink-900/20 transition-all duration-300" 
                />
              </div>
              
              <div className="md:col-span-3 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-pink-900/30 text-pink-400 text-xs font-medium rounded-full mb-4">
                    {featuredPost.category}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-pink-400 transition-colors duration-300">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                        <User size={14} />
                      </div>
                      <span className="text-sm text-gray-400">{featuredPost.author}</span>
                    </div>
                    
                    <Link href={`/blog/${featuredPost.slug}`} 
                          className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300">
                      Read more
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-800 hover:border-pink-800/30 transition-all duration-300 flex flex-col group"
              >
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 bg-pink-900/50 text-pink-400 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <Calendar size={14} className="mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                          <User size={12} />
                        </div>
                        <span className="text-xs text-gray-400">{post.author}</span>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`} 
                            className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300 text-sm">
                        Read more
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-900/20 rounded-full mb-4">
              <Search size={24} className="text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-400">
              Try adjusting your search or category filter to find what you are looking for.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-500 transition-colors duration-300"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-16 border border-gray-800">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter to receive the latest insights on automation, AI, and digital transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-full py-3 px-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
              <button className="bg-gradient-to-r from-pink-600 to-pink-800 px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-900/30">
                Subscribe
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive marketing emails from AutomatePro. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                AutomatePro
              </Link>
              <p className="text-gray-500 mt-4">
                Empowering businesses through intelligent automation solutions that drive efficiency and innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Partners', 'Press'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-pink-400 transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Blog', 'Guides', 'Case Studies', 'Documentation'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-pink-400 transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                {['Contact', 'Support', 'Twitter', 'LinkedIn'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-pink-400 transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} AutomatePro. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 text-sm hover:text-gray-400 transition-colors duration-300">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}