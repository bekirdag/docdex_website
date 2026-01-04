import React, { Suspense, useEffect, useRef, useState } from 'react';
import Seo from './Seo';
import Hero from './Hero';
import Features from './Features';
import IndexExplainer from './IndexExplainer';
import CodeDemo from './CodeDemo';
import AgentCommands from './AgentCommands';
import Impact from './Impact';
import UseCases from './UseCases';
import Documentation from './Documentation';

interface HomePageProps {
  onNavigate: (path: string, options?: { sectionId?: string }) => void;
}

const Benchmarks = React.lazy(() => import('./Benchmarks'));

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [renderBenchmarks, setRenderBenchmarks] = useState(false);
  const benchmarksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (renderBenchmarks) return;
    const node = benchmarksRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setRenderBenchmarks(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRenderBenchmarks(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [renderBenchmarks]);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Docdex',
      url: 'https://docdex.org',
      description:
        'Open source, local-first indexer for docs and code with AST, impact graphs, memory, MCP, and HTTP APIs.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://docdex.org/documentation?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Docdex',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux, Windows',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      url: 'https://docdex.org',
      downloadUrl: 'https://www.npmjs.com/package/docdex',
      license: 'https://github.com/bekirdag/docdex/blob/main/LICENSE',
      description:
        'Local-first documentation and code indexer with AST, impact graph, memory, MCP, and secure HTTP APIs.',
      publisher: {
        '@type': 'Person',
        name: 'Bekir Dag'
      },
      sameAs: ['https://github.com/bekirdag/docdex', 'https://www.npmjs.com/package/docdex']
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <Seo
        title="Open Source Local Code Intelligence and Memory"
        description="Docdex is an open source, local-first indexer for docs and code with AST, impact graphs, memory, MCP, and HTTP APIs. Install once to give agents fast, secure context."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero onNavigate={(path) => onNavigate(path)} />
      <Features />
      <IndexExplainer />
      <CodeDemo />
      <div ref={benchmarksRef}>
        {renderBenchmarks ? (
          <Suspense
            fallback={
              <section id="benchmarks" className="py-32 bg-page">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="h-64 rounded-3xl border border-surface-200/50 bg-surface-50/30 animate-pulse" />
                </div>
              </section>
            }
          >
            <Benchmarks />
          </Suspense>
        ) : (
          <section id="benchmarks" className="py-32 bg-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-64 rounded-3xl border border-surface-200/50 bg-surface-50/30" />
            </div>
          </section>
        )}
      </div>
      <AgentCommands />
      <Impact />
      <UseCases onNavigate={(path) => onNavigate(path)} />
      <Documentation onNavigate={(path) => onNavigate(path)} />
    </div>
  );
};

export default HomePage;
