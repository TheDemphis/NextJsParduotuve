type NavLink = {
  href: string
  label: string
}

export const NavLinks: NavLink[] = [
  { href: '/', label: 'Pagrindinis' },
  { href: '/about', label: 'Apie' },
  { href: '/products', label: 'Prekės' },
  { href: '/favorites', label: 'Mėgstamiausios' },
  { href: '/reviews', label: 'Įvertinimai' },
  { href: '/cart', label: 'Krepšelis' },
  { href: '/orders', label: 'Užsakymai' },
  { href: '/admin/sales', label: 'Admin' },
]

export const adminLinks: NavLink[] = [
  { href: '/admin/sales', label: 'Užsakymai' },
  { href: '/admin/products', label: 'Mano produktai' },
  { href: '/admin/products/create', label: 'Sukurti produktą' },
]
