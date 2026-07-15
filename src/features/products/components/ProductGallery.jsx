import React, { useState } from 'react';

const ProductGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images.length > 0 ? images : [{ url: 'https://via.placeholder.com/600', publicId: 'placeholder' }];

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img src={safeImages[activeIndex].url} alt="Product" className="h-full w-full object-cover" />
      </div>
      {safeImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {safeImages.map((img, index) => (
            <button
              key={img.publicId || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                index === activeIndex ? 'border-gray-900' : 'border-transparent'
              }`}
            >
              <img src={img.url} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
