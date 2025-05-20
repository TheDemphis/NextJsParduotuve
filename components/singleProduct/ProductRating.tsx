import { fetchProdRating } from '@/utils/actions'
import { FaStar } from 'react-icons/fa'
async function ProductRating({ productId }: { productId: string }) {
  const { rating, count } = await fetchProdRating(productId)
  const reviews = `out of ${count} reviews`
  const className = 'flex items-center mt-1  mb-3 gap-1'
  return (
    <span className={className}>
      <FaStar className="h-4 w-4" /> {rating} {reviews}
    </span>
  )
}
export default ProductRating
