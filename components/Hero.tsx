import React, { useState } from 'react';
import { Copy, Check, Terminal, Server, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm i -g docdex";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-grid-pattern selection:bg-brand-400/30">
      {/* Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-brand-200/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
      {/* New Right Light for Glass Effect */}
      <div className="absolute top-1/4 right-[-100px] w-[600px] h-[600px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:gap-12">
          
          {/* Left Column: Text */}
          <div className="lg:w-2/3 flex flex-col justify-center text-center lg:text-left pt-8 lg:pt-0">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100/80 border border-surface-200/60 mb-8 backdrop-blur-md shadow-lg mx-auto lg:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-gray-300 tracking-wide">v0.1.5 Now Available</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-semibold tracking-tighter text-white mb-8 text-balance leading-[0.95]">
                <span className="text-brand-400">Docdex</span>: Search smart,<br />
                <span className="text-gray-500">build faster.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stop wasting tokens. Give your AI agents blazing fast, local full-text search capabilities with zero latency. Built on Tantivy for extreme performance.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <div className="relative group cursor-pointer" onClick={handleCopy}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-surface-200 to-surface-100 rounded-full opacity-50 blur transition-all duration-500 group-hover:opacity-75 group-hover:blur-xl"></div>
                  <div className="relative flex items-center bg-surface-50/90 backdrop-blur-md rounded-full p-2 pr-10 border border-surface-200/60 shadow-2xl transition-transform duration-200 active:scale-[0.99] group-hover:border-surface-300">
                    <div className="w-20 h-20 rounded-full bg-surface-200 flex items-center justify-center mr-6 border border-surface-300 shadow-inner shrink-0">
                      <span className="font-mono text-3xl text-brand-400 select-none">$</span>
                    </div>
                    <input 
                      type="text" 
                      readOnly 
                      value={installCommand} 
                      className="bg-transparent text-gray-200 font-mono text-2xl sm:text-3xl focus:outline-none w-64 sm:w-80 pointer-events-none tracking-tight select-none"
                    />
                    <div className="ml-4 text-gray-400 group-hover:text-white transition-colors shrink-0">
                      {copied ? <Check className="w-8 h-8 text-green-500" /> : <Copy className="w-8 h-8" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="lg:w-1/3 w-full flex flex-col justify-center space-y-4 mt-16 lg:mt-0 lg:pl-8 relative z-10">
             {/* Card 1 */}
             <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.06] transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">MCP Server</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-16 relative z-10">Native integration with Model Context Protocol. Connect Claude directly to your docs.</p>
             </div>
             
             {/* Card 2 */}
             <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.06] transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                    <Server className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Unix Daemon</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-16 relative z-10">Runs as a background service. Auto-indexes changes in real-time without intervention.</p>
             </div>

             {/* Card 3 */}
             <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.06] transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Tantivy Engine</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-16 relative z-10">Built on Rust. 10x faster indexing than Lucene with a minimal memory footprint.</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;