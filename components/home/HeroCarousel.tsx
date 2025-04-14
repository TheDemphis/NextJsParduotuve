import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import image1 from '@/public/images/hero1.jpg'
import image2 from '@/public/images/hero2.jpg'
import image3 from '@/public/images/hero3.jpg'
import image4 from '@/public/images/hero4.jpg'

const images = [image1, image2, image3, image4]
function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-4">
                    <Image
                      src={image}
                      alt="image"
                      className="h-80 rounded-sm w-full object-cover"
                      priority
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default HeroCarousel
