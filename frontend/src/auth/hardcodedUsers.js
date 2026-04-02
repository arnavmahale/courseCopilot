/**
 * Demo auth — all accounts use password: "password"
 * Primary demo pair: username "username" / password "password" (any portal).
 * Other accounts are locked to one role so student vs university vs admin stay distinct.
 */
export const DEMO_PASSWORD = 'password'

export const HARDCODED_USERS = [
  { id: '1', username: 'username', displayName: 'Demo (any role)', password: DEMO_PASSWORD, allowedRoles: null },
  {
    id: '2',
    username: 'evaluator_a',
    displayName: 'Dr. Alice Chen (university)',
    password: DEMO_PASSWORD,
    allowedRoles: ['coordinator'],
  },
  {
    id: '3',
    username: 'evaluator_b',
    displayName: 'Jordan Reed (university)',
    password: DEMO_PASSWORD,
    allowedRoles: ['coordinator'],
  },
  { id: '4', username: 'admin_demo', displayName: 'Admin Demo', password: DEMO_PASSWORD, allowedRoles: ['admin'] },
  {
    id: '5',
    username: 'student_demo',
    displayName: 'Student Demo',
    password: DEMO_PASSWORD,
    allowedRoles: ['student'],
  },
  {
    id: '6',
    username: 'faculty_demo',
    displayName: 'Faculty Demo',
    password: DEMO_PASSWORD,
    allowedRoles: ['professor'],
  },
]

export function findHardcodedUser(username, password) {
  const u = HARDCODED_USERS.find(
    (x) => x.username === username && x.password === password
  )
  return u || null
}
