import CartList from '@/components/cart/CartList'
import CartTotals from '@/components/cart/CartTotals'
import SectionTitle from '@/components/global/SectionTitle'
import { fetchOrCreateCart, updateCart } from '@/utils/actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
async function page() {
  const { userId } = auth()
  if (!userId) redirect('/')
  const prevCart = await fetchOrCreateCart({ userId })
  const { updateCartItem, cartItems } = await updateCart(prevCart)
  if (updateCartItem.numItemsInCart === 0)
    return <SectionTitle text="Jūsų krepšelis yra tuščias" />

  return (
    <>
      <SectionTitle text="Jūsų krepšelis" />
      <div className="grid lg:grid-cols-12 ">
        <div className="lg:col-span-8 mr-4">
          <CartList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={updateCartItem} />
        </div>
      </div>
    </>
  )
}
export default page
