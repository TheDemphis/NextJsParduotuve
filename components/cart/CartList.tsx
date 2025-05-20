'use client'
import { Card } from '@/components/ui/card'
import { FirstCol, SecondCol, FourthCol } from './CartCol'
import CardSide from './CartSide'
import { CartItemWithProduct } from '@/utils/types'
const CartList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { amount, id } = cartItem
        const { name, image, company, id: productId, price } = cartItem.product
        return (
          <Card key={id} className="flex flex-col  md:flex-row gap-7 mb-5 p-5">
            <FirstCol image={image} name={name} />
            <SecondCol company={company} name={name} productId={productId} />
            <CardSide id={id} itemCount={amount} />
            <FourthCol price={price} />
          </Card>
        )
      })}
    </div>
  )
}
export default CartList
