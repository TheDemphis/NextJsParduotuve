import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import { fetchAllProducts } from '@/utils/actions'

async function ProductsContainer({
  search,
  layout,
}: {
  search: string
  layout: string
}) {
  const products = await fetchAllProducts({ search })
  const totalProducts = products.length
  const searchProducts = search ? `&search=${search}` : ''
  return (
    <div>
      <section>
        <div className="flex justify-between">
          <h4 className="font-medium">
            {totalProducts} Product{totalProducts > 1 ? 's' : ''}
          </h4>
          <div className="flex">
            <Button
              asChild
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
            >
              <Link href={`products?layout=grid${searchProducts}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              asChild
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
            >
              <Link href={`products?layout=list${searchProducts}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-2 mb-4" />
      </section>
      {totalProducts === 0 ? (
        <h5 className="font-semibold">Atsiprašome, tokių prekių neturime</h5>
      ) : layout === 'grid' ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  )
}
export default ProductsContainer
