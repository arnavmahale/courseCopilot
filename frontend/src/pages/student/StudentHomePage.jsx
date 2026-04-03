import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer'
import StakeholderNav from '../../components/stakeholders/StakeholderNav'
import TranscriptUploadPanel from '../../components/transcript/TranscriptUploadPanel'
import StudentDashboardStats from '../../components/student/StudentDashboardStats'
import StudentEvaluationsList from '../../components/student/StudentEvaluationsList'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabaseClient'
import {
  getStudentDeadline,
  listEvaluationsForStudent,
  saveStudentEvaluation,
} from '../../services/evaluationRecords'

const navItems = [
  { to: '/student', label: 'Dashboard', end: true },
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
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState(null)
  const [saveBanner, setSaveBanner] = useState(null)
  const [deadline, setDeadline] = useState(null)

  const reload = useCallback(async () => {
    if (!user?.id) return
    setLoading(true)
    setListError(null)
    try {
      const data = await listEvaluationsForStudent(user.id)
      setRows(data)
      const d = await getStudentDeadline(user.id)
      setDeadline(d)
    } catch (e) {
      setListError(e.message || 'Could not load evaluations')
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    reload()
  }, [reload])

  const inReview = useMemo(
    () => rows.filter((r) => r.status === 'faculty_review' || r.status === 'coordinator_review').length,
    [rows]
  )

  const deadlineLabel = deadline?.due_at
    ? `${new Date(deadline.due_at).toLocaleString()}${deadline.notes ? ` · ${deadline.notes}` : ''}`
    : null

  const handleEvaluationComplete = useCallback(
    async (result, { targetUniversity }) => {
      if (!user?.id) return
      try {
        await saveStudentEvaluation(user.id, { targetUniversity, result })
        setSaveBanner({ type: 'ok', text: 'Evaluation saved. University and faculty can see it when Supabase is live.' })
        await reload()
      } catch (e) {
        setSaveBanner({ type: 'err', text: e.message || 'Could not save evaluation' })
      }
    },
    [user?.id, reload]
  )

  return (
    <PageContainer wide breadcrumbs={[{ label: 'Student' }]} title={null} subtitle={null}>
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--cc-accent)] mb-2">
          Student dashboard
        </p>
        <h1 className="cc-large-title font-display max-w-3xl">Transfer credit workspace</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-[var(--cc-label-secondary)] max-w-3xl">
          Run the transcript pipeline, track saved results, and see deadlines from your school. Data persists in the
          browser for demo logins; connect <strong className="text-[var(--cc-label)]">Supabase</strong> with real auth
          UUIDs for production storage and staff workflows.
        </p>
        {isSupabaseConfigured && (
          <p className="mt-3 text-[13px] text-[#34c759] font-medium">Supabase env detected — cloud sync enabled for UUID accounts.</p>
        )}
        {!isSupabaseConfigured && (
          <p className="mt-3 cc-footnote">
            Add <code className="font-mono text-[12px]">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono text-[12px]">VITE_SUPABASE_ANON_KEY</code> to unlock university & professor
            dashboards against the same database.
          </p>
        )}
      </div>

      <StudentDashboardStats totalRuns={rows.length} inReview={inReview} deadlineLabel={deadlineLabel} />

      {saveBanner && (
        <div
          className={`mb-8 rounded-[var(--cc-radius-md)] px-5 py-4 text-[15px] ${
            saveBanner.type === 'ok'
              ? 'bg-[rgba(52,199,89,0.12)] text-[#1d7c3a] border border-[rgba(52,199,89,0.35)]'
              : 'bg-[var(--cc-danger-bg)] text-[var(--cc-danger)] border border-[var(--cc-danger)]/20'
          }`}
        >
          {saveBanner.text}
        </div>
      )}

      <div className="mb-12">
        <StudentEvaluationsList rows={rows} loading={loading} error={listError} />
      </div>

      <div className="cc-hero px-8 py-12 sm:px-12 sm:py-14 mb-10 rounded-[var(--cc-radius-lg)] border border-[var(--cc-border)]">
        <h2 className="cc-title-2 font-display max-w-3xl">Transcript · research agent pipeline</h2>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--cc-label-secondary)] max-w-3xl">
          Upload a PDF and run the full evaluation. When results appear, they are stored automatically for this account.
        </p>
        <div className="mt-10">
          <TranscriptUploadPanel
            variant="workspace"
            embeddedInHero
            showHowItWorksWhenIdle
            onEvaluationComplete={handleEvaluationComplete}
          />
        </div>
      </div>

      <StakeholderNav items={navItems} />

      <section aria-labelledby="student-more-heading" className="mt-14">
        <h2 id="student-more-heading" className="cc-title-2 font-display mb-4">
          Other tools
        </h2>
        <p className="cc-footnote mb-5 max-w-xl">Quick paths that skip the full transcript flow.</p>
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
          Production roadmap on branch <code className="font-mono text-[12px]">jaideep</code>: Supabase auth replaces
          demo login, university staff manage deadlines and queues, professors approve outcomes — see{' '}
          <code className="font-mono text-[12px]">docs/TRANSFER_CREDIT_STAKEHOLDERS.md</code> and{' '}
          <code className="font-mono text-[12px]">supabase/migrations/</code>.
        </p>
      </div>
    </PageContainer>
  )
}
