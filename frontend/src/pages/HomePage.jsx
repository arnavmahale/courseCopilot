import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import { useAuth } from '../auth/AuthContext'
import { ROLE_META } from '../auth/roles'

const iconDashboard = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"
    />
  </svg>
)

const iconCatalog = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const iconQuick = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const iconSyllabus = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const iconBatch = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
)

const iconTranscript = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

function toolsForRole(role) {
  if (role === 'professor') {
    return [
      {
        to: '/professor/catalog',
        title: 'Catalog (faculty)',
        desc: 'Faculty-only catalog URLs — not the student or university catalog routes.',
        icon: iconCatalog,
      },
      {
        to: '/professor/quick-match',
        title: 'Quick match (faculty)',
        desc: 'Same matcher as staff tools, separate from student quick match.',
        icon: iconQuick,
      },
      {
        to: '/match',
        title: 'Custom syllabus',
        desc: 'Enter details manually for a one-off match.',
        icon: iconSyllabus,
      },
    ]
  }

  return [
    {
      to: '/dashboard',
      title: 'Dashboard',
      desc: 'Overview of your dataset and how courses are distributed.',
      icon: iconDashboard,
    },
    {
      to: '/courses',
      title: 'Catalog (university)',
      desc: 'Evaluator catalog — students use /student/catalog instead.',
      icon: iconCatalog,
    },
    {
      to: '/catalog-match',
      title: 'Quick match (university)',
      desc: 'Staff quick match — students use /student/quick-match.',
      icon: iconQuick,
    },
    {
      to: '/match',
      title: 'Custom syllabus',
      desc: 'Enter details manually for a one-off match.',
      icon: iconSyllabus,
    },
    {
      to: '/batch',
      title: 'Batch',
      desc: 'Evaluate many source courses in one run.',
      icon: iconBatch,
    },
    {
      to: '/transcript',
      title: 'Transcript',
      desc: 'Standalone transcript page; students normally use /student.',
      icon: iconTranscript,
    },
  ]
}

export default function HomePage() {
  const { user, roleHomePath } = useAuth()
  const role = user?.role ?? 'coordinator'
  const portalLabel = user?.role ? ROLE_META[user.role]?.shortLabel : 'Portal'
  const tools = toolsForRole(role)
  const quickMatchHref = role === 'professor' ? '/professor/quick-match' : '/catalog-match'

  return (
    <PageContainer wide title={null} subtitle={null}>
      <section className="cc-hero px-8 py-12 sm:px-12 sm:py-16 mb-14">
        <div className="max-w-xl">
          <h1 className="cc-large-title font-display">Tool workbench</h1>
          <p className="mt-5 text-[19px] leading-relaxed text-[var(--cc-label-secondary)]">
            {role === 'professor'
              ? 'Faculty-only entry points here use /professor/… URLs. Students and university staff have separate catalog and match pages.'
              : 'University and admin: full tool grid with staff URLs. Students never see this page unless their role allows workbench (it does not).'}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to={roleHomePath} className="cc-btn-primary px-8">
              Back to {portalLabel}
            </Link>
            <Link to={quickMatchHref} className="cc-btn-secondary px-6">
              Quick match
            </Link>
            <Link to="/" className="cc-link text-[15px] py-3 px-2">
              Public home
            </Link>
          </div>
        </div>
      </section>

      <h2 className="cc-title-2 font-display mb-6">All tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(({ to, title, desc, icon }) => (
          <Link
            key={to}
            to={to}
            className="cc-card group p-6 transition-all duration-200 hover:shadow-[var(--cc-shadow-card-hover)] hover:border-transparent"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--cc-fill)] text-[var(--cc-label-secondary)] mb-5 group-hover:text-[var(--cc-accent)] transition-colors">
              {icon}
            </div>
            <h3 className="cc-title-3 font-display">{title}</h3>
            <p className="mt-2 cc-footnote leading-relaxed">{desc}</p>
            <span className="mt-5 inline-flex items-center text-[15px] font-medium text-[var(--cc-accent)]">
              Open
              <svg className="w-4 h-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
