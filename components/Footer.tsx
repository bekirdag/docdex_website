import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPath, onNavigate }) => {
  return (
    <footer className="bg-page py-12 border-t border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-white tracking-tight">docdex</span>
            <p className="text-gray-600 text-sm mt-2 max-w-sm">
              Open source, local-first code intelligence and memory for agents. Free to use under the MIT License. © {new Date().getFullYear()} Bekir Dag.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <button
              onClick={() => onNavigate('/documentation')}
              className={`hover:text-white transition-colors ${currentPath === '/documentation' ? 'text-white' : ''}`}
            >
              Documentation
            </button>
            <button
              onClick={() => onNavigate('/http-api')}
              className={`hover:text-white transition-colors ${currentPath === '/http-api' ? 'text-white' : ''}`}
            >
              HTTP API
            </button>
            <button
              onClick={() => onNavigate('/use-cases')}
              className={`hover:text-white transition-colors ${currentPath === '/use-cases' ? 'text-white' : ''}`}
            >
              Use Cases
            </button>
            <button
              onClick={() => onNavigate('/faq')}
              className={`hover:text-white transition-colors ${currentPath === '/faq' ? 'text-white' : ''}`}
            >
              FAQ
            </button>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/bekirdag/docdex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.npmjs.com/package/docdex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5"
                aria-label="NPM"
              >
                <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.129V5.323z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
