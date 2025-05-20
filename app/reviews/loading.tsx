'use client'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="flex gap-4 items-center p-4 ">
          <Skeleton className="h-5 w-[125px] mb-3" />
          <Skeleton className="h-5 w-[125px] mb-3" />
        </div>
      </CardHeader>
    </Card>
  )
}
const loading = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-14">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  )
}
export default loading
