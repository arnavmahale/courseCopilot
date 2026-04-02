import { useState, useCallback } from 'react'
import FileUpload from './FileUpload'
import ProgressTracker from './ProgressTracker'
import ResultsDisplay from './ResultsDisplay'
import ErrorAlert from '../common/ErrorAlert'
import useTranscriptEval from '../../hooks/useTranscriptEval'

/**
 * Shared transcript upload + results flow (used on /student and /transcript).
 */
export default function TranscriptUploadPanel({ showHowItWorksWhenIdle = true }) {
  const [file, setFile] = useState(null)
  const [targetUniversity, setTargetUniversity] = useState('Duke')
  const { evaluate, result, progress, loading, error, reset } = useTranscriptEval()

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!file) return
      evaluate(file, targetUniversity)
    },
    [file, targetUniversity, evaluate]
  )

  const handleReset = useCallback(() => {
    setFile(null)
    setTargetUniversity('Duke')
    reset()
  }, [reset])

  if (result) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button type="button" onClick={handleReset} className="cc-btn-secondary px-5 py-2.5">
            New evaluation
          </button>
        </div>
        <ResultsDisplay result={result} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="cc-card p-8 sm:p-10 space-y-6">
        <div>
          <label className="block text-[13px] font-medium text-[var(--cc-label-secondary)] mb-2">
            Transcript PDF
          </label>
          <FileUpload onFileSelect={setFile} disabled={loading} />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[var(--cc-label-secondary)] mb-2">
            Target university
          </label>
          <input
            type="text"
            value={targetUniversity}
            onChange={(e) => setTargetUniversity(e.target.value)}
            disabled={loading}
            placeholder="e.g. Duke, Stanford"
            className="cc-input"
          />
          <p className="mt-2 cc-footnote">Institution you are transferring into</p>
        </div>

        <button
          type="submit"
          disabled={!file || !targetUniversity.trim() || loading}
          className="cc-btn-primary w-full"
        >
          {loading ? 'Processing…' : 'Evaluate transfer credits'}
        </button>
      </form>

      {loading && progress && <ProgressTracker progress={progress} />}

      {error && <ErrorAlert message={error} />}

      {showHowItWorksWhenIdle && !loading && !error && (
        <div className="cc-card p-6 bg-[var(--cc-bg)] border-transparent">
          <h3 className="cc-title-3 font-display mb-4">How it works</h3>
          <ol className="space-y-3 cc-footnote leading-relaxed">
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--cc-accent)] shrink-0 w-5">1.</span>
              Upload your transcript PDF from your current university.
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--cc-accent)] shrink-0 w-5">2.</span>
              The pipeline parses courses and runs matching against the target catalog.
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--cc-accent)] shrink-0 w-5">3.</span>
              Review similarity scores and rationales alongside official policy.
            </li>
          </ol>
        </div>
      )}
    </div>
  )
}
