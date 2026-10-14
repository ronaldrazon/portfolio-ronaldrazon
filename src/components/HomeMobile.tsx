import { Link } from 'react-router-dom'
import { SealCheck, CaretRight, Play, Stack, Coffee } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'
import { PHT } from './PHT'

/**
 * Home on a phone layout.
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">
          {profile.handle} · {profile.role}
        </span>
        <div className="mt-1">
          <PHT />
        </div>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Projects', to: '/projects', title: 'Featured Work', desc: 'Case studies & operations projects.', img: '/placeholders/project-1.jpg' },
  { n: '02', label: 'Services', to: '/services', title: 'Services & Operations', desc: 'E-commerce, marketing & workflow automation.', Icon: Stack },
  { n: '03', label: 'Showcase', to: '/showcase', title: 'Highlight Showcase', desc: 'Core operational achievements.', Icon: Coffee, accent: true },
  { n: '04', label: 'Testimonials', to: '/testimonials', title: 'Recommendations', desc: 'Feedback from teams & clients.', img: '/placeholders/testimonial-1.jpg' },
  { n: '05', label: 'About', to: '/about', title: `Hi, I'm Ron.`, desc: 'Marketing & Operations Manager.', img: profile.avatarSrc },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className={`htile${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              {'img' in t ? (
                <span className="htile__media"><img className="htile__img" src={t.img} alt="" loading="lazy" /></span>
              ) : (
                <span className="htile__media htile__glyph"><t.Icon size={52} weight="duotone" aria-hidden="true" /></span>
              )}
              <span className="htile__body">
                <span className="htile__n">{t.n} {t.label}</span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hsec">
        <h2 className="hsec__title">
          <Link to="/testimonials" className="hsec__link">
            What clients say
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </h2>
      </div>
      <Link to="/testimonials" className="hproof" aria-label="Client testimonial.">
        <span className="hproof__stage">
          <img src="/placeholders/testimonial-1.jpg" alt="" loading="lazy" />
          <span className="hproof__play" aria-hidden="true"><Play size={20} weight="fill" /></span>
          <span className="hproof__dur" aria-hidden="true">0:00</span>
        </span>
        <span className="hproof__copy">
          <span className="hproof__title">Delivering operational excellence and growth across digital channels.</span>
          <span className="hproof__meta">Marketing & Operations Manager</span>
        </span>
      </Link>

      {/* --- COPYRIGHT STRIP FOR MOBILE --- */}
      <footer className="mt-8 mb-6 text-center text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </footer>
    </>
  )
}