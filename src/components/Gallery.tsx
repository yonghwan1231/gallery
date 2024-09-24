type OwnProps = {
  images: { id: string; urls: { small: string } }[]
  onImageClick: (imageUrl: string) => void
}
export const Gallery = ({ images, onImageClick }: OwnProps) => {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div
          key={image.id}
          className="gallery_item"
          onClick={() => onImageClick(image.urls.small)}
        >
          <img src={image.urls.small} alt="gallery-item" />
        </div>
      ))}
    </div>
  )
}
