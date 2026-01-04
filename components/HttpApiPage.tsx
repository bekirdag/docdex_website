import React from 'react';
import { Globe, Shield } from 'lucide-react';
import Seo from './Seo';

interface ArgDefinition {
  name: string;
  description: string;
  type: string;
  required?: boolean;
}

const SyntaxHighlight = ({ code }: { code: string }) => {
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
};

const CodeBlock = ({
  code,
  language = 'bash',
  title
}: {
  code: string;
  language?: 'bash' | 'json' | 'text';
  title?: string;
}) => (
  <div className="rounded-xl overflow-hidden bg-[#0F0F0F] border border-surface-200/50 shadow-lg my-6">
    <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] border-b border-surface-200/30">
      <span className="text-xs font-mono text-gray-500 font-medium tracking-wide uppercase">{title || language}</span>
    </div>
    <div className="p-4 font-mono text-sm leading-6 overflow-x-auto">
      {language === 'json' ? <SyntaxHighlight code={code.trim()} /> : <span className="text-gray-300 whitespace-pre-wrap">{code}</span>}
    </div>
  </div>
);

const ArgsTable = ({ args }: { args: ArgDefinition[] }) => (
  <div className="overflow-hidden border border-surface-200/50 rounded-xl mb-6 bg-surface-50/30 backdrop-blur-sm">
    <table className="min-w-full divide-y divide-surface-200/30">
      <thead className="bg-surface-100">
        <tr>
          <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Parameter</th>
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
  <div id={id} className="mb-20 scroll-mt-28">
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="w-1.5 h-8 bg-brand-400 rounded-full"></span>
      {title}
    </h2>
    {children}
  </div>
);

const EndpointCard = ({
  method,
  path,
  description,
  params,
  example
}: {
  method: string;
  path: string;
  description: string;
  params?: ArgDefinition[];
  example?: { title: string; code: string; language?: 'bash' | 'json' | 'text' };
}) => (
  <div className="border border-surface-200/60 rounded-2xl p-6 bg-surface-50/20 mb-8">
    <div className="flex items-center gap-3 mb-3">
      <span
        className={`text-xs font-bold px-2 py-1 rounded ${
          method === 'GET' ? 'bg-sky-500/20 text-sky-300' : 'bg-emerald-500/20 text-emerald-300'
        }`}
      >
        {method}
      </span>
      <code className="text-sm font-mono text-gray-300">{path}</code>
    </div>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    {params && params.length > 0 && <ArgsTable args={params} />}
    {example && <CodeBlock title={example.title} language={example.language} code={example.code} />}
  </div>
);

