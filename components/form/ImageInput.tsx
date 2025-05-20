import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function ImageInput() {
  const name = 'image'

  return (
    <div className="mb-4">
      <Label htmlFor={name}>Nuotrauka</Label>
      <Input
        className="mt-2"
        name={name}
        id={name}
        type="file"
        accept="image/*"
        required
      />
    </div>
  )
}
