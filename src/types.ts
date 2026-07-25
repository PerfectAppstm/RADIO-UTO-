export interface RawTranscriptLine {
  timecode: string; // "MM:SS"
  speaker: string;
  text: string;
}

export interface RawRadioShow {
  show_title: string;
  show_duration: string; // "MM:SS"
  two_sentence_summary: string;
  date_of_generation: string;
  timecoded_transcript: RawTranscriptLine[];
  coverImage?: string; // Added for UI
  audioUrl?: string;   // Added for playback
  notesUrl?: string;   // Added for downloading show notes
}

export interface TranscriptLine {
  start: number;
  end: number;
  text: string;
  speaker: string;
}

export interface RadioShow {
  title: string;
  duration: number;
  summary: string;
  date: string;
  host: string;
  coverImage: string;
  audioUrl: string;
  notesUrl?: string;
  transcript: TranscriptLine[];
  shareId?: string;
  shareUrl?: string;
  isUserGenerated?: boolean;
}

export interface SpotifyProfile {
  isConnected: boolean;
  displayName: string;
  email: string;
  product: string;
  profilePic?: string;
  currentTrack?: {
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    isPlaying: boolean;
  };
}

export type VoicePersona =
  | 'jordan'
  | 'starbury'
  | 'brindalwalker'
  | 'blooddogg'
  | 'paul'
  | 'purgaset'
  | 'drose'
  | 'teague'
  | 'paulgeorge'
  | 'jaylenbrown'
  | 'matas'
  | 'yukikawamura'
  | 'gerardcarthy'
  | 'austinholmes'
  | 'knockerzz'
  | 'daphnerosen'
  | 'vintcerf'
  | 'jesus'
  | 'trump'
  | 'realbros'
  | 'fullsend'
  | 'faze'
  | 'kattwilliams'
  | 'chappelle'
  | 'macmiller'
  | 'lilpeep'
  | 'elonmusk'
  | string;

export interface GoogleMeetSpace {
  name: string;
  meetingUri: string;
  meetingCode?: string;
  activeTopic?: string;
  hostName?: string;
  createdAt: string;
}

export interface Sponsor {
  name: string;
  tag: string;
  link?: string;
  category: 'Sponsor' | 'Media' | 'Infrastructure' | 'Music';
}

export interface VoiceProfile {
  id: VoicePersona;
  name: string;
  title: string;
  tagline: string;
  pitch: number; // 0.5 to 1.5
  speed: number; // 0.8 to 1.5
  style: string;
  avatar: string;
}

export interface CustomSettings {
  themeMode: 'dark' | 'light' | 'infinity';
  debateIntensity: number; // 1 - 100
  exponentialQuantumMode: boolean;
  mobbDeepSquadronActive: boolean;
  selectedVoice: VoicePersona;
  spotifyAutoSync: boolean;
  dopeTvLiveFeed: boolean;
}

export interface DebateMessage {
  id: string;
  speaker: string;
  persona: VoicePersona;
  text: string;
  timestamp: string;
  isUser?: boolean;
  voteScore?: number;
}

export interface SwiftVoteDecision {
  id: string;
  dilemma: string;
  votes: {
    guy1: { name: string; decision: 'ELIMINATED' | 'APPROVED'; argument: string };
    guy2: { name: string; decision: 'ELIMINATED' | 'APPROVED'; argument: string };
    guy3: { name: string; decision: 'ELIMINATED' | 'APPROVED'; argument: string };
  };
  finalDecision: string;
  actionInstruction: string;
  timestamp: string;
}

