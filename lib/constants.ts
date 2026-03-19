export const CHANNELS = [
  { id: 'home', label: 'Home', href: '/home' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'sponsors', label: 'Sponsors', href: '/sponsors' },
  { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard' },
] as const

export type ChannelId = (typeof CHANNELS)[number]['id']
