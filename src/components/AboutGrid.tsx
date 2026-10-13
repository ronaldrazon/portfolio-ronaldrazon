import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
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
    title: 'Project Management',
    marks: [N8N, ZAPIER, DOCKER],
  },
  {
    index: '02',
    title: 'e-Commerce Operations',
    marks: [CLAUDE, CODEX, GLM, QWEN, HERMES],
  },
  {
    index: '03',
    title: 'Digital Marketing',
    marks: [CLAUDE, CODEX, NAMECHEAP, CLOUDFLARE, GITHUB],
  },
  {
    index: '04',
    title: 'Workflow Automation',
    marks: [GWS, SLACK, FIREFLIES],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          Hi, I’m Ron.
        </h1>
        <p className="pgrid__lede">
          Operations & Marketing Operations specialist focused on scaling e-commerce systems and streamlining workflows.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            Optimizing operational efficiency and driving digital growth.
            <span> Connecting modern marketing strategy with seamless automated execution.</span>
          </p>

          <p className="agrid__note">
            Specializing in end-to-end e-commerce management, cross-functional project coordination, and automated workflows that eliminate friction and scale performance.
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

          {/* Bottom metadata grid - Text card for Klika & Location/Timezone */}
          <div className="agrid__bar">
            <a 
              className="agrid__cell agrid__cell--wide" 
              href="https://www.klika.com.au" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Klika Australia</span>
                <span className="agrid__cell-meta">Operations & Marketing Manager</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 (PHT)</span>
              </span>
            </span>
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