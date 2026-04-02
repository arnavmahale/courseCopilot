/**
 * Stakeholder roles (static demo — will map to Supabase roles later).
 * coordinator = university / articulation staff (evaluators). admin = ops / IT-style access.
 */
export const ROLE_IDS = ['student', 'coordinator', 'professor', 'admin']

export const ROLE_META = {
  student: {
    id: 'student',
    label: 'Student',
    shortLabel: 'Student',
    description: 'Upload a transcript, quick-match courses, and browse the catalog — no staff tools.',
    loginSubtitle: 'Sign in to your student workspace.',
    homePath: '/student',
  },
  coordinator: {
    id: 'coordinator',
    label: 'University staff',
    shortLabel: 'University',
    description: 'Dashboard, batch runs, syllabus matching, and coordinator queue — articulation / evaluator tools.',
    loginSubtitle: 'Sign in as university staff (evaluator).',
    homePath: '/coordinator',
  },
  professor: {
    id: 'professor',
    label: 'Faculty',
    shortLabel: 'Faculty',
    description: 'Syllabus alignment and catalog tools — separate from student transcript flow.',
    loginSubtitle: 'Sign in to the faculty workspace.',
    homePath: '/professor',
  },
  admin: {
    id: 'admin',
    label: 'Administrator',
    shortLabel: 'Admin',
    description: 'Same operational tools as university staff, labeled for admin / oversight accounts.',
    loginSubtitle: 'Sign in to the admin console.',
    homePath: '/coordinator',
  },
}

export function isValidRole(value) {
  return typeof value === 'string' && ROLE_IDS.includes(value)
}

export function parseRoleParam(value) {
  if (isValidRole(value)) return value
  return 'coordinator'
}

export function defaultPathForRole(role) {
  return ROLE_META[role]?.homePath ?? '/coordinator'
}
