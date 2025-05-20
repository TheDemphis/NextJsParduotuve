'use server'

import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { FetchUserFav } from '@/utils/actions'

async function page() {
  const favorites = await FetchUserFav()
  if (favorites.length === 0)
    return <SectionTitle text="Nėra mėgstamų prekių" />
  return (
    <>
      <SectionTitle text="Mėgstamos prekės" />
      <ProductsGrid products={favorites.map((item) => item.product)} />
    </>
  )
}
export default page
