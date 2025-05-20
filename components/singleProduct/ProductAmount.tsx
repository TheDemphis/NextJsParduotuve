import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type ProductAmount = {
  mode: Mode.SingleProduct
  amount: number
  setAmount: (value: number) => void
}
type CartItemAmount = {
  mode: Mode.CartItem
  amount: number
  setAmount: (value: number) => Promise<void>
  isLoading: boolean
}

function ProductAmount(props: ProductAmount | CartItemAmount) {
  const { amount, mode, setAmount } = props
  const cartItem = mode === Mode.CartItem

  return (
    <>
      <h3 className="my-1">Kiekis :</h3>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 5 : 10 }, (_, i) => {
            const selectValue = (i + 1).toString()
            return (
              <SelectItem value={selectValue} key={i}>
                {selectValue}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </>
  )
}
export default ProductAmount
