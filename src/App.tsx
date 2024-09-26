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
      const { scrollY, innerHeight } = window
      const documentHeight = document.documentElement.scrollHeight
      const isScrollEnd = scrollY + innerHeight >= documentHeight
      if (isScrollEnd) fetchNextPage()
    })
  }, [])

  if (!data) return null
  return (
    <div>
      <Modal
        isOpen={!!modalImage}
        imageUrl={modalImage as string}
        onClose={handleModalClose}
      />
      <Carousel images={data.pages[0]} visibleCount={5} slideDuration={3} />
      <Gallery
        images={data.pages.flat().slice(5)}
        onImageClick={handleImageClick}
      />
      {isFetchingNextPage && <Loader />}
    </div>
  )
}

export default App
