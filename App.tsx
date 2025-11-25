import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CodeDemo from './components/CodeDemo';
import Benchmarks from './components/Benchmarks';
import AgentCommands from './components/AgentCommands';
import Impact from './components/Impact';
import UseCases from './components/UseCases';
import Documentation from './components/Documentation';
import Footer from './components/Footer';
import DocsPage from './components/DocsPage';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');

  const handleNavigate = (view: 'home' | 'docs', sectionId?: string) => {
    setCurrentView(view);
    
    // Handle scrolling after view switch
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (view === 'home') {
       window.scrollTo(0, 0);
    } else {
       window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-page text-white selection:bg-brand-400/30 selection:text-brand-400 font-sans">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main>
        {currentView === 'home' ? (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <Features />
            <CodeDemo />
            <Benchmarks />
            <AgentCommands />
            <Impact />
            <UseCases />
            {/* We keep the summarized documentation component on the home page */}
            <Documentation />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DocsPage />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;