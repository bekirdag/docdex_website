import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar: React.FC = () => {
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
    { name: 'Documentation', href: '#docs' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-page/80 backdrop-blur-xl border-surface-200/60 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              <Terminal className="text-black w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">docdex</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
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
        <div className="md:hidden bg-surface-50 border-b border-surface-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
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