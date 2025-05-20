import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
function RatingInput({
  name,
  labelText,
}: {
  name: string
  labelText?: string
}) {
  const ratings = Array.from({ length: 5 }, (_, i) => {
    const rating = i + 1
    return rating.toString()
  }).reverse()
  return (
    <div className="mb-4 capitalize max-w-sm">
      <Label htmlFor={name}>{name || labelText}</Label>
      <Select name={name} defaultValue={ratings[0]} required>
        <SelectTrigger>
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {ratings.map((rating) => {
            return (
              <SelectItem value={rating} key={rating} className="w-full">
                {rating}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
export default RatingInput
