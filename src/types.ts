export type View = 'landing' | 'home' | 'map' | 'report' | 'audit' | 'crossing' | 'dashboard' | 'route' | 'login' | 'sos' | 'volunteer' | 'iot' | 'challenges' | 'voice' | 'impact';

export interface Issue {
  id: string;
  type: 'broken-footpath' | 'no-ramp' | 'no-tactile' | 'no-audio-signal';
  severity: 'low' | 'medium' | 'high';
  location: { lat: number; lng: number; address: string };
  description: string;
  status: 'pending' | 'resolved';
  timestamp: string;
  image?: string;
}

export interface AccessibilityMode {
  highContrast: boolean;
  largeText: boolean;
  voiceNav: boolean;
}
