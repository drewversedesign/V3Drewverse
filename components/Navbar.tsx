import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: 'home', href: '/' },
    { name: 'About', path: 'home', hash: '#hero', href: '/#hero' },
    { name: 'Portfolio', path: 'home', hash: '#portfolio', href: '/#portfolio' },
    { name: 'Services', path: 'home', hash: '#services', href: '/#services' },
    { name: 'Pricing', path: 'home', hash: '#pricing', href: '/#pricing' },
    { name: 'Blog', path: 'blog', href: '/blog' },
    { name: 'Contact', path: 'home', hash: '#contact', href: '/#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    onNavigate(link.path);
    setIsMobileMenuOpen(false);
    
    // Handle hash scrolling or scroll to top
    if (link.hash) {
      setTimeout(() => {
        const el = document.querySelector(link.hash!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (link.path === 'home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartProject = () => {
    onNavigate('home');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentPath === 'blog' ? 'py-3 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-lg border-b border-subtle-light dark:border-subtle-dark' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="/"
          className="flex items-center gap-2 cursor-pointer" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <span className="text-xl font-bold tracking-tighter uppercase display-font">
            DrewVerse<br/><span className="text-primary text-xs tracking-widest">Design</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`hover:text-primary transition-colors uppercase tracking-widest text-[11px] font-bold ${currentPath === link.path && !link.hash ? 'text-primary' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="/#contact"
            onClick={(e) => { e.preventDefault(); handleStartProject(); }}
            className="hidden md:block bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 uppercase"
          >
            Start Project
          </a>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-300" aria-label="Toggle Menu">
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-surface-dark absolute w-full left-0 p-6 space-y-4 shadow-xl border-b border-subtle-light dark:border-subtle-dark">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="block w-full text-left text-lg font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#contact"
            onClick={(e) => { e.preventDefault(); handleStartProject(); }}
            className="block w-full text-center bg-primary hover:bg-primary-hover text-white py-3 rounded-lg text-sm font-bold uppercase tracking-widest"
          >
            Start Project
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;