import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, options?: { sectionId?: string }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = currentPath === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const homeLinks = [
    { name: 'Features', sectionId: 'features' },
    { name: 'Indexing', sectionId: 'indexing' },
    { name: 'Benchmarks', sectionId: 'benchmarks' }
  ];

  const pageLinks = [
    { name: 'Documentation', path: '/documentation' },
    { name: 'HTTP API', path: '/http-api' },
    { name: 'Use Cases', path: '/use-cases', sectionId: 'use-cases' },
    { name: 'FAQ', path: '/faq' }
  ];

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onNavigate('/', { sectionId });
    setIsMobileMenuOpen(false);
  };

  const handlePageClick = (e: React.MouseEvent, path: string, sectionId?: string) => {
    e.preventDefault();
    if (isHome && sectionId) {
      onNavigate('/', { sectionId });
    } else {
      onNavigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || !isHome
          ? 'bg-page/80 backdrop-blur-xl border-surface-200/60 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('/')}
          >
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.3)] group-hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
              <Terminal className="text-black w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-brand-100 transition-colors">docdex</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {homeLinks.map((link) => (
              <a 
                key={link.name} 
                href={`/#${link.sectionId}`}
                onClick={(e) => handleSectionClick(e, link.sectionId)}
                className={`text-sm font-medium transition-colors ${isHome ? 'text-gray-400 hover:text-white' : 'hidden'}`}
              >
                {link.name}
              </a>
            ))}

            {pageLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handlePageClick(e, link.path, link.sectionId)}
                className={`text-sm font-medium transition-colors ${
                  currentPath === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
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
        <div className="md:hidden bg-surface-50 border-b border-surface-200 absolute w-full left-0 top-full">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <button
              onClick={() => { onNavigate('/'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-200"
            >
              Home
            </button>
            {homeLinks.map((link) => (
              <a
                key={link.name}
                href={`/#${link.sectionId}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-200"
                onClick={(e) => handleSectionClick(e, link.sectionId)}
              >
                {link.name}
              </a>
            ))}
            {pageLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handlePageClick(e, link.path, link.sectionId)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-200"
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
