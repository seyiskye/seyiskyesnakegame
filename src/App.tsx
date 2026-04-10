import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Github, Music, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      {/* Background Grid & Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-cyan rounded-lg flex items-center justify-center shadow-lg shadow-neon-cyan/20">
              <Zap className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none neon-text-cyan">Neon Snake</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Arcade & Beats v1.0</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-neon-cyan transition-colors font-mono">Leaderboard</a>
            <a href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-neon-cyan transition-colors font-mono">Skins</a>
            <a href="#" className="text-xs uppercase tracking-widest text-white/60 hover:text-neon-cyan transition-colors font-mono">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-mono text-neon-green uppercase">Server Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sidebar - Info/Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-8"
        >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-neon-cyan">
              <Gamepad2 className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-tight">Game Stats</h2>
            </div>
            
            <div className="flex justify-center py-2">
              <span className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] tracking-tight">seyiskye</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs text-white/40 font-mono uppercase">Total Games</span>
                <span className="text-lg font-mono">128</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-white/40 font-mono uppercase">Avg Score</span>
                <span className="text-lg font-mono">450</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-neon-pink">
              <Music className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-tight">Playlist</h2>
            </div>
            <div className="space-y-2">
              {['Neon Dreams', 'Cyber City', 'Midnight Drive'].map((track, i) => (
                <div key={track} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <span className="text-[10px] font-mono text-white/20">0{i+1}</span>
                  <span className="text-sm text-white/80 group-hover:text-neon-pink transition-colors">{track}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Game */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right Sidebar - Music Player */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 flex flex-col gap-8"
        >
          <MusicPlayer />
          
          <div className="p-6 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-24 h-24" />
            </div>
            <h3 className="text-lg font-bold mb-2">Pro Arcade</h3>
            <p className="text-xs text-white/60 mb-4">Unlock exclusive neon skins and high-fidelity tracks.</p>
            <button className="w-full py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-neon-cyan transition-colors">
              Upgrade Now
            </button>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-mono uppercase tracking-widest">
            &copy; 2026 Neon Arcade. Built with React & Tailwind.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">System Status: Optimal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
