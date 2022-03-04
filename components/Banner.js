import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

function Banner() {
  return (
    <div className="relative ">
      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-gray-100 to-transparent" />

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img src="http://links.papareact.com/gi1" loading="lazy" alt="" />
        </div>

        <div>
          <img src="http://links.papareact.com/6ff" loading="lazy" alt="" />
        </div>

        <div>
          <img src="http://links.papareact.com/7ma" loading="lazy" alt="" />
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
