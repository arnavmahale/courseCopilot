import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import {
  isCrossPortalViolation,
  isPathAllowedForRole,
  redirectPathForRole,
} from '../../auth/routeAccess'
import NotFoundPage from '../../pages/NotFoundPage'

/**
 * Allow-list routes per role. Cross-portal URLs redirect home; unknown paths show 404.
 */
export default function RoleAccessGuard() {
  const { user } = useAuth()
  const location = useLocation()
  const role = user?.role ?? 'coordinator'

  if (!isPathAllowedForRole(role, location.pathname)) {
    if (isCrossPortalViolation(role, location.pathname)) {
      return <Navigate to={redirectPathForRole(role)} replace />
    }
    return <NotFoundPage />
  }

  return <Outlet />
}
