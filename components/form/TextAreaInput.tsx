import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type TextAreaProps = {
  name: string
  defaultValue: string
  labelText?: string
}

function TextArea({ name, defaultValue, labelText }: TextAreaProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{labelText}</Label>
      <Textarea
        defaultValue={defaultValue}
        id={name}
        name={name}
        rows={4}
        required
      />
    </div>
  )
}
export default TextArea
