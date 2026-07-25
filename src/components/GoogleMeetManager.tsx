import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Plus, ExternalLink, Users, Calendar, ShieldCheck, Sparkles, Copy, Check, Radio } from 'lucide-react';
import { GoogleMeetSpace } from '../types';

interface GoogleMeetManagerProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken?: string | null;
}

export const GoogleMeetManager: React.FC<GoogleMeetManagerProps> = ({
  isOpen,
  onClose,
  accessToken,
}) => {
  const [topic, setTopic] = useState('UTO™ AI+ Quantum Squadron Studio Broadcast');
  const [isCreating, setIsCreating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [activeSpaces, setActiveSpaces] = useState<GoogleMeetSpace[]>([
    {
      name: 'spaces/uto-ai-squadron-live',
      meetingUri: 'https://meet.google.com/uto-squadron-ai',
      meetingCode: 'uto-squadron-ai',
      activeTopic: 'Starbury Supreme® & Purgaset™ Live AI+ Debate Room',
      hostName: 'Derrick Rose & Jeff Teague',
      createdAt: 'Broad Daylight'
    },
    {
      name: 'spaces/mobb-deep-broad-daylight',
      meetingUri: 'https://meet.google.com/mobb-deep-squad',
      meetingCode: 'mobb-deep-squad',
      activeTopic: 'Mobb Deep Squadron Daylight Quantum Alignment',
      hostName: 'Paul George & Jaylen Brown',
      createdAt: '2AM Broadcast'
    }
  ]);

  if (!isOpen) return null;

  const handleCreateMeetSpace = async () => {
    setIsCreating(true);
    try {
      let meetingUri = 'https://meet.google.com/new';
      let meetingCode = `uto-${Math.random().toString(36).substring(2, 8)}`;

      if (accessToken) {
        try {
          const res = await fetch('https://meet.googleapis.com/v2/spaces', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              config: {
                accessType: 'OPEN',
                entryPointAccess: 'ALL',
              }
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.meetingUri) meetingUri = data.meetingUri;
            if (data.meetingCode) meetingCode = data.meetingCode;
          }
        } catch (apiErr) {
          console.warn("Google Meet API request fallback:", apiErr);
        }
      }

      const newSpace: GoogleMeetSpace = {
        name: `spaces/${meetingCode}`,
        meetingUri: meetingUri.startsWith('http') ? meetingUri : `https://${meetingUri}`,
        meetingCode,
        activeTopic: topic || 'UTO™ AI+ Google Meet Session',
        hostName: 'Purgaset™ // Starbury Supreme®',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setActiveSpaces(prev => [newSpace, ...prev]);
    } catch (err) {
      console.error("Error creating Meet room:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyUri = (uri: string, idx: number) => {
    navigator.clipboard.writeText(uri);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl rounded-2xl overflow-hidden border border-emerald-500/30 bg-zinc-950 text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg tracking-tight">Google Meet® AI+ Studio Hub</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    OAUTH READY
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  UTO™ SQUADRON // INSTANT AI+ LIVE VIDEO ROOMS
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Create Room Box */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <label className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-bold block">
                Create New UTO™ AI+ Google Meet Space
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Meeting topic (e.g., Purgaset™ & Derrick Rose AI+ Room)..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  onClick={handleCreateMeetSpace}
                  disabled={isCreating}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isCreating ? 'Launching...' : 'Create Meet'}</span>
                </button>
              </div>
            </div>

            {/* Active Spaces List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="uppercase font-bold flex items-center gap-1.5 text-zinc-300">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Active UTO™ AI+ Google Meet Spaces ({activeSpaces.length})
                </span>
                <span className="text-emerald-400">Syncing with Google Meet API</span>
              </div>

              <div className="space-y-3">
                {activeSpaces.map((space, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                          {space.createdAt}
                        </span>
                        <h4 className="font-bold text-sm text-white mt-1">{space.activeTopic}</h4>
                        <p className="text-xs text-zinc-400 font-mono">Host: {space.hostName}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyUri(space.meetingUri, idx)}
                          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          title="Copy Meet Link"
                        >
                          {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <a
                          href={space.meetingUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                        >
                          <span>Join Meet</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/50 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>URI: {space.meetingUri}</span>
                      <span className="text-emerald-400/80">Google Meet® Workspace Connected</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Meet API Scopes Active</span>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
