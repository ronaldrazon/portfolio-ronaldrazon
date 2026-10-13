import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 */

const N8N = { src: '/icons/ai/n8n.svg', name: 'n8n' }
const ZAPIER = { src: '/icons/ai/zapier.svg', name: 'Zapier' }
const DOCKER = { src: '/icons/ai/docker.svg', name: 'Docker' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const CODEX = { src: '/icons/ai/codex.svg', name: 'Codex' }
const GLM = { src: '/icons/ai/zhipu.svg', name: 'GLM' }
const QWEN = { src: '/icons/ai/qwen.svg', name: 'Qwen' }
const HERMES = { src: '/icons/ai/hermes.svg', name: 'Hermes' }
const NAMECHEAP = { src: '/icons/ai/namecheap.svg', name: 'Namecheap' }
const CLOUDFLARE = { src: '/icons/ai/cloudflare.svg', name: 'Cloudflare' }
const GITHUB = { src: '/icons/ai/github.svg', name: 'GitHub' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const SLACK = { src: '/icons/ai/slack-color.svg', name: 'Slack' }
const FIREFLIES = { src: '/icons/ai/fireflies.png', name: 'Fireflies' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Workflow Automation & DevOps',
    marks: [N8N, ZAPIER, DOCKER],
  },
  {
    index: '02',
    title: 'AI Engineering & LLM Integration',
    marks: [CLAUDE, CODEX, GLM, QWEN, HERMES],
  },
  {
    index: '03',
    title: 'Full-Stack Web Development & Infrastructure',
    marks: [CLAUDE, CODEX, NAMECHEAP, CLOUDFLARE, GITHUB],
  },
  {
    index: '04',
    title: 'Operations & Business Productivity Tools',
    marks: [GWS, SLACK, FIREFLIES],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          Full-Stack Developer & AI Systems Engineer building scalable web applications.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I engineer fast, resilient web applications and intelligent automated systems.
            <span> Bridging modern UI development with AI-driven operations.</span>
          </p>

          <p className="agrid__note">
            <strong>Full-Stack Development</strong> &{' '}
            <a className="agrid__link" href="https://github.com/ronaldrazon" target="_blank" rel="noopener noreferrer">
              Automated Workflows
            </a>{' '}
            — Specializing in React, TypeScript, cloud deployments, and custom AI integrations that streamline business operations.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom metadata grid */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src={profile.avatarSrc} alt={profile.name} loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">React & TypeScript</span>
                <span className="agrid__cell-meta">Core Tech Stack</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">PHT (UTC+8)</span>
              </span>
            </span>

{/* Klika Affiliation Cell - ONLY ON ABOUT PAGE */}
            <a 
              className="agrid__cell agrid__cell--wide" 
              href="https://www.klika.com.au" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <img src="/ai/klika-logo.png" alt="Klika Australia" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Klika Australia</span>
                <span className="agrid__cell-meta">Operations & Marketing Manager</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.avatarSrc}
            alt={profile.name}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}