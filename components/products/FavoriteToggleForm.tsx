'use client'
import { usePathname } from 'next/navigation'
import { IsFavoriteButton } from '../form/Buttons'
import { FavoriteToggle } from '@/utils/actions'
import FormContainer from '../form/FormContainer'

type FavoriteFormTypes = {
  productId: string
  favoriteId: string | null
}
function FavoriteToggleForm({ productId, favoriteId }: FavoriteFormTypes) {
  const pathName = usePathname()
  const toggle = FavoriteToggle.bind(null, { productId, favoriteId, pathName })
  return (
    <FormContainer action={toggle}>
      <IsFavoriteButton isFav={favoriteId ? true : false} />
    </FormContainer>
  )
}
export default FavoriteToggleForm
