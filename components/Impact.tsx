import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Impact: React.FC = () => {
  const [downloads, setDownloads] = useState<string>('...');
  const [stars, setStars] = useState<string>('...');

  useEffect(() => {
    // Fetch NPM Downloads (Last Week)
    fetch('https://api.npmjs.org/downloads/point/last-week/docdex')
      .then(res => res.json())
      .then(data => {
        if (data.downloads) {
           // Format: 1.2k if > 1000, else raw number
           const count = data.downloads;
           setDownloads(count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toLocaleString());
        }
      })
      .catch(() => setDownloads('2k+'));

    // Fetch GitHub Stars
    fetch('https://api.github.com/repos/bekirdag/docdex')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
            const count = data.stargazers_count;
            setStars(count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toLocaleString());
        }
      })
      .catch(() => setStars('150+'));
  }, []);

  return (
    <section className="py-24 bg-page relative overflow-hidden">
       {/* Background subtle glow */}
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="flex flex-col lg:flex-row gap-16 items-stretch">
            
            {/* Left Side: Copy & Small Stats */}
            <div className="lg:w-1/2 flex flex-col justify-center">
                <span className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-4 block">Performance · Proven Impact</span>
                
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 leading-[1.1] text-balance">
                    Numbers that prove<br/>
                    Docdex is worthy.
                </h2>
                
                <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl">
                    Concrete results from engineering teams that use Docdex to track codebases, prevent context window overflow, and redirect token budget back into building features.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-16">
                     <a 
                        href="#docs" 
                        className="px-8 py-3.5 bg-brand-400 hover:bg-brand-500 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                     >
                        Get started
                     </a>
                     <a 
                        href="#benchmarks" 
                        className="px-8 py-3.5 bg-transparent hover:bg-surface-100 text-white font-medium rounded-full border border-surface-200 transition-colors flex items-center gap-2"
                     >
                        View benchmarks <ArrowUpRight className="w-4 h-4 text-gray-400" />
                     </a>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-3 gap-8 border-t border-surface-200/30 pt-8">
                    <div>
                        <div className="text-3xl font-bold text-white mb-1 font-mono">{downloads}</div>
                        <p className="text-sm text-gray-500 leading-snug">Weekly NPM<br/>Downloads</p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-1 font-mono">{stars}</div>
                        <p className="text-sm text-gray-500 leading-snug">GitHub<br/>Stars</p>
                    </div>
                     <div>
                        <div className="text-3xl font-bold text-white mb-1 font-mono">10ms</div>
                        <p className="text-sm text-gray-500 leading-snug">Average<br/>Latency</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Hero Card */}
            <div className="lg:w-1/2 w-full">
                <div className="bg-[#0A0A0A] rounded-[2.5rem] p-8 md:p-12 border border-surface-200/50 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                    {/* Inner Card Glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-400/5 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div>
                        <div className="flex justify-end mb-12">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-100/80 border border-surface-200/50 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                <span className="text-xs font-medium text-gray-300">Updated weekly</span>
                            </span>
                        </div>

                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">Token Savings</span>
                        <div className="text-7xl sm:text-8xl font-bold text-white mt-4 mb-6 tracking-tighter">
                            50%<span className="text-brand-400">+</span>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Total token usage Docdex has redirected or protected through precise snippet retrieval, reducing context window bloat and API costs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-t border-surface-200/30 pt-10 mt-12">
                        <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Relevance</span>
                            <div className="text-2xl font-semibold text-brand-400">High Precision</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Memory Footprint</span>
                            <div className="text-2xl font-semibold text-white">~50MB</div>
                        </div>
                    </div>
                </div>
            </div>

         </div>
       </div>
    </section>
  );
};

export default Impact;