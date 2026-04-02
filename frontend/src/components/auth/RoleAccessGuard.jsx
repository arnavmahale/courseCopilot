import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isPathForbiddenForRole, redirectPathForRole } from '../../auth/routeAccess'

/**
 * After auth, sends each role to their own surface — students cannot open the
 * coordinator dashboard, faculty cannot open the student transcript portal, etc.
 */
export default function RoleAccessGuard() {
  const { user } = useAuth()
  const location = useLocation()
  const role = user?.role ?? 'coordinator'

  if (isPathForbiddenForRole(role, location.pathname)) {
    return <Navigate to={redirectPathForRole(role)} replace />
  }

  return <Outlet />
}
