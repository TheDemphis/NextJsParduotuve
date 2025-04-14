import BreadCrumbs from '@/components/singleProduct/BreadCrumbs'
import { fetchSingleProduct } from '@/utils/actions'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import AddToCart from '@/components/singleProduct/cartButton'
import ProductRating from '@/components/singleProduct/ProductRating'

async function page({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id)
  const { name, price, image, company, description } = product
  const formattedPrice = formatCurrency(price)
  return (
    <section>
      <BreadCrumbs name={name} />
      <div className=" mt-6 grid md:grid-cols-2 lg:gap-x-14">
        <div className="relative min-h-[400px]">
          <Image
            src={image}
            alt={name}
            sizes="(max-width:768px) 100vw, (max-width:1028px) 50vw, 33vw"
            priority
            fill
            className="w-full object-cover rounded-md"
          />
        </div>
        <div>
          <div className="flex gap-x-6 capitalize font-bold text-2xl ">
            <h1>{name}</h1>
            <FavoriteToggleButton productId={params.id} />
          </div>
          <ProductRating productId={params.id} />
          <h4 className="font-medium text-lg mt-3">{company}</h4>
          <p className="bg-muted mt-3 inline-block rounded">{formattedPrice}</p>
          <p className="text-slate-700 mt-8 leading-7">{description}</p>
          <AddToCart productId={params.id} />
        </div>
      </div>
    </section>
  )
}
export default page
