import React from 'react';
import { Server, Zap, Shield, Search, FileJson, Clock, Brain, Network, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Doc + code indexing",
      desc: "One local index for docs, source, and snippets. Watch mode keeps the knowledge base up to date automatically.",
      icon: FileJson,
      badge: "Local"
    },
    {
      title: "AST + impact graph",
      desc: "Structural code intelligence across Rust, Python, JS/TS, Go, Java, C#, and more. See definitions and downstream impact.",
      icon: Network,
      badge: "Code Intel"
    },
    {
      title: "Repo memory",
      desc: "Store project facts and decisions for retrieval later. Ideal for runbooks, edge cases, and conventions.",
      icon: Brain,
      badge: "Persistent"
    },
    {
      title: "Agent memory",
      desc: "Global preference memory keeps agent behavior consistent across repos and teams.",
      icon: Sparkles,
      badge: "Agentic"
    },
    {
      title: "MCP + HTTP",
      desc: "Serve the same index over HTTP, SSE, and MCP. Agents and tools share the same trusted context.",
      icon: Server,
      badge: "Shared"
    },
    {
      title: "Web search refinement",
      desc: "Optional web discovery with strict gating and local LLM filtering via Ollama for high-precision results.",
      icon: Search,
      badge: "Tier 2"
    },
    {
      title: "Secure by default",
      desc: "TLS, auth tokens, allowlists, rate limits, and audit logs keep the daemon safe on any network.",
      icon: Shield,
      badge: "TLS + Auth"
    },
    {
      title: "Install and forget",
      desc: "Auto-configures supported clients, discovers models, and runs as a single shared daemon.",
      icon: Clock,
      badge: "Autopilot"
    },
    {
      title: "Token discipline",
      desc: "Summaries and snippets keep prompts short while preserving the most relevant context.",
      icon: Zap,
      badge: "Efficient"
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
                    Everything your agents need,<br />without the cloud.
                </h2>
            </div>
             <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
                Built for performance, security, and developer experience. Open source and free, with serious engineering underneath.
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
