'use client'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { actionFunction } from '@/utils/types'

const initialState = {
  message: '',
}

export function FormContainer({
  action,
  children,
}: {
  action: actionFunction
  children: React.ReactNode
}) {
  const [state, actionFunc] = useFormState(action, initialState)
  const { toast } = useToast()
  useEffect(() => {
    if (state.message) {
      toast({ description: state.message })
    }
  }, [state])
  return <form action={actionFunc}>{children}</form>
}
export default FormContainer
