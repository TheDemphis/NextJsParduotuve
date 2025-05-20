import { Label } from '../ui/label'
import { Input } from '../ui/input'
const name = 'price'

type PriceInputNumber = {
  defaultValue?: number
}

export const PriceInput = ({ defaultValue }: PriceInputNumber) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name}>Kaina ($)</Label>
      <Input
        className="mt-2"
        name={name}
        id={name}
        type="number"
        defaultValue={defaultValue || 100}
        min={0}
        required
      />
    </div>
  )
}
