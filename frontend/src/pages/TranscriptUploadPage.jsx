import PageContainer from '../components/layout/PageContainer'
import TranscriptUploadPanel from '../components/transcript/TranscriptUploadPanel'

export default function TranscriptUploadPage() {
  return (
    <PageContainer
      title="Transcript upload"
      subtitle="Same PDF → research agent → matching pipeline as the student home. Streams live progress when the API has OpenAI configured."
      breadcrumbs={[
        { to: '/student', label: 'Student' },
        { label: 'Transcript' },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <TranscriptUploadPanel variant="workspace" />
      </div>
    </PageContainer>
  )
}
