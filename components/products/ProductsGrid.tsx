import { formatCurrency } from '@/utils/format'
import { Card, CardContent } from '../ui/card'
import { Product } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => {
        const { price, image, name } = item
        const productId = item.id
        const formattedPrice = formatCurrency(price)

        return (
          <article key={productId} className="relative group">
            <Link href={`products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="relative overflow-hidden rounded h-56 md:h-44">
                    <Image
                      src={image}
                      alt={name}
                      sizes="(max-width:768px) 100vw, (max-width:1028px) 50vw, 33vw"
                      priority
                      fill
                      className="object-cover w-full rounded transform group-hover:scale-95 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h2 className="text-lg capitalize">{name}</h2>
                    <p className="text-slate-700">{formattedPrice}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-8">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default ProductsGrid
