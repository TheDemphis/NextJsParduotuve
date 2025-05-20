import { Card, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/utils/format'
import { createOrder } from '@/utils/actions'
import FormContainer from '../form/FormContainer'
import { SubmitButton } from '../form/Buttons'
import { Cart } from '@prisma/client'

function CartRow({
  label,
  amount,
  last,
}: {
  label: string
  amount: number
  last?: boolean
}) {
  return (
    <>
      <div className="flex  justify-between p-2 ">
        <p>{label}</p>
        <p>{formatCurrency(amount)}</p>
      </div>
      {last ? null : <Separator />}
    </>
  )
}
function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, tax, shipping, orderTotal } = cart

  return (
    <>
      <Card className="p-4">
        <CartRow label="Prekių kaina" amount={cartTotal} />
        <CartRow label="Mokesčiai" amount={tax} />
        <CartRow label="Siuntimas" amount={shipping} />
        <CardTitle className="mt-5">
          <CartRow label="Bendra suma" amount={orderTotal} last />
        </CardTitle>
      </Card>
      <FormContainer action={createOrder}>
        <SubmitButton
          text="Baigti užsakymą"
          className="w-full mt-5"
          size="lg"
        />
      </FormContainer>
    </>
  )
}

export default CartTotals
