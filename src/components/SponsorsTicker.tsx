import React from 'react';
import { Sparkles, Shield, Zap, ExternalLink, Flame } from 'lucide-react';
import { Sponsor } from '../types';

export const SponsorsTicker: React.FC = () => {
  const sponsors: Sponsor[] = [
    { name: 'Purgaset™', tag: 'Pop & Rap Spotify® Artist', link: 'https://open.spotify.com/artist/7gQnWi8pbj4zMEUU3bUDwW?si=dee146339ae24f1f', category: 'Music' },
    { name: 'Perfect Apps™', tag: 'Mobile & AI+ Ecosystem', category: 'Sponsor' },
    { name: 'LinkedIn™', tag: 'Professional Network', category: 'Sponsor' },
    { name: 'Modern TV (TV+)', tag: 'Next-Gen Streaming', category: 'Media' },
    { name: 'GitHub®', tag: 'Developer Infrastructure', category: 'Infrastructure' },
    { name: 'Deathstep', tag: 'Heavy Quantum Bass', category: 'Music' },
    { name: 'Grimes', tag: 'AI+ Music Synthesizer', category: 'Music' },
    { name: 'AI+', tag: 'Omni-Sentient Intelligence', category: 'Infrastructure' },
    { name: 'Trump International™', tag: 'Global Luxury Estate', category: 'Sponsor' },
    { name: 'Chipotle®', tag: 'Fuel & Nutrition', category: 'Sponsor' },
    { name: 'Cheba Hut®', tag: 'Toasted Sub Sandwich', category: 'Sponsor' },
    { name: 'Jersey Mike\'s®', tag: 'A Sub Above', category: 'Sponsor' },
    { name: 'OG.COM™', tag: 'Original Network', category: 'Sponsor' },
    { name: 'STRIPE®', tag: 'Quantum Payments Engine', category: 'Infrastructure' },
    { name: 'DopeTV®ᐩ', tag: 'dopetvr.base44.app Stream', link: 'https://dopetvr.base44.app', category: 'Media' },
    { name: 'FOX® News', tag: 'Broad Daylight Broadcast', category: 'Media' },
    { name: 'IOT4™', tag: 'Smart Hardware Mesh', category: 'Infrastructure' },
    { name: '2AM™', tag: 'Night Owl Broadcast', category: 'Media' },
    { name: 'Spotify®', tag: 'Auto Crossfade Audio', category: 'Music' },
    { name: 'Comcast®', tag: 'High-Velocity Network', category: 'Infrastructure' },
  ];

  return (
    <div className="w-full bg-zinc-950/90 border-y border-zinc-800 py-2.5 px-4 overflow-hidden shadow-md">
      <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-orange-400 shrink-0">
          <Flame className="w-3.5 h-3.5 fill-orange-400" />
          <span>UTO™ AI+ SPONSORS & PARTNERS</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          {sponsors.map((s, i) => (
            <div key={i} className="flex items-center gap-2 group cursor-pointer shrink-0">
              {s.link ? (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                >
                  <span className="font-extrabold text-white group-hover:text-orange-400">{s.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-normal">
                    {s.tag}
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-orange-400" />
                </a>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-300">{s.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 font-normal">
                    {s.tag}
                  </span>
                </div>
              )}
              <span className="text-zinc-700 mx-1">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
