import React, { useState } from 'react';
import { ChevronRight, Settings, PlayCircle, Download, Terminal, Copy, Check, Command, FileJson, Filter, Server, Zap, Database } from 'lucide-react';

interface DocumentationProps {
  onNavigate?: (path: string) => void;
}

const CodeBlock = ({ code, language = 'bash', title = 'Terminal' }: { code: string, language?: 'bash' | 'json', title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (language === 'bash') {
        return (
            <div className="flex flex-col gap-1">
                {code.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('#')) return <span key={i} className="text-gray-500 italic select-none">{line}</span>;
                    if (trimmed === '') return <div key={i} className="h-4" />;
                    return (
                        <div key={i} className="flex">
                            <span className="text-brand-400 select-none mr-3">$</span>
                            <span className="text-gray-200">{line}</span>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (language === 'json') {
         // Simple regex-based highlighting for JSON
         const highlight = (json: string) => {
             return json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                (match) => {
                    let cls = 'text-[#F78C6C]'; // number/constant
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            return `<span class="text-[#C792EA]">${match.slice(0,-1)}</span><span class="text-gray-400">:</span>`; // key
                        } else {
                            return `<span class="text-[#C3E88D]">${match}</span>`; // string
                        }
                    } else if (/true|false/.test(match)) {
                        return `<span class="text-[#FF5370]">${match}</span>`; // boolean
                    }
                    return `<span class="${cls}">${match}</span>`;
                }
             );
         };
         return <div dangerouslySetInnerHTML={{ __html: highlight(code) }} />;
    }

    return code;
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0F0F0F] border border-surface-200/50 shadow-2xl my-6 group ring-1 ring-white/5">
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-surface-200/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-xs text-gray-500 font-mono font-medium tracking-wide">{title}</div>
        <button 
            onClick={handleCopy} 
            className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            title="Copy code"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500"/> : <Copy className="w-3.5 h-3.5"/>}
        </button>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-brand-400/30">
        {renderContent()}
      </div>
    </div>
  );
};

const Documentation: React.FC<DocumentationProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'indexing' | 'querying' | 'server' | 'mcp'>('quickstart');

  const tabs = [
    { id: 'quickstart', label: 'Quick Start', icon: Zap },
    { id: 'indexing', label: 'Indexing', icon: Database },
    { id: 'querying', label: 'CLI Chat', icon: Terminal },
    { id: 'server', label: 'HTTP Server', icon: Server },
    { id: 'mcp', label: 'MCP Server', icon: Settings },
  ];

  const content = {
    quickstart: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-brand-400 rounded-lg text-black"><Zap className="w-5 h-5" /></span>
                Up and Running
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Get Docdex installed and running in under 30 seconds. Requires Node.js 18+; the npm wrapper downloads the right release binary for your platform.
            </p>

            <div className="space-y-8">
                <div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-brand-400">
                        1. Install & Index
                    </h4>
                    <CodeBlock 
                        title="Terminal"
                        language="bash" 
                        code={`# Install globally
npm i -g docdex

# Build the index for your repo
docdexd index --repo /path/to/repo`} 
                    />
                </div>
                <div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-brand-400">
                        2. Query
                    </h4>
                    <CodeBlock 
                        title="Terminal"
                        language="bash" 
                        code={`# Run a test query
docdexd chat --repo /path/to/repo --query "otp flow" --limit 5`} 
                    />
                </div>
            </div>
        </div>
    ),
    indexing: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-brand-400 rounded-lg text-black"><Database className="w-5 h-5" /></span>
                Indexing Options
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
                Control how Docdex scans your files. `docdexd index` does a full rebuild; `docdexd serve` keeps a watcher running and ingests changes while serving.
            </p>

            <div className="space-y-10">
                <div>
                    <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <Filter className="w-4 h-4 text-brand-400" /> Full index
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">Create or refresh the on-disk index for your repo.</p>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`docdexd index --repo /path/to/repo`}
                    />
                </div>

                <div>
                    <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <Filter className="w-4 h-4 text-brand-400" /> Exclude directories
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">Skip build/vendor/cache folders in one command.</p>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`docdexd index --repo . --exclude-dir node_modules,target,.git`}
                    />
                </div>

                <div>
                    <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <Filter className="w-4 h-4 text-brand-400" /> Prefix filters
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">Skip additional relative prefixes or move the shared state directory.</p>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`docdexd index --repo . \\
  --exclude-prefix ".docdex/tmp,.docdex/logs" \\
  --state-dir /tmp/docdex-index`}
                    />
                </div>
            </div>
        </div>
    ),
    querying: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-brand-400 rounded-lg text-black"><Terminal className="w-5 h-5" /></span>
                CLI Chat and Search
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
                Search your indexed documents directly from the terminal. Useful for quick lookups or piping into other tools.
            </p>

            <div className="space-y-10">
                <div>
                    <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <Command className="w-4 h-4 text-brand-400" /> Basic Search
                    </h4>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`docdexd chat --repo /path/to/repo --query "auth flow" --limit 4`}
                    />
                </div>

                <div>
                     <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <FileJson className="w-4 h-4 text-brand-400" /> Search response shape
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">CLI and HTTP return the same structure with summaries and optional snippets.</p>
                    <CodeBlock 
                        title="JSON"
                        language="json"
                        code={`{
  "hits": [
    {
      "doc_id": "1",
      "rel_path": "docs/auth.md",
      "score": 13.2,
      "summary": "Auth flow overview...",
      "snippet": "<p>...</p>",
      "token_estimate": 220
    }
  ]
}`}
                    />
                </div>
            </div>
        </div>
    ),
    server: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-brand-400 rounded-lg text-black"><Server className="w-5 h-5" /></span>
                HTTP Server
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
                Expose your index via a lightweight HTTP API. Secure mode is on by default (auth token, allowlist, rate limits).
                TLS is required for non-loopback binds unless you explicitly disable it.
            </p>

            <div className="space-y-10">
                <div>
                    <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <PlayCircle className="w-4 h-4 text-brand-400" /> Start Server
                    </h4>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`# Shared daemon (HTTP + MCP)
