
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
        { id: 'cli-index', label: 'Index & Watch' },
        { id: 'cli-query', label: 'Query' },
        { id: 'cli-serve', label: 'Serve' }
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
                Docdex (Documentation Indexer) is a high-performance, local RAG (Retrieval-Augmented Generation) engine designed specifically for AI agents and developer workflows.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                As LLM context windows grow, filling them with irrelevant files becomes costly and slow. Docdex solves this by indexing your local codebase or documentation using <span className="text-white font-medium">Tantivy</span>—a blazing fast Rust search engine—allowing agents to retrieve only the exact snippets they need in milliseconds.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-surface-50/20 p-6 rounded-xl border border-surface-200/50">
                     <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-brand-400" /> Blazing Fast
                     </h4>
                     <p className="text-sm text-gray-400">
                        Full-text search across large codebases in under 10ms. 12x faster indexing than Elasticsearch.
                     </p>
                  </div>
                  <div className="bg-surface-50/20 p-6 rounded-xl border border-surface-200/50">
                     <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-brand-400" /> Native MCP
                     </h4>
                     <p className="text-sm text-gray-400">
                        Connects directly to Claude, Cursor, and other AI agents via Model Context Protocol.
                     </p>
                  </div>
              </div>

              <CodeBlock 
                title="Quick Preview"
                language="bash"
                code={`# It's as simple as this
npm install -g docdex
docdex index .`}
              />
            </Section>

            <Section id="installation" title="Installation">
              <HeroCommand command="npm install -g docdex" />

              <p className="text-gray-400 mb-6 leading-relaxed">
                Docdex is built on Node.js and requires version <span className="text-white font-mono">18.0.0</span> or higher. It relies on native binaries for the Tantivy engine, which are downloaded automatically during installation.
              </p>
              
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
                    code={`docdex --version
# Output: 0.1.5`}
                 />
               </SubSection>
            </Section>

            <Section id="basic-usage" title="Basic Usage">
               <HeroCommand command="docdex index ." />

               <p className="text-gray-400 mb-6 leading-relaxed">
                  Docdex works by creating a local index of your text files. This index is stored in your home directory (typically `~/.docdex`), so it doesn't clutter your project folders.
               </p>

               <SubSection title="1. Navigate to your project">
                  <p className="text-gray-400 mb-4">
                     Open your terminal and `cd` into the directory you want to search. This could be a documentation folder, a source code repository, or a wiki.
                  </p>
               </SubSection>

               <SubSection title="2. Initialize the Index">
                  <p className="text-gray-400 mb-4">
                     Run the index command. Docdex will recursively scan the directory, filtering for supported text formats (Markdown, TypeScript, Python, etc.) and ignoring binary files.
                  </p>
                  <CodeBlock 
                     title="Terminal"
                     language="bash"
                     code={`cd ~/my-projects/backend-api
docdex index .`}
                  />
                  <div className="bg-surface-50/50 border border-surface-200/50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-gray-300 font-mono">
                         <span className="text-green-500">✓</span> Found 142 files<br/>
                         <span className="text-green-500">✓</span> Indexing completed in 42ms<br/>
                         <span className="text-blue-400">i</span> Index size: 4.2MB
                      </p>
                  </div>
               </SubSection>

               <SubSection title="3. Search">
                  <p className="text-gray-400 mb-4">
                     Now you can perform fuzzy semantic searches across your codebase instantly.
                  </p>
                   <CodeBlock 
                     title="Terminal"
                     language="bash"
                     code={`docdex query "rate limiter logic"`}
                  />
               </SubSection>
            </Section>

            <Section id="cli-index" title="Indexing">
                <HeroCommand command="docdex index . --watch" />

                <p className="text-gray-400 mb-8">
                    The `index` command is the core of Docdex. It scans your specified directory, parses valid files, and builds a compressed inverted index.
                </p>

                <SubSection title="Command Arguments">
                    <ArgsTable 
                        args={[
                            { name: '--dir', description: 'The directory to index. Defaults to current directory (.)', type: 'string', required: false },
                            { name: '--watch', description: 'Run in daemon mode. Watches for file changes and updates index incrementally.', type: 'boolean', required: false },
                            { name: '--ext', description: 'Comma-separated list of file extensions to include (e.g., "ts,md").', type: 'string', required: false },
                            { name: '--ignore', description: 'Glob patterns to ignore (e.g., "**/node_modules").', type: 'string', required: false },
                            { name: '--clean', description: 'Delete existing index and rebuild from scratch.', type: 'boolean', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="Exclusion Rules">
                    <p className="text-gray-400 mb-4">
                        Docdex tries to be smart about what it indexes to avoid polluting your search results with build artifacts or dependency locks.
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-2">
                        <li>It automatically respects your <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">.gitignore</code> file.</li>
                        <li>It looks for a <code className="bg-surface-200 text-gray-200 px-1 py-0.5 rounded text-xs">.docdexignore</code> file in the root for specific overrides.</li>
                        <li>By default, it always ignores <code className="text-brand-400">node_modules</code>, <code className="text-brand-400">.git</code>, and <code className="text-brand-400">dist</code>.</li>
                    </ul>
                     <CodeBlock 
                        title="Advanced Indexing Example"
                        language="bash"
                        code={`# Exclude tests and build artifacts
docdex index . \\
  --ignore "**/*.test.ts,**/dist" \\
  --ext "ts,tsx,md"`}
                     />
                </SubSection>

                <SubSection title="Watch Mode">
                    <p className="text-gray-400 mb-4">
                        When running with <code className="text-brand-400">--watch</code>, the process will not exit. It attaches a filesystem watcher to the directory. When you save a file, Docdex re-indexes only that specific file in milliseconds, ensuring your AI agents always have the latest context.
                    </p>
                </SubSection>
            </Section>

            <Section id="cli-query" title="CLI Query">
                <HeroCommand command="docdex query 'search term'" />

                <p className="text-gray-400 mb-8">
                    The `query` command allows you to test the index quality directly. It returns the most relevant code snippets based on BM25 scoring.
                </p>

                <SubSection title="Command Arguments">
                    <ArgsTable 
                        args={[
                            { name: 'query', description: 'The search terms (e.g. "authentication").', type: 'string', required: true },
                            { name: '--limit', description: 'Maximum number of results to return. Default: 10', type: 'number', required: false },
                            { name: '--json', description: 'Output results as raw JSON for piping to other tools.', type: 'boolean', required: false },
                            { name: '--threshold', description: 'Minimum score threshold for relevance. Default: 0.1', type: 'number', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="Search Syntax">
                    <div className="space-y-4 text-gray-400 text-sm mb-6">
                        <div className="flex gap-4">
                            <span className="font-mono text-brand-400 w-24 shrink-0">auth</span>
                            <span>Fuzzy match. Finds "auth", "authentication", "author".</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-mono text-brand-400 w-24 shrink-0">"auth"</span>
                            <span>Exact match. Only finds the exact word "auth".</span>
                        </div>
                         <div className="flex gap-4">
                            <span className="font-mono text-brand-400 w-24 shrink-0">-test</span>
                            <span>Exclusion. Finds documents that do NOT contain "test".</span>
                        </div>
                    </div>
                </SubSection>
                
                <SubSection title="Output Format">
                    <p className="text-gray-400 mb-4">
                        Using <code className="text-brand-400">--json</code> returns a structured response useful for integrations.
                    </p>
                    <CodeBlock 
                        title="JSON Output"
                        language="json"
                        code={`{
  "results": [
    {
      "score": 14.2,
      "filePath": "src/auth/guard.ts",
      "content": "export class AuthGuard...",
      "line": 42
    }
  ],
  "total_hits": 1
}`}
                    />
                </SubSection>
            </Section>

            <Section id="cli-serve" title="HTTP Server">
                <HeroCommand command="docdex serve --port 8080" />

                <p className="text-gray-400 mb-8">
                    Start a standalone REST API server. This is useful if you want to build a custom dashboard or if your agent environment requires HTTP access (e.g. custom GPT Actions).
                </p>

                <SubSection title="Command Arguments">
                     <ArgsTable 
                        args={[
                            { name: '--port', description: 'Port to listen on. Default: 8080', type: 'number', required: false },
                            { name: '--host', description: 'Host address to bind to. Default: localhost', type: 'string', required: false },
                            { name: '--cors', description: 'Enable CORS for all origins.', type: 'boolean', required: false },
                        ]} 
                    />
                </SubSection>

                <SubSection title="API Endpoints">
                    <EndpointTable 
                        endpoints={[
                            { method: 'GET', path: '/search?q=...', desc: 'Main search endpoint. Accepts `q` (query), `limit`, and `threshold` params.' },
                            { method: 'GET', path: '/health', desc: 'Health check. Returns 200 OK if index is loaded.' },
                            { method: 'GET', path: '/stats', desc: 'Returns index statistics (document count, size).' },
                        ]}
                    />
                    <CodeBlock 
                        title="API Response"
                        language="bash"
                        code={`# Request
curl "http://localhost:8080/search?q=jwt"

# Response
{
  "matches": [...],
  "latency": "4ms"
}`}
                    />
                </SubSection>
            </Section>

            <Section id="mcp-server" title="MCP Server">
                <HeroCommand command="docdex mcp-add --all" />

                <p className="text-gray-400 mb-6">
                    Docdex implements the **Model Context Protocol (MCP)** standard. This allows it to function as a plug-and-play knowledge provider for AI agents like Claude Desktop and Cursor.
                </p>
                <p className="text-gray-400 mb-8">
                    The simplest way to configure your agents is using the `mcp-add` helper command.
                </p>

                 <SubSection title="Helper Arguments">
                     <ArgsTable 
                        args={[
                            { name: '--all', description: 'Attempt to add Docdex to all detected MCP clients on the system.', type: 'boolean', required: false },
                            { name: '--agent', description: 'Target a specific agent (claude, cursor, etc).', type: 'string', required: false },
                        ]} 
                    />
                </SubSection>

                 <SubSection title="How it Works">
                    <p className="text-gray-400 mb-4">
                        When configured, the agent launches Docdex in MCP mode via stdio (`docdex mcp`). The agent communicates with Docdex over standard input/output streams using JSON-RPC.
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
            </Section>

            <Section id="mcp-tools" title="Available Tools">
                <p className="text-gray-400 mb-8">
                    When connected, Docdex exposes the following tools to the agent. The model uses these tools to query your documentation autonomously.
                </p>
                
                <CodeBlock 
                    title="Tool Definition (JSON Schema)"
                    language="json"
                    code={`{
  "name": "search",
  "description": "Semantic search. Use to find code snippets.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "limit": { "type": "number" }
    },
    "required": ["query"]
  }
}`}
                />

                <div className="space-y-8 mt-8">
                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">search</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Performs a semantic fuzzy search on the indexed codebase. Returns a list of relevant code snippets with file paths and line numbers.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                        <ArgsTable 
                            args={[
                                { name: 'query', description: 'The search string. Can be natural language or code keywords.', type: 'string', required: true },
                                { name: 'limit', description: 'Max number of snippets to return (default: 5).', type: 'number', required: false },
                            ]} 
                        />
                    </div>

                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">read_file</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Reads the full content of a specific file. Use this when `search` returns a snippet that looks promising, but the agent needs the full context.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                         <ArgsTable 
                            args={[
                                { name: 'path', description: 'Relative path to the file (e.g. "src/utils/helper.ts").', type: 'string', required: true },
                            ]} 
                        />
                    </div>

                    <div className="border border-surface-200/50 rounded-xl p-6 bg-surface-50/20">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-brand-400 font-mono text-lg font-bold">list_files</h4>
                            <span className="text-xs bg-surface-200 text-gray-300 px-2 py-1 rounded">Read-Only</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Lists files in a specific directory. Useful for exploring the project structure or finding file names.
                        </p>
                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                         <ArgsTable 
                            args={[
                                { name: 'path', description: 'Directory path to list. Defaults to root.', type: 'string', required: false },
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
      "command": "docdex",
      "args": ["mcp", "--dir", "/Users/me/projects/my-app"]
    }
  }
}`}
                    />
                     <div className="flex items-start gap-2 text-xs text-orange-400 mt-4 bg-orange-400/10 p-3 rounded-lg border border-orange-400/20">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Important: You must provide the absolute path to the directory you want to index via the `--dir` flag in manual config mode.</span>
                     </div>
                </SubSection>

                 <SubSection title="Environment Variables">
                    <p className="text-gray-400 mb-4">
                        You can also pass environment variables if needed (e.g., to change log levels).
                    </p>
                    <ArgsTable 
                        args={[
                             { name: 'DOCDEX_LOG_LEVEL', description: 'Set logging verbosity (debug, info, error).', type: 'string', required: false },
                             { name: 'DOCDEX_HOME', description: 'Override the default index storage location (~/.docdex).', type: 'string', required: false },
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
                        "You have access to a local documentation search tool called 'docdex' via the MCP server. When the user asks a technical question about the codebase, ALWAYS use the 'search' tool first to retrieve relevant context before answering. If the snippet is cut off, use 'read_file' to get the full content."
                    </p>
                </div>
                 <CodeBlock 
                    title="System Prompt Example"
                    language="text"
                    code={`You have access to a local documentation tool called 'docdex'. Use it to search the codebase before answering questions.`}
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
Call: docdex.search("authentication middleware")

Thought: The snippet in src/auth.ts looks relevant but I need the full verification function.
Call: docdex.read_file("src/auth.ts")

Response: "Authentication is handled via JWT..."`}
                />

              <div className="relative border-l-2 border-surface-200 ml-3 pl-8 space-y-8 py-2 mt-8">
                <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-black text-xs font-bold">1</span>
                  <h4 className="text-white font-bold mb-1">Broad Search</h4>
                  <p className="text-sm text-gray-400">The agent calls <code className="text-brand-400">search("authentication middleware")</code> to find relevant files.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-black text-xs font-bold">2</span>
                  <h4 className="text-white font-bold mb-1">Snippet Analysis</h4>
                  <p className="text-sm text-gray-400">Docdex returns 5-10 short snippets. The agent analyzes them to see if the answer is immediately visible.</p>
                </div>
                 <div className="relative">
                  <span className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-black text-xs font-bold">3</span>
                  <h4 className="text-white font-bold mb-1">Deep Read (Optional)</h4>
                  <p className="text-sm text-gray-400">If the snippet is cut off or insufficient, the agent calls <code className="text-brand-400">read_file("src/auth.ts")</code> to ingest the entire file.</p>
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
                    code="npx @modelcontextprotocol/inspector docdex mcp --dir ." 
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
