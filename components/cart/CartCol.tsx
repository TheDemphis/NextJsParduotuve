import { formatCurrency } from '@/utils/format'
import Image from 'next/image'
import Link from 'next/link'
export function FirstCol({ name, image }: { name: string; image: string }) {
  return (
    <div className="relative w-32 h-32">
      <Image
        src={image}
        alt={name}
        fill
        className="w-full rounded object-cover"
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
        priority
      />
    </div>
  )
}

export function SecondCol({
  productId,
  company,
  name,
}: {
  productId: string
  company: string
  name: string
}) {
  return (
    <div className="sm:w-44 mr-5 ">
      <Link href={`/products/${productId}`}>
        <h3 className="hover:underline font-semibold text-base">{name}</h3>
      </Link>
      <h4 className="mt-3 text-sm">{company}</h4>
    </div>
  )
}

export function FourthCol({ price }: { price: number }) {
  return (
    <p className="font-semibold text-base md:ml-auto ">
      {formatCurrency(price)}
    </p>
  )
}
