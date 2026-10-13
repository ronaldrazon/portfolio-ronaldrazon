import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  firstName: string
  handle: string
  role: string
  avatarSrc: string
  verifiedLabel: string
  email: string
  location: string
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Ronald Razon',
  firstName: 'Ronald',
  handle: '@ronaldrazon',
  role: 'Operations & Marketing Manager',
  avatarSrc: '/avatar.png',
  verifiedLabel: 'Operations & Marketing Professional',
  email: 'work@ronaldrazon.com',
  location: 'Metro Manila, Philippines (GMT+8)',
  
  stats: [
    { value: 'Ops & Mktg', label: 'Specialty', Icon: Briefcase },
    { value: 'Strategy', label: 'Focus', Icon: SealCheck },
    { value: 'GMT+8', label: 'Timezone', Icon: Clock },
  ],
  
  displayName: { 
    line1: 'Bridging strategy', 
    line2: 'and execution.' 
  },
  
  hero: {
    body: 'Operations & Marketing Manager bridging the gap between strategic growth initiatives and efficient day-to-day execution. I build scalable processes and data-driven campaigns that drive results.',
    portraitSrc: '/avatar.png',
    portraitAlt: 'Ronald Razon',
  },
  
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronaldrazon/', iconPath: '/icons/linkedin.svg' },
    { label: 'GitHub', href: 'https://github.com/ronaldrazon', iconPath: '/icons/github-logo.svg' },
    { label: 'Email', href: 'mailto:work@ronaldrazon.com', iconPath: '/icons/discord.svg' },
  ],
}