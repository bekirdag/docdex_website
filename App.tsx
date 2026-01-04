import React, { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

const DocsPage = React.lazy(() => import('./components/DocsPage'));
const HttpApiPage = React.lazy(() => import('./components/HttpApiPage'));
const FaqPage = React.lazy(() => import('./components/FaqPage'));
const UseCasesPage = React.lazy(() => import('./components/UseCasesPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));

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

const ANALYTICS_ID = 'G-NJ7XZGC1C1';

const loadAnalytics = () => {
  const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (win.gtag) return;
  win.dataLayer = win.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    win.dataLayer?.push(args);
  };
  win.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ANALYTICS_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  document.head.appendChild(script);
};

function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteKey>(() => resolveRoute(window.location.pathname));
  const [currentPath, setCurrentPath] = useState<string>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    let loaded = false;
    let timeoutId: number | undefined;

    const trigger = () => {
      if (loaded) return;
      loaded = true;
      loadAnalytics();
      cleanup();
    };

    const cleanup = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', trigger);
      window.removeEventListener('mousemove', trigger);
      window.removeEventListener('touchstart', trigger);
    };

    window.addEventListener('scroll', trigger, { passive: true });
    window.addEventListener('mousemove', trigger);
    window.addEventListener('touchstart', trigger, { passive: true });
    timeoutId = window.setTimeout(trigger, 3500);

    return cleanup;
  }, []);

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

  const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div>
  );

  const renderRoute = () => {
    if (currentRoute === 'home') return <HomePage onNavigate={handleNavigate} />;
    if (currentRoute === 'documentation') {
      return (
        <PageTransition>
          <DocsPage />
        </PageTransition>
      );
    }
    if (currentRoute === 'http-api') {
      return (
        <PageTransition>
          <HttpApiPage />
        </PageTransition>
      );
    }
    if (currentRoute === 'faq') {
      return (
        <PageTransition>
          <FaqPage />
        </PageTransition>
      );
    }
    if (currentRoute === 'use-cases') {
      return (
        <PageTransition>
          <UseCasesPage />
        </PageTransition>
      );
    }
    return (
      <PageTransition>
        <NotFoundPage onNavigate={handleNavigate} />
      </PageTransition>
    );
  };

  return (
    <div className="min-h-screen bg-page text-white selection:bg-brand-400/30 selection:text-brand-400 font-sans">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      
      <main>
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
              Loading Docdex...
            </div>
          }
        >
          {renderRoute()}
        </Suspense>
      </main>
      
      <Footer currentPath={currentPath} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
