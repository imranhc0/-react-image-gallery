// ImageGallery.js

import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-image-upload/dist/index.css';
import './ImageGallery.css';
import image1 from './assets/images/image-1.webp';
import image2 from './assets/images/image-2.webp';
import image3 from './assets/images/image-3.webp';
import image4 from './assets/images/image-4.webp';
import image5 from './assets/images/image-5.webp';
import image6 from './assets/images/image-6.webp';
import image7 from './assets/images/image-7.webp';
import image8 from './assets/images/image-8.webp';
import image9 from './assets/images/image-9.webp';
import image10 from './assets/images/image-10.jpeg';
import image11 from './assets/images/image-11.jpeg';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [images, setImages] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
  ]);

  const handleImageClick = (index) => {
    const updatedSelectedImages = selectedImage.includes(index)
      ? selectedImage.filter((selectedIndex) => selectedIndex !== index)
      : [...selectedImage, index];

    setSelectedImage(updatedSelectedImages);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = Array.from(images);
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(updatedImages);
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter((_, index) => !selectedImage.includes(index));
    setSelectedImage([]);
    setImages(updatedImages);
  };

  return (
    <div className="image-gallery-container">
      <div className='delete-box'>
        <div className='select-text'>Selected Images: {selectedImage.length}</div>
        <button className='delete-button' onClick={handleDeleteSelected}>Delet Images</button>  
      </div>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppableImage">
        {(provided) => (
          <div
            className="image-gallery"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {images.map((image, index) => (
              <Draggable
                key={index.toString()}
                draggableId={index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`gallery-item ${
                      selectedImage.includes(index)   ? 'selected' : ''
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img src={image} alt={`Image ${index + 1}`} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className={`gallery-item`}>
              {/* You can add your ImageUploader component here */}
              <ImageUploader /> 
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  );
};

export default ImageGallery;
