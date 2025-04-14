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
const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex max-w-24 gap-3" asChild>
        <Button variant="outline">
          <LuAlignLeft className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        {NavLinks.map((item) => {
          return (
            <DropdownMenuItem key={item.href} className="capitalize">
              <Link href={item.href} className="w-full">
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
