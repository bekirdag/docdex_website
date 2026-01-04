import React from 'react';

interface UseCasesProps {
  onNavigate?: (path: string) => void;
}

const UseCases: React.FC<UseCasesProps> = ({ onNavigate }) => {
  return (
    <section id="use-cases" className="py-24 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Versatility</span>
            <h2 className="text-4xl font-semibold text-white mt-4 tracking-tight">Built for real-world scenarios.</h2>
          </div>
          <div className="text-right">
            <p className="text-gray-500 max-w-sm text-sm mb-4">
              From solo developers to enterprise teams, Docdex adapts to your workflow.
            </p>
            <button
              onClick={() => onNavigate?.('/use-cases')}
              className="text-sm font-semibold text-white hover:text-brand-400 transition-colors"
            >
              View all use cases
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-3xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-transparent opacity-100 transition-opacity duration-500" />
            <div className="p-10 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-white">Standalone knowledge base</h3>
                <span className="bg-surface-200/80 border border-surface-300/50 text-gray-300 text-xs px-3 py-1 rounded-full">HTTP Ready</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Run Docdex as a local knowledge base for docs, code, and runbooks. Query it from internal tools,
                scripts, or dashboards without any cloud dependency.
              </p>
              <div className="bg-black/40 p-6 rounded-2xl border border-surface-200/30 text-sm font-mono text-gray-400 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Data stays local</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                  <span>API always on</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-100 transition-opacity duration-500" />
            <div className="p-10 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-white">Agentic engineering</h3>
                <span className="bg-surface-200/80 border border-surface-300/50 text-gray-300 text-xs px-3 py-1 rounded-full">MCP Ready</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Give your agents a brain, not just a prompt. MCP, HTTP, and memory keep tool calls grounded in
                real code, decisions, and design constraints.
              </p>
              <div className="bg-black/40 p-6 rounded-2xl border border-surface-200/30 text-sm font-mono text-gray-400 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Context load: minimal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                  <span>Agent access: unlimited</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-100 transition-opacity duration-500" />
            <div className="p-10 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-white">Refactors without surprises</h3>
                <span className="bg-surface-200/80 border border-surface-300/50 text-gray-300 text-xs px-3 py-1 rounded-full">Impact Graph</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Impact graphs map what calls what, so you can spot downstream risk before you change shared
                utilities or API contracts.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-surface-200/30 backdrop-blur-md">
                  <div className="text-2xl font-bold text-white mb-1">AST</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Structural</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-surface-200/30 backdrop-blur-md">
                  <div className="text-2xl font-bold text-white mb-1">Graph</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Dependencies</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-3xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-100 transition-opacity duration-500" />
            <div className="p-10 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-white">Zero-trust environments</h3>
                <span className="bg-surface-200/80 border border-surface-300/50 text-gray-300 text-xs px-3 py-1 rounded-full">Local First</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Keep sensitive code and docs on-device. TLS, auth tokens, allowlists, and audit logs make
                Docdex safe for regulated and air-gapped workflows.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-surface-200/30 backdrop-blur-md">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Local</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-surface-200/30 backdrop-blur-md">
                  <div className="text-2xl font-bold text-white mb-1">TLS</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Secured</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default UseCases;
