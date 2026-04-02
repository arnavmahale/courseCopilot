import { useState, useMemo } from 'react'
import PageContainer from '../components/layout/PageContainer'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorAlert from '../components/common/ErrorAlert'
import UniversityFilter from '../components/courses/UniversityFilter'
import CourseTable from '../components/courses/CourseTable'
import CourseDetailModal from '../components/courses/CourseDetailModal'
import useCourses from '../hooks/useCourses'

const PORTAL_COPY = {
  workbench: {
    title: 'Course catalog',
    subtitle:
      'Inspect every row in the loaded dataset. Filter by institution or search across titles and codes.',
    breadcrumbs: [{ to: '/workbench', label: 'Workbench' }, { label: 'Catalog' }],
  },
  student: {
    title: 'Course catalog',
    subtitle:
      'Browse the same dataset staff use, in a student-only view. Filter by school or search titles and codes.',
    breadcrumbs: [{ to: '/student', label: 'Student' }, { label: 'Catalog' }],
  },
  university: {
    title: 'Course catalog',
    subtitle:
      'Evaluator view: inspect every row in the loaded dataset. Filter by institution or search across titles and codes.',
    breadcrumbs: [{ to: '/coordinator', label: 'University' }, { label: 'Catalog' }],
  },
  faculty: {
    title: 'Course catalog',
    subtitle:
      'Faculty view: browse the catalog to align syllabi and spot-check course metadata for your institution.',
    breadcrumbs: [{ to: '/professor', label: 'Faculty' }, { label: 'Catalog' }],
  },
}

export default function CourseBrowserPage({ portal = 'workbench' }) {
  const copy = PORTAL_COPY[portal] || PORTAL_COPY.workbench
  const [university, setUniversity] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState(null)

  const { courses, total, loading, error } = useCourses(university || undefined)

  const filtered = useMemo(() => {
    if (!search.trim()) return courses
    const q = search.toLowerCase()
    return courses.filter((c) => {
      const title = (c.course_title || c.title || '').toLowerCase()
      const code = (c.course_code || c.code || '').toLowerCase()
      const cat = (c.category || '').toLowerCase()
      return title.includes(q) || code.includes(q) || cat.includes(q)
    })
  }, [courses, search])

  return (
    <PageContainer title={copy.title} subtitle={copy.subtitle} breadcrumbs={copy.breadcrumbs}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <UniversityFilter value={university} onChange={setUniversity} />
        <input
          type="search"
          placeholder="Search title, code, or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="cc-input flex-1"
        />
        <span className="cc-footnote self-center tabular-nums whitespace-nowrap font-medium">
          {filtered.length} / {total}
        </span>
      </div>

      {error && <ErrorAlert message={error} />}
      {loading ? (
        <LoadingSpinner message="Loading courses…" />
      ) : (
        <CourseTable courses={filtered} onViewCourse={setSelectedCourseId} />
      )}

      {selectedCourseId && (
        <CourseDetailModal courseId={selectedCourseId} onClose={() => setSelectedCourseId(null)} />
      )}
    </PageContainer>
  )
}
