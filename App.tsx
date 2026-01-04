import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import DocsPage from './components/DocsPage';
import HttpApiPage from './components/HttpApiPage';
import FaqPage from './components/FaqPage';
import UseCasesPage from './components/UseCasesPage';
import NotFoundPage from './components/NotFoundPage';

type RouteKey = 'home' | 'documentation' | 'http-api' | 'faq' | 'use-cases' | 'not-found';

const routeMap: Record<string, RouteKey> = {
  '/': 'home',
  '/documentation': 'documentation',
  '/docs': 'documentation',
  '/http-api': 'http-api',
  '/api': 'http-api',
  '/faq': 'faq',
  '/use-cases': 'use-cases'
};

const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

const resolveRoute = (path: string): RouteKey => routeMap[normalizePath(path)] || 'not-found';

function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteKey>(() => resolveRoute(window.location.pathname));
  const [currentPath, setCurrentPath] = useState<string>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setCurrentRoute(resolveRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentRoute !== 'home') {
      window.scrollTo(0, 0);
      return;
    }
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentRoute]);

  const handleNavigate = (path: string, options?: { sectionId?: string }) => {
    const nextPath = normalizePath(path.startsWith('/') ? path : `/${path}`);
    const nextHash = options?.sectionId ? `#${options.sectionId}` : '';
    const nextUrl = `${nextPath}${nextHash}`;
    if (window.location.pathname + window.location.hash !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }
    setCurrentPath(nextPath);
    setCurrentRoute(resolveRoute(nextPath));

    if (nextPath === '/' && options?.sectionId) {
      setTimeout(() => {
        const element = document.getElementById(options.sectionId || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-page text-white selection:bg-brand-400/30 selection:text-brand-400 font-sans">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      
      <main>
        {currentRoute === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentRoute === 'documentation' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DocsPage />
          </div>
        )}
        {currentRoute === 'http-api' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <HttpApiPage />
          </div>
        )}
        {currentRoute === 'faq' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FaqPage />
          </div>
        )}
        {currentRoute === 'use-cases' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UseCasesPage />
          </div>
        )}
        {currentRoute === 'not-found' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <NotFoundPage onNavigate={handleNavigate} />
          </div>
        )}
      </main>
      
      <Footer currentPath={currentPath} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
