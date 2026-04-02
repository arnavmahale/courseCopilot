import PageContainer from '../components/layout/PageContainer'
import TranscriptUploadPanel from '../components/transcript/TranscriptUploadPanel'

export default function TranscriptUploadPage() {
  return (
    <PageContainer
      title="Transcript upload"
      subtitle="Upload a transcript PDF for pipeline-based evaluation when your server is configured for it."
      breadcrumbs={[
        { to: '/student', label: 'Student' },
        { label: 'Transcript' },
      ]}
    >
      <div className="max-w-2xl mx-auto">
        <TranscriptUploadPanel />
      </div>
    </PageContainer>
  )
}
