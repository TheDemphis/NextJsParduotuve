import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function LoadingContainer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <LoadingProducts />
      <LoadingProducts />
      <LoadingProducts />
    </div>
  )
}

function LoadingProducts() {
  return (
    <Card className="mt-36">
      <CardContent className="p-3">
        <Skeleton className="rounded h-56 md:h-44"></Skeleton>
        <Skeleton className="h-4 w-3/4 mt-4"></Skeleton>
        <Skeleton className="h-4 w-1/2 mt-4"></Skeleton>
      </CardContent>
    </Card>
  )
}
export default LoadingContainer
