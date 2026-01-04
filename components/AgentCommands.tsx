import React, { useState } from 'react';
import { Copy, Check, Terminal, Cpu } from 'lucide-react';

const AgentCommands: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const commands = [
    {
      id: 'daemon',
      label: 'Shared daemon (HTTP + MCP)',
      cmd: 'docdexd daemon --repo /path/to/repo --host 127.0.0.1 --port 3210',
      description: 'One process for HTTP, SSE MCP, and watchers.'
    },
    {
      id: 'mcp-add-codex',
      label: 'Auto-config Codex',
      cmd: 'docdexd mcp-add --agent codex --repo /path/to/repo --max-results 8 --log warn',
      description: 'Writes MCP config for Codex if present.'
    },
    {
      id: 'mcp-add-cursor',
      label: 'Auto-config Cursor',
      cmd: 'docdexd mcp-add --agent cursor --repo /path/to/repo --max-results 8 --log warn',
      description: 'Updates Cursor MCP config when detected.'
    },
    {
      id: 'mcp-stdio',
      label: 'Legacy stdio MCP',
      cmd: 'docdexd mcp --repo /path/to/repo --log warn --max-results 8',
      description: 'Use when HTTP/SSE is not supported.'
    },
    {
      id: 'mcp-add-all',
      label: 'Auto-config all detected clients',
      cmd: 'docdexd mcp-add --all --repo /path/to/repo',
      description: 'Scans for supported clients and injects MCP entries.'
    }
  ];

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-24 bg-page relative overflow-hidden border-t border-surface-100/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Integration</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mt-4 tracking-tight">
            Connect your agents in minutes.
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-xl">
            Use the shared daemon for SSE MCP, or fall back to the stdio server for legacy clients.
          </p>
        </div>

        <div className="space-y-4">
          {commands.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => handleCopy(item.cmd, idx)}
              className="group cursor-pointer relative bg-[#0A0A0A] border border-surface-200/50 hover:border-brand-500/40 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                
                {/* Icon & Label */}
                <div className="flex items-center gap-4 md:w-1/4 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${copiedIndex === idx ? 'bg-green-500/10 text-green-500' : 'bg-surface-100 text-gray-400 group-hover:text-brand-400 group-hover:bg-surface-200'}`}>
                    {copiedIndex === idx ? <Check className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{item.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                {/* Command Block */}
                <div className="flex-1 bg-surface-50/50 rounded-lg p-4 font-mono text-sm md:text-base text-gray-300 border border-transparent group-hover:border-surface-200/30 transition-colors break-all md:break-normal flex items-center justify-between gap-4">
                   <span>
                      <span className="text-brand-500 select-none mr-2">$</span>
                      {item.cmd}
                   </span>
                </div>

                {/* Copy Indicator (Desktop) */}
                <div className="hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full border border-surface-200/30 text-gray-500 group-hover:border-brand-500/30 group-hover:text-brand-400 transition-all">
                   <Copy className="w-4 h-4" />
                </div>

              </div>
              
              {/* Mobile Copy Indicator */}
              <div className="md:hidden mt-4 flex justify-end text-xs text-brand-400 font-medium opacity-80">
                Tap to copy
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentCommands;
