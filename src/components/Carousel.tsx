import { useState, useEffect, useRef } from 'react'

type OwnProps = {
  images: { id: string; urls: { small: string; regular: string } }[]
  visibleCount: number
  slideDuration: number
}

export const Carousel = ({ images, visibleCount, slideDuration }: OwnProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const isSliding = useRef(false)

  const startAutoSlide = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, slideDuration * 1000)
    }
  }

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const nextSlide = () => {
    if (isSliding.current) return
    isSliding.current = true
    setCurrentIndex((prevIndex) => (prevIndex + 1) % visibleCount)
    setTimeout(() => {
      isSliding.current = false
    }, 300)
  }

  const prevSlide = () => {
    if (isSliding.current) return
    isSliding.current = true
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? visibleCount - 1 : prevIndex - 1,
    )
    setTimeout(() => {
      isSliding.current = false
    }, 300)
  }

  const handleDotClick = (index: number) => {
    stopAutoSlide()
    setCurrentIndex(index)
    startAutoSlide()
  }

  const handleStart = (clientX: number) => {
    startX.current = clientX
    isDragging.current = true
    stopAutoSlide()
  }

  const handleMove = (clientX: number) => {
    if (!isDragging.current || startX.current === null) return
    const distance = startX.current - clientX
    if (distance > 10) {
      nextSlide()
      isDragging.current = false
    } else if (distance < -10) {
      prevSlide()
      isDragging.current = false
    }
    startAutoSlide()
  }

  const handleEnd = () => {
    isDragging.current = false
    startAutoSlide()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [])

  return (
    <div className="carousel">
      <div
        className="carousel_container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        {images.slice(0, visibleCount).map((image) => (
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
        {images.slice(0, visibleCount).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              handleDotClick(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
