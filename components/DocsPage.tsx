
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Settings, 
  Server, 
  Database, 
  ChevronRight, 
  Zap, 
  BookOpen, 
  Cpu, 
  AlertCircle,
  Check,
  Copy,
  List,
  Wrench,
  Shield,
  Hash
} from 'lucide-react';

// --- Types ---
interface ArgDefinition {
  name: string;
  description: string;
  type: string;
  required?: boolean;
}

// --- Helper Components ---

const SyntaxHighlight = ({ code, language }: { code: string, language: 'bash' | 'json' | 'text' }) => {
  if (language === 'bash') {
    return (
      <>
        {code.split('\n').map((line, i) => {
          // Comment
          if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
            return <span key={i} className="text-gray-500 italic">{line}</span>;
          }
          if (line.trim() === '') return <div key={i} className="h-4" />;
          
          const tokens = line.split(' ');
          return (
            <div key={i}>
              {tokens.map((token, j) => {
                // Command start
                if (j === 0 && token === 'docdex') return <span key={j} className="text-brand-400 font-bold">{token} </span>;
                if (j === 0 && (token === 'npm' || token === 'curl' || token === 'cd' || token === 'npx')) return <span key={j} className="text-blue-400 font-bold">{token} </span>;
                
                // Flags
                if (token.startsWith('--') || token.startsWith('-')) return <span key={j} className="text-purple-400">{token} </span>;
                
                // Strings
                if (token.startsWith('"') || token.startsWith("'")) return <span key={j} className="text-green-400">{token} </span>;
                
                return <span key={j} className="text-gray-300">{token} </span>;
              })}
            </div>
          );
        })}
      </>
    );
  }

  if (language === 'json') {
     // Simple JSON highlighter
     const jsonRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
     const highlighted = code.replace(jsonRegex, (match) => {
        let cls = 'text-orange-400'; // number
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                return `<span class="text-brand-400 font-medium">${match.slice(0,-1)}</span><span class="text-gray-500">:</span>`; // key
            } else {
                return `<span class="text-green-400">${match}</span>`; // string
            }
        } else if (/true|false/.test(match)) {
            return `<span class="text-red-400">${match}</span>`; // boolean
        }
        return `<span class="${cls}">${match}</span>`;
     });
     
     return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
  }

  return <span className="text-gray-300 whitespace-pre-wrap">{code}</span>;
};

const CodeBlock = ({ code, language = 'bash', title }: { code: string, language?: 'bash' | 'json' | 'text', title?: string }) => {
  const [copied, setCopied] = useState(false);
  const lineCount = code.trim().split('\n').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0F0F0F] border border-surface-200/50 shadow-lg my-6 group ring-1 ring-white/5">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] border-b border-surface-200/30">
        <div className="flex items-center gap-2">
          {language === 'bash' ? <Terminal className="w-3.5 h-3.5 text-gray-500" /> : <Hash className="w-3.5 h-3.5 text-gray-500" />}
          <span className="text-xs font-mono text-gray-500 font-medium tracking-wide uppercase">{title || language}</span>
        </div>
        <button 
            onClick={handleCopy} 
            className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
            title="Copy code"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500"/> : <Copy className="w-3.5 h-3.5"/>}
        </button>
      </div>
      
      <div className="flex overflow-x-auto custom-scrollbar">
        {/* Line Numbers */}
        <div className="py-4 pl-3 pr-2 text-right select-none bg-[#1A1A1A]/30 border-r border-white/5 min-w-[3rem]">
            {Array.from({length: lineCount}).map((_, i) => (
                <div key={i} className="text-xs font-mono text-gray-700 leading-6">{i + 1}</div>
            ))}
        </div>
        
        {/* Code Content */}
        <div className="p-4 font-mono text-sm leading-6 w-full">
            <SyntaxHighlight code={code.trim()} language={language} />
        </div>
      </div>
    </div>
  );
};

const HeroCommand = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden mb-8 mt-2">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent opacity-50 pointer-events-none"></div>
        <div className="relative bg-[#0F0F0F] border border-brand-500/30 rounded-xl flex items-center justify-between p-4 md:p-5 shadow-lg transition-all hover:border-brand-500/50">
             <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0 border border-brand-500/20">
                    <ChevronRight className="w-4 h-4 text-brand-400" />
                </div>
                <code className="font-mono text-sm md:text-base text-brand-100 whitespace-nowrap">
                    {command}
                </code>
             </div>
             <button 
                onClick={handleCopy}
                className="shrink-0 ml-4 text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
             >
                {copied ? <Check className="w-5 h-5 text-green-500"/> : <Copy className="w-5 h-5"/>}
             </button>
        </div>
    </div>
  );
};

