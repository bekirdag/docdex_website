import React from 'react';
import Seo from './Seo';

const UseCasesPage: React.FC = () => {
  const useCases = [
    {
      title: 'AI agent copilots in IDEs',
      summary:
        'Connect MCP clients like Codex, Claude Desktop, Cursor, or Windsurf to give agents structured repo context.',
      example: 'docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210'
    },
    {
      title: 'Onboarding and internal docs',
      summary:
        'Index READMEs, runbooks, and ADRs so new engineers can ask questions without waiting on tribal knowledge.',
      example: 'curl "http://127.0.0.1:3210/search?q=deployment%20rollback&snippets=false"'
    },
    {
      title: 'Refactor planning',
      summary:
        'Use AST and impact graphs to see downstream callers before changing shared utilities.',
      example: 'curl "http://127.0.0.1:3210/v1/graph/impact?file=src/app.ts&maxDepth=2"'
    },
    {
      title: 'Incident response and runbooks',
      summary:
        'Store incident notes in repo memory so responders can recall previous fixes and constraints instantly.',
      example: 'docdexd memory-store --repo /path/to/repo --text "Failover requires DNS TTL 60s"'
    },
    {
      title: 'Standalone knowledge base',
      summary:
        'Run Docdex as a local knowledge base for internal tools, dashboards, or CLI workflows without any cloud.',
      example: 'docdexd serve --repo /path/to/repo --host 127.0.0.1 --port 3210'
    },
    {
      title: 'Regulated or air-gapped environments',
      summary:
        'Secure the daemon with TLS, auth tokens, allowlists, and audit logs while keeping code on-device.',
      example:
        'docdexd serve --repo /path/to/repo --host 0.0.0.0 --port 3210 --auth-token <token> --certbot-domain example.com'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: useCases.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.summary
    }))
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-page">
      <Seo
        title="Use Cases"
        description="Real-world Docdex use cases for AI agents, onboarding, refactors, incident response, and standalone knowledge bases."
        path="/use-cases"
        type="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Use Cases</span>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">
            Real workflows that Docdex unlocks.
          </h1>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            From agentic engineering to zero-trust deployments, Docdex delivers fast, grounded context where it matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-2xl border border-surface-200/50 bg-surface-50/20 p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-white mb-3">{useCase.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{useCase.summary}</p>
              <div className="mt-auto bg-black/40 border border-surface-200/40 rounded-xl p-4 font-mono text-xs text-gray-300">
                <span className="text-brand-400">$ </span>
                {useCase.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCasesPage;
