import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Book, Home } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'docs';
  onNavigate: (view: 'home' | 'docs', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Benchmarks', href: '#benchmarks' },
    { name: 'Use Cases', href: '#use-cases' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    onNavigate('home', sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || currentView === 'docs'
          ? 'bg-page/80 backdrop-blur-xl border-surface-200/60 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.3)] group-hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
              <Terminal className="text-black w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-100 transition-colors">docdex</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {currentView === 'home' && navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={() => onNavigate(currentView === 'docs' ? 'home' : 'docs')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'docs' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {currentView === 'docs' ? <Home className="w-4 h-4" /> : <Book className="w-4 h-4" />}
              {currentView === 'docs' ? 'Back to Home' : 'Documentation'}
            </button>

            <a 
              href="https://github.com/bekirdag/docdex" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-bold bg-shiny-gold text-black rounded-full transition-all shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4),0px_0px_10px_rgba(234,179,8,0.2)] hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4),0px_0px_20px_rgba(234,179,8,0.4)] border-t border-yellow-200 border-b border-yellow-600"
            >
              Get started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-50 border-b border-surface-200 absolute w-full left-0 top-full">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <button
              onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-200"
            >
              Home
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-200"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
             <button
              onClick={() => { onNavigate('docs'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-400 hover:text-brand-300 hover:bg-surface-200"
            >
              Documentation
            </button>
            <a 
              href="https://github.com/bekirdag/docdex" 
              className="block mt-4 text-center px-4 py-3 font-semibold bg-brand-400 text-black rounded-lg"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;