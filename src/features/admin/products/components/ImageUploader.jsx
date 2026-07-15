import React from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

const ImageUploader = ({ existingImages = [], onRemoveExisting, newFiles, onFilesChange }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    onFilesChange([...newFiles, ...files]);
  };

  const handleRemoveNew = (index) => {
    onFilesChange(newFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="label-text">Product Images</label>
      <div className="flex flex-wrap gap-3">
        {existingImages.map((img) => (
          <div key={img.publicId} className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
            <img src={img.url} alt="Product" className="h-full w-full object-cover" />
            {onRemoveExisting && (
              <button
                type="button"
                onClick={() => onRemoveExisting(img.publicId)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <FaTimes size={10} />
              </button>
            )}
          </div>
        ))}

        {newFiles.map((file, index) => (
          <div key={index} className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
            <img src={URL.createObjectURL(file)} alt="New upload" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveNew(index)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <FaTimes size={10} />
            </button>
          </div>
        ))}

        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600">
          <FaPlus size={16} />
          <span className="text-xs">Add</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
