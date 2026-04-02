import { Link } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer'
import StakeholderNav from '../../components/stakeholders/StakeholderNav'
import TranscriptUploadPanel from '../../components/transcript/TranscriptUploadPanel'

const navItems = [
  { to: '/student', label: 'Transcript', end: true },
  { to: '/student/getting-started', label: 'Getting started' },
  { to: '/student/faq', label: 'FAQ' },
]

const secondaryTools = [
  {
    to: '/student/quick-match',
    title: 'Quick match',
    desc: 'One course from the catalog vs. a target school (student tool).',
  },
  {
    to: '/student/catalog',
    title: 'Browse catalog',
    desc: 'Student-only catalog view — same data, different pages than staff.',
  },
]

export default function StudentHomePage() {
  return (
    <PageContainer wide breadcrumbs={[{ label: 'Student' }]} title={null} subtitle={null}>
      <div className="cc-hero px-8 py-12 sm:px-12 sm:py-14 mb-10 rounded-[var(--cc-radius-lg)] border border-[var(--cc-border)]">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--cc-accent)] mb-3">
          Main student workflow
        </p>
        <h1 className="cc-large-title font-display max-w-3xl">Transcript PDF · research agent pipeline</h1>
        <p className="mt-5 text-[19px] leading-relaxed text-[var(--cc-label-secondary)] max-w-3xl">
          This is the working flow: upload your PDF, then watch the pipeline stream parsing, web research on courses, and
          similarity matching. Requires a running API with <code className="font-mono text-[15px]">OPENAI_API_KEY</code>{' '}
          for the agent path. Results render below with course tables and match cards.
        </p>
        <div className="mt-10">
          <TranscriptUploadPanel variant="workspace" embeddedInHero showHowItWorksWhenIdle />
        </div>
      </div>

      <StakeholderNav items={navItems} />

      <section aria-labelledby="student-more-heading" className="mt-14">
        <h2 id="student-more-heading" className="cc-title-2 font-display mb-4">
          Other tools
        </h2>
        <p className="cc-footnote mb-5 max-w-xl">
          Quick match and catalog skip the full transcript agent — same API as everywhere else.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {secondaryTools.map(({ to, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="cc-card p-5 flex flex-col hover:shadow-[var(--cc-shadow-card-hover)] transition-shadow"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="cc-title-3 font-display">{title}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#34c759]">Live</span>
              </div>
              <p className="cc-footnote leading-relaxed flex-1">{desc}</p>
              <span className="mt-4 text-[15px] font-medium text-[var(--cc-accent)]">Open →</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 cc-card p-6 bg-[var(--cc-bg)] border-transparent max-w-3xl">
        <p className="cc-footnote leading-relaxed">
          Saved applications and coordinator messaging will appear here after Supabase. The block above stays the
          primary transcript + agent experience for students.
        </p>
      </div>
    </PageContainer>
  )
}
