type NavLink = {
  href: string
  label: string
}

export const NavLinks: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/products', label: 'products' },
  { href: '/favorites', label: 'favorites' },
  { href: '/reviews', label: 'reviews' },
  { href: '/cart', label: 'cart' },
  { href: '/orders', label: 'orders' },
  { href: '/admin/sales', label: 'dashboard' },
]

export const adminLinks: NavLink[] = [
  { href: '/admin/sales', label: 'Užsakymai' },
  { href: '/admin/products', label: 'Mano produktai' },
  { href: '/admin/products/create', label: 'Sukurti produktą' },
]
