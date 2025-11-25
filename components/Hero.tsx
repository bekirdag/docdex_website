import React, { useState } from 'react';
import { Copy, Check, ChevronRight, Terminal, Server, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm i -g docdex";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-grid-pattern">
      {/* Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-200/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100/80 border border-surface-200/60 mb-8 backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 tracking-wide">v0.1.5 Now Available</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tighter text-white mb-8 text-balance leading-[0.95]">
            Docdex: Search smart,<br />
            <span className="text-gray-500">build faster.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Stop wasting tokens. Give your AI agents blazing fast, local full-text search capabilities with zero latency. Built on Tantivy for extreme performance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-20">
             <a 
              href="#docs" 
              className="px-8 py-4 text-base font-bold bg-shiny-gold text-black rounded-full transition-all shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4),0px_0px_20px_rgba(234,179,8,0.2)] hover:shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4),0px_0px_30px_rgba(234,179,8,0.4)] border-t border-yellow-200 border-b border-yellow-600 active:translate-y-px"
            >
              Get Started
            </a>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-surface-200 to-surface-100 rounded-full opacity-50 blur"></div>
              <div className="relative flex items-center bg-surface-50/90 backdrop-blur-md rounded-full p-1 pr-5 border border-surface-200/60 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center mr-3 border border-surface-300">
                  <span className="font-mono text-brand-400">$</span>
                </div>
                <input 
                  type="text" 
                  readOnly 
                  value={installCommand} 
                  className="bg-transparent text-gray-300 font-mono text-sm focus:outline-none w-32"
                />
                <button 
                  onClick={handleCopy}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-md hover:bg-surface-100/50 transition-colors shadow-lg group">
                <div className="w-10 h-10 rounded-xl bg-surface-200/50 flex items-center justify-center mb-4 text-white group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">MCP Server</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Native integration with Model Context Protocol. Connect Claude directly to your docs.</p>
             </div>
             <div className="p-6 rounded-2xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-md hover:bg-surface-100/50 transition-colors shadow-lg group">
                <div className="w-10 h-10 rounded-xl bg-surface-200/50 flex items-center justify-center mb-4 text-white group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Unix Daemon</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Runs as a background service. Auto-indexes changes in real-time.</p>
             </div>
             <div className="p-6 rounded-2xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-md hover:bg-surface-100/50 transition-colors shadow-lg group">
                <div className="w-10 h-10 rounded-xl bg-surface-200/50 flex items-center justify-center mb-4 text-white group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Tantivy Engine</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Built on Rust. 10x faster indexing than Lucene. Low memory footprint.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;