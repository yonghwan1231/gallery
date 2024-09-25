import { useEffect, useState } from 'react'
import { Carousel, Gallery, Modal, Loader } from '@components'
import { useUnsplashImages } from '@services'
import './App.css'

const App = () => {
  const { data, isFetchingNextPage, fetchNextPage } = useUnsplashImages(30)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const handleImageClick = (imageUrl: string) => setModalImage(imageUrl)
  const handleModalClose = () => setModalImage(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const isScrollEnd = scrollTop + viewportHeight >= documentHeight
      if (isScrollEnd) fetchNextPage()
    })
  }, [])

  if (!data) return null
  return (
    <div>
      <Carousel images={data.pages[0]} visibleCount={5} slideDuration={3} />
      <Gallery
        images={data.pages.flat().slice(5)}
        onImageClick={handleImageClick}
      />
      {isFetchingNextPage && <Loader />}
      <Modal
        isOpen={!!modalImage}
        imageUrl={modalImage as string}
        onClose={handleModalClose}
      />
    </div>
  )
}

export default App
