import { defaultPathForRole, isValidRole } from './roles'

/**
 * Paths another role's portal or staff-only tools live on. Used as deny rules so
 * unknown paths still fall through to 404.
 */
export function isPathForbiddenForRole(role, pathname) {
  const p = pathname || '/'
  if (!isValidRole(role)) return false

  if (role === 'student') {
    return (
      /^\/coordinator(\/|$)/.test(p) ||
      /^\/professor(\/|$)/.test(p) ||
      p === '/dashboard' ||
      p === '/batch' ||
      /^\/match(\/|$)/.test(p) ||
      p === '/workbench'
    )
  }

  if (role === 'professor') {
    return (
      /^\/student(\/|$)/.test(p) ||
      /^\/coordinator(\/|$)/.test(p) ||
      p === '/dashboard' ||
      p === '/batch' ||
      p === '/transcript'
    )
  }

  if (role === 'coordinator' || role === 'admin') {
    return /^\/student(\/|$)/.test(p) || /^\/professor(\/|$)/.test(p)
  }

  return false
}

export function redirectPathForRole(role) {
  return defaultPathForRole(isValidRole(role) ? role : 'coordinator')
}
