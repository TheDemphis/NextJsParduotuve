import { deleteAction, FetchAdminProd } from '@/utils/actions'
import Link from 'next/link'
import EmptyList from '@/components/global/EmptyList'
import { formatCurrency } from '@/utils/format'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FormContainer from '@/components/form/FormContainer'
import { EditButtons } from '@/components/form/Buttons'

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProd = deleteAction.bind(null, { productId })
  return (
    <FormContainer action={deleteProd}>
      <EditButtons actionType="delete" />
    </FormContainer>
  )
}

async function AdminProdPage() {
  const products = await FetchAdminProd()
  if (products.length === 0) return <EmptyList />

  return (
    <section>
      <Table>
        <TableCaption>Iš viso produktų {products.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-lg">Pavadinimas</TableHead>
            <TableHead className="font-bold text-lg">
              Prekinis ženklas
            </TableHead>
            <TableHead className="font-bold text-lg">Kaina</TableHead>
            <TableHead className="font-bold text-lg">Koregavimas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => {
            const { id: productId, name, price, company } = item

            return (
              <TableRow key={productId}>
                <TableCell className="font-semibold underline capitalize">
                  <Link href={`/products/${productId}`}>{name}</Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex gap-x-4">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <EditButtons actionType="edit" />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
export default AdminProdPage
