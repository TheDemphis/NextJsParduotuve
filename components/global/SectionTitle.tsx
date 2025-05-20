import { Separator } from '@/components/ui/separator'

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="font-medium mb-5 text-2xl mt-4 ">{text}</h2>
      <Separator className="mb-2" />
    </div>
  )
}
export default SectionTitle
