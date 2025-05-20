'use client'
import { useState } from 'react'
import SelectProductAmount from './ProductAmount'
import { Mode } from './ProductAmount'
import FormContainer from '../form/FormContainer'
import { SubmitButton } from '../form/Buttons'
import { addToCart } from '@/utils/actions'
import { useAuth } from '@clerk/nextjs'
import { CartSignIn } from '../form/Buttons'
function AddToCartButton({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1)
  const { userId } = useAuth()

  return (
    <div className="my-2">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCart}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="Įdėti į krepšelį" className="my-2" />
        </FormContainer>
      ) : (
        <CartSignIn />
      )}
    </div>
  )
}
export default AddToCartButton
