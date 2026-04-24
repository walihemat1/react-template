import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { LoginForm } from '@/features/auth/LoginForm'
import { login } from '@/store/auth-slice'

function LoginPage() {
  const dispatch = useDispatch()
  const { error, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  )

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(values) {
    dispatch(login(values))
  }

  return (
    <LoginForm error={error} isLoading={isLoading} onSubmit={handleSubmit} />
  )
}

export { LoginPage }
