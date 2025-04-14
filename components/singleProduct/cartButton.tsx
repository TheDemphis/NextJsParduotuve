import { Button } from '../ui/button'
function cartButton({ productId }: { productId: string }) {
  return (
    <Button size={'lg'} className="mt-12">
      Įdėti į krepšelį{' '}
    </Button>
  )
}
export default cartButton
