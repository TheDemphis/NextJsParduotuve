'use client'
import Link from 'next/link'
import { useToast } from '../ui/use-toast'
import { SignOutButton } from '@clerk/nextjs'

const SignOutLink = () => {
  const { toast } = useToast()
  const handleSignOut = () => {
    toast({ description: 'Sėkmingai atsijugėte' })
  }

  return (
    <SignOutButton>
      <Link href="/" className="w-full" onClick={handleSignOut}>
        Atsijungti
      </Link>
    </SignOutButton>
  )
}
export default SignOutLink
