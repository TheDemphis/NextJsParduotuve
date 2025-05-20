import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import Link from 'next/link'
import { Button } from '../ui/button'
import { NavLinks } from '@/utils/links'
import UserIcon from './UserIcon'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import SignOutLink from './SignOutLink'
import { auth } from '@clerk/nextjs/server'
const LinksDropdown = () => {
  const { userId } = auth()
  const isAdmin = userId === process.env.ADMIN_ID

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex max-w-24 gap-3" asChild>
        <Button variant="outline">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full">Prisijungti</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full">Registruotis</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {NavLinks.map((item) => {
            if (item.label === 'dashboard' && !isAdmin) return null
            return (
              <DropdownMenuItem key={item.href} className="capitalize">
                <Link href={item.href} className="w-full">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
