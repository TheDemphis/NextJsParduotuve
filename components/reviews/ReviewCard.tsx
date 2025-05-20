import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Rating from './Rating'
import Comment from './Comment'
import Image from 'next/image'

type ReviewCardProps = {
  review: {
    comment: string
    rating: number
    name: string
    image: string
  }
  children?: React.ReactNode
}
function ReviewCard({ review, children }: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex gap-x-4">
          <Image
            src={review.image}
            alt={review.name}
            className="w-10 h-10 rounded-3xl object-cover"
            width={42}
            height={42}
          />
          <div>
            <h2 className="text-base">{review.name}</h2>
            <Rating rating={review.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={review.comment} />
      </CardContent>
      <div className="absolute top-2 right-2">{children}</div>
    </Card>
  )
}
export default ReviewCard
