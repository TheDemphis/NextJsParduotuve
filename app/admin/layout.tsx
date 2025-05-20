import { Separator } from '@/components/ui/separator'
import Sidebar from './Sidebar'
function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-xl pl-10 mb-2 mt-10">Dashboard</h1>
      <Separator />
      <section className="grid lg:grid-cols-12 gap-10 mt-10">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-10 px-5">{children}</div>
      </section>
    </>
  )
}
export default layout
