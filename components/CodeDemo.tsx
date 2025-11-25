import React, { useState } from 'react';

const CodeDemo: React.FC = () => {
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const codeLines = [
    { num: 1, code: "docdex index --dir ./src --watch", comment: "// Start indexing your source code" },
    { num: 2, code: "docdex serve --port 8080", comment: "// Start the HTTP server" },
    { num: 3, code: "", comment: "" },
    { num: 4, code: "# Query via curl (or your Agent)", comment: "" },
    { num: 5, code: "curl \"http://localhost:8080/search?q=auth\"", comment: "// Get relevant snippets in JSON" },
  ];

  const explanations: Record<number, string> = {
    1: "Scans the specified directory recursively. The --watch flag enables real-time updates when files change.",
    2: "Spin up a lightweight HTTP server to expose the search API to other tools or agents.",
    5: "Returns a JSON payload containing the most relevant file snippets, file paths, and scores. Perfect for RAG context injection."
  };

  return (
    <section className="py-24 relative border-y border-surface-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-100/20 via-page to-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2 pt-8">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Developers</span>
          <h2 className="text-4xl font-semibold text-white mt-4 mb-6 tracking-tight">
            Commands that make sense.
          </h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Docdex is built to be intuitive. No complex configuration files required. Just point it at your docs and go.
          </p>
          
          <div className="space-y-4">
             {Object.entries(explanations).map(([line, text]) => (
               <div 
                 key={line}
                 className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                   activeLine === parseInt(line) 
                     ? 'bg-surface-100 border-brand-500/30' 
                     : 'bg-transparent border-transparent hover:bg-surface-50'
                 }`}
                 onMouseEnter={() => setActiveLine(parseInt(line))}
                 onMouseLeave={() => setActiveLine(null)}
               >
                 <div className="flex items-center gap-3 mb-2">
                   <span className={`text-xs font-mono px-2 py-0.5 rounded ${activeLine === parseInt(line) ? 'bg-brand-400 text-black' : 'bg-surface-200 text-gray-400'}`}>Line {line}</span>
                 </div>
                 <p className="text-sm text-gray-400">{text}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="rounded-xl overflow-hidden bg-[#0A0A0A] border border-surface-200 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-surface-100 border-b border-surface-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-xs text-gray-500 font-sans">zsh</div>
              <div className="w-10"></div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto min-h-[300px] flex flex-col justify-center">
              {codeLines.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`relative group flex transition-colors duration-200 ${activeLine === line.num ? 'bg-surface-100/30 -mx-6 px-6 border-l-2 border-brand-400' : ''}`}
                >
                  <span className="text-gray-700 select-none mr-4 w-6 text-right">{line.num}</span>
                  <div className="flex-1 whitespace-pre">
                    {line.code && (
                      <>
                        <span className="text-brand-400">$ </span>
                        <span className="text-gray-200">{line.code}</span>
                      </>
                    )}
                    {line.comment && <span className="text-gray-600 ml-4">{line.comment}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CodeDemo;