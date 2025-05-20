'use client'
import { useState } from 'react'
import ProductAmount from '../singleProduct/ProductAmount'
import { Mode } from '../singleProduct/ProductAmount'
import FormContainer from '../form/FormContainer'
import { SubmitButton } from '../form/Buttons'
import { removeCartItem, updateCartItem } from '@/utils/actions'
import { useToast } from '../ui/use-toast'
function CartSide({ id, itemCount }: { id: string; itemCount: number }) {
  const [amount, setAmount] = useState(itemCount)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const changeAmount = async (value: number) => {
    setLoading(true)
    await updateCartItem({ amount: value, cartItemId: id })
    setAmount(value)
    toast({
      description: 'Prekės kiekis atnaujintas',
      className: 'bg-slate-700 text-white',
    })
    setLoading(false)
  }
  return (
    <div>
      <ProductAmount
        amount={amount}
        setAmount={changeAmount}
        mode={Mode.CartItem}
        isLoading={loading}
      />
      <FormContainer action={removeCartItem}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton text="Ištrinti prekę" size="sm" className="mt-2" />
      </FormContainer>
    </div>
  )
}
export default CartSide
