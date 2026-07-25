import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2, Sun, Moon, Sparkles, Volume2, Music, Tv, ShieldCheck, Flame, Zap, X, Check } from 'lucide-react';
import { CustomSettings, VoicePersona } from '../types';

interface CustomSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CustomSettings;
  onUpdateSettings: (newSettings: Partial<CustomSettings>) => void;
}

export const CustomSettingsModal: React.FC<CustomSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const voices: Array<{ id: VoicePersona; name: string; desc: string; persona: string }> = [
    { id: 'jordan', name: 'Jordan (London)', desc: 'Balanced Tech & Vibe Engineering Host', persona: 'Informative Anchor' },
    { id: 'starbury', name: 'Starbury Supreme®', desc: 'Heated Debater, Swift Decision Enforcer', persona: 'Aggressive & Action-Driven' },
    { id: 'brindalwalker', name: 'Brindalwalker (2AM™)', desc: 'Confusing & Debatable Quantum Theorist', persona: 'Utopia Lounge Exponential' },
    { id: 'blooddogg', name: 'Blooddogg', desc: 'Street Intelligence & Disguise Specialist', persona: 'Mobb Deep Squadron' },
    { id: 'paul', name: 'Paul', desc: 'Classic Studio Broadcasting Voice', persona: 'Traditional Radio' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-xl rounded-2xl overflow-hidden border shadow-2xl ${
            settings.themeMode === 'light'
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-zinc-950 border-zinc-800 text-white'
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                <Settings2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Customization Settings+</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  RADIO+ SWITCHMOD+ // PERSONALITY ENGINE // INFINITY STYLIZATION
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
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* LIGHT-DARK SWITCHMOD+ */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center justify-between">
                <span>Light-Dark SwitchMod+ Theme</span>
                <span className="text-[10px] text-orange-400 font-bold">SWITCHMOD+ ACTIVE</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'dark', name: 'Infinity Dark', icon: Moon, desc: 'Deep Space Studio' },
                  { id: 'light', name: 'Studio Daylight', icon: Sun, desc: 'Crisp Light Canvas' },
                  { id: 'infinity', name: 'Quantum Glow', icon: Sparkles, desc: 'Neon Cyber Radio' },
                ].map((tm) => {
                  const Icon = tm.icon;
                  const isSelected = settings.themeMode === tm.id;
                  return (
                    <button
                      key={tm.id}
                      onClick={() => onUpdateSettings({ themeMode: tm.id as any })}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold shadow-lg shadow-orange-500/10'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-zinc-500'}`} />
                        {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                      </div>
                      <div>
                        <p className="text-xs">{tm.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{tm.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Voice & Personality Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Custom Voice & Personality Engine
              </label>
              <div className="space-y-2">
                {voices.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onUpdateSettings({ selectedVoice: v.id })}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      settings.selectedVoice === v.id
                        ? 'bg-orange-500/15 border-orange-500 text-orange-300'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${settings.selectedVoice === v.id ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{v.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                            {v.persona}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400">{v.desc}</p>
                      </div>
                    </div>
                    {settings.selectedVoice === v.id && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Selected
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Debate Intensity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase">Debate Heat & Intensity Level</span>
                <span className="text-orange-400 font-bold">{settings.debateIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.debateIntensity}
                onChange={(e) => onUpdateSettings({ debateIntensity: Number(e.target.value) })}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <p className="text-[10px] text-zinc-500 font-mono">
                Higher intensity triggers Starbury Supreme® swift votes and heated arguments.
              </p>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-3 border-t border-zinc-800 pt-4">
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Radio+ Systems & Integrations
              </label>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Exponential Quantum Mode</p>
                    <p className="text-[10px] text-zinc-400">Deliberately confusing & debatable decision logic</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.exponentialQuantumMode}
                    onChange={(e) => onUpdateSettings({ exponentialQuantumMode: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Mobb Deep Squadron Daylight Feed</p>
                    <p className="text-[10px] text-zinc-400">Deepfaking past the top & infinity looping</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.mobbDeepSquadronActive}
                    onChange={(e) => onUpdateSettings({ mobbDeepSquadronActive: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Spotify® Auto Crossfade Sync</p>
                    <p className="text-[10px] text-zinc-400">Sync user Spotify account metadata to live stream</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.spotifyAutoSync}
                    onChange={(e) => onUpdateSettings({ spotifyAutoSync: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500">
              Utopia Radio+ Custom Settings v3.0
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-black transition-colors"
            >
              Save Settings
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
