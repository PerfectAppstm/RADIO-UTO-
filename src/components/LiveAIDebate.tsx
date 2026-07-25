import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame, Zap, Bot, Send, Mic, MicOff, Volume2, Sparkles, CheckCircle2,
  XCircle, ArrowRight, ShieldAlert, AlertTriangle, RefreshCw, Layers
} from 'lucide-react';
import { DebateMessage, SwiftVoteDecision, VoicePersona, CustomSettings } from '../types';

interface LiveAIDebateProps {
  settings: CustomSettings;
  onUpdateSettings: (newSettings: Partial<CustomSettings>) => void;
  themeMode: 'dark' | 'light' | 'infinity';
}

export const LiveAIDebate: React.FC<LiveAIDebateProps> = ({ settings, onUpdateSettings, themeMode }) => {
  const [messages, setMessages] = useState<DebateMessage[]>([
    {
      id: '1',
      speaker: 'Jordan (London Studio)',
      persona: 'jordan',
      text: 'Good evening. We are live on UTO™ QM™ Radio+. Today we are debating the exponential speed of agentic engineering and quantum decision locks. Starbury, what is your take on being stuck?',
      timestamp: '14:20'
    },
    {
      id: '2',
      speaker: 'Starbury Supreme®',
      persona: 'starbury',
      text: 'Look! People are way too paralyzed! Overthinking 3 options for 6 months. Kill 3 guys in 1 swift vote! Pick a direction, ship it in broad daylight, and get moving!',
      timestamp: '14:21'
    },
    {
      id: '3',
      speaker: 'Brindalwalker (2AM™)',
      persona: 'brindalwalker',
      text: 'Exponential loops mean standing still is actual decay. The Mob Deep squadron enforces rapid execution. Do not hesitate.',
      timestamp: '14:21'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [dilemmaInput, setDilemmaInput] = useState('');
  const [guy1Name, setGuy1Name] = useState('Option A: Endless Refactoring');
  const [guy2Name, setGuy2Name] = useState('Option B: Wait for Approval');
  const [guy3Name, setGuy3Name] = useState('Option C: Ship Vibe Prototype Now');
  const [activeDecision, setActiveDecision] = useState<SwiftVoteDecision | null>(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLight = themeMode === 'light';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string, persona: VoicePersona) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (persona === 'starbury') {
      utterance.rate = 1.2;
      utterance.pitch = 1.1;
    } else if (persona === 'brindalwalker') {
      utterance.rate = 1.05;
      utterance.pitch = 0.9;
    } else if (persona === 'blooddogg') {
      utterance.rate = 1.15;
      utterance.pitch = 0.8;
    } else {
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
    }

    if (voices.length > 0) {
      const selected = voices.find(v => v.lang.startsWith('en'));
      if (selected) utterance.voice = selected;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isAiResponding) return;

    const userMsg: DebateMessage = {
      id: Date.now().toString(),
      speaker: 'You (Squadron Member)',
      persona: 'jordan',
      text: inputPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };

    setMessages(prev => [...prev, userMsg]);
    const prompt = inputPrompt;
    setInputPrompt('');
    setIsAiResponding(true);

    try {
      const res = await fetch('/api/live-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, persona: settings.selectedVoice, debateIntensity: settings.debateIntensity })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: DebateMessage = {
          id: (Date.now() + 1).toString(),
          speaker: data.speaker || 'Starbury Supreme®',
          persona: data.persona || 'starbury',
          text: data.reply || 'Decision enforced! Stop hesitating and deploy!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
        speakText(aiMsg.text, aiMsg.persona);
      } else {
        // Fallback response generator if server API is unavailable
        const fallbackMsg: DebateMessage = {
          id: (Date.now() + 1).toString(),
          speaker: 'Starbury Supreme®',
          persona: 'starbury',
          text: `HEATED DEBATE ENFORCED: "${prompt}" - Stop analyzing and kill the noise! Decision is MADE. Execute now in broad daylight!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, fallbackMsg]);
        speakText(fallbackMsg.text, fallbackMsg.persona);
      }
    } catch (err) {
      console.error("Debate call error:", err);
      const fallbackMsg: DebateMessage = {
        id: (Date.now() + 1).toString(),
        speaker: 'Brindalwalker (2AM™)',
        persona: 'brindalwalker',
        text: `Quantum response triggered on "${prompt}". Our squadron moves deep—no delay allowed!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text, fallbackMsg.persona);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleSwiftVote = () => {
    if (!dilemmaInput.trim()) return;

    const newDecision: SwiftVoteDecision = {
      id: Date.now().toString(),
      dilemma: dilemmaInput,
      votes: {
        guy1: {
          name: guy1Name,
          decision: 'ELIMINATED',
          argument: 'Causes paralysis and kills velocity. Voted out immediately!'
        },
        guy2: {
          name: guy2Name,
          decision: 'ELIMINATED',
          argument: 'Waiting creates friction and loses momentum in broad daylight.'
        },
        guy3: {
          name: guy3Name,
          decision: 'APPROVED',
          argument: 'Gets people moving! Enforces action and ships results NOW!'
        }
      },
      finalDecision: guy3Name,
      actionInstruction: `EXECUTE IMMEDIATELY: Stop standing still. Put 100% effort into "${guy3Name}" right now!`,
      timestamp: new Date().toLocaleTimeString()
    };

    setActiveDecision(newDecision);

    const announcement: DebateMessage = {
      id: Date.now().toString(),
      speaker: 'Starbury Supreme® (Swift Vote Enforcer)',
      persona: 'starbury',
      text: `SWIFT VOTE RESULT FOR "${dilemmaInput}": Option 1 & 2 ELIMINATED! Final decision locked: "${guy3Name}". Get moving!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, announcement]);
    speakText(announcement.text, 'starbury');
  };

  return (
    <div className="space-y-6">
      {/* Voice & Persona Control Bar */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-950 border-zinc-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
              Live AI+ Heated Debate Console
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Starbury Supreme®
              </span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              FORCE'S TYPING & TALKING // EXPONENTIAL QUANTUM DEBATE
            </p>
          </div>
        </div>

        {/* Personas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'jordan', name: 'Jordan', tag: 'London Lead' },
            { id: 'starbury', name: 'Starbury', tag: 'Supreme®' },
            { id: 'purgaset', name: 'Purgaset™', tag: 'Spotify® Artist' },
            { id: 'drose', name: 'Derrick Rose', tag: 'NBA® MVP' },
            { id: 'teague', name: 'Jeff Teague', tag: 'NBA® Champ' },
            { id: 'paulgeorge', name: 'Paul George', tag: 'NBA®' },
            { id: 'jaylenbrown', name: 'Jaylen Brown', tag: 'Celtics®' },
            { id: 'matas', name: 'Matas', tag: 'Bulls®' },
            { id: 'yukikawamura', name: 'Yuki Kawamura', tag: 'Pacers®' },
            { id: 'gerardcarthy', name: 'Gerard Carthy', tag: 'CEO Militia' },
            { id: 'austinholmes', name: 'Austin Holmes', tag: 'CEO iBank™' },
            { id: 'knockerzz', name: 'Speaker Knockerzz', tag: 'Skorcher' },
            { id: 'daphnerosen', name: 'Daphne Rosen', tag: 'AVN® Retro' },
            { id: 'vintcerf', name: 'Vint Cerf', tag: 'IOT Inventor' },
            { id: 'jesus', name: 'Jesus Christ', tag: 'Himself' },
            { id: 'trump', name: 'Donald Trump', tag: 'Trump Int®' },
            { id: 'realbros', name: 'Real Bros', tag: 'Simi Valley' },
            { id: 'fullsend', name: 'Full Send®', tag: 'Kyle & Steve' },
            { id: 'faze', name: 'FaZe Clan®', tag: 'Of Age' },
            { id: 'charlie', name: 'Charlie', tag: 'Always Sunny' },
            { id: 'kattwilliams', name: 'Katt Williams', tag: 'Standup' },
            { id: 'chappelle', name: 'Dave Chappelle', tag: 'GOAT' },
            { id: 'macmiller', name: 'Mac Miller', tag: 'Swimming' },
            { id: 'lilpeep', name: 'Lil Peep', tag: 'Hellboy' },
            { id: 'elonmusk', name: 'Elon Musk', tag: 'X & Tesla' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => onUpdateSettings({ selectedVoice: p.id as VoicePersona })}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all shrink-0 ${
                settings.selectedVoice === p.id
                  ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/20'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <span>{p.name}</span>
              <span className="text-[9px] opacity-80">({p.tag})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Debate Terminal & Chat */}
        <div className="lg:col-span-2 rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col h-[520px] shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <span>LIVE TRANSMISSION FEED</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.speechSynthesis && window.speechSynthesis.cancel()}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" />
                <span>Mute Synth</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 font-mono text-xs">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-xl border ${
                  m.isUser
                    ? 'bg-blue-950/40 border-blue-800/50 text-blue-100 ml-8'
                    : 'bg-zinc-900/90 border-zinc-800 text-zinc-200 mr-4'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className={`font-bold ${m.isUser ? 'text-blue-400' : 'text-orange-400'}`}>
                    {m.speaker}
                  </span>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span>{m.timestamp}</span>
                    {!m.isUser && (
                      <button
                        onClick={() => speakText(m.text, m.persona)}
                        className="hover:text-orange-400 transition-colors"
                        title="Play Voice"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="leading-relaxed text-xs">{m.text}</p>
              </motion.div>
            ))}
            {isAiResponding && (
              <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-800/40 text-orange-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin text-orange-400" />
                <span>Starbury Supreme® is analyzing decision arguments...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Type your argument or challenge the AI debate hosts..."
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={isAiResponding}
              className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Talk Back</span>
            </button>
          </form>
        </div>

        {/* Swift Vote & Decision Enforcer Module */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between space-y-4 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">
                Swift Vote & Decision Enforcer
              </h4>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
              "Killing 3 guys in 1 swift vote" — Force immediate decisions to stop paralysis and get people moving!
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Dilemma or Decision Topic</label>
                <input
                  type="text"
                  value={dilemmaInput}
                  onChange={(e) => setDilemmaInput(e.target.value)}
                  placeholder="e.g. Which feature should we ship today?"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Guy / Option 1</label>
                <input
                  type="text"
                  value={guy1Name}
                  onChange={(e) => setGuy1Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Guy / Option 2</label>
                <input
                  type="text"
                  value={guy2Name}
                  onChange={(e) => setGuy2Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Guy / Option 3 (Winning Move)</label>
                <input
                  type="text"
                  value={guy3Name}
                  onChange={(e) => setGuy3Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSwiftVote}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Kill Hesitation // Swift Vote</span>
          </button>

          {activeDecision && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>DECISION ENFORCED</span>
              </div>
              <p className="text-zinc-200 text-[11px] leading-tight">
                {activeDecision.actionInstruction}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
