import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen bg-page text-white selection:bg-brand-400/30 selection:text-brand-400">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CodeDemo />
        <Benchmarks />
        <AgentCommands />
        <Impact />
        <UseCases />
        <Documentation />
      </main>
      <Footer />
    </div>
  );
}

export default App;