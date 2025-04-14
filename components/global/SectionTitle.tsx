import { Separator } from '@/components/ui/separator'

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="font-medium mb-4 text-2xl mt-5 ">{text}</h2>
      <Separator />
    </div>
  )
}
export default SectionTitle
