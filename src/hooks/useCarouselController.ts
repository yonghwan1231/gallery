import { useState, useRef, useEffect } from 'react'

type TDragEvent = React.MouseEvent<HTMLDivElement> &
  React.TouchEvent<HTMLDivElement>

export const useCarouselController = (
  visibleCount: number,
  slideDuration: number,
) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const isSliding = useRef(false)

  const startAutoSlide = () => {
    if (intervalRef.current) return
    const duration = slideDuration * 1000
    intervalRef.current = setInterval(() => nextSlide(), duration)
  }

  const stopAutoSlide = () => {
    if (!intervalRef.current) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const handleSlide = (actionFn: () => void) => {
    if (isSliding.current) return
    isSliding.current = true
    isDragging.current = false
    actionFn()
    setTimeout(() => (isSliding.current = false), 300)
  }

  const nextSlide = () => {
    handleSlide(() => setCurrentIndex((index) => (index + 1) % visibleCount))
  }

  const prevSlide = () => {
    handleSlide(() =>
      setCurrentIndex((index) => (index === 0 ? visibleCount - 1 : index - 1)),
    )
  }

  const handleStart = (e: TDragEvent) => {
    const clientX = e?.clientX || e?.touches[0]?.clientX
    startX.current = clientX
    isDragging.current = true
    stopAutoSlide()
  }

  const handleMove = (e: TDragEvent) => {
    if (!isDragging.current || startX.current === null) return
    const clientX = e?.clientX || e?.touches[0]?.clientX
    const distance = startX.current - clientX
    if (distance > 10) nextSlide()
    else if (distance < -10) prevSlide()
    startAutoSlide()
  }

  const handleEnd = () => {
    isDragging.current = false
    startAutoSlide()
  }

  const handleDotClick = (index: number) => {
    stopAutoSlide()
    startAutoSlide()
    setCurrentIndex(index)
  }

  const dragEvents = {
    onMouseDown: handleStart,
    onMouseMove: handleMove,
    onMouseUp: handleEnd,
    onTouchStart: handleStart,
    onTouchMove: handleMove,
    onTouchEnd: handleEnd,
  }

  useEffect(() => {
    startAutoSlide()
  }, [])

  return {
    currentIndex,
    dragEvents,
    nextSlide,
    prevSlide,
    handleDotClick,
  }
}
