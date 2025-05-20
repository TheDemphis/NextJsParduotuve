import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { fetchAdminOrders } from '@/utils/actions'
import { formatCurrency, formatDate } from '@/utils/format'
async function ordersPage() {
  const orders = await fetchAdminOrders()

  return (
    <>
      <Table>
        <TableCaption>Užsakymai : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>El paštas</TableHead>
            <TableHead>Prekių skaičius</TableHead>
            <TableHead>Bendra suma</TableHead>
            <TableHead>Mokesčiai</TableHead>
            <TableHead>Siuntimas</TableHead>
            <TableHead>Užsakymo data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((item) => {
            const {
              id,
              products,
              orderTotal,
              tax,
              shipping,
              createdAt,
              email,
            } = item
            return (
              <TableRow key={id}>
                <TableCell>{email}</TableCell>
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
export default ordersPage
