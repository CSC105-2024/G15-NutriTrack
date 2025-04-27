import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ src, onImageChange, showEdit = false }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (onImageChange) {
          onImageChange(e.target.result);
        }
        setShowOverlay(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative inline-block w-48 col-span-1 lg:col-span-2 justify-self-center mb-8">
      <img
        className="rounded-full object-cover w-full h-48 border border-black"
        src={src}
        alt="profile image"
      />
      {showEdit && (
        <div>
          <FontAwesomeIcon
            icon={faPen}
            size="lg"
            className="absolute bottom-0 right-0 cursor-pointer bg-[#DAFFDD] p-4 rounded-2xl text-gray-700 shadow-md hover:bg-[#F8FFE6]"
            onClick={handleIconClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
      )}

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Profile Photo</h3>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={handleCloseOverlay}
              />
            </div>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
              onClick={triggerFileInput}
            >
              <p className="text-gray-500 mb-2">
                Click to select a file or drag and drop
              </p>
              <p className="text-gray-400 text-sm">
                JPG, PNG or GIF (max. 5MB)
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300 cursor-pointer"
                onClick={handleCloseOverlay}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                onClick={triggerFileInput}
              >
                Choose File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
