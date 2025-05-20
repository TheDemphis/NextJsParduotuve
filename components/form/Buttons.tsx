'use client'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'
import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { LuTrash2, LuFolderPen } from 'react-icons/lu'

type SubmitBtnProps = {
  className?: string
  size?: ButtonSize
  text?: string
}

type ButtonSize = 'default' | 'lg' | 'sm'

export function SubmitButton({
  text = 'submit',
  size = 'sm',
  className = '',
}: SubmitBtnProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size={size}
      className={cn('capitalize', className)}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="animate-spin" />
        </>
      ) : (
        text
      )}
    </Button>
  )
}

type EditButtonsTypes = 'edit' | 'delete'

export function EditButtons({ actionType }: { actionType: EditButtonsTypes }) {
  const { pending } = useFormStatus()

  const editButtonsFunc = () => {
    switch (actionType) {
      case 'edit':
        return <LuFolderPen />
      case 'delete':
        return <LuTrash2 />
      default:
        const never: never = actionType
        throw new Error(`Nėra tokio mygtuko tipo ${never}`)
    }
  }
  return (
    <Button type="submit" size="icon" className="cursor-pointer" variant="link">
      {pending ? <ReloadIcon className="animate-spin" /> : editButtonsFunc()}
    </Button>
  )
}

export const SignInFavoriteBtn = () => {
  return (
    <SignInButton mode="modal">
      <Button
        asChild
        className="cursor-pointer p-2"
        size="icon"
        type="button"
        variant="outline"
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}

export const IsFavoriteButton = ({ isFav }: { isFav: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="cursor-pointer"
      variant="outline"
      size="icon"
    >
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : isFav ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}

export const CartSignIn = () => {
  return (
    <SignInButton mode="modal">
      <Button type="button" className="my-2">
        Prisijungti
      </Button>
    </SignInButton>
  )
}
