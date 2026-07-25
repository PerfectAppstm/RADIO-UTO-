import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tv, ExternalLink, Radio, Play, Pause, Volume2, Globe, Shield, Sparkles, Flame, Eye, MessageSquare, Zap } from 'lucide-react';

interface DopeTVHubProps {
  themeMode: 'dark' | 'light' | 'infinity';
}

export const DopeTVHub: React.FC<DopeTVHubProps> = ({ themeMode }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChannel, setActiveChannel] = useState<'dopetv' | 'utopia' | 'mobbdeep'>('dopetv');
  const [chatMessage, setChatMessage] = useState('');
  const [chatFeed, setChatFeed] = useState([
    { user: 'Starbury_Supreme', text: 'MOBB DEEP SQUADRON LIVE IN BROAD DAYLIGHT!', time: '14:22' },
    { user: 'Brindalwalker_2AM', text: 'Quantum debate shift incoming on DopeTV live channel.', time: '14:23' },
    { user: 'Utopia_Agent', text: '3 Guys voted out in swift decision. Keep it moving!', time: '14:24' },
  ]);

  const isLight = themeMode === 'light';

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatFeed(prev => [
      ...prev,
      { user: 'You (Squadron)', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-6 border border-purple-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Tv className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                DOPETV®ᐩ LIVE BROADCAST HUB
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30">
                2AM™ // Utopia Communities™
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              DopeTV® Stream & Utopia Portal
            </h2>
            <p className="text-xs md:text-sm text-purple-200/80 max-w-xl mt-1">
              Live visual stream, heated street debates, exponential quantum discussions, and Mobb Deep Squadron daylight transmissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://dopetvr.base44.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-purple-500 hover:bg-purple-400 text-black flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
            >
              <Globe className="w-4 h-4" />
              <span>dopetvr.base44.app</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.uto.ventures"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>uto.ventures</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Player + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Player View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-purple-500/30 shadow-2xl group">
            {/* Embedded Live Video Screen or Visualizer Canvas */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-purple-950/40 via-black to-zinc-950">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-purple-600/20 border-2 border-purple-500/50 flex items-center justify-center animate-pulse">
                  <Tv className="w-12 h-12 text-purple-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  LIVE
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                DopeTV®ᐩ Quantum Broadcast Stream
              </h3>
              <p className="text-xs text-purple-300/80 max-w-md">
                "Our Squadron is Mobb Deep" // Live debate feed with Starbury Supreme & Brindalwalker
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://dopetvr.base44.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Full DopeTV Stream</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Stream Overlay Controls */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div className="text-xs font-mono text-zinc-300">
                  <span className="text-purple-400 font-bold">CHANNEL 01</span> // HEATED DEBATE FEED
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>1,420 Viewers Syncing</span>
              </div>
            </div>
          </div>

          {/* Channel Selector */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'dopetv', name: 'DopeTV® Live Feed', host: 'dopetvr.base44.app', tag: 'HD STREAM' },
              { id: 'utopia', name: 'Utopia Communities', host: 'uto.ventures', tag: 'QUANTUM' },
              { id: 'mobbdeep', name: 'Mobb Deep Squadron', host: '2AM Broadcast', tag: 'HEATED' },
            ].map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeChannel === ch.id
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{ch.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    {ch.tag}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-purple-300/70">{ch.host}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Live Chat & Debate Feed */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 flex flex-col h-[420px]">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <h4 className="font-bold text-sm text-white">Live Squadron Chat</h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Broad Daylight</span>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-3 font-mono text-xs">
            {chatFeed.map((msg, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                <div className="flex items-center justify-between text-[10px] text-purple-400 font-bold mb-1">
                  <span>{msg.user}</span>
                  <span className="text-zinc-500 font-normal">{msg.time}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="pt-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Force typing & talking..."
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
