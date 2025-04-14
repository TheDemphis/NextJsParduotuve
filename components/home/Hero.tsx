import { Button } from '../ui/button'
import Link from 'next/link'
import HeroCarousel from './HeroCarousel'
function Hero() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-20 mt-10 items-center">
      <div>
        <h1 className="text-3xl sm:text-5xl max-w-2xl  font-medium mb-4">
          Įkvėpimas jūsų namams
        </h1>
        <p className="text-slate-700 max-w-xl leading-8 mt-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
          natus maxime, velit ut unde omnis neque! Ipsa dolore cum sapiente?
          Perspiciatis quia debitis unde itaque.
        </p>
        <Button asChild size="lg" className="mt-14">
          <Link href="/products">Mūsų asortimentas</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}
export default Hero
