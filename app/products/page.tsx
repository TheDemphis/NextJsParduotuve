import ProductsContainer from '@/components/products/ProductsContainer'
function page({
  searchParams,
}: {
  searchParams: { search?: string; layout?: string }
}) {
  const layout = searchParams.layout || 'grid'
  const search = searchParams.search || ''
  return <ProductsContainer layout={layout} search={search} />
}
export default page
