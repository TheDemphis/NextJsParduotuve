import { Label } from '../ui/label'
import { Input } from '../ui/input'

type FormInputs = {
  name: string
  type: string
  label?: string
  defaultValue?: string
  placeholder?: string
}

export const FormInput = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputs) => {
  return (
    <div className="mb-4">
      <Label htmlFor="name">{label || name}</Label>
      <Input
        className="mt-2"
        name={name}
        id="name"
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  )
}
