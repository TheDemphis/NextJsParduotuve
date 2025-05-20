import { cn } from '@/lib/utils'
function EmptyList({
  heading = 'Nėra tokių prekių',
  classname,
}: {
  heading?: string
  classname?: string
}) {
  return <div className={cn('text-xl', classname)}>{heading}</div>
}
export default EmptyList
