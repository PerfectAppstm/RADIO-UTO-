import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Radio, CheckCircle, LogOut, ExternalLink, RefreshCw, X, Play, Pause, Volume2, ShieldCheck } from 'lucide-react';
import { SpotifyProfile } from '../types';

interface SpotifyConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  spotifyProfile: SpotifyProfile;
  onConnect: () => void;
  onDisconnect: () => void;
  themeMode: 'dark' | 'light' | 'infinity';
}

export const SpotifyConnectModal: React.FC<SpotifyConnectModalProps> = ({
  isOpen,
  onClose,
  spotifyProfile,
  onConnect,
  onDisconnect,
  themeMode,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('Utopia Quantum Beats');
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const isLight = themeMode === 'light';

  const playlists = [
    { title: 'Utopia Quantum Beats', tracks: 42, duration: '2h 15m' },
    { title: 'Mobb Deep Squadron Heat', tracks: 28, duration: '1h 45m' },
    { title: 'Starbury Supreme Debates', tracks: 19, duration: '58m' },
    { title: '2AM Exponential Chill', tracks: 35, duration: '2h 02m' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-lg rounded-2xl overflow-hidden border shadow-2xl ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-zinc-950 border-zinc-800 text-white'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 to-teal-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Music className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight flex items-center gap-2">
                  Spotify® Radio+ Sync
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Official
                  </span>
                </h3>
                <p className="text-xs text-emerald-400/80 font-mono">
                  CONNECT USER+ SPOTIFY® ACCOUNT // LIVE AUDIO CROSSFADE
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {!spotifyProfile.isConnected ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <Music className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Link Your Spotify® Premium</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
                    Stream high-fidelity Spotify background music synced directly under live AI+ debate commentary and Quantum Radio broadcasts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-left text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>OAuth Connection Features:</span>
                  </div>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1 pl-1">
                    <li>Crossfade custom Spotify playlists into live radio breaks</li>
                    <li>Auto-sync Now Playing metadata to live broadcast ticker</li>
                    <li>Supports Spotify Web Playback & Account authorization</li>
                  </ul>
                </div>

                <button
                  onClick={onConnect}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                >
                  <Music className="w-5 h-5" />
                  <span>Connect Spotify® Account</span>
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* User Status Card */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-300 border border-emerald-400/40">
                      {spotifyProfile.displayName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{spotifyProfile.displayName}</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-xs font-mono text-emerald-400/80">{spotifyProfile.email}</p>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                        {spotifyProfile.product} Active
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onDisconnect}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs flex items-center gap-1 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                </div>

                {/* Now Playing Bar */}
                {spotifyProfile.currentTrack && (
                  <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 flex items-center gap-3">
                    <img
                      src={spotifyProfile.currentTrack.albumArt}
                      alt="Album Art"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                        Live Spotify® Stream
                      </p>
                      <p className="font-medium text-sm truncate">{spotifyProfile.currentTrack.title}</p>
                      <p className="text-xs text-zinc-400 truncate">{spotifyProfile.currentTrack.artist}</p>
                    </div>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2.5 rounded-full bg-emerald-500 text-black hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                  </div>
                )}

                {/* Playlists */}
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Available Synced Playlists
                  </h5>
                  <div className="space-y-2">
                    {playlists.map((pl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedPlaylist(pl.title)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          selectedPlaylist === pl.title
                            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Music className="w-4 h-4 text-emerald-400" />
                          <div>
                            <p className="text-xs font-medium">{pl.title}</p>
                            <p className="text-[10px] text-zinc-400">
                              {pl.tracks} tracks • {pl.duration}
                            </p>
                          </div>
                        </div>
                        {selectedPlaylist === pl.title && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Active Sync
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400">
              Utopia Radio+ Spotify Web SDK API v2.8
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
