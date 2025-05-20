'use client'
import { adminLinks } from '@/utils/links'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
function Sidebar() {
  const pathName = usePathname()
  return (
    <aside>
      {adminLinks.map((item) => {
        const isActive = pathName === item.href
        const variant = isActive ? 'default' : 'ghost'
        return (
          <Button
            asChild
            variant={variant}
            className="w-full mb-3"
            key={item.href}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        )
      })}
    </aside>
  )
}
export default Sidebar
