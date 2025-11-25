import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="py-24 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Versatility</span>
            <h2 className="text-4xl font-semibold text-white mt-4 tracking-tight">Built for Real World Scenarios.</h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm">
            From solo developers to enterprise teams, Docdex adapts to your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case 1 */}
          <div className="relative group overflow-hidden rounded-3xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-transparent opacity-100 transition-opacity duration-500" />
            <div className="p-10 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-white">The Autonomous Coder</h3>
                <span className="bg-surface-200/80 border border-surface-300/50 text-gray-300 text-xs px-3 py-1 rounded-full">Dev Tooling</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                When using agents like Cline or Bolt.new, providing the entire codebase consumes context windows instantly. Docdex acts as the "long term memory" for your agent.
              </p>
              <div className="bg-black/40 p-6 rounded-2xl border border-surface-200/30 text-sm font-mono text-gray-400 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <span>Context Window: <span className="text-gray-300">Full</span></span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <span>Docdex Retrieval: <span className="text-brand-400">Precision</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="relative group overflow-hidden rounded-3xl bg-surface-100/30 border border-surface-200/50 backdrop-blur-sm shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-100 transition-opacity duration-500" />
            <div className="p-10 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-white">Enterprise Knowledge</h3>
                <span className="bg-surface-200/80 border border-surface-300/50 text-gray-300 text-xs px-3 py-1 rounded-full">Security</span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Companies often have gigabytes of markdown, PDFs, and internal wikis. sending this to cloud vector DBs is a security risk.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-black/40 p-4 rounded-xl border border-surface-200/30 backdrop-blur-md">
                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">On-premise</div>
                 </div>
                 <div className="bg-black/40 p-4 rounded-xl border border-surface-200/30 backdrop-blur-md">
                    <div className="text-2xl font-bold text-white mb-1">0ms</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Network Latency</div>
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