import { FaHome } from 'react-icons/fa'
import { Button } from '../ui/button'
import Link from 'next/link'

function Logo() {
  return (
    <Button asChild size="icon">
      <Link href="/">
        <FaHome className="w-5 h-5" />
      </Link>
    </Button>
  )
}
export default Logo
