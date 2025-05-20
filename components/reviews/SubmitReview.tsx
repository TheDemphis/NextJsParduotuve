'use client'
import { useState } from 'react'
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import { Card } from '@/components/ui/card'
import RatingInput from '@/components/reviews/RatingInput'
import TextArea from '@/components/form/TextAreaInput'
import { Button } from '@/components/ui/button'
import { createReview } from '@/utils/actions'
import { useUser } from '@clerk/nextjs'

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewAvailable, setIsReviewAvailable] = useState(false)
  const { user } = useUser()

  return (
    <div className="mt-4">
      <Button onClick={() => setIsReviewAvailable((value) => !value)} size="lg">
        Palikti atsiliepimą
      </Button>
      {isReviewAvailable && (
        <Card className="mt-5 p-6">
          <FormContainer action={createReview}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || 'useris'}
            />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl || ''}
            />
            <RatingInput name="rating" />
            <TextArea
              name="comment"
              defaultValue="Jūsų atsiliepimo tekstas"
              labelText="Komentaras"
            />
            <SubmitButton text="Siųsti atsiliepimą" className="mt-3" />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}
export default SubmitReview
