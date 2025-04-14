import { FaShoppingCart } from 'react-icons/fa'
import { Button } from '../ui/button'
import Link from 'next/link'
async function CartButton() {
  const itemsInCart = 10
  return (
    <Button
      asChild
      size={'icon'}
      // variant="outline"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart ">
        <FaShoppingCart className="w-5 h-5 " />
        <span className="absolute text-white -right-3 -top-3 bg-primary rounded-full h-5 w-5 flex text-xs items-center justify-center">
          {itemsInCart}
        </span>
      </Link>
    </Button>
  )
}
export default CartButton
