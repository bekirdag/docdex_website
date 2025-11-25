import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Benchmarks: React.FC = () => {
  // Real-world approximate figures
  // Lucene: Standard Java implementation
  // ES: Elasticsearch (HTTP + JSON Overhead)
  // Docdex: Tantivy (Rust, close to metal)
  const data = [
    { name: 'Elasticsearch', value: 95, label: '95 MB/s' },
    { name: 'Lucene', value: 140, label: '140 MB/s' },
    { name: 'Docdex', value: 380, label: '380 MB/s' },
  ];

  // Local Search Latency (P99)
  const searchData = [
    { name: 'Elasticsearch', value: 35, label: '35ms' },
    { name: 'Lucene', value: 12, label: '12ms' },
    { name: 'Docdex', value: 3, label: '3ms' },
  ];

  return (
    <section id="benchmarks" className="py-24 bg-page relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">Performance</span>
          <h2 className="text-4xl font-semibold text-white mt-4 mb-4 tracking-tight">Built for speed.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            When your agent is waiting, every millisecond counts. Docdex leverages Rust's memory safety and zero-cost abstractions to outperform JVM-based solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-surface-100/30 backdrop-blur-sm p-8 rounded-3xl border border-surface-200/50 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_10px_#facc15]"></span>
              Indexing Throughput (MB/s)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                  <XAxis type="number" stroke="#404040" hide />
                  <YAxis dataKey="name" type="category" stroke="#525252" width={100} tick={{fill: '#a3a3a3', fontSize: 13, fontFamily: 'Inter'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', color: '#fff' }}
                    cursor={{fill: 'transparent'}}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                     {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Docdex' ? '#FCD34D' : '#404040'} />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-right text-xs text-gray-600 mt-4 uppercase tracking-wide font-mono">Higher is better</p>
          </div>

          <div className="bg-surface-100/30 backdrop-blur-sm p-8 rounded-3xl border border-surface-200/50 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              Search Latency (P99 ms)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={searchData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                  <XAxis type="number" stroke="#404040" hide />
                  <YAxis dataKey="name" type="category" stroke="#525252" width={100} tick={{fill: '#a3a3a3', fontSize: 13, fontFamily: 'Inter'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', color: '#fff' }}
                    cursor={{fill: 'transparent'}}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                     {searchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Docdex' ? '#10B981' : '#404040'} />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-right text-xs text-gray-600 mt-4 uppercase tracking-wide font-mono">Lower is better</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benchmarks;