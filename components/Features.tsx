import React from 'react';
import { Server, Zap, Shield, Search, FileJson, Clock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Token Optimization",
      desc: "Stop feeding entire files to LLMs. Docdex retrieves only relevant snippets, reducing token usage by up to 90%.",
      icon: Zap,
      badge: "Cost Saver"
    },
    {
      title: "Local & Secure",
      desc: "Your data never leaves your machine. Indexes are stored locally. Perfect for proprietary codebases.",
      icon: Shield,
      badge: "Private"
    },
    {
      title: "Smart Indexing",
      desc: "Intelligent file watcher detects changes instantly. Supports Markdown, JSON, Text, and Code files.",
      icon: FileJson,
      badge: "Real-time"
    },
    {
      title: "HTTP Server API",
      desc: "Expose your index via a lightweight REST API. Let any service in your infrastructure query your documentation.",
      icon: Server,
      badge: "Connect"
    },
    {
      title: "Fuzzy Search",
      desc: "Tolerates typos and partial matches. Finds what you mean, not just exactly what you typed.",
      icon: Search,
      badge: "Tantivy"
    },
    {
      title: "Set & Forget",
      desc: "Install as a system daemon. It runs silently in the background, keeping your knowledge base fresh.",
      icon: Clock,
      badge: "Unix"
    }
  ];

  return (
    <section id="features" className="py-32 bg-page relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100 border border-surface-200/60 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                    <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Core Capabilities</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight text-balance leading-[1.1]">
                    Everything you need<br />to power your agents.
                </h2>
            </div>
             <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
                Built for performance, security, and developer experience. No fluff, just raw indexing power.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-brand-500/30 transition-all duration-300 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-surface-100 flex items-center justify-center text-white group-hover:text-brand-400 group-hover:bg-surface-200 transition-colors duration-300 border border-surface-200/50">
                        <feature.icon className="w-6 h-6" />
                    </div>
                    {feature.badge && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 border border-surface-200/50 px-2 py-1 rounded bg-surface-100/50">
                            {feature.badge}
                        </span>
                    )}
                </div>
                
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-brand-100 transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;