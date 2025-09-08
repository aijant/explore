import { ROUTES } from '@lib/constants/routes'
import { getError } from '@lib/helpers/general'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logOut } from '@/store/slices/auth-slice'

const useSignOut = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = useCallback(async () => {
    try {
      dispatch(logOut())
      navigate(ROUTES.auth)
    } catch (error) {
      toast.error(getError(error))
    }
  }, [])

  return { handleSignOut }
}

export default useSignOut
