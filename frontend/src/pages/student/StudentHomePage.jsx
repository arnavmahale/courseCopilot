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
    to: '/catalog-match',
    title: 'Quick match',
    desc: 'One course from the catalog vs. a target school.',
  },
  {
    to: '/courses',
    title: 'Browse catalog',
    desc: 'Search everything in the loaded dataset.',
  },
]

export default function StudentHomePage() {
  return (
    <PageContainer
      title="Upload your transcript"
      subtitle="Start here to evaluate transfer credit. Your PDF is processed by the pipeline when the API is configured (OpenAI keys, etc.). Quick match and catalog are below if you only need a single-course check."
      breadcrumbs={[{ label: 'Student' }]}
    >
      <StakeholderNav items={navItems} />

      <div className="max-w-2xl mb-14">
        <TranscriptUploadPanel />
      </div>

      <section aria-labelledby="student-more-heading">
        <h2 id="student-more-heading" className="cc-title-2 font-display mb-4">
          Other tools
        </h2>
        <p className="cc-footnote mb-5 max-w-xl">
          Use these when you are not running a full transcript — they use the same live API as the workbench.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
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

      <div className="mt-10 cc-card p-6 bg-[var(--cc-bg)] border-transparent">
        <p className="cc-footnote leading-relaxed">
          Saved applications and coordinator messaging will appear here after you connect Supabase. The transcript flow
          above is the main student experience for now.
        </p>
      </div>
    </PageContainer>
  )
}
