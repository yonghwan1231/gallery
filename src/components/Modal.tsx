import React from 'react'

type OwnProps = {
  isOpen: boolean
  imageUrl: string
  onClose: () => void
}

export const Modal: React.FC<OwnProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="close_button" onClick={onClose}>
          &times;
        </button>
        <img src={imageUrl} alt="modal_img" />
      </div>
    </div>
  )
}
