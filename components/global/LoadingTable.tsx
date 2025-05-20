import { Skeleton } from '../ui/skeleton'
function LoadingTable({ rows = 5 }: { rows?: number }) {
  const tableItems = Array.from({ length: rows }, (_, i) => {
    return (
      <div key={i} className="mb-3">
        <Skeleton className="w-full h-6" />
      </div>
    )
  })
  return <>{tableItems}</>
}
export default LoadingTable
