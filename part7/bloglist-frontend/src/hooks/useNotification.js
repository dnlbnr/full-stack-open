import { processSuccess, processError } from '../reducers/notification.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

const useNotification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const setError = useCallback(
    (message) => {
      dispatch(processError(message))
    },
    [dispatch]
  )

  const setSuccess = useCallback(
    (message) => {
      dispatch(processSuccess(message))
    },
    [dispatch]
  )

  return { notification, setSuccess, setError }
}

export default useNotification
