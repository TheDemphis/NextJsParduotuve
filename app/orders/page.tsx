import SectionTitle from '@/components/global/SectionTitle'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { fetchUserOrders } from '@/utils/actions'
import { formatCurrency, formatDate } from '@/utils/format'
async function page() {
  const myOrders = await fetchUserOrders()

  return (
    <>
      <SectionTitle text="Mano užsakymai" />
      <Table>
        <TableCaption>Iš viso užsakymų {myOrders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Prekių skaičius</TableHead>
            <TableHead>Bendra suma</TableHead>
            <TableHead>Mokesčiai</TableHead>
            <TableHead>Siuntimas</TableHead>
            <TableHead>Užsakymo data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myOrders.map((item) => {
            const { products, id, tax, shipping, createdAt, orderTotal } = item
            return (
              <TableRow key={id}>
                <TableCell>{products}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
export default page
