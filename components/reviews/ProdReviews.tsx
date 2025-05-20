import { fetchProductReviews } from '@/utils/actions'
import SectionTitle from '../global/SectionTitle'
import ReviewCard from './ReviewCard'

async function ProdReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId)
  return (
    <div className="mt-10">
      <SectionTitle text="Prekės atsiliepimai" />
      <div className="grid md:grid-cols-2 gap-4 my-4">
        {reviews.map((item) => {
          const { authorName, authorImageUrl, comment, rating } = item
          const review = {
            name: authorName,
            image: authorImageUrl,
            comment,
            rating,
          }
          return <ReviewCard key={item.id} review={review} />
        })}
      </div>
    </div>
  )
}
export default ProdReviews
