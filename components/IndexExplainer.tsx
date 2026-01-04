import React from 'react';
import { BookOpen, Code2, Braces, GitBranch } from 'lucide-react';

const IndexExplainer: React.FC = () => {
  const pillars = [
    {
      title: 'Doc index',
      icon: BookOpen,
      description:
        'Reads README files, runbooks, ADRs, and guides, then ranks answers by intent instead of raw keyword hits.',
      example: 'Ask "deployment rollback" and get the exact runbook and summary first.'
    },
    {
      title: 'Code index',
      icon: Code2,
      description:
        'Indexes source files with smart snippet windows, so you get just the relevant lines, not whole files.',
      example: 'Search "rate limiter" and get the function and caller in one view.'
    },
    {
      title: 'AST',
      icon: Braces,
      description:
        'Builds syntax trees for supported languages to find real definitions, references, and structures.',
      example: 'Locate the definition of handleRequest even if the name changes.'
    },
    {
      title: 'Impact graph',
      icon: GitBranch,
      description:
        'Maps dependencies between files and symbols so you can predict what changes will break.',
      example: 'See downstream callers before refactoring a shared utility.'
    }
  ];

  return (
    <section id="indexing" className="py-28 bg-page relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Plain Language</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">
            Docdex understands your repo.
          </h2>
          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            Docdex is more than search. It builds a knowledge base of docs, code, and structure so humans
            and agents can reason about your system without guessing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-surface-200/60 hover:border-brand-500/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center text-brand-400 border border-surface-200">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{pillar.description}</p>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Example</div>
              <p className="text-sm text-gray-300 mt-2">{pillar.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexExplainer;
