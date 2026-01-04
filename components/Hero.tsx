import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Terminal, Server, Zap } from 'lucide-react';

interface HeroProps {
  onNavigate?: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [version, setVersion] = useState<string>('v0.2.2');
  const installCommand = "npm i -g docdex";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Fetch latest version from NPM
    fetch('https://registry.npmjs.org/docdex/latest')
      .then(res => res.json())
      .then(data => {
        if (data.version) {
          setVersion(`v${data.version}`);
        }
      })
      .catch(err => console.error('Failed to fetch version:', err));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    if (!canvas || !container || !title) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    const GRID_SIZE = 60;
    const SPEED = 0.25; // Slower speed (approx x2 slower than previous 0.5)
    const MAX_PARTICLES = 7; // Reduced number of particles (approx 1/3 of previous 20)
    
    // Cycle spawn sides for even distribution
    let nextSpawnSide = 0; 
    
    // Target position relative to canvas
    let targetX = 0;
    let targetY = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      history: {x: number, y: number}[];
      maxHistory: number;
      size: number;
    }

    const resize = () => {
      if (container && canvas) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Update target position
        if (title) {
            const titleRect = title.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            targetX = titleRect.left - containerRect.left + titleRect.width / 2;
            targetY = titleRect.top - containerRect.top + titleRect.height / 2;
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const spawnParticle = () => {
      const side = nextSpawnSide;
      nextSpawnSide = (nextSpawnSide + 1) % 4; // Round robin distribution for even edges

      let x = 0, y = 0;
      let vx = 0, vy = 0;
      
      // Snap to grid lines exactly
      switch(side) {
        case 0: // Top
          y = 0;
          x = Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE;
          vy = SPEED;
          break;
        case 1: // Right
          x = Math.floor(canvas.width / GRID_SIZE) * GRID_SIZE;
          if (x > canvas.width) x -= GRID_SIZE;
          y = Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE;
          vx = -SPEED;
          break;
        case 2: // Bottom
          y = Math.floor(canvas.height / GRID_SIZE) * GRID_SIZE;
          if (y > canvas.height) y -= GRID_SIZE;
          x = Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE;
          vy = -SPEED;
          break;
        case 3: // Left
          x = 0;
          y = Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE;
          vx = SPEED;
          break;
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        history: [],
        maxHistory: 40 + Math.random() * 40, // Longer history for comet trail effect
        size: 1.5 + Math.random()
      });
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Snap to nearest grid intersection
      const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
      const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;

      // Create new particle at click location
      // Initial velocity is 0, the update loop will handle direction logic immediately
      particles.push({
        x: snappedX,
        y: snappedY,
        vx: 0,
        vy: 0,
        history: [],
        maxHistory: 40 + Math.random() * 40,
        size: 1.5 + Math.random()
      });
    };

    container.addEventListener('click', handleCanvasClick);

    const update = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn to keep population up (only if below max)
      // Manual clicks can exceed MAX_PARTICLES temporarily
      if (particles.length < MAX_PARTICLES && Math.random() < 0.02) {
        spawnParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // History
        p.history.push({x: p.x, y: p.y});
        if (p.history.length > p.maxHistory) {
          p.history.shift();
        }

        // Grid navigation logic
        // We check if we are at a grid intersection.
        const EPSILON = 0.1;
        const remainderX = Math.abs(p.x % GRID_SIZE);
        const remainderY = Math.abs(p.y % GRID_SIZE);
        const atIntersection = remainderX < EPSILON && remainderY < EPSILON;

        if (atIntersection) {
            // Snap to exact grid coordinate to prevent drift
            p.x = Math.round(p.x / GRID_SIZE) * GRID_SIZE;
            p.y = Math.round(p.y / GRID_SIZE) * GRID_SIZE;

            const dx = targetX - p.x;
            const dy = targetY - p.y;
            
            // Determine possible directions to reduce distance to target
            // Only strictly vertical or horizontal moves allowed (Manhattan)
            const candidates: {vx: number, vy: number}[] = [];
            
            // Can move X?
            if (Math.abs(dx) > 1) {
                candidates.push({ vx: Math.sign(dx) * SPEED, vy: 0 });
            }
            // Can move Y?
            if (Math.abs(dy) > 1) {
                candidates.push({ vx: 0, vy: Math.sign(dy) * SPEED });
            }

            if (candidates.length > 0) {
                // If both are options, randomly pick one to create diverse paths
                const pick = candidates[Math.floor(Math.random() * candidates.length)];
                p.vx = pick.vx;
                p.vy = pick.vy;
            }
        }

        // Dissolve logic based on distance to target
        const distToTarget = Math.hypot(targetX - p.x, targetY - p.y);
        const fadeStart = 150; // Start fading 150px away
        const fadeEnd = 10;    // Fully gone 10px away
        
        let opacity = 1;
        if (distToTarget < fadeEnd) {
            opacity = 0;
        } else if (distToTarget < fadeStart) {
            opacity = (distToTarget - fadeEnd) / (fadeStart - fadeEnd);
        }

        // Kill if fully faded or out of bounds (cleanup)
        if (opacity <= 0 || p.x < -20 || p.x > canvas.width + 20 || p.y < -20 || p.y > canvas.height + 20) {
            particles.splice(i, 1);
            continue;
        }

        // Draw Comet Trail (Segmented Gradient)
        if (p.history.length > 1) {
            ctx.lineWidth = 1;
            for (let j = 0; j < p.history.length - 1; j++) {
                const point = p.history[j];
                const nextPoint = p.history[j+1];
                
                // Opacity increases from tail (j=0) to head (j=length)
                const progress = j / (p.history.length - 1);
                const segmentAlpha = opacity * progress * 0.4; // Max trail opacity 0.4
                
                // Skip very faint segments for performance
                if (segmentAlpha < 0.01) continue;

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.strokeStyle = `rgba(250, 204, 21, ${segmentAlpha})`;
                ctx.stroke();
            }
        }

        // Draw Head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${opacity})`;
        ctx.fill();
        
        // Glow
        if (opacity > 0.2) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(250, 204, 21, ${opacity * 0.8})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-grid-pattern selection:bg-brand-400/30">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      {/* Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-brand-200/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
      {/* New Right Light for Glass Effect */}
      <div className="absolute top-1/4 right-[-100px] w-[600px] h-[600px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:gap-12">
          
          {/* Left Column: Text */}
          <div className="lg:w-2/3 flex flex-col justify-center text-center lg:text-left pt-8 lg:pt-0">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100/80 border border-surface-200/60 mb-8 backdrop-blur-md shadow-lg mx-auto lg:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-gray-300 tracking-wide">{version} Now Available</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-semibold tracking-tighter text-white mb-8 text-balance leading-[0.95]">
                <span ref={titleRef} className="text-brand-400 inline-block">Docdex</span>: local code intelligence<br />
                <span className="text-gray-500">and memory for humans and AI.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Open source and free. Docdex builds a private index of your docs and code, adds AST and impact analysis, and powers MCP + HTTP for any agent. Install once and it auto-configures clients, models, and watchers so it just works.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <div className="relative group cursor-pointer" onClick={handleCopy}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-surface-200 to-surface-100 rounded-full opacity-50 blur transition-all duration-500 group-hover:opacity-75 group-hover:blur-xl"></div>
                  <div className="relative flex items-center bg-surface-50/90 backdrop-blur-md rounded-full p-2 pr-10 border border-surface-200/60 shadow-2xl transition-transform duration-200 active:scale-[0.99] group-hover:border-surface-300">
                    <div className="w-20 h-20 rounded-full bg-surface-200 flex items-center justify-center mr-6 border border-surface-300 shadow-inner shrink-0">
                      <span className="font-mono text-3xl text-brand-400 select-none">$</span>
                    </div>
                    <input 
                      type="text" 
                      readOnly 
                      value={installCommand} 
                      className="bg-transparent text-gray-200 font-mono text-2xl sm:text-3xl focus:outline-none w-64 sm:w-80 pointer-events-none tracking-tight select-none"
                    />
                    <div className="ml-4 text-gray-400 group-hover:text-white transition-colors shrink-0">
                      {copied ? <Check className="w-8 h-8 text-green-500" /> : <Copy className="w-8 h-8" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => onNavigate?.('/documentation')}
                  className="px-6 py-3 rounded-full bg-brand-400 text-black font-semibold shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:bg-brand-500 transition-colors"
                >
                  Read documentation
                </button>
                <a
                  href="https://github.com/bekirdag/docdex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-surface-200 text-white font-medium hover:bg-surface-100 transition-colors"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="lg:w-1/3 w-full flex flex-col justify-center space-y-4 mt-16 lg:mt-0 lg:pl-8 relative z-10">
             {/* Card 1 */}
             <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.06] transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Install and forget</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-16 relative z-10">Docdex detects MCP clients, configures them automatically, and keeps a shared daemon running for all repos.</p>
             </div>
             
             {/* Card 2 */}
             <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.06] transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                    <Server className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Memory + web search</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-16 relative z-10">Repo memory and agent memory keep context stable. Optional web search is refined by local LLMs via Ollama.</p>
             </div>

             {/* Card 3 */}
             <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.06] transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Secure by default</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-16 relative z-10">TLS, auth tokens, allowlists, and rate limits protect the daemon while your data stays on-device.</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