const HttpApiPage: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: 'Docdex HTTP API',
    description: 'Complete reference for Docdex HTTP endpoints and MCP transport.',
    documentation: 'https://docdex.org/http-api',
    provider: {
      '@type': 'Organization',
      name: 'Docdex',
      url: 'https://docdex.org'
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-page">
      <Seo
        title="HTTP API"
        description="Full Docdex HTTP API reference with endpoints, parameters, auth, repo scoping, and MCP transport."
        path="/http-api"
        type="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">HTTP API</span>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">
            Docdex HTTP API reference.
          </h1>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Endpoint-by-endpoint documentation with auth, repo scoping, and MCP transport details.
          </p>
        </div>
        <Section id="overview" title="HTTP API overview">
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Docdex serves a local HTTP API by default on http://127.0.0.1:3210. When you bind to non-loopback
            addresses, TLS and auth tokens are required unless explicitly disabled.
          </p>
          <CodeBlock
            title="Base URL"
            language="text"
            code={`Default: http://127.0.0.1:3210\nAuth: Authorization: Bearer <token>`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-surface-200/50 bg-surface-50/30">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-brand-400" />
                <h3 className="text-white font-semibold">Security headers</h3>
              </div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Authorization: Bearer &lt;token&gt;</li>
                <li>x-docdex-repo-id: &lt;sha256&gt;</li>
                <li>x-docdex-agent-id: &lt;agent&gt;</li>
                <li>x-docdex-mcp-session: &lt;session_id&gt;</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-surface-200/50 bg-surface-50/30">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-brand-400" />
                <h3 className="text-white font-semibold">Repo scoping</h3>
              </div>
              <p className="text-sm text-gray-400">
                Provide repo_id in query/body or x-docdex-repo-id header. Singleton daemons mount repos via
                POST /v1/initialize using rootUri.
              </p>
            </div>
          </div>
        </Section>

        <Section id="initialize" title="Initialize (multi-repo daemon)">
          <EndpointCard
            method="POST"
            path="/v1/initialize"
            description="Mount a repo in singleton daemon mode and trigger background indexing if needed."
            params={[{ name: 'rootUri', description: 'file:///path/to/repo (body)', type: 'body string', required: true }]}
            example={{
              title: 'Request body',
              language: 'json',
              code: `{
  "rootUri": "file:///path/to/repo"
}`
            }}
          />
        </Section>

        <Section id="health" title="Health and metrics">
          <EndpointCard
            method="GET"
            path="/healthz"
            description="Liveness check (200 OK)."
          />
          <EndpointCard
            method="GET"
            path="/metrics"
            description="Prometheus counters and timers."
          />
          <EndpointCard
            method="GET"
            path="/v1/gates/status"
            description="Quality gate summary (latency, error rate, soak status)."
          />
          <EndpointCard
            method="GET"
            path="/ai-help"
            description="JSON playbook for agents with endpoints and limits."
          />
        </Section>

        <Section id="search" title="Search and snippets">
          <EndpointCard
            method="GET"
            path="/search"
            description="Search docs and code with ranked summaries and optional snippets."
            params={[
              { name: 'q', description: 'Search query.', type: 'query string', required: true },
              { name: 'limit', description: 'Max results (default 8).', type: 'query number' },
              { name: 'snippets', description: 'Return snippets (default true).', type: 'query boolean' },
              { name: 'max_tokens', description: 'Drop hits above token estimate.', type: 'query number' },
              { name: 'include_libs', description: 'Include libs index hits.', type: 'query boolean' },
              { name: 'force_web', description: 'Force Tier 2 web fallback.', type: 'query boolean' },
              { name: 'skip_local_search', description: 'Skip local search.', type: 'query boolean' },
              { name: 'no_cache', description: 'Disable web cache.', type: 'query boolean' },
              { name: 'max_web_results', description: 'Max web results.', type: 'query number' },
              { name: 'llm_filter_local_results', description: 'LLM filter for local hits.', type: 'query boolean' },
              { name: 'diff_mode', description: 'working_tree|staged|range.', type: 'query string' },
              { name: 'diff_base', description: 'Diff base ref.', type: 'query string' },
              { name: 'diff_head', description: 'Diff head ref.', type: 'query string' },
              { name: 'diff_path', description: 'Repeatable diff path.', type: 'query string[]' },
              { name: 'repo_id', description: 'Repo fingerprint override.', type: 'query string' }
            ]}
            example={{
              title: 'Example',
              language: 'bash',
              code: 'curl "http://127.0.0.1:3210/search?q=retry&limit=5&snippets=false"'
            }}
          />
          <CodeBlock
            title="Search response"
            language="json"
            code={`{\n  \"hits\": [\n    {\n      \"doc_id\": \"1\",\n      \"rel_path\": \"docs/retries.md\",\n      \"score\": 12.4,\n      \"summary\": \"Retry policy overview...\",\n      \"snippet\": \"<p>Retries use exponential backoff...</p>\",\n      \"token_estimate\": 220\n    }\n  ]\n}`}
          />
          <EndpointCard
            method="GET"
            path="/snippet/:doc_id"
            description="Fetch a snippet window for a doc id."
            params={[
              { name: 'window', description: 'Line window size.', type: 'query number' },
              { name: 'q', description: 'Highlight query.', type: 'query string' },
              { name: 'text_only', description: 'Omit HTML.', type: 'query boolean' },
              { name: 'max_tokens', description: 'Drop snippets above token estimate.', type: 'query number' }
            ]}
          />
        </Section>

        <Section id="chat" title="Chat completions">
          <EndpointCard
            method="POST"
            path="/v1/chat/completions"
            description="OpenAI-compatible chat completions with Docdex context."
            params={[
              { name: 'messages', description: 'Chat messages array.', type: 'body array', required: true },
              { name: 'model', description: 'Optional model override.', type: 'body string' },
              { name: 'docdex.limit', description: 'Max search hits.', type: 'body number' },
              { name: 'docdex.force_web', description: 'Force Tier 2 web.', type: 'body boolean' },
              { name: 'docdex.skip_local_search', description: 'Skip local search.', type: 'body boolean' },
              { name: 'docdex.no_cache', description: 'Disable web cache.', type: 'body boolean' },
              { name: 'docdex.include_libs', description: 'Include libs index hits.', type: 'body boolean' },
              { name: 'docdex.max_web_results', description: 'Max web results.', type: 'body number' },
              { name: 'docdex.llm_filter_local_results', description: 'LLM filter local hits.', type: 'body boolean' },
              { name: 'docdex.compress_results', description: 'Compact output.', type: 'body boolean' },
              { name: 'docdex.agent_id', description: 'Profile agent id.', type: 'body string' },
              { name: 'docdex.diff', description: '{mode,base,head,paths}', type: 'body object' },
              { name: 'repo_id', description: 'Repo fingerprint (query or body).', type: 'query/body string' },
              { name: 'x-docdex-agent-id', description: 'Header override for agent id.', type: 'header string' }
            ]}
            example={{
              title: 'Request body',
              language: 'json',
              code: `{
  "model": "fake-model",
  "messages": [{ "role": "user", "content": "Where is auth handled?" }],
  "docdex": { "limit": 6, "include_libs": true }
}`
            }}
          />
          <CodeBlock
            title="Chat response (non-streaming)"
            language="json"
            code={`{\n  \"id\": \"cmpl_123\",\n  \"object\": \"chat.completion\",\n  \"created\": 1710000000,\n  \"choices\": [\n    {\n      \"index\": 0,\n      \"message\": {\n        \"role\": \"assistant\",\n        \"content\": \"Authentication is handled in src/auth.ts...\"\n      },\n      \"finish_reason\": \"stop\"\n    }\n  ]\n}`}
          />
        </Section>

        <Section id="indexing" title="Indexing">
          <EndpointCard
            method="POST"
            path="/v1/index/rebuild"
            description="Rebuild the repo index (optionally ingest libs sources)."
            params={[
              { name: 'libs_sources', description: 'Optional sources file path.', type: 'body string' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query/body string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/index/ingest"
            description="Ingest a single file into the index."
            params={[
              { name: 'file', description: 'Repo-relative or absolute path.', type: 'body string', required: true },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query/body string' }
            ]}
          />
        </Section>

        <Section id="code-intel" title="Code intelligence">
          <EndpointCard
            method="GET"
            path="/v1/symbols"
            description="Symbols for a file."
            params={[
              { name: 'path', description: 'Repo-relative path.', type: 'query string', required: true },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }
            ]}
          />
          <EndpointCard
            method="GET"
            path="/v1/symbols/status"
            description="Tree-sitter parser drift status."
            params={[{ name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }]}
          />
          <EndpointCard
            method="GET"
            path="/v1/ast"
            description="AST nodes for a file."
            params={[
              { name: 'path', description: 'Repo-relative path.', type: 'query string', required: true },
              { name: 'maxNodes', description: 'Max nodes to return.', type: 'query number' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }
            ]}
          />
          <EndpointCard
            method="GET"
            path="/v1/ast/search"
            description="Search AST nodes by kind across the repo."
            params={[
              { name: 'kinds', description: 'Comma-separated kinds.', type: 'query string', required: true },
              { name: 'mode', description: 'any|all.', type: 'query string' },
              { name: 'limit', description: 'Max results.', type: 'query number' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/ast/query"
            description="Query AST nodes by kind/name/field."
            params={[
              { name: 'kinds', description: 'Kinds array.', type: 'body string[]', required: true },
              { name: 'name', description: 'Optional name match.', type: 'body string' },
              { name: 'field', description: 'Optional field match.', type: 'body string' },
              { name: 'pathPrefix', description: 'Optional path prefix.', type: 'body string' },
              { name: 'mode', description: 'any|all.', type: 'body string' },
              { name: 'limit', description: 'Max results.', type: 'body number' },
              { name: 'sampleLimit', description: 'Sample nodes limit.', type: 'body number' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query/body string' }
            ]}
          />
          <EndpointCard
            method="GET"
            path="/v1/graph/impact"
            description="Impact graph for a file."
            params={[
              { name: 'file', description: 'Repo-relative path.', type: 'query string', required: true },
              { name: 'maxEdges', description: 'Max edges.', type: 'query number' },
              { name: 'maxDepth', description: 'Max depth.', type: 'query number' },
              { name: 'edgeTypes', description: 'Comma-separated edge types.', type: 'query string' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }
            ]}
          />
          <EndpointCard
            method="GET"
            path="/v1/graph/impact/diagnostics"
            description="Unresolved dynamic import diagnostics."
            params={[
              { name: 'file', description: 'Repo-relative file filter.', type: 'query string' },
              { name: 'limit', description: 'Max diagnostics.', type: 'query number' },
              { name: 'offset', description: 'Offset.', type: 'query number' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }
            ]}
          />
          <EndpointCard
            method="GET"
            path="/v1/dag/export"
            description="Export reasoning DAG trace."
            params={[
              { name: 'session_id', description: 'Session id.', type: 'query string', required: true },
              { name: 'format', description: 'json|text|dot.', type: 'query string' },
              { name: 'max_nodes', description: 'Max nodes.', type: 'query number' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query string' }
            ]}
          />
        </Section>

        <Section id="memory" title="Memory">
          <EndpointCard
            method="POST"
            path="/v1/memory/store"
            description="Store a repo memory item."
            params={[
              { name: 'text', description: 'Memory text.', type: 'body string', required: true },
              { name: 'metadata', description: 'Optional metadata object.', type: 'body object' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query/body string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/memory/recall"
            description="Recall memory by semantic similarity."
            params={[
              { name: 'query', description: 'Query text.', type: 'body string', required: true },
              { name: 'top_k', description: 'Max results.', type: 'body number' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'query/body string' }
            ]}
          />
        </Section>

        <Section id="profiles" title="Agent profiles">
          <EndpointCard
            method="GET"
            path="/v1/profile/list"
            description="List profile agents and preferences."
            params={[{ name: 'agent_id', description: 'Agent id filter.', type: 'query string' }]}
          />
          <EndpointCard
            method="POST"
            path="/v1/profile/add"
            description="Add a preference (immediate write)."
            params={[
              { name: 'agent_id', description: 'Agent id.', type: 'body string', required: true },
              { name: 'content', description: 'Preference content.', type: 'body string', required: true },
              { name: 'category', description: 'style|tooling|constraint|workflow.', type: 'body string', required: true },
              { name: 'role', description: 'Optional role override.', type: 'body string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/profile/save"
            description="Add a preference and trigger evolution."
            params={[
              { name: 'agent_id', description: 'Agent id.', type: 'body string', required: true },
              { name: 'content', description: 'Preference content.', type: 'body string', required: true },
              { name: 'category', description: 'style|tooling|constraint|workflow.', type: 'body string', required: true },
              { name: 'role', description: 'Optional role override.', type: 'body string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/profile/search"
            description="Search preferences by similarity."
            params={[
              { name: 'agent_id', description: 'Agent id.', type: 'body string', required: true },
              { name: 'query', description: 'Search query.', type: 'body string', required: true },
              { name: 'top_k', description: 'Max results.', type: 'body number' }
            ]}
          />
          <EndpointCard method="POST" path="/v1/profile/export" description="Export preferences to a manifest." />
          <EndpointCard
            method="POST"
            path="/v1/profile/import"
            description="Import preferences from a manifest."
            params={[{ name: 'manifest', description: 'Manifest JSON body.', type: 'body object', required: true }]}
          />
        </Section>

        <Section id="hooks" title="Hooks">
          <EndpointCard
            method="POST"
            path="/v1/hooks/validate"
            description="Validate staged files against profile constraints."
            params={[{ name: 'files', description: 'Array of repo-relative files.', type: 'body string[]', required: true }]}
          />
        </Section>

        <Section id="web" title="Web discovery">
          <EndpointCard
            method="POST"
            path="/v1/web/search"
            description="Run a web discovery query."
            params={[
              { name: 'query', description: 'Search query.', type: 'body string', required: true },
              { name: 'limit', description: 'Max results.', type: 'body number' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/web/fetch"
            description="Fetch a URL via headless browser."
            params={[{ name: 'url', description: 'URL to fetch.', type: 'body string', required: true }]}
          />
          <EndpointCard method="POST" path="/v1/web/cache/flush" description="Clear web discovery cache." />
        </Section>

        <Section id="libs" title="Library docs">
          <EndpointCard
            method="POST"
            path="/v1/libs/discover"
            description="Discover library documentation sources."
            params={[
              { name: 'sources_path', description: 'Optional sources JSON.', type: 'body string' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'body string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/libs/ingest"
            description="Ingest library documentation sources."
            params={[
              { name: 'sources_path', description: 'Sources JSON path.', type: 'body string', required: true },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'body string' }
            ]}
          />
          <EndpointCard
            method="POST"
            path="/v1/libs/fetch"
            description="Discover and ingest library docs."
            params={[
              { name: 'sources_path', description: 'Optional sources JSON.', type: 'body string' },
              { name: 'repo_id', description: 'Repo fingerprint.', type: 'body string' }
            ]}
          />
        </Section>

        <Section id="mcp" title="MCP transport">
          <EndpointCard
            method="POST"
            path="/v1/mcp"
            description="MCP JSON-RPC over HTTP (repo can be overridden via project_root/repo_path)."
            params={[{ name: 'request', description: 'JSON-RPC payload.', type: 'body object', required: true }]}
          />
          <EndpointCard
            method="GET"
            path="/v1/mcp/sse"
            description="SSE stream for MCP (returns x-docdex-mcp-session header)."
          />
          <EndpointCard
            method="GET"
            path="/sse"
            description="Alias for /v1/mcp/sse."
          />
          <EndpointCard
            method="POST"
            path="/v1/mcp/message"
            description="Send JSON-RPC to an MCP session."
            params={[
              { name: 'session_id', description: 'Session id (query) or x-docdex-mcp-session header.', type: 'query/header string' },
              { name: 'request', description: 'JSON-RPC payload.', type: 'body object', required: true }
            ]}
          />
        </Section>
      </div>
    </div>
  );
};

export default HttpApiPage;
