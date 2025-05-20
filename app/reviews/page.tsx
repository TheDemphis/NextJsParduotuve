import { deleteReview, fetchUserReviews } from '@/utils/actions'
import ReviewCard from '@/components/reviews/ReviewCard'
import SectionTitle from '@/components/global/SectionTitle'
import FormContainer from '@/components/form/FormContainer'
import { EditButtons } from '@/components/form/Buttons'

const DeleteButton = ({ reviewId }: { reviewId: string }) => {
  const deleteAction = deleteReview.bind(null, { reviewId })
  return (
    <FormContainer action={deleteAction}>
      <EditButtons actionType="delete" />
    </FormContainer>
  )
}
async function page() {
  const reviews = await fetchUserReviews()
  if (reviews.length === 0)
    return <SectionTitle text="Neturite parašytų atsiliepimų" />

  return (
    <>
      <SectionTitle text="Jūsų atsiliepimai" />
      <div className="mt-2 grid md:grid-cols-2 gap-4">
        {reviews.map((item) => {
          const { comment, rating } = item
          const { name, image } = item.product
          const review = { comment, rating, name, image }
          return (
            <ReviewCard key={item.id} review={review}>
              <DeleteButton reviewId={item.id} />
            </ReviewCard>
          )
        })}
      </div>
    </>
  )
}
export default page
