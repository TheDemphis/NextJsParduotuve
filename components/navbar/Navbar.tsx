import Container from '../global/Container'
import CartButton from './CartButton'
import DarkMode from './DarkMode'
import LinksDropdown from './LinksDropdown'
import Logo from './Logo'
import NavSearch from './NavSearch'
import { Suspense } from 'react'
const Navbar = () => {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row justify-between sm:items-center py-7">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center justify-center ">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  )
}
export default Navbar