const ArgsTable = ({ args }: { args: ArgDefinition[] }) => (
  <div className="overflow-hidden border border-surface-200/50 rounded-xl mb-8 bg-surface-50/30 backdrop-blur-sm">
    <table className="min-w-full divide-y divide-surface-200/30">
      <thead className="bg-surface-100">
        <tr>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Argument</th>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-1/2">Description</th>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Type</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-surface-200/30">
        {args.map((arg, idx) => (
          <tr key={idx} className="hover:bg-surface-100/50 transition-colors">
             <td className="px-5 py-3 whitespace-nowrap font-mono text-sm">
                <span className="text-brand-400">{arg.name}</span>
                {arg.required && <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">REQ</span>}
             </td>
             <td className="px-5 py-3 text-sm text-gray-400 leading-relaxed">{arg.description}</td>
             <td className="px-5 py-3 whitespace-nowrap text-xs text-gray-500 font-mono">{arg.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EndpointTable = ({ endpoints }: { endpoints: { method: string, path: string, desc: string }[] }) => (
  <div className="overflow-hidden border border-surface-200/50 rounded-xl mb-8 bg-surface-50/30 backdrop-blur-sm">
    <table className="min-w-full divide-y divide-surface-200/30">
      <thead className="bg-surface-100">
        <tr>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-20">Method</th>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-1/3">Path</th>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-surface-200/30">
        {endpoints.map((ep, idx) => (
          <tr key={idx} className="hover:bg-surface-100/50 transition-colors">
             <td className="px-5 py-3 whitespace-nowrap font-mono text-sm">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                    {ep.method}
                </span>
             </td>
             <td className="px-5 py-3 whitespace-nowrap font-mono text-sm text-gray-300">{ep.path}</td>
             <td className="px-5 py-3 text-sm text-gray-400 leading-relaxed">{ep.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Section = ({ title, children, id }: { title: string, children?: React.ReactNode, id: string }) => (
  <div id={id} className="mb-24 scroll-mt-32 section-observer-target">
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-brand-400 rounded-full"></span>
        {title}
    </h2>
    {children}
  </div>
);

const SubSection = ({ title, children, id }: { title: string, children?: React.ReactNode, id?: string }) => (
  <div id={id} className={`mb-12 ${id ? 'scroll-mt-32 section-observer-target' : ''}`}>
    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-brand-400 rounded-full"></div>
        {title}
    </h3>
    {children}
  </div>
);

const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('what-is-docdex');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isManualScrolling = useRef(false);

  useEffect(() => {
    // Intersection Observer to update active state
    const options = {
      root: null,
      rootMargin: '-100px 0px -80% 0px', 
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Skip updates if user is manually scrolling via click
      if (isManualScrolling.current) return;

      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    }, options);

    const sections = document.querySelectorAll('.section-observer-target');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const menuItems = [
    {
      id: 'intro',
      label: 'Introduction',
      icon: BookOpen,
      items: [
        { id: 'what-is-docdex', label: 'What is Docdex?' },
      ]
    },
    {
      id: 'getting-started',
      label: 'Getting Started',
      icon: Zap,
      items: [
        { id: 'installation', label: 'Installation' },
        { id: 'basic-usage', label: 'Basic Usage' },
      ]
    },
    {
      id: 'cli-reference',
      label: 'CLI Reference',
      icon: Terminal,
      items: [
        { id: 'cli-cheatsheet', label: 'Cheat Sheet' },
        { id: 'cli-index', label: 'Indexing' },
        { id: 'cli-query', label: 'Query' },
        { id: 'cli-serve', label: 'Serve' },
        { id: 'config-knobs', label: 'Config Knobs' },
        { id: 'help-discovery', label: 'Help & Discovery' }
      ]
    },
    {
      id: 'mcp-server',
      label: 'MCP Server',
      icon: Cpu,
      items: [
        { id: 'mcp-server', label: 'Overview & Setup' },
        { id: 'mcp-tools', label: 'Available Tools' },
        { id: 'mcp-claude', label: 'Manual Config' },
      ]
    },
    {
      id: 'agent-guide',
      label: 'Agent Guide',
      icon: Settings,
      items: [
        { id: 'system-prompt', label: 'System Prompting' },
        { id: 'agent-workflow', label: 'The Search-Read Loop' },
        { id: 'agent-patterns', label: 'Prompting Patterns' },
        { id: 'agent-troubleshooting', label: 'Troubleshooting' },
      ]
    }
  ];

  const scrollToSection = (id: string) => {
    isManualScrolling.current = true;
    setActiveId(id);
    setSidebarOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    } else {
        isManualScrolling.current = false;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-page">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 relative">
          
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-6 flex items-center justify-between bg-surface-50 p-4 rounded-lg border border-surface-200">
            <span className="text-white font-medium">Table of Contents</span>
            <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="text-brand-400 p-1"
            >
                {isSidebarOpen ? <ChevronRight className="rotate-90" /> : <List />}
            </button>
          </div>

          {/* LEFT SIDEBAR (Navigation) */}
          <aside className={`
            fixed lg:sticky top-28 left-0 z-40 w-64 h-[calc(100vh-8rem)] overflow-y-auto 
            bg-page lg:bg-transparent border-r lg:border-r-0 border-surface-200/50 pr-4 
            lg:block transition-transform duration-300 flex-shrink-0
            ${isSidebarOpen ? 'translate-x-0 shadow-2xl bg-surface-50 p-6 rounded-r-xl border-r' : '-translate-x-full lg:translate-x-0'}
            lg:w-64 xl:w-72
          `}>
            <div className="space-y-8 pb-10">
              {menuItems.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pl-2">
                    <group.icon className="w-3.5 h-3.5 text-brand-400" />
                    {group.label}
                  </div>
                  <ul className="space-y-1 border-l border-surface-200/50 ml-2">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left pl-4 py-2 text-sm transition-all border-l-2 -ml-[1.5px] rounded-r-lg ${
                            activeId === item.id
                              ? 'text-white border-brand-400 font-medium bg-gradient-to-r from-brand-400/10 to-transparent'
                              : 'text-gray-400 hover:text-white border-transparent hover:border-surface-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* MAIN CONTENT (Middle) */}
          <div className="flex-1 min-w-0 pb-32">
            
            {/* Introduction */}
            <Section id="what-is-docdex" title="What is Docdex?">
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Docdex is a lightweight, local documentation indexer/search daemon. It runs per-project, keeps an on-disk index of your Markdown/text docs, and serves top-k snippets over HTTP or CLI for agents and developers.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                The same Tantivy-backed index powers HTTP and CLI endpoints; `serve` keeps a watcher running for incremental updates. Secure mode is enabled by default (auth token + loopback allowlist + rate limit), and nothing leaves your machine.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-surface-50/20 p-6 rounded-xl border border-surface-200/50">
                     <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-brand-400" /> Local & on-disk
                     </h4>
                     <p className="text-sm text-gray-400">
                        Index lives at <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">&lt;repo&gt;/.docdex/index</code> with 0700 perms. Add <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">.docdex/</code> to <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">.gitignore</code> so it never hits version control.
                     </p>
                  </div>
                  <div className="bg-surface-50/20 p-6 rounded-xl border border-surface-200/50">
                     <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-brand-400" /> Secure + agent ready
                     </h4>
                     <p className="text-sm text-gray-400">
                        Secure mode requires an auth token, loopback allowlist, and request limits by default. `/ai-help` and the built-in MCP server give agents a ready-made playbook.
                     </p>
                  </div>
              </div>

              <CodeBlock 
                title="Quick Preview"
                language="bash"
                code={`# It's as simple as this
npm i -g docdex
docdexd index --repo /path/to/repo`}
              />
            </Section>

            <Section id="installation" title="Installation">
              <HeroCommand command="npm install -g docdex" />

              <p className="text-gray-400 mb-6 leading-relaxed">
                Docdex is built on Node.js and requires version <span className="text-white font-mono">18</span> or higher. The npm package downloads a platform-specific binary from the matching GitHub release (macOS arm64/x64, Linux glibc/musl arm64/x64, Windows x64/arm64).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-surface-50 border border-surface-200/50 text-sm text-gray-400">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Download matrix</span>
                  Installer fetches the matching release asset for your platform (macOS arm64/x64, Linux glibc/musl arm64/x64, Windows x64/arm64).
                </div>
                <div className="p-4 rounded-lg bg-surface-50 border border-surface-200/50 text-sm text-gray-400">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Custom forks</span>
                  Set <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">DOCDEX_DOWNLOAD_REPO=&lt;owner/repo&gt;</code> before installing to fetch release assets from a fork.
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-brand-900/10 border border-brand-500/20 rounded-lg text-brand-100 text-sm mb-8">
                 <AlertCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                 <div>
                    <span className="font-bold block mb-1">Permission Requirements</span>
                    If you are using a system-level Node.js installation (not managed by nvm/fnm), you may need to use <code className="bg-black/30 px-1 py-0.5 rounded">sudo</code> to install global packages.
                 </div>
              </div>

               <SubSection title="Verify Installation">
                 <p className="text-gray-400 mb-4">
                   Once installed, verify that the CLI is accessible in your path.
                 </p>
                 <CodeBlock 
                     title="Terminal"
                     language="bash"
                     code={`npx docdex --version
# prints the installed version`}
                 />
               </SubSection>

               <SubSection title="Versioning">
                 <p className="text-gray-400 text-sm">Docdex uses semantic versioning; the Rust crate and npm package share the same version. Tagged releases come from Release Please automation.</p>
               </SubSection>
            </Section>

            <Section id="basic-usage" title="Basic Usage">
               <HeroCommand command="docdexd index --repo ." />

               <p className="text-gray-400 mb-6 leading-relaxed">
                  Docdex builds a local Tantivy index of your docs at <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">&lt;repo&gt;/.docdex/index</code> (0700 perms). No external services or uploads.
               </p>

               <SubSection title="1. Navigate to your project">
                  <p className="text-gray-400 mb-4">
                     Open your terminal and `cd` into the directory you want to search. This could be a documentation folder, a source code repository, or a wiki.
                  </p>
               </SubSection>

               <SubSection title="2. Initialize the Index">
                  <p className="text-gray-400 mb-4">
                     Run the index command. Docdex scans Markdown/text files and skips common VCS/build/cache/vendor directories automatically.
                  </p>
                  <CodeBlock 
                     title="Terminal"
                     language="bash"
                     code={`cd ~/my-projects/backend-api
docdexd index --repo .`}
                  />
                  <div className="bg-surface-50/50 border border-surface-200/50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-gray-300 font-mono">
                         <span className="text-green-500">✓</span> Found 142 files<br/>
                         <span className="text-green-500">✓</span> Indexing completed in 42ms<br/>
                         <span className="text-blue-400">i</span> Index size: 4.2MB
                      </p>
                  </div>
               </SubSection>

               <SubSection title="3. Serve or search">
                  <p className="text-gray-400 mb-4">
                     Use the CLI directly or serve the same index over HTTP. Secure mode requires an auth token by default; disable with <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">--secure-mode=false</code> for local-only use.
                  </p>
                   <CodeBlock 
                     title="Terminal"
                     language="bash"
                     code={`# Ad-hoc search via CLI
docdexd query --repo . --query "rate limiter" --limit 4

# Serve HTTP API with watcher
docdexd serve --repo . --host 127.0.0.1 --port 46137 --log info --auth-token <token>`}
                  />
               </SubSection>

               <SubSection title="Paths & defaults">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                    <div className="p-4 rounded-lg border border-surface-200/50 bg-surface-50/20">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">State dir</span>
                      <p><code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">&lt;repo&gt;/.docdex/index</code> (0700). Reuses legacy <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">.gpt-creator/docdex/index</code> if present.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-surface-200/50 bg-surface-50/20">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Defaults</span>
                      <p>HTTP bind <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">127.0.0.1:46137</code>, <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">max_limit=8</code>, <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">max_query_bytes=4096</code>, <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">max_request_bytes=16384</code>, rate limit <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">60 req/min</code> in secure mode.</p>
                    </div>
                  </div>
               </SubSection>
            </Section>

            <Section id="cli-cheatsheet" title="CLI Cheat Sheet">
               <p className="text-gray-400 mb-6 leading-relaxed">
                  Most-used commands straight from the README. CLI and HTTP share the same on-disk index.
               </p>
               <CodeBlock 
                 title="Terminal"
                 language="bash"
                 code={`# Build index for a repo
docdexd index --repo <path>

# Serve HTTP API (secure mode on; requires auth token by default)
docdexd serve --repo <path> --host 127.0.0.1 --port 46137 --log warn --auth-token <token>

# Query via CLI (JSON)
docdexd query --repo <path> --query "term" --limit 4

# Single-file ingest (honors excludes)
docdexd ingest --repo <path> --file docs/new.md

# Health check
curl http://127.0.0.1:46137/healthz

# Summary-only HTTP search
curl "http://127.0.0.1:46137/search?q=foo&snippets=false"`}
               />
            </Section>

            <Section id="cli-index" title="Indexing">
                <HeroCommand command="docdexd index --repo /path/to/repo" />

                <p className="text-gray-400 mb-8">
                    The `index` command is the core of Docdex. It scans your specified directory, parses supported docs, and builds a Tantivy-backed index on disk. `serve` reuses it and keeps it fresh with a watcher.
                </p>

                <SubSection title="Command Arguments">
                    <ArgsTable 
                        args={[
                            { name: '--repo', description: 'Workspace root to index (defaults to current directory).', type: 'string', required: false },
                            { name: '--state-dir', description: 'Override index storage (default: <repo>/.docdex/index).', type: 'string', required: false },
                            { name: '--exclude-dir', description: 'Comma-separated directory names to skip anywhere in the tree.', type: 'string', required: false },
                            { name: '--exclude-prefix', description: 'Comma-separated relative prefixes to skip.', type: 'string', required: false },
                            { name: '--max-limit', description: 'Clamp search results (default 8).', type: 'number', required: false },
                            { name: '--max-query-bytes', description: 'Reject queries beyond this size (default 4096).', type: 'number', required: false },
                            { name: '--max-request-bytes', description: 'Reject bodies beyond this size (default 16384).', type: 'number', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="Exclusion Rules">
                    <p className="text-gray-400 mb-4">
                        Docdex indexes Markdown/text only (`.md`, `.markdown`, `.mdx`, `.txt`). It skips broad VCS/build/cache/vendor folders by default (e.g., `.git`, `node_modules`, `.next`, `target`, `.venv`, `.yarn*`, `dist`) and prefixes like `.docdex/`, `.docdex/tmp/`, and `.gpt-creator/logs/`.
                    </p>
                    <p className="text-gray-400 text-sm mb-4">Add <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">.docdex/</code> to <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">.gitignore</code> so index artifacts never land in version control.</p>
                     <CodeBlock 
                        title="Advanced Indexing Example"
                        language="bash"
                        code={`# Skip extra prefixes and store the index elsewhere
docdexd index --repo . \\
  --exclude-dir node_modules,.next,target \\
  --exclude-prefix ".docdex/tmp,.docdex/logs" \\
  --state-dir /tmp/docdex-index`}
                     />
                </SubSection>

                <SubSection title="Single-file ingest">
                  <p className="text-gray-400 mb-4">
                    Reindex a specific file without rebuilding everything (honors excludes).
                  </p>
                  <CodeBlock 
                    title="Terminal"
                    language="bash"
                    code={`docdexd ingest --repo /path/to/repo --file docs/new.md`}
                  />
                </SubSection>

                <SubSection title="Self-check for sensitive terms">
                  <p className="text-gray-400 mb-4">
                    Scan the index for sensitive keywords before exposing it over HTTP. Non-zero exit if matches are found; includes built-in token/password patterns unless you disable them.
                  </p>
                  <CodeBlock 
                    title="Terminal"
                    language="bash"
                    code={`# Built-in patterns are enabled by default
docdexd self-check --repo /path/to/repo --terms "password,token" --limit 5

# Only use your provided terms
# docdexd self-check --repo /path/to/repo --terms "secret" --include-default-patterns=false`}
                  />
                </SubSection>

                <SubSection title="Watch Mode">
                    <p className="text-gray-400 mb-4">
                        Live updates come from <code className="text-brand-400">docdexd serve</code>, which keeps a watcher running while the HTTP API is up. Rerun <code className="text-brand-400">docdexd index</code> when you need a full rebuild.
                    </p>
                </SubSection>
            </Section>

            <Section id="cli-query" title="CLI Query">
                <HeroCommand command="docdexd query --repo /path/to/repo --query 'search term'" />

                <p className="text-gray-400 mb-8">
                    The `query` command lets you read search results directly from the shared index. Responses match the HTTP `/search` shape (summary + optional snippets + token estimates).
                </p>

                <SubSection title="Command Arguments">
                    <ArgsTable 
                        args={[
                            { name: '--repo', description: 'Workspace root to read from (defaults to current directory).', type: 'string', required: false },
                            { name: '--query', description: 'Search text (keep it concise for the 4096-byte limit).', type: 'string', required: true },
                            { name: '--limit', description: 'Maximum number of results to return. Default: 8', type: 'number', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="Search Guidance">
                    <div className="space-y-3 text-gray-400 text-sm mb-6">
                        <div className="flex gap-3"><span className="font-mono text-brand-400 w-32 shrink-0">Short queries</span><span>Keep queries tight to stay under the <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">max_query_bytes=4096</code> default.</span></div>
                        <div className="flex gap-3"><span className="font-mono text-brand-400 w-32 shrink-0">Summary-first</span><span>Use small limits and summary-only responses when possible, then fetch snippets selectively.</span></div>
                        <div className="flex gap-3"><span className="font-mono text-brand-400 w-32 shrink-0">Stale index?</span><span>Re-run <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">docdexd index --repo &lt;path&gt;</code> if results look outdated.</span></div>
                        <div className="flex gap-3"><span className="font-mono text-brand-400 w-32 shrink-0">Token budgets</span><span>Use <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">max_tokens=&lt;u64&gt;</code> on `/search` or `/snippet` to drop hits that exceed your prompt budget.</span></div>
                        <div className="flex gap-3"><span className="font-mono text-brand-400 w-32 shrink-0">Text-only</span><span>Append <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">text_only=true</code> to `/snippet/:doc_id` or start with <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">--strip-snippet-html</code> to omit HTML.</span></div>
                        <div className="flex gap-3"><span className="font-mono text-brand-400 w-32 shrink-0">Sizing</span><span>Summaries target ~360 chars (up to 4 segments); snippets target ~420 chars.</span></div>
                    </div>
                </SubSection>
                
                <SubSection title="Output Format">
                    <p className="text-gray-400 mb-4">
                        Responses contain summaries and optional snippets per hit (scores + token estimates included).
                    </p>
                    <CodeBlock 
                        title="JSON Output"
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
                </SubSection>
            </Section>

            <Section id="cli-serve" title="HTTP Server">
                <HeroCommand command="docdexd serve --repo /path/to/repo --host 127.0.0.1 --port 46137 --log info --auth-token <token>" />

                <p className="text-gray-400 mb-8">
                    Start the HTTP API with live file watching. Secure mode is enabled by default: auth token required, loopback allowlist, TLS enforcement on non-loopback, 60 req/min rate limit, default max limit 8, and request caps (4096-byte queries, 16384-byte bodies). Keep the default bind <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">127.0.0.1</code> unless you are behind a trusted proxy. Add <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">--secure-mode=false</code> for local token-free use.
                </p>

                <SubSection title="Command Arguments">
                     <ArgsTable 
                        args={[
                            { name: '--repo', description: 'Workspace root (defaults to current directory).', type: 'string', required: false },
                            { name: '--host', description: 'Bind address (default: 127.0.0.1).', type: 'string', required: false },
                            { name: '--port', description: 'Port to listen on (default: 46137).', type: 'number', required: false },
                            { name: '--auth-token', description: 'Bearer token (required in secure mode).', type: 'string', required: false },
                            { name: '--secure-mode', description: 'Enable/disable secure defaults (default: true).', type: 'boolean', required: false },
                            { name: '--allow-ip', description: 'Comma-separated IPs/CIDRs to allow beyond loopback.', type: 'string', required: false },
                            { name: '--tls-cert/--tls-key', description: 'Serve HTTPS with provided cert/key (or use --certbot-* helpers).', type: 'string', required: false },
                            { name: '--max-limit / --max-query-bytes / --max-request-bytes / --rate-limit-per-min', description: 'Tune result count and payload limits.', type: 'string', required: false },
                            { name: '--require-tls / --insecure', description: 'Control TLS enforcement on non-loopback binds.', type: 'boolean', required: false },
                            { name: '--certbot-domain / --certbot-live-dir', description: 'Use Certbot certificates by domain or path.', type: 'string', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="API Endpoints">
                    <EndpointTable 
                        endpoints={[
                            { method: 'GET', path: '/search?q=<&limit=&snippets=&max_tokens=>', desc: 'Returns hits with doc id, rel path, summary, snippet, score, token estimate.' },
                            { method: 'GET', path: '/snippet/:doc_id?window=&q=&text_only=&max_tokens=', desc: 'Fetch a focused snippet for a doc id; falls back to preview when no highlights (default window 40 lines).' },
                            { method: 'GET', path: '/healthz', desc: 'Health check (unauthenticated; still subject to IP allowlist).' },
                            { method: 'GET', path: '/ai-help', desc: 'JSON playbook for agents (requires auth if configured).' },
                            { method: 'GET', path: '/metrics', desc: 'Prometheus-style counters for rate-limit/auth/error metrics.' },
                            { method: 'GET', path: '/snippet/:doc_id?text_only=true', desc: 'Return text-only snippets; pair with --strip-snippet-html to disable HTML globally.' },
                        ]}
                    />
                    <CodeBlock 
                        title="API Response"
                        language="bash"
                        code={`# Request (summary-only for a smaller payload)
curl "http://127.0.0.1:46137/search?q=jwt&snippets=false"

# Response
{
  "hits": [
    {
      "doc_id": "1",
      "rel_path": "docs/auth.md",
      "summary": "Auth flow overview...",
      "snippet": null,
      "token_estimate": 220
    }
  ]
}`}
                    />
                </SubSection>

                <SubSection title="TLS & Certbot">
                    <p className="text-gray-400 mb-4">Enforce TLS on non-loopback binds (default) or explicitly opt out only behind a trusted proxy.</p>
                    <CodeBlock 
                        title="Terminal"
                        language="bash"
                        code={`# Serve with Certbot-managed certificates
docdexd serve --repo /path/to/repo --host 0.0.0.0 --port 46137 \
  --certbot-domain docs.example.com

# Manual cert/key
docdexd serve --repo /path/to/repo --tls-cert /path/fullchain.pem --tls-key /path/privkey.pem

# If TLS is already terminated upstream
# docdexd serve --repo . --require-tls=false --host 127.0.0.1 --port 46137`}
                    />
                </SubSection>
            </Section>

            <Section id="config-knobs" title="Configuration Knobs">
                <p className="text-gray-400 mb-6">
                    Flags and env vars available on `docdexd` (from the README). Combine with `--help` for full lists.
                </p>

                <SubSection title="Common flags">
                    <ArgsTable 
                        args={[
                            { name: '--repo', description: 'Workspace root to index/serve (default: .).', type: 'string' },
                            { name: '--state-dir', description: 'Override index storage path (default: <repo>/.docdex/index).', type: 'string' },
                            { name: '--exclude-prefix', description: 'Comma-separated relative prefixes to skip.', type: 'string' },
                            { name: '--exclude-dir', description: 'Comma-separated directory names to skip anywhere.', type: 'string' },
                            { name: '--auth-token', description: 'Bearer token for secure mode (required by default).', type: 'string' },
                            { name: '--secure-mode', description: 'Enable/disable secure defaults (default: true).', type: 'boolean' },
                            { name: '--allow-ip', description: 'Allowlist IPs/CIDRs beyond loopback.', type: 'string' },
                            { name: '--tls-cert/--tls-key', description: 'Serve HTTPS with provided cert/key.', type: 'string' },
                            { name: '--certbot-domain / --certbot-live-dir', description: 'Use Certbot certificates by domain or path.', type: 'string' },
                            { name: '--require-tls / --insecure', description: 'Control TLS enforcement for non-loopback binds.', type: 'boolean' },
                            { name: '--max-limit', description: 'Clamp HTTP limit (default 8).', type: 'number' },
                            { name: '--max-query-bytes', description: 'Reject queries beyond this size (default 4096).', type: 'number' },
                            { name: '--max-request-bytes', description: 'Reject bodies beyond this size (default 16384).', type: 'number' },
                            { name: '--rate-limit-per-min / --rate-limit-burst', description: 'Request budget per minute + burst (default 60/min in secure mode).', type: 'number' },
                            { name: '--strip-snippet-html / --disable-snippet-text', description: 'Control snippet HTML/text in responses.', type: 'boolean' },
                            { name: '--access-log', description: 'Enable/disable structured access logs.', type: 'boolean' },
                            { name: '--audit-log-path / --audit-max-bytes / --audit-max-files / --audit-disable', description: 'Configure audit logging and rotation.', type: 'string' },
                            { name: '--run-as-uid / --run-as-gid', description: 'Drop privileges after startup prep (Unix).', type: 'number' },
                            { name: '--chroot', description: 'Chroot before serving (Unix).', type: 'string' },
                            { name: '--unshare-net', description: 'Unshare network namespace (Linux only).', type: 'boolean' },
                            { name: '--log', description: 'Log level for serve (default info).', type: 'string' },
                        ]}
                    />
                </SubSection>

                <SubSection title="Environment variables">
                    <ArgsTable 
                        args={[
                            { name: 'DOCDEX_STATE_DIR', description: 'Index storage override.', type: 'string' },
                            { name: 'DOCDEX_EXCLUDE_PREFIXES', description: 'Extra prefixes to skip.', type: 'string' },
                            { name: 'DOCDEX_EXCLUDE_DIRS', description: 'Extra directory names to skip.', type: 'string' },
                            { name: 'DOCDEX_AUTH_TOKEN', description: 'Bearer token for secure mode.', type: 'string' },
                            { name: 'DOCDEX_SECURE_MODE', description: 'Enable/disable secure defaults.', type: 'boolean' },
                            { name: 'DOCDEX_ALLOW_IPS', description: 'Allowlist IPs/CIDRs.', type: 'string' },
                            { name: 'DOCDEX_TLS_CERT / DOCDEX_TLS_KEY', description: 'TLS cert/key paths.', type: 'string' },
                            { name: 'DOCDEX_CERTBOT_DOMAIN / DOCDEX_CERTBOT_LIVE_DIR', description: 'Certbot configuration.', type: 'string' },
                            { name: 'DOCDEX_REQUIRE_TLS / DOCDEX_INSECURE_HTTP', description: 'TLS enforcement flags.', type: 'boolean' },
                            { name: 'DOCDEX_MAX_LIMIT / DOCDEX_MAX_QUERY_BYTES / DOCDEX_MAX_REQUEST_BYTES', description: 'Limit and size caps.', type: 'string' },
                            { name: 'DOCDEX_RATE_LIMIT_PER_MIN / DOCDEX_RATE_LIMIT_BURST', description: 'Rate limit settings.', type: 'string' },
                            { name: 'DOCDEX_AUDIT_LOG_PATH / DOCDEX_AUDIT_MAX_BYTES / DOCDEX_AUDIT_MAX_FILES / DOCDEX_AUDIT_DISABLE', description: 'Audit logging options.', type: 'string' },
                            { name: 'DOCDEX_STRIP_SNIPPET_HTML / DOCDEX_DISABLE_SNIPPET_TEXT', description: 'Snippet content controls.', type: 'boolean' },
                            { name: 'DOCDEX_ACCESS_LOG', description: 'Enable/disable access log.', type: 'boolean' },
                            { name: 'DOCDEX_MCP_MAX_RESULTS', description: 'Clamp MCP search results (default 8).', type: 'number' },
                            { name: 'DOCDEX_RUN_AS_UID / DOCDEX_RUN_AS_GID', description: 'Privilege drop IDs.', type: 'number' },
                            { name: 'DOCDEX_CHROOT', description: 'Chroot path.', type: 'string' },
                            { name: 'DOCDEX_UNSHARE_NET', description: 'Unshare network namespace (Linux).', type: 'boolean' },
                        ]}
                    />
                </SubSection>
            </Section>

            <Section id="help-discovery" title="Help & Discovery">
                <p className="text-gray-400 mb-6">Use built-in help to explore every flag and subcommand.</p>
                <CodeBlock 
                    title="Terminal"
                    language="bash"
                    code={`docdexd --help
docdexd help-all
docdexd serve --help
docdexd index --help
docdexd query --help
docdexd self-check --help
docdexd mcp --help`}
                />
            </Section>

            <Section id="mcp-server" title="MCP Server">
                <HeroCommand command="docdex mcp-add --repo /path/to/repo --log warn --max-results 8" />

                <p className="text-gray-400 mb-6">
                    Docdex implements the **Model Context Protocol (MCP)** standard. This allows it to function as a plug-and-play knowledge provider for AI agents like Claude Desktop and Cursor.
                </p>
                <p className="text-gray-400 mb-8">
                    The simplest way to configure your agents is using the `mcp-add` helper command.
                </p>

                <SubSection title="Helper Arguments">
                    <ArgsTable 
                        args={[
                            { name: '--repo', description: 'Workspace root to serve over MCP.', type: 'string', required: false },
                            { name: '--log', description: 'Log level for the MCP server (e.g., warn).', type: 'string', required: false },
                            { name: '--max-results', description: 'Clamp search results (default: 8).', type: 'number', required: false },
                            { name: '--all', description: 'Attempt to add Docdex to all detected MCP clients on the system.', type: 'boolean', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="How it Works">
                    <p className="text-gray-400 mb-4">
                        When configured, the agent launches Docdex in MCP mode via stdio (`docdexd mcp --repo &lt;path&gt;`). The agent communicates with Docdex over standard input/output streams using JSON-RPC.
                    </p>
                    <div className="flex items-center gap-4 p-4 bg-surface-50 border border-surface-200/50 rounded-lg">
                        <div className="text-center">
                            <Cpu className="w-8 h-8 text-white mx-auto mb-2" />
                            <span className="text-xs text-gray-500 uppercase">Claude Desktop</span>
                        </div>
                        <div className="flex-1 h-px bg-surface-300 relative">
                             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-page px-2 text-[10px] text-gray-500 font-mono">STDIO / JSON-RPC</span>
                        </div>
                        <div className="text-center">
                            <Terminal className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                            <span className="text-xs text-gray-500 uppercase">Docdex (Daemon)</span>
                        </div>
                    </div>
                </SubSection>

                <SubSection title="TL;DR for agents">
                    <CodeBlock 
                        title="Recommended defaults"
                        language="bash"
                        code={`# One-time index for the repo
docdexd index --repo .

# Serve HTTP (summary-first, snippets optional)
docdexd serve --repo . --host 127.0.0.1 --port 46137 --log warn

# MCP server (stdio)
docdexd mcp --repo . --log warn --max-results 8`}
                    />
                    <p className="text-gray-400 text-sm mt-2">Add <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">.docdex/</code> to <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">.gitignore</code>; prefer summary-first searches and fetch snippets only as needed.</p>
                </SubSection>
            </Section>

            <Section id="mcp-tools" title="Available Tools">
                <p className="text-gray-400 mb-8">
                    When connected, Docdex exposes these MCP tools (from the README). The model uses them to search, open files, and refresh the index.
                </p>

                <div className="space-y-8 mt-8">
                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">docdex_search</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Performs a search on the indexed docs. Returns rel_path, summary, snippet (optional), score, and token_estimate.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                        <ArgsTable 
                            args={[
                                { name: 'query', description: 'Search text.', type: 'string', required: true },
                                { name: 'limit', description: 'Max results (default clamp 8).', type: 'number', required: false },
                                { name: 'project_root', description: 'Optional workspace root.', type: 'string', required: false },
                            ]} 
                        />
                    </div>

                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">docdex_open</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                         </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Reads a specific file with optional line windows for additional context.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                         <ArgsTable 
                            args={[
                                { name: 'path', description: 'Relative path to the file.', type: 'string', required: true },
                                { name: 'start_line', description: 'Optional start line.', type: 'number', required: false },
                                { name: 'end_line', description: 'Optional end line.', type: 'number', required: false },
                                { name: 'project_root', description: 'Optional workspace root.', type: 'string', required: false },
                            ]} 
                        />
                    </div>

                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">docdex_files</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                         </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Lists indexed docs with summaries and token estimates.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                         <ArgsTable 
                            args={[
                                { name: 'limit', description: 'Max docs to list (default 200, max 1000).', type: 'number', required: false },
                                { name: 'offset', description: 'Pagination offset.', type: 'number', required: false },
                                { name: 'project_root', description: 'Optional workspace root.', type: 'string', required: false },
                            ]} 
                        />
                    </div>

                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">docdex_index</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Write</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Reindex everything or ingest specific files.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                         <ArgsTable 
                            args={[
                                { name: 'paths', description: 'Optional list of files/directories to ingest (empty reindexes everything).', type: 'string[]', required: false },
                                { name: 'project_root', description: 'Optional workspace root.', type: 'string', required: false },
                            ]} 
                        />
                    </div>

                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">docdex_stats</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Returns index stats (doc count, state dir, size, last updated timestamps).
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                         <ArgsTable 
                            args={[
                                { name: 'project_root', description: 'Optional workspace root.', type: 'string', required: false },
                            ]} 
                        />
                    </div>
                </div>
            </Section>

            <Section id="mcp-claude" title="Manual Configuration">
                <p className="text-gray-400 mb-6">
                    If you prefer to configure your agents manually (or if you are using a custom MCP client), you need to add a server entry to your configuration file.
                </p>
                
                <SubSection title="Claude Desktop">
                    <p className="text-gray-400 text-sm mb-2">
                        Edit <code className="text-xs bg-surface-200 text-gray-300 px-1 py-0.5 rounded">claude_desktop_config.json</code>:
                    </p>
                    <CodeBlock 
                        language="json" 
                        title="claude_desktop_config.json"
                        code={`{
  "mcpServers": {
    "docdex": {
      "command": "docdexd",
      "args": ["mcp", "--repo", "/Users/me/projects/my-app", "--log", "warn", "--max-results", "8"]
    }
  }
}`}
                    />
                     <div className="flex items-start gap-2 text-xs text-orange-400 mt-4 bg-orange-400/10 p-3 rounded-lg border border-orange-400/20">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Important: Provide the absolute repo path via `--repo` when configuring manually.</span>
                     </div>
                </SubSection>

                 <SubSection title="Environment Variables">
                    <p className="text-gray-400 mb-4">
                        You can also pass environment variables if needed (e.g., to change log levels).
                    </p>
                    <ArgsTable 
                        args={[
                             { name: 'DOCDEX_AUTH_TOKEN', description: 'Bearer token for secure mode.', type: 'string', required: false },
                             { name: 'DOCDEX_STATE_DIR', description: 'Override index storage path.', type: 'string', required: false },
                             { name: 'DOCDEX_MAX_LIMIT', description: 'Clamp HTTP limit (default 8).', type: 'number', required: false },
                             { name: 'DOCDEX_EXCLUDE_DIRS', description: 'Extra directory names to skip (comma-separated).', type: 'string', required: false },
                             { name: 'DOCDEX_EXCLUDE_PREFIXES', description: 'Extra relative prefixes to skip (comma-separated).', type: 'string', required: false },
                        ]} 
                    />
                </SubSection>
            </Section>

            <Section id="system-prompt" title="System Prompting">
                <p className="text-gray-400 mb-6">
                    To get the best results from your AI agents, you should instruct them on how to use Docdex effectively in their system prompt.
                </p>
                <div className="bg-surface-50/20 border border-surface-200/50 rounded-xl p-6 mb-8">
                    <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-brand-400" />
                        Recommended System Instruction
                    </h4>
                    <p className="text-gray-400 text-sm italic mb-4">
                        "You have access to a local documentation search tool called 'docdex' via the MCP server. When the user asks a technical question about the codebase, ALWAYS call `docdex_search` first to retrieve summaries, then `docdex_open` if you need full context from a file."
                    </p>
                </div>
                 <CodeBlock 
                    title="System Prompt Example"
                    language="text"
                    code={`You have access to a local documentation tool called 'docdex'. Use docdex_search before answering; if a snippet is cut off, call docdex_open on the referenced file.`}
                />
            </Section>

            <Section id="agent-workflow" title="The Search-Read Loop">
              <p className="text-gray-400 mb-6">
                Agents are most effective when they follow a structured cognitive process. Instead of guessing, they should perform a "Search-Read-Answer" loop.
              </p>

               <CodeBlock 
                    title="Agent Thought Process"
                    language="text"
                    code={`User: "How does auth work?"

Thought: I need to check the auth implementation.
Call: docdex_search("authentication middleware")

Thought: The snippet in src/auth.ts looks relevant but I need the full verification function.
Call: docdex_open("src/auth.ts")

Response: "Authentication is handled via JWT..."`}
                />

              <div className="relative border-l-2 border-surface-200 ml-3 pl-8 space-y-8 py-2 mt-8">
                <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-black text-xs font-bold">1</span>
                  <h4 className="text-white font-bold mb-1">Broad Search</h4>
                  <p className="text-sm text-gray-400">The agent calls <code className="text-brand-400">docdex_search("authentication middleware")</code> to find relevant files.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-black text-xs font-bold">2</span>
                  <h4 className="text-white font-bold mb-1">Snippet Analysis</h4>
                  <p className="text-sm text-gray-400">Docdex returns up to 8 short snippets by default. The agent analyzes them to see if the answer is immediately visible.</p>
                </div>
                 <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-black text-xs font-bold">3</span>
                  <h4 className="text-white font-bold mb-1">Deep Read (Optional)</h4>
                  <p className="text-sm text-gray-400">If the snippet is cut off or insufficient, the agent calls <code className="text-brand-400">docdex_open("src/auth.ts")</code> to ingest the specific file.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-black text-xs font-bold">4</span>
                  <h4 className="text-white font-bold mb-1">Answer</h4>
                  <p className="text-sm text-gray-400">The agent synthesizes the retrieved context to answer the user's question accurately.</p>
                </div>
              </div>
            </Section>

            <Section id="agent-patterns" title="Prompting Patterns">
              <p className="text-gray-400 mb-6">
                You can improve agent performance by using specific prompting patterns that enforce tool usage.
              </p>

               <CodeBlock 
                    title="Chain of Thought Prompt"
                    language="text"
                    code={`Instructions:
1. Search for high-level concepts first.
2. If results are ambiguous, refine the query with specific terms found in the snippets.
3. Read the complete file only when necessary to verify implementation details.`}
                />

              <SubSection title="Chain of Thought (CoT)">
                 <p className="text-gray-400 mb-4">
                   Explicitly ask the agent to "think out loud" about which tools to use. This reduces the chance of it hallucinating a file path that doesn't exist.
                 </p>
              </SubSection>

              <SubSection title="The 'Missing Information' Fallback">
                 <p className="text-gray-400 mb-4">
                   Instruct the agent to complain if it cannot find info, rather than guessing.
                 </p>
                  <div className="bg-surface-50/30 p-4 rounded-lg border-l-2 border-red-400">
                    <p className="text-sm text-gray-300 italic">
                      "If the search results do not contain the answer, state 'I could not find that information in the index' and suggest alternative keywords to the user. Do NOT invent code."
                    </p>
                 </div>
              </SubSection>
            </Section>

            <Section id="agent-troubleshooting" title="Troubleshooting">
              <p className="text-gray-400 mb-6">
                 If your agent isn't using the tools correctly, use these steps to debug the MCP connection.
              </p>

              <SubSection title="1. Use the MCP Inspector">
                 <p className="text-gray-400 mb-4">
                    The MCP team provides a web-based inspector to test your server manually. You can use this to ensure Docdex is receiving requests and returning data.
                 </p>
                 <CodeBlock 
                    language="bash" 
                    title="Terminal"
                    code="npx @modelcontextprotocol/inspector docdexd mcp --repo ." 
                 />
              </SubSection>

              <SubSection title="2. Check Standard Error">
                 <p className="text-gray-400 mb-4">
                    Docdex writes logs to `stderr`. If using Claude Desktop, check the logs (usually in `~/Library/Logs/Claude`).
                 </p>
              </SubSection>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
