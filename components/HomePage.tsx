import React from 'react';
import Seo from './Seo';
import Hero from './Hero';
import Features from './Features';
import IndexExplainer from './IndexExplainer';
import CodeDemo from './CodeDemo';
import Benchmarks from './Benchmarks';
import AgentCommands from './AgentCommands';
import Impact from './Impact';
import UseCases from './UseCases';
import Documentation from './Documentation';

interface HomePageProps {
  onNavigate: (path: string, options?: { sectionId?: string }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
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
        description="Docdex indexes docs and code locally with AST, impact graphs, memory, MCP, and HTTP APIs. Open source, secure, and install-and-forget."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero onNavigate={(path) => onNavigate(path)} />
      <Features />
      <IndexExplainer />
      <CodeDemo />
      <Benchmarks />
      <AgentCommands />
      <Impact />
      <UseCases onNavigate={(path) => onNavigate(path)} />
      <Documentation onNavigate={(path) => onNavigate(path)} />
    </div>
  );
};

export default HomePage;
