export default function StudentDashboardStats({ totalRuns, inReview, deadlineLabel }) {
  const cards = [
    { label: 'Evaluations saved', value: totalRuns, hint: 'Each run is stored after the pipeline finishes.' },
    { label: 'In faculty review', value: inReview, hint: 'Awaiting professor approve / reject (when using Supabase).' },
    {
      label: 'Your deadline',
      value: deadlineLabel || '—',
      hint: 'Set by your university when connected to Supabase.',
    },
  ]

  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-10">
      {cards.map((c) => (
        <div
          key={c.label}
          className="cc-card p-6 border border-[var(--cc-border)] bg-[var(--cc-surface)]/60"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--cc-label-secondary)]">
            {c.label}
          </p>
          <p className="mt-3 cc-title-2 font-display text-[var(--cc-label)]">{c.value}</p>
          <p className="mt-2 cc-footnote leading-relaxed">{c.hint}</p>
        </div>
      ))}
    </div>
  )
}
