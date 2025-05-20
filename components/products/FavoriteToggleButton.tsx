import FavoriteToggleForm from './FavoriteToggleForm'
import { auth } from '@clerk/nextjs/server'
import { FetchFavorites } from '@/utils/actions'
import { SignInFavoriteBtn } from '../form/Buttons'
async function FavoriteToggleButton({ productId }: { productId: string }) {
  const { userId } = auth()
  if (!userId) return <SignInFavoriteBtn />
  const favoriteId = await FetchFavorites({ productId })

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />
}
export default FavoriteToggleButton
