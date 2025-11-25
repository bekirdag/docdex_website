import React from 'react';
import { Server, Zap, Shield, Search, FileJson, Clock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Token Optimization",
      desc: "Stop feeding entire files to LLMs. Docdex retrieves only relevant snippets, reducing token usage by up to 90%.",
      icon: Zap,
    },
    {
      title: "Local & Secure",
      desc: "Your data never leaves your machine. Indexes are stored locally. Perfect for proprietary codebases.",
      icon: Shield,
    },
    {
      title: "Smart Indexing",
      desc: "Intelligent file watcher detects changes instantly. Supports Markdown, JSON, Text, and Code files.",
      icon: FileJson,
    },
    {
      title: "HTTP Server API",
      desc: "Expose your index via a lightweight REST API. Let any service in your infrastructure query your documentation.",
      icon: Server,
    },
    {
      title: "Fuzzy Search",
      desc: "Tolerates typos and partial matches. Finds what you mean, not just exactly what you typed.",
      icon: Search,
    },
    {
      title: "Set & Forget",
      desc: "Install as a system daemon. It runs silently in the background, keeping your knowledge base fresh.",
      icon: Clock,
    }
  ];

  return (
    <section id="features" className="py-24 bg-page relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Features</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 mb-6 tracking-tight">Everything you need<br />to power your agents.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl bg-surface-100/30 backdrop-blur-sm border border-surface-200/50 hover:border-surface-300 transition-all duration-300 hover:shadow-2xl hover:bg-surface-100/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface-200/50 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-400 group-hover:text-black shadow-inner">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;