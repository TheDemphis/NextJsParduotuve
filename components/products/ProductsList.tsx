import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import FavoriteToggleButton from './FavoriteToggleButton'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import { Product } from '@prisma/client'
function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="grid  gap-y-6">
      {products.map((item) => {
        const { image, price, name, company } = item
        const prodId = item.id
        const formattedPrice = formatCurrency(price)

        return (
          <article className="group relative" key={prodId}>
            <Link href={`products/${prodId}`}>
              <Card className="transform group-hover:shadow-md transition-shadow duration-300">
                <CardContent className="grid gap-y-6 p-8 md:grid-cols-3 ">
                  <div className="relative h-56 md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt="name"
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1028px) 50vw, 33vw"
                      className="w-full object-cover rounded-sm"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold capitalize text-xl">{name}</h2>
                    <h3 className=" text-lg">{company}</h3>
                  </div>
                  <p className="text-slate-700 md:ml-auto text-lg">
                    {formattedPrice}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute right-8 bottom-7">
              <FavoriteToggleButton productId={prodId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default ProductsList
