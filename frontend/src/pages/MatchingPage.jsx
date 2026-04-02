import PageContainer from '../components/layout/PageContainer'
import ErrorAlert from '../components/common/ErrorAlert'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SyllabusForm from '../components/matching/SyllabusForm'
import MatchResultsList from '../components/matching/MatchResultsList'
import useMatch from '../hooks/useMatch'
import { useAuth } from '../auth/AuthContext'

export default function MatchingPage() {
  const { user } = useAuth()
  const { result, loading, error, reset, runMatchCustom } = useMatch()

  const role = user?.role
  const parentCrumb =
    role === 'professor'
      ? { to: '/professor', label: 'Faculty' }
      : role === 'coordinator' || role === 'admin'
        ? { to: '/coordinator', label: 'University' }
        : { to: '/workbench', label: 'Workbench' }

  const handleSubmit = (formData) => {
    reset()
    runMatchCustom(formData)
  }

  return (
    <PageContainer
      title="Custom syllabus match"
      subtitle="Enter course details manually when the class is not in the preloaded catalog."
      breadcrumbs={[parentCrumb, { label: 'Custom syllabus' }]}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <SyllabusForm onSubmit={handleSubmit} loading={loading} />
        </div>
        <div>
          {error && <ErrorAlert message={error} onDismiss={reset} />}
          {loading && <LoadingSpinner message="Analyzing syllabus and finding matches…" />}
          {!loading && result && <MatchResultsList result={result} />}
          {!loading && !result && !error && (
            <div className="cc-card p-12 text-center" style={{ borderStyle: 'dashed' }}>
              <p className="cc-footnote text-[var(--cc-label)]">
                Fill in the course details and tap Find matching courses to see results here.
              </p>
              <p className="cc-footnote mt-4 leading-relaxed">
                Tip: knowledge points have strong weight in the local matcher — include outcomes and topics when
                possible.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
