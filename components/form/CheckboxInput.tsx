import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

type CheckboxProps = {
  name: string
  defaultChecked?: boolean
  label: string
}

export function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxProps) {
  return (
    <div className="items-center flex gap-x-3">
      <Checkbox name={name} id={name} defaultChecked={defaultChecked} />
      <Label
        htmlFor={name}
        className="text-sm capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        {label}
      </Label>
    </div>
  )
}
