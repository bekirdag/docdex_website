import React, { useState } from 'react';
import { ChevronRight, FileText, Settings, PlayCircle, Download } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'install' | 'usage' | 'mcp'>('install');

  const content = {
    install: (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Installation</h3>
          <p className="text-gray-400 leading-relaxed">Docdex is available as a global NPM package. Ensure you have Node.js 18+ installed on your system.</p>
        </div>
        
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-400/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/50 p-6 rounded-xl border border-surface-200/50 font-mono text-sm text-gray-300 shadow-lg">
             <span className="text-brand-400">$</span> npm install -g docdex
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Verify Installation</h4>
          <div className="bg-black/50 p-6 rounded-xl border border-surface-200/50 font-mono text-sm text-gray-300 shadow-lg">
             <span className="text-brand-400">$</span> docdex --version
          </div>
        </div>
      </div>
    ),
    usage: (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Basic Usage</h3>
          <p className="text-gray-400">The CLI is designed to be minimal. Here are the primary commands to get you started.</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-white font-medium mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Index a directory
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-surface-200/50 font-mono text-sm text-gray-400 shadow-lg">
              docdex index ./my-docs
            </div>
          </div>
          <div>
             <div className="text-white font-medium mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Search via CLI
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-surface-200/50 font-mono text-sm text-gray-400 shadow-lg">
              docdex search "database connection"
            </div>
          </div>
          <div>
            <div className="text-white font-medium mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Start HTTP Server
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-surface-200/50 font-mono text-sm text-gray-400 shadow-lg">
              docdex serve --port 3000
            </div>
          </div>
        </div>
      </div>
    ),
    mcp: (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">MCP Server Configuration</h3>
          <p className="text-gray-400 leading-relaxed">
            Docdex implements the <span className="text-white font-medium">Model Context Protocol</span>. This allows LLMs like Claude to directly tool-call into your index without any glue code.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Claude Desktop Config</h4>
          <p className="text-sm text-gray-500 mb-4">Add this to your <code className="text-xs bg-surface-200/50 border border-surface-300/30 text-gray-300 px-1 py-0.5 rounded">claude_desktop_config.json</code></p>
          
          <div className="bg-black/50 p-6 rounded-xl border border-surface-200/50 font-mono text-xs md:text-sm text-gray-400 overflow-x-auto shadow-lg">
            <pre>{`{
  "mcpServers": {
    "docdex": {
      "command": "docdex",
      "args": [
        "mcp",
        "--dir",
        "/absolute/path/to/docs"
      ]
    }
  }
}`}</pre>
          </div>
        </div>
      </div>
    )
  };

  return (
    <section id="docs" className="py-24 bg-page border-t border-surface-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Learn</span>
            <h2 className="text-3xl font-semibold text-white mt-2 mb-8">Documentation</h2>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('install')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'install' ? 'bg-surface-100 text-white border border-surface-200' : 'text-gray-500 hover:text-white hover:bg-surface-50/50 border border-transparent'}`}
              >
                <Download className="w-4 h-4" /> Installation
              </button>
              <button 
                onClick={() => setActiveTab('usage')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'usage' ? 'bg-surface-100 text-white border border-surface-200' : 'text-gray-500 hover:text-white hover:bg-surface-50/50 border border-transparent'}`}
              >
                <PlayCircle className="w-4 h-4" /> Basic Usage
              </button>
              <button 
                onClick={() => setActiveTab('mcp')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'mcp' ? 'bg-surface-100 text-white border border-surface-200' : 'text-gray-500 hover:text-white hover:bg-surface-50/50 border border-transparent'}`}
              >
                <Settings className="w-4 h-4" /> MCP Integration
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:w-3/4 min-h-[400px]">
             {content[activeTab]}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Documentation;