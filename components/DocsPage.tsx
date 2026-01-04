import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Cpu,
  Server,
  Settings,
  Shield,
  Terminal
} from 'lucide-react';
import Seo from './Seo';

interface ArgDefinition {
  name: string;
  description: string;
  type: string;
  required?: boolean;
}

const SyntaxHighlight = ({ code, language }: { code: string; language: 'bash' | 'json' | 'text' }) => {
  if (language === 'bash') {
    return (
      <>
        {code.split('\n').map((line, i) => {
          if (line.trim().startsWith('#')) return <span key={i} className="text-gray-500 italic">{line}</span>;
          if (line.trim() === '') return <div key={i} className="h-4" />;
          const tokens = line.split(' ');
          return (
            <div key={i}>
              {tokens.map((token, j) => {
                if (j === 0 && token === 'docdexd') return <span key={j} className="text-brand-400 font-bold">{token} </span>;
                if (j === 0 && (token === 'npm' || token === 'curl' || token === 'npx')) {
                  return <span key={j} className="text-sky-400 font-bold">{token} </span>;
                }
                if (token.startsWith('--') || token.startsWith('-')) return <span key={j} className="text-amber-400">{token} </span>;
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
    const jsonRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
    const highlighted = code.replace(jsonRegex, (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span class="text-brand-400 font-medium">${match.slice(0, -1)}</span><span class="text-gray-500">:</span>`;
        }
        return `<span class="text-green-400">${match}</span>`;
      }
      if (/true|false/.test(match)) return `<span class="text-amber-400">${match}</span>`;
      return `<span class="text-sky-400">${match}</span>`;
    });
    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
  }

  return <span className="text-gray-300 whitespace-pre-wrap">{code}</span>;
};

const CodeBlock = ({
  code,
  language = 'bash',
  title
}: {
  code: string;
  language?: 'bash' | 'json' | 'text';
  title?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const lineCount = code.trim().split('\n').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0F0F0F] border border-surface-200/50 shadow-lg my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] border-b border-surface-200/30">
        <span className="text-xs font-mono text-gray-500 font-medium tracking-wide uppercase">{title || language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
          title="Copy code"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="flex overflow-x-auto custom-scrollbar">
        <div className="py-4 pl-3 pr-2 text-right select-none bg-[#1A1A1A]/30 border-r border-white/5 min-w-[3rem]">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="text-xs font-mono text-gray-700 leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="p-4 font-mono text-sm leading-6 w-full">
          <SyntaxHighlight code={code.trim()} language={language} />
        </div>
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
              {arg.required && (
                <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">
                  REQ
                </span>
              )}
            </td>
            <td className="px-5 py-3 text-sm text-gray-400 leading-relaxed">{arg.description}</td>
            <td className="px-5 py-3 whitespace-nowrap text-xs text-gray-500 font-mono">{arg.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => (
  <div id={id} className="mb-24 scroll-mt-32 section-observer-target">
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="w-1.5 h-8 bg-brand-400 rounded-full"></span>
      {title}
    </h2>
    {children}
  </div>
);

const SubSection = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <div id={id} className={`mb-12 ${id ? 'scroll-mt-32 section-observer-target' : ''}`}>
    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full"></div>
      {title}
    </h3>
    {children}
  </div>
);

const CommandCard = ({
  title,
  description,
  usage,
  args,
  notes
}: {
  title: string;
  description: string;
  usage?: string;
  args?: ArgDefinition[];
  notes?: string;
}) => (
  <div className="border border-surface-200/60 rounded-2xl p-6 bg-surface-50/20 mb-8">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
    {usage && <CodeBlock title="Usage" code={usage} language="bash" />}
    {args && args.length > 0 && <ArgsTable args={args} />}
    {notes && <div className="text-sm text-gray-500">{notes}</div>}
  </div>
);

const DocsPage: React.FC = () => {
  const [activeId, setActiveId] = useState('what-is-docdex');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isManualScrolling = useRef(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (isManualScrolling.current) return;
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    }, options);

    const sections = document.querySelectorAll('.section-observer-target');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

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

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BookOpen,
      items: [
        { id: 'what-is-docdex', label: 'What is Docdex' },
        { id: 'install', label: 'Install' },
        { id: 'quickstart', label: 'Quickstart' }
      ]
    },
    {
      id: 'daemon',
      label: 'Daemon + Serve',
      icon: Server,
      items: [
        { id: 'daemon-mode', label: 'Daemon mode' },
        { id: 'serve-mode', label: 'Serve mode' },
        { id: 'security', label: 'Security and TLS' }
      ]
    },
    {
      id: 'cli',
      label: 'CLI Reference',
      icon: Terminal,
      items: [
        { id: 'cli-common', label: 'Common repo flags' },
        { id: 'cli-core', label: 'Core commands' },
        { id: 'cli-search', label: 'Search and chat' },
        { id: 'cli-memory', label: 'Memory and profiles' },
        { id: 'cli-web', label: 'Web and libs' },
        { id: 'cli-mcp', label: 'MCP and agents' },
        { id: 'cli-ops', label: 'Ops and diagnostics' }
      ]
    },
    {
      id: 'config',
      label: 'Configuration',
      icon: Settings,
      items: [
        { id: 'config-file', label: 'Config file' },
        { id: 'env-vars', label: 'Environment variables' },
        { id: 'state-paths', label: 'State and paths' }
      ]
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: Cpu,
      items: [
        { id: 'mcp-clients', label: 'MCP clients' },
        { id: 'agent-workflow', label: 'Agent workflow' }
      ]
    },
    {
      id: 'troubleshooting',
      label: 'Troubleshooting',
      icon: AlertCircle,
      items: [{ id: 'troubleshooting', label: 'Troubleshooting' }]
    }
  ];

  const repoArgs: ArgDefinition[] = [
    {
      name: '--repo',
      description: 'Repository/workspace root to index (defaults to .).',
      type: 'path'
    },
    {
      name: '--state-dir',
      description:
        'Override state storage directory (DOCDEX_STATE_DIR). Absolute paths outside the repo are scoped to <state-dir>/repos/<repo_id>/index.',
      type: 'path'
    },
    {
      name: '--exclude-prefix',
      description: 'Comma-separated relative prefixes to skip (DOCDEX_EXCLUDE_PREFIXES).',
      type: 'string[]'
    },
    {
      name: '--exclude-dir',
      description: 'Comma-separated directory names to skip anywhere under the repo (DOCDEX_EXCLUDE_DIRS).',
      type: 'string[]'
    },
    {
      name: '--enable-symbol-extraction',
      description: 'Deprecated no-op (symbol + impact extraction always on).',
      type: 'boolean'
    }
  ];

  const serveArgs: ArgDefinition[] = [
    ...repoArgs,
    { name: '--host', description: 'Bind host (defaults to config).', type: 'string' },
    { name: '--port', description: 'Bind port (defaults to config).', type: 'number' },
    { name: '--expose', description: 'Allow non-loopback binds (requires auth token).', type: 'boolean' },
    { name: '--log', description: 'Log level (default info).', type: 'string' },
    { name: '--tls-cert', description: 'TLS cert PEM file (DOCDEX_TLS_CERT).', type: 'path' },
    { name: '--tls-key', description: 'TLS key PEM file (DOCDEX_TLS_KEY).', type: 'path' },
    {
      name: '--certbot-domain',
      description: 'Use /etc/letsencrypt/live/<domain> for TLS (DOCDEX_CERTBOT_DOMAIN).',
      type: 'string'
    },
    {
      name: '--certbot-live-dir',
      description: 'Use explicit certbot live dir (DOCDEX_CERTBOT_LIVE_DIR).',
      type: 'path'
    },
    { name: '--insecure', description: 'Allow HTTP on non-loopback binds (DOCDEX_INSECURE_HTTP).', type: 'boolean' },
    { name: '--require-tls', description: 'Require TLS on non-loopback binds (DOCDEX_REQUIRE_TLS).', type: 'boolean' },
    { name: '--auth-token', description: 'Bearer token for HTTP auth (DOCDEX_AUTH_TOKEN).', type: 'string' },
    { name: '--preflight-check', description: 'Run docdexd check before serving.', type: 'boolean' },
    { name: '--max-limit', description: 'Clamp search/snippet limit (DOCDEX_MAX_LIMIT).', type: 'number' },
    { name: '--max-query-bytes', description: 'Clamp query size (DOCDEX_MAX_QUERY_BYTES).', type: 'number' },
    { name: '--max-request-bytes', description: 'Clamp request size (DOCDEX_MAX_REQUEST_BYTES).', type: 'number' },
    { name: '--rate-limit-per-min', description: 'Per-IP request limit (DOCDEX_RATE_LIMIT_PER_MIN).', type: 'number' },
    { name: '--rate-limit-burst', description: 'Rate limit burst (DOCDEX_RATE_LIMIT_BURST).', type: 'number' },
    { name: '--strip-snippet-html', description: 'Omit snippet HTML (DOCDEX_STRIP_SNIPPET_HTML).', type: 'boolean' },
    { name: '--secure-mode', description: 'Enable secure defaults (DOCDEX_SECURE_MODE).', type: 'boolean' },
    { name: '--disable-snippet-text', description: 'Omit snippet text/html (DOCDEX_DISABLE_SNIPPET_TEXT).', type: 'boolean' },
    { name: '--enable-memory', description: 'Enable memory endpoints (DOCDEX_ENABLE_MEMORY).', type: 'boolean' },
    { name: '--agent-id', description: 'Default agent id for profiles (DOCDEX_AGENT_ID).', type: 'string' },
    { name: '--enable-mcp', description: 'Enable MCP auto-start (DOCDEX_ENABLE_MCP).', type: 'boolean' },
    { name: '--disable-mcp', description: 'Disable MCP auto-start (DOCDEX_DISABLE_MCP).', type: 'boolean' },
    { name: '--embedding-base-url', description: 'Embedding base URL (DOCDEX_EMBEDDING_BASE_URL).', type: 'string' },
    { name: '--ollama-base-url', description: 'Legacy base URL (DOCDEX_OLLAMA_BASE_URL).', type: 'string' },
    { name: '--embedding-model', description: 'Embedding model id (DOCDEX_EMBEDDING_MODEL).', type: 'string' },
    { name: '--embedding-timeout-ms', description: 'Embedding timeout in ms (DOCDEX_EMBEDDING_TIMEOUT_MS).', type: 'number' },
    { name: '--access-log', description: 'Structured access logs (DOCDEX_ACCESS_LOG).', type: 'boolean' },
    { name: '--audit-log-path', description: 'Audit log path (DOCDEX_AUDIT_LOG_PATH).', type: 'path' },
    { name: '--audit-max-bytes', description: 'Audit log rotation size (DOCDEX_AUDIT_MAX_BYTES).', type: 'number' },
    { name: '--audit-max-files', description: 'Audit log rotations (DOCDEX_AUDIT_MAX_FILES).', type: 'number' },
    { name: '--audit-disable', description: 'Disable audit logs (DOCDEX_AUDIT_DISABLE).', type: 'boolean' },
    { name: '--run-as-uid', description: 'Drop privileges to UID (DOCDEX_RUN_AS_UID).', type: 'number' },
    { name: '--run-as-gid', description: 'Drop privileges to GID (DOCDEX_RUN_AS_GID).', type: 'number' },
    { name: '--chroot-dir', description: 'Chroot to path (DOCDEX_CHROOT_DIR).', type: 'path' },
    { name: '--unshare-net', description: 'Unshare network namespace (DOCDEX_UNSHARE_NET).', type: 'boolean' },
    { name: '--allow-ip', description: 'Allowlisted IP/CIDR list (DOCDEX_ALLOW_IPS).', type: 'string[]' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Docdex Documentation',
    description: 'Complete CLI, daemon, and MCP documentation for Docdex.',
    author: {
      '@type': 'Person',
      name: 'Bekir Dag'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Docdex',
      url: 'https://docdex.org'
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-page">
      <Seo
        title="Documentation"
        description="Complete Docdex CLI documentation with every command, argument, daemon mode, MCP usage, security, TLS, and configuration reference."
        path="/documentation"
        type="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 relative">
          <div className="lg:hidden mb-6 flex items-center justify-between bg-surface-50 p-4 rounded-lg border border-surface-200">
            <span className="text-white font-medium">Table of Contents</span>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-brand-400 p-1">
              {isSidebarOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          <aside
            className={`
            fixed lg:sticky top-28 left-0 z-40 w-64 h-[calc(100vh-8rem)] overflow-y-auto
            bg-page lg:bg-transparent border-r lg:border-r-0 border-surface-200/50 pr-4
            lg:block transition-transform duration-300 flex-shrink-0
            ${isSidebarOpen ? 'translate-x-0 shadow-2xl bg-surface-50 p-6 rounded-r-xl border-r' : '-translate-x-full lg:translate-x-0'}
            lg:w-64 xl:w-72
          `}
          >
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

          <div className="flex-1 min-w-0 pb-32">
            <div className="mb-12">
              <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Documentation</span>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">
                Docdex documentation.
              </h1>
              <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                Complete reference for CLI commands, daemon modes, MCP integration, and security.
              </p>
            </div>
            <Section id="what-is-docdex" title="What is Docdex">
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Docdex is a local-first indexer for docs and code. It builds a private, on-disk index and
                serves ranked context over CLI, HTTP, and MCP so humans and AI agents can trust the answers.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 mb-8">
                <li>Doc and code indexing with fast summaries and snippets.</li>
                <li>AST and impact graph for structural code intelligence.</li>
                <li>Repo memory and agent memory for persistent knowledge.</li>
                <li>Optional web search refined by local LLMs via Ollama.</li>
                <li>Secure daemon with TLS, auth, allowlists, and audit logs.</li>
                <li>Open source and free to use under the MIT license.</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface-50/20 p-6 rounded-xl border border-surface-200/50">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-400" /> Secure by default
                  </h4>
                  <p className="text-sm text-gray-400">
                    TLS, auth tokens, allowlists, rate limits, and audit logs protect the daemon while your
                    data stays local.
                  </p>
                </div>
                <div className="bg-surface-50/20 p-6 rounded-xl border border-surface-200/50">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Server className="w-4 h-4 text-brand-400" /> Shared daemon
                  </h4>
                  <p className="text-sm text-gray-400">
                    One daemon serves HTTP, SSE MCP, and watchers for multiple repos with a shared state dir.
                  </p>
                </div>
              </div>
              <CodeBlock
                title="Quick preview"
                language="bash"
                code={`npm i -g docdex

docdexd index --repo /path/to/repo

docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210`}
              />
            </Section>

            <Section id="install" title="Install">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Install with Node.js 18+. The npm wrapper downloads the correct binary for your platform.
              </p>
              <p className="text-gray-400 mb-4 text-sm">
                After install, docdex and docdexd are interchangeable commands that invoke the same binary.
              </p>
              <CodeBlock title="Terminal" language="bash" code={`npm i -g docdex
npx docdex --version`} />
              <SubSection title="Installer utilities">
                <p className="text-gray-400 mb-4">
                  Use the npm wrapper for platform diagnostics and forked release sources.
                </p>
                <CodeBlock
                  title="Terminal"
                  language="bash"
                  code={`# Detect platform + expected binary
npx docdex doctor
npx docdex diagnostics

# Alternate release source
DOCDEX_DOWNLOAD_REPO=owner/repo npm i -g docdex`}
                />
              </SubSection>
            </Section>

            <Section id="quickstart" title="Quickstart">
              <CodeBlock
                title="Terminal"
                language="bash"
                code={`# Build index once
docdexd index --repo /path/to/repo

# Start shared daemon
docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210

# Ask a question
docdexd chat --repo /path/to/repo --query "auth flow" --limit 5`}
              />
              <p className="text-gray-400 text-sm">
                CLI commands default to the daemon HTTP base URL; set DOCDEX_HTTP_BASE_URL to override or
                DOCDEX_CLI_LOCAL=1 to run in-process.
              </p>
            </Section>

            <Section id="daemon-mode" title="Daemon mode">
              <p className="text-gray-400 mb-6 leading-relaxed">
                The singleton daemon hosts HTTP, SSE MCP, and a file watcher for multiple repos. MCP clients
                connect to /sse or /v1/mcp.
              </p>
              <CodeBlock
                title="Terminal"
                language="bash"
                code={`docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210 --log warn`}
              />
              <p className="text-gray-400 text-sm">
                Use POST /v1/initialize with rootUri to mount additional repos when using a shared daemon.
              </p>
            </Section>

            <Section id="serve-mode" title="Serve mode">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Serve mode runs a per-repo HTTP API with watcher. Use this when you want a dedicated process
                per repository.
              </p>
              <CodeBlock
                title="Terminal"
                language="bash"
                code={`docdexd serve --repo /path/to/repo --host 127.0.0.1 --port 3210 --log info`}
              />
            </Section>

            <Section id="security" title="Security and TLS">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Secure mode is enabled by default. Non-loopback binds require TLS and an auth token unless you
                explicitly disable them. Use certbot flags for managed certificates.
              </p>
              <CodeBlock
                title="Terminal"
                language="bash"
                code={`# TLS with certbot
docdexd serve --repo /path/to/repo --host 0.0.0.0 --port 3210 \\
  --auth-token <token> --certbot-domain example.com

# Trusted proxy termination
docdexd serve --repo /path/to/repo --host 0.0.0.0 --port 3210 \\
  --auth-token <token> --require-tls=false`}
              />
              <p className="text-gray-400 text-sm">
                Use --allow-ip and --rate-limit-per-min to lock down access, and --audit-log-path to record
                access events.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                For local-only use, add --secure-mode=false to skip auth and rate limits on loopback.
              </p>
            </Section>

            <Section id="cli-common" title="Common repo flags">
              <ArgsTable args={repoArgs} />
            </Section>

            <Section id="cli-core" title="Core commands">
              <CommandCard
                title="docdexd check"
                description="Validate config, state, bind availability, and local dependencies."
                usage="docdexd check"
              />
              <CommandCard
                title="docdexd help-all"
                description="Print help for every command and flag."
                usage="docdexd help-all"
              />
              <CommandCard
                title="docdexd llm-list"
                description="Show hardware-aware LLM recommendations from docs/llm_list.json."
                usage="docdexd llm-list"
              />
              <CommandCard
                title="docdexd setup"
                description="Interactive setup wizard for Ollama and models (alias: llm-setup)."
                usage="docdexd setup"
                args={[
                  { name: '--non-interactive', description: 'Print manual instructions only.', type: 'boolean' },
                  { name: '--json', description: 'Emit JSON summary.', type: 'boolean' },
                  { name: '--force', description: 'Run setup even if complete.', type: 'boolean' },
                  { name: '--ollama-path', description: 'Explicit path to Ollama binary.', type: 'path' }
                ]}
              />
              <CommandCard
                title="docdexd index"
                description="Build or rebuild the repo index."
                usage="docdexd index --repo /path/to/repo"
                args={[
                  ...repoArgs,
                  { name: '--libs-sources', description: 'Optional libs sources JSON file.', type: 'path' }
                ]}
              />
              <CommandCard
                title="docdexd ingest"
                description="Ingest a single file into the index."
                usage="docdexd ingest --repo /path/to/repo --file docs/new.md"
                args={[...repoArgs, { name: '--file', description: 'File to ingest.', type: 'path', required: true }]}
              />
              <CommandCard
                title="docdexd serve"
                description="Serve HTTP API with watcher (per repo)."
                usage="docdexd serve --repo /path/to/repo --host 127.0.0.1 --port 3210"
                args={serveArgs}
              />
              <CommandCard
                title="docdexd daemon"
                description="Run singleton multi-repo daemon (shared HTTP + MCP)."
                usage="docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210"
                args={serveArgs}
              />
            </Section>

            <Section id="cli-search" title="Search and chat">
              <CommandCard
                title="docdexd chat"
                description="Run an ad-hoc chat query or enter a REPL if --query is omitted (alias: query)."
                usage={`docdexd chat --repo /path/to/repo --query "otp flow" --limit 5`}
                args={[
                  ...repoArgs,
                  { name: '--query', description: 'Chat query (omit for REPL).', type: 'string' },
                  { name: '--model', description: 'Override Ollama model.', type: 'string' },
                  { name: '--agent', description: 'Agent slug/id for LLM calls.', type: 'string' },
                  { name: '--agent-id', description: 'Profile agent id to load preferences.', type: 'string' },
                  { name: '--limit', description: 'Max results (default 8).', type: 'number' },
                  { name: '--max-web-results', description: 'Max web results (Tier 2).', type: 'number' },
                  { name: '--repo-only', description: 'Only search repo index.', type: 'boolean' },
                  { name: '--web-only', description: 'Skip local search (alias --skip-local-search).', type: 'boolean' },
                  { name: '--no-cache', description: 'Disable web cache (alias --no-web-cache).', type: 'boolean' },
                  { name: '--llm-filter-local-results', description: 'Use LLM to filter local results.', type: 'boolean' },
                  { name: '--compress-results', description: 'Emit compact JSON.', type: 'boolean' },
                  { name: '--stream', description: 'Stream text summary instead of JSON.', type: 'boolean' },
                  { name: '--diff-mode', description: 'Diff-aware context mode.', type: 'enum' },
                  { name: '--diff-base', description: 'Diff base ref (range mode).', type: 'string' },
                  { name: '--diff-head', description: 'Diff head ref (range mode).', type: 'string' },
                  { name: '--diff-path', description: 'Limit diff to paths (repeatable).', type: 'path[]' }
                ]}
              />
              <CommandCard
                title="docdexd web-search"
                description="Run a web discovery query (requires DOCDEX_WEB_ENABLED=1; daemon enables by default)."
                usage={`docdexd web-search --query "rust async cancel" --limit 5`}
                args={[
                  { name: '--query', description: 'Search query.', type: 'string', required: true },
                  { name: '--limit', description: 'Max results (default 8).', type: 'number' }
                ]}
              />
              <CommandCard
                title="docdexd web-fetch"
                description="Fetch a URL via headless browser."
                usage="docdexd web-fetch --url https://example.com"
                args={[{ name: '--url', description: 'URL to fetch.', type: 'string', required: true }]}
              />
              <CommandCard
                title="docdexd web-rag"
                description="Run a web-assisted query (forces Tier 2 behavior)."
                usage={`docdexd web-rag --repo /path/to/repo --query "retry policy"`}
                args={[
                  ...repoArgs,
                  { name: '--query', description: 'Search query.', type: 'string', required: true },
                  { name: '--limit', description: 'Max results (default 8).', type: 'number' },
                  { name: '--repo-only', description: 'Only search repo index.', type: 'boolean' },
                  { name: '--stream', description: 'Stream text summary instead of JSON.', type: 'boolean' }
                ]}
              />
              <CommandCard
                title="docdexd web-cache-flush"
                description="Clear cached web discovery/fetch entries."
                usage="docdexd web-cache-flush"
              />
            </Section>

            <Section id="cli-memory" title="Memory and profiles">
              <CommandCard
                title="docdexd memory-store"
                description="Store a repo memory item (requires embeddings)."
                usage={`docdexd memory-store --repo /path/to/repo --text "Payments retry up to 3 times"`}
                args={[
                  ...repoArgs,
                  { name: '--text', description: 'Text to store.', type: 'string', required: true },
                  { name: '--metadata', description: 'Optional JSON metadata string.', type: 'string' },
                  { name: '--embedding-base-url', description: 'Embedding base URL.', type: 'string' },
                  { name: '--ollama-base-url', description: 'Legacy base URL.', type: 'string' },
                  { name: '--embedding-model', description: 'Embedding model id.', type: 'string' },
                  { name: '--embedding-timeout-ms', description: 'Embedding timeout in ms.', type: 'number' }
                ]}
              />
              <CommandCard
                title="docdexd memory-recall"
                description="Recall repo memory items by semantic similarity."
                usage={`docdexd memory-recall --repo /path/to/repo --query "retry policy" --top-k 5`}
                args={[
                  ...repoArgs,
                  { name: '--query', description: 'Query text.', type: 'string', required: true },
                  { name: '--top-k', description: 'Max results (default 5).', type: 'number' },
                  { name: '--embedding-base-url', description: 'Embedding base URL.', type: 'string' },
                  { name: '--ollama-base-url', description: 'Legacy base URL.', type: 'string' },
                  { name: '--embedding-model', description: 'Embedding model id.', type: 'string' },
                  { name: '--embedding-timeout-ms', description: 'Embedding timeout in ms.', type: 'number' }
                ]}
              />
              <CommandCard
                title="docdexd profile list"
                description="List profile agents and preferences."
                usage="docdexd profile list --agent-id default"
                args={[{ name: '--agent-id', description: 'Agent id filter.', type: 'string' }]}
              />
              <CommandCard
                title="docdexd profile add"
                description="Add a profile preference (no evolution)."
                usage={`docdexd profile add --agent-id default --category style --content "Use bullets"`}
                args={[
                  { name: '--agent-id', description: 'Agent id.', type: 'string', required: true },
                  { name: '--category', description: 'style|tooling|constraint|workflow.', type: 'string', required: true },
                  { name: '--content', description: 'Preference content.', type: 'string', required: true },
                  { name: '--role', description: 'Optional role override.', type: 'string' }
                ]}
              />
              <CommandCard
                title="docdexd profile search"
                description="Search preferences by semantic similarity."
                usage={`docdexd profile search --agent-id default --query "style" --top-k 5`}
                args={[
                  { name: '--agent-id', description: 'Agent id.', type: 'string', required: true },
                  { name: '--query', description: 'Search query.', type: 'string', required: true },
                  { name: '--top-k', description: 'Max results (default 8).', type: 'number' }
                ]}
              />
              <CommandCard
                title="docdexd profile export"
                description="Export preferences to a sync manifest."
                usage="docdexd profile export --out profile_sync.json"
                args={[{ name: '--out', description: 'Output path.', type: 'path' }]}
              />
              <CommandCard
                title="docdexd profile import"
                description="Import preferences from a sync manifest."
                usage="docdexd profile import profile_sync.json"
                args={[{ name: 'path', description: 'Path to manifest.', type: 'path', required: true }]}
              />
            </Section>

            <Section id="cli-web" title="Web and libs">
              <CommandCard
                title="docdexd libs ingest"
                description="Ingest library docs from a sources file."
                usage="docdexd libs ingest --repo /path/to/repo --sources /tmp/libs.json"
                args={[...repoArgs, { name: '--sources', description: 'Sources JSON path.', type: 'path', required: true }]}
              />
              <CommandCard
                title="docdexd libs discover"
                description="Discover eligible library documentation sources."
                usage="docdexd libs discover --repo /path/to/repo"
                args={[...repoArgs, { name: '--sources', description: 'Optional sources JSON.', type: 'path' }]}
              />
              <CommandCard
                title="docdexd libs fetch"
                description="Discover and ingest library docs."
                usage="docdexd libs fetch --repo /path/to/repo"
                args={[...repoArgs, { name: '--sources', description: 'Optional sources JSON.', type: 'path' }]}
              />
              <CommandCard
                title="docdexd libs-ingest"
                description="Top-level ingest command (same as libs ingest)."
                usage="docdexd libs-ingest --repo /path/to/repo --sources /tmp/libs.json"
                args={[...repoArgs, { name: '--sources', description: 'Sources JSON path.', type: 'path', required: true }]}
              />
              <CommandCard
                title="docdexd libs-discover"
                description="Top-level discover command (same as libs discover)."
                usage="docdexd libs-discover --repo /path/to/repo"
                args={[...repoArgs, { name: '--sources', description: 'Optional sources JSON.', type: 'path' }]}
              />
            </Section>

            <Section id="cli-mcp" title="MCP and agents">
              <CommandCard
                title="docdexd mcp"
                description="Run MCP server over stdio (uses docdex-mcp-server binary)."
                usage="docdexd mcp --repo /path/to/repo --log warn --max-results 8"
                args={[
                  ...repoArgs,
                  { name: '--log', description: 'Log level (default warn).', type: 'string' },
                  { name: '--max-results', description: 'Clamp docdex_search results.', type: 'number' },
                  { name: '--rate-limit-per-min', description: 'MCP tool rate limit per minute.', type: 'number' },
                  { name: '--rate-limit-burst', description: 'MCP rate limit burst.', type: 'number' },
                  { name: '--auth-token', description: 'Bearer token required by MCP initialize.', type: 'string' }
                ]}
                notes="Set DOCDEX_MCP_SERVER_BIN if the companion binary is not on PATH."
              />
              <CommandCard
                title="docdexd mcp-add"
                description="Helper to register Docdex MCP with supported clients."
                usage="docdexd mcp-add --agent codex --repo /path/to/repo --max-results 8"
                args={[
                  {
                    name: '--agent',
                    description:
                      'Target agent: codex, cursor, cursor-cli, continue, cline, claude, claude-cli, grok, droid, factory, gemini, windsurf, roo, pearai, void, zed, vscode, amp, forge, copilot, warp.',
                    type: 'string'
                  },
                  { name: '--repo', description: 'Repo/workspace root.', type: 'path' },
                  { name: '--max-results', description: 'Max results for docdex_search.', type: 'number' },
                  { name: '--log', description: 'Log level for MCP server.', type: 'string' },
                  { name: '--remove', description: 'Remove MCP entry instead of adding.', type: 'boolean' },
                  { name: '--all', description: 'Attempt to add to all detected clients.', type: 'boolean' }
                ]}
              />
              <CommandCard
                title="docdexd agent eval"
                description="Evaluate mcoda agents with fixed queries."
                usage="docdexd agent eval --repo /path/to/repo --limit 8"
                args={[
                  ...repoArgs,
                  { name: '--limit', description: 'Max results (default 8).', type: 'number' },
                  { name: '--max-web-results', description: 'Max web results.', type: 'number' },
                  { name: '--repo-only', description: 'Only search repo index.', type: 'boolean' },
                  { name: '--web-only', description: 'Skip local search.', type: 'boolean' },
                  { name: '--no-cache', description: 'Disable web cache.', type: 'boolean' },
                  { name: '--llm-filter-local-results', description: 'Filter local results with LLM.', type: 'boolean' },
                  { name: '--max-queries', description: 'Limit number of eval queries.', type: 'number' }
                ]}
              />
            </Section>

            <Section id="cli-ops" title="Ops and diagnostics">
              <CommandCard
                title="docdexd browser list"
                description="List browser candidates and selected binary."
                usage="docdexd browser list"
              />
              <CommandCard
                title="docdexd browser setup"
                description="Run browser discovery and persist config."
                usage="docdexd browser setup"
              />
              <CommandCard
                title="docdexd browser install"
                description="Install headless Chromium (Linux) and update config."
                usage="docdexd browser install"
              />
              <CommandCard
                title="docdexd self-check"
                description="Scan the index for sensitive terms before enabling access."
                usage={`docdexd self-check --repo /path/to/repo --terms "token,secret"`}
                args={[
                  ...repoArgs,
                  { name: '--terms', description: 'Comma-separated sensitive terms.', type: 'string[]', required: true },
                  { name: '--limit', description: 'Max hits per term (default 5).', type: 'number' },
                  { name: '--include-default-patterns', description: 'Include built-in patterns.', type: 'boolean' }
                ]}
              />
              <CommandCard
                title="docdexd symbols-status"
                description="Report Tree-sitter parser drift status."
                usage="docdexd symbols-status --repo /path/to/repo"
                args={repoArgs}
              />
              <CommandCard
                title="docdexd impact-diagnostics"
                description="List unresolved dynamic import diagnostics."
                usage="docdexd impact-diagnostics --repo /path/to/repo"
                args={[
                  ...repoArgs,
                  { name: '--file', description: 'Filter by repo-relative file.', type: 'string' },
                  { name: '--limit', description: 'Max diagnostics (default 200).', type: 'number' },
                  { name: '--offset', description: 'Diagnostics offset.', type: 'number' }
                ]}
              />
              <CommandCard
                title="docdexd dag view"
                description="Render a session DAG trace."
                usage="docdexd dag view --repo /path/to/repo <session_id> --format text"
                args={[
                  ...repoArgs,
                  { name: 'session_id', description: 'Session id (positional).', type: 'string', required: true },
                  { name: '--format', description: 'text|dot|json.', type: 'string' },
                  { name: '--max-nodes', description: 'Max nodes to render.', type: 'number' }
                ]}
              />
              <CommandCard
                title="docdexd hook pre-commit"
                description="Run semantic gatekeeper checks for staged files."
                usage="docdexd hook pre-commit --repo /path/to/repo"
                args={repoArgs}
              />
              <CommandCard
                title="docdexd repo inspect"
                description="Inspect repo identity and state mapping."
                usage="docdexd repo inspect --repo /path/to/repo"
                args={repoArgs}
              />
              <CommandCard
                title="docdexd repo reassociate"
                description="Re-associate a moved repo with existing state."
                usage="docdexd repo reassociate --repo /new/path --old-path /old/path"
                args={[
                  ...repoArgs,
                  { name: '--fingerprint', description: 'Target repo fingerprint.', type: 'string' },
                  { name: '--old-path', description: 'Previous canonical repo path.', type: 'path' }
                ]}
              />
              <CommandCard
                title="docdexd run-tests"
                description="Run repo-specific test commands from .docdex/run-tests.json or env."
                usage="docdexd run-tests --repo /path/to/repo --target src"
                args={[...repoArgs, { name: '--target', description: 'Optional file or dir.', type: 'path' }]}
              />
              <CommandCard
                title="docdexd tui"
                description="Launch the local TUI client (requires docdex-tui binary)."
                usage="docdexd tui --repo /path/to/repo"
                args={[{ name: '--repo', description: 'Optional repo root.', type: 'path' }]}
              />
            </Section>

            <Section id="config-file" title="Config file">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Configuration lives in ~/.docdex/config.toml. Key settings include server defaults, memory,
                LLM provider, and web discovery.
              </p>
              <CodeBlock
                title="Example config"
                language="text"
                code={`[server]
http_bind_addr = "127.0.0.1:3210"
default_agent_id = "default"

[memory]
enabled = true

[llm]
provider = "ollama"
base_url = "http://127.0.0.1:11434"
embedding_model = "nomic-embed-text"

[web]
enabled = true`}
              />
            </Section>

            <Section id="env-vars" title="Environment variables">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Most CLI flags have matching DOCDEX_* environment variables. Key ones are below.
              </p>
              <ArgsTable
                args={[
                  { name: 'DOCDEX_STATE_DIR', description: 'Override state directory.', type: 'path' },
                  { name: 'DOCDEX_EXCLUDE_PREFIXES', description: 'Comma-separated prefixes to skip.', type: 'string' },
                  { name: 'DOCDEX_EXCLUDE_DIRS', description: 'Comma-separated dir names to skip.', type: 'string' },
                  { name: 'DOCDEX_HTTP_BASE_URL', description: 'Override daemon base URL for CLI.', type: 'string' },
                  { name: 'DOCDEX_HTTP_TIMEOUT_MS', description: 'HTTP timeout for CLI.', type: 'number' },
                  { name: 'DOCDEX_CLI_LOCAL', description: 'Run CLI in-process.', type: 'boolean' },
                  { name: 'DOCDEX_AUTH_TOKEN', description: 'Bearer token for HTTP auth.', type: 'string' },
                  { name: 'DOCDEX_EXPOSE', description: 'Allow non-loopback binds.', type: 'boolean' },
                  { name: 'DOCDEX_SECURE_MODE', description: 'Enable secure defaults.', type: 'boolean' },
                  { name: 'DOCDEX_REQUIRE_TLS', description: 'Require TLS for non-loopback binds.', type: 'boolean' },
                  { name: 'DOCDEX_INSECURE_HTTP', description: 'Allow HTTP on non-loopback binds.', type: 'boolean' },
                  { name: 'DOCDEX_TLS_CERT', description: 'TLS cert PEM path.', type: 'path' },
                  { name: 'DOCDEX_TLS_KEY', description: 'TLS key PEM path.', type: 'path' },
                  { name: 'DOCDEX_CERTBOT_DOMAIN', description: 'Certbot domain.', type: 'string' },
                  { name: 'DOCDEX_CERTBOT_LIVE_DIR', description: 'Certbot live dir.', type: 'path' },
                  { name: 'DOCDEX_ALLOW_IPS', description: 'Allowlisted IPs/CIDRs.', type: 'string' },
                  { name: 'DOCDEX_MAX_LIMIT', description: 'Clamp search/snippet limit.', type: 'number' },
                  { name: 'DOCDEX_MAX_QUERY_BYTES', description: 'Clamp query size.', type: 'number' },
                  { name: 'DOCDEX_MAX_REQUEST_BYTES', description: 'Clamp request size.', type: 'number' },
                  { name: 'DOCDEX_RATE_LIMIT_PER_MIN', description: 'Rate limit per minute.', type: 'number' },
                  { name: 'DOCDEX_RATE_LIMIT_BURST', description: 'Rate limit burst.', type: 'number' },
                  { name: 'DOCDEX_ENABLE_MEMORY', description: 'Enable memory endpoints.', type: 'boolean' },
                  { name: 'DOCDEX_AGENT_ID', description: 'Default profile agent id.', type: 'string' },
                  { name: 'DOCDEX_LLM_AGENT', description: 'Default chat agent slug.', type: 'string' },
                  { name: 'DOCDEX_EMBEDDING_BASE_URL', description: 'Embedding base URL.', type: 'string' },
                  { name: 'DOCDEX_OLLAMA_BASE_URL', description: 'Legacy base URL.', type: 'string' },
                  { name: 'DOCDEX_EMBEDDING_MODEL', description: 'Embedding model id.', type: 'string' },
                  { name: 'DOCDEX_EMBEDDING_TIMEOUT_MS', description: 'Embedding timeout in ms.', type: 'number' },
                  { name: 'DOCDEX_ENABLE_MCP', description: 'Enable MCP auto-start.', type: 'boolean' },
                  { name: 'DOCDEX_DISABLE_MCP', description: 'Disable MCP auto-start.', type: 'boolean' },
                  { name: 'DOCDEX_LOG_TO_STATE', description: 'Write logs under state dir.', type: 'boolean' },
                  { name: 'DOCDEX_WEB_ENABLED', description: 'Enable web discovery.', type: 'boolean' },
                  { name: 'DOCDEX_OFFLINE', description: 'Force offline mode.', type: 'boolean' },
                  { name: 'DOCDEX_WEB_BROWSER', description: 'Browser binary path.', type: 'path' },
                  { name: 'DOCDEX_CHROME_PATH', description: 'Chrome binary path.', type: 'path' },
                  { name: 'DOCDEX_BROWSER_AUTO_INSTALL', description: 'Disable auto-install (Linux).', type: 'boolean' },
                  { name: 'DOCDEX_SETUP_SKIP', description: 'Skip setup on install.', type: 'boolean' },
                  { name: 'DOCDEX_SETUP_FORCE', description: 'Force setup wizard.', type: 'boolean' },
                  { name: 'DOCDEX_OLLAMA_INSTALL', description: 'Auto-accept Ollama install.', type: 'boolean' },
                  { name: 'DOCDEX_OLLAMA_MODEL_PROMPT', description: 'Enable/disable model prompts.', type: 'boolean' },
                  { name: 'DOCDEX_OLLAMA_MODEL_ASSUME_Y', description: 'Auto-accept recommended models.', type: 'boolean' },
                  { name: 'DOCDEX_OLLAMA_MODEL', description: 'Override default model.', type: 'string' },
                  { name: 'DOCDEX_DOWNLOAD_REPO', description: 'Alternate release repo for installer.', type: 'string' },
                  { name: 'DOCDEX_DOWNLOAD_BASE', description: 'Download mirror base URL.', type: 'string' },
                  { name: 'DOCDEX_LOCAL_FALLBACK', description: 'Disable local binary fallback.', type: 'boolean' },
                  { name: 'DOCDEX_LOCAL_BINARY', description: 'Override local binary path.', type: 'path' },
                  { name: 'DOCDEX_MCP_SERVER_BIN', description: 'Path to docdex-mcp-server binary.', type: 'path' },
                  { name: 'DOCDEX_MCP_RATE_LIMIT_PER_MIN', description: 'MCP rate limit per minute.', type: 'number' },
                  { name: 'DOCDEX_MCP_RATE_LIMIT_BURST', description: 'MCP rate limit burst.', type: 'number' }
                ]}
              />
            </Section>

            <Section id="state-paths" title="State and paths">
              <p className="text-gray-400 mb-6 leading-relaxed">
                State defaults to ~/.docdex/state/repos/&lt;fingerprint&gt;/index. Use --state-dir or
                DOCDEX_STATE_DIR to relocate. Logs can be written under ~/.docdex/state/logs with
                DOCDEX_LOG_TO_STATE=1.
              </p>
            </Section>

            <Section id="mcp-clients" title="MCP clients">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Shared MCP is available at /sse (SSE) and /v1/mcp (streamable HTTP). Codex uses /v1/mcp.
              </p>
              <CodeBlock
                title="Claude Desktop (JSON)"
                language="json"
                code={`{
  "mcpServers": {
    "docdex": {
      "url": "http://localhost:3210/sse"
    }
  }
}`}
              />
              <CodeBlock
                title="Codex (TOML)"
                language="text"
                code={`[mcp_servers]
docdex = { url = "http://localhost:3210/v1/mcp" }`}
              />
            </Section>

            <Section id="agent-workflow" title="Agent workflow">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Instruct agents to follow a search-read-answer loop: search first, open files only if needed,
                then answer using retrieved context.
              </p>
              <CodeBlock
                title="System prompt snippet"
                language="text"
                code={`You have access to Docdex. Always call docdex_search before answering.
If a snippet is truncated, call docdex_open on the referenced file.`}
              />
            </Section>

            <Section id="troubleshooting" title="Troubleshooting">
              <div className="space-y-4 text-gray-400 text-sm">
                <p>Re-run docdexd index when results look stale.</p>
                <p>Use docdexd check to verify dependencies, ports, and config.</p>
                <p>Set DOCDEX_WEB_BROWSER or DOCDEX_CHROME_PATH when web fetch fails.</p>
                <p>Use --secure-mode=false for local-only use or configure TLS + auth for remote access.</p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
