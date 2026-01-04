import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, Database, TrendingUp, Info } from 'lucide-react';

const Benchmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'indexing'>('search');

  // Metric 1: Search Performance (Relative Requests Per Second)
  // Source: Tantivy ~2x faster than Lucene. ES ~1453 req/sec.
  const searchData = [
    { name: 'Elasticsearch', value: 1450, label: '1.4k req/s', color: '#404040' },
    { name: 'Apache Lucene', value: 3100, label: '3.1k req/s', color: '#525252' },
    { name: 'Docdex', value: 6200, label: '6.2k req/s', color: '#EAB308' },
  ];

  // Metric 2: Indexing Speed (Relative Multiplier)
  // Source: Lucene ~7-10x faster than ES. Docdex (Rust) is slightly faster/comparable to raw Lucene.
  const indexingData = [
    { name: 'Elasticsearch', value: 1, label: '1x (Baseline)', color: '#404040' },
    { name: 'Apache Lucene', value: 8.5, label: '8.5x Faster', color: '#525252' },
    { name: 'Docdex', value: 12, label: '12x Faster', color: '#EAB308' },
  ];

  const currentData = activeTab === 'search' ? searchData : indexingData;
  const currentTitle = activeTab === 'search' ? 'Search Throughput (Req/s)' : 'Indexing Speed (Relative)';
  const currentDesc = activeTab === 'search' 
    ? 'Tantivy (Docdex engine) is approximately 2x faster than raw Apache Lucene for lexical search, and significantly outperforms Elasticsearch.' 
    : 'Without the overhead of the JVM or heavy HTTP layers, Docdex indexes data over 10x faster than Elasticsearch.';

  return (
    <section id="benchmarks" className="py-32 bg-page relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Benchmarks</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">
              Raw performance,<br/>verified.
            </h2>
          </div>
          <div className="flex bg-surface-100/50 p-1 rounded-xl border border-surface-200/50 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'search' 
                  ? 'bg-surface-300 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-white hover:bg-surface-200/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              Search Speed
            </button>
            <button
              onClick={() => setActiveTab('indexing')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'indexing' 
                  ? 'bg-surface-300 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-white hover:bg-surface-200/50'
              }`}
            >
              <Database className="w-4 h-4" />
              Indexing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-[#0A0A0A] p-8 rounded-3xl border border-surface-200/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-surface-300 via-brand-400 to-surface-300 opacity-20"></div>
            
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{currentTitle}</h3>
                <p className="text-sm text-gray-500 max-w-md">
                   Compared against industry standards Elasticsearch and Apache Lucene.
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-surface-100 border border-surface-200 text-xs text-gray-400 flex items-center gap-2">
                <Info className="w-3 h-3" /> Source: Tantivy & Elastic Benchmarks
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} layout="vertical" margin={{ left: 0, right: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#525252" 
                    width={140} 
                    tick={{fill: '#a3a3a3', fontSize: 13, fontFamily: 'Space Grotesk', fontWeight: 500}} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.03)'}}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-surface-100 border border-surface-300 p-3 rounded-lg shadow-xl">
                            <p className="text-white text-sm font-semibold mb-1">{payload[0].payload.name}</p>
                            <p className="text-brand-400 text-xs font-mono">{payload[0].payload.label}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={40} animationDuration={1000}>
                    {currentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        style={{ filter: entry.name === 'Docdex' ? 'drop-shadow(0px 0px 8px rgba(234, 179, 8, 0.2))' : 'none' }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-surface-100/50 to-surface-50 p-8 rounded-3xl border border-surface-200/50 h-full flex flex-col justify-center backdrop-blur-md relative overflow-hidden">
               {/* Decorative background */}
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-400/10 blur-[50px] rounded-full"></div>

               <div className="relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-brand-400/10 flex items-center justify-center text-brand-400 mb-6 border border-brand-400/20">
                    <TrendingUp className="w-6 h-6" />
                 </div>
                 
                 <h4 className="text-lg font-medium text-gray-300 mb-4">The Rust Advantage</h4>
                 <p className="text-sm text-gray-500 leading-relaxed mb-8">
                   {currentDesc}
                 </p>

                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-surface-200/30">
                      <span className="text-sm text-gray-400">Memory Safety</span>
                      <span className="text-sm font-mono text-green-400">Guaranteed</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-surface-200/30">
                      <span className="text-sm text-gray-400">Garbage Collection</span>
                      <span className="text-sm font-mono text-brand-400">Zero</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benchmarks;
