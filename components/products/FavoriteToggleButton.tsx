import { Button } from '../ui/button'
import { FaHeart } from 'react-icons/fa'
function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button size="icon" variant={'outline'} className="cursor-pointer">
      <FaHeart />
    </Button>
  )
}
export default FavoriteToggleButton
