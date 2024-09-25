import { useCarouselController } from '@hooks'

type OwnProps = {
  images: { id: string; urls: { small: string; regular: string } }[]
  visibleCount: number
  slideDuration: number
}

export const Carousel = ({ images, visibleCount, slideDuration }: OwnProps) => {
  const visibleImages = images.slice(0, visibleCount)
  const { currentIndex, nextSlide, prevSlide, handleDotClick, dragEvents } =
    useCarouselController(visibleCount, slideDuration)

  return (
    <div className="carousel">
      <div
        className="carousel_container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        {...dragEvents}
      >
        {visibleImages.map((image) => (
          <div className="image_wrap">
            <img
              key={image.id}
              src={image.urls.regular}
              className="carousel_image"
            />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="carousel_control prev">
        〈
      </button>
      <button onClick={nextSlide} className="carousel_control next">
        〉
      </button>
      <div className="dots">
        {visibleImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