docdexd daemon --repo /path/to/repo \\
  --host 127.0.0.1 --port 3210 --log warn \\
  --secure-mode=false

# Serve with TLS + auth for remote access
docdexd serve --repo /path/to/repo \\
  --host 0.0.0.0 --port 3210 --auth-token <token> \\
  --tls-cert /etc/letsencrypt/live/example.com/fullchain.pem \\
  --tls-key /etc/letsencrypt/live/example.com/privkey.pem`}
                    />
                </div>

                <div>
                     <h4 className="text-white font-medium flex items-center gap-2 mb-2">
                        <Command className="w-4 h-4 text-brand-400" /> API Usage
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">Query the API using curl (summary-only for smaller payloads).</p>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`curl "http://127.0.0.1:3210/search?q=auth&snippets=false"`}
                    />
                </div>
            </div>
        </div>
    ),
    mcp: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-brand-400 rounded-lg text-black"><Settings className="w-5 h-5" /></span>
                MCP Integration
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
                Docdex implements the Model Context Protocol natively. Use the shared daemon for HTTP/SSE MCP, or fall back to the stdio server for legacy clients.
            </p>

            <div className="space-y-10">
                
                {/* Automatic Method */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-400/10 to-transparent border border-brand-400/20">
                    <h4 className="text-brand-400 font-bold mb-2 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" /> Recommended: Auto-Setup
                    </h4>
                    <p className="text-sm text-gray-400 mb-4">
                        Use the built-in helper to auto-configure agents and keep the shared daemon running.
                    </p>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`# Start shared MCP + HTTP daemon
docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210

# Auto-config supported agents (add --all to try every known one)
docdexd mcp-add --agent codex --repo /path/to/repo --log warn --max-results 8

# Legacy stdio MCP (for clients without HTTP/SSE)
docdexd mcp --repo /path/to/repo --log warn --max-results 8`}
                    />
                </div>

                {/* Manual Method */}
                <div>
                     <h4 className="text-white font-medium flex items-center gap-2 mb-4">
                        Manual Configuration
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                        If you prefer to edit configuration files manually, point your MCP client to the shared SSE endpoint.
                    </p>
                    <CodeBlock 
                        title="claude_desktop_config.json"
                        language="json"
                        code={`{
  "mcpServers": {
    "docdex": {
      "url": "http://localhost:3210/sse"
    }
  }
}`}
                    />
                </div>
            </div>
        </div>
    )
  };

  return (
    <section id="docs" className="py-32 bg-page border-t border-surface-100/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-400/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Navigation Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 block px-4">Documentation</span>
                <nav className="space-y-2">
                {tabs.map((tab) => (
                    <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                        activeTab === tab.id 
                        ? 'bg-brand-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)] scale-[1.02]' 
                        : 'text-gray-400 hover:text-white hover:bg-surface-100'
                    }`}
                    >
                    <div className="flex items-center gap-3">
                        <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                        {tab.label}
                    </div>
                    {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                ))}
                </nav>

                {/* Quick Link Box */}
                <div className="mt-10 p-5 rounded-2xl bg-surface-50 border border-surface-200/50 space-y-3">
                    <p className="text-xs text-gray-400">Need the full reference?</p>
                    <button
                      onClick={() => onNavigate?.('/documentation')}
                      className="text-sm font-semibold text-white hover:text-brand-400 flex items-center gap-2 transition-colors"
                    >
                      Open documentation <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onNavigate?.('/http-api')}
                      className="text-sm font-semibold text-white hover:text-brand-400 flex items-center gap-2 transition-colors"
                    >
                      HTTP API reference <ChevronRight className="w-3 h-3" />
                    </button>
                    <a
                      href="https://github.com/bekirdag/docdex"
                      className="text-sm font-semibold text-white hover:text-brand-400 flex items-center gap-2 transition-colors"
                    >
                      View on GitHub <ChevronRight className="w-3 h-3" />
                    </a>
                </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
             <div className="bg-[#0A0A0A] rounded-3xl border border-surface-200/50 p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[600px]">
                {/* Content Gradient Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/5 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10">
                    {content[activeTab]}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Documentation;
