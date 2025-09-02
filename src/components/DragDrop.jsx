"use client";

import { useState } from "react";

const DragDrop = ({ onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    if (onDrop) {
      onDrop(files);
    }
  };

  const handleClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (onDrop) {
      onDrop(files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`upload-zone w-full h-full flex items-center justify-center ${
        isDragging ? "dragging" : ""
      }`}
    >
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center border border-white/20">
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        {isDragging ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-400">Drop your texture here</p>
            <p className="text-xs text-white/60 mt-1">Release to upload</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-white/90">Upload Texture</p>
            <p className="text-xs text-white/60 mt-1">
              Drag and drop an image file, or click to browse
            </p>
            <p className="text-xs text-white/40 mt-2">
              Supports: JPG, PNG, GIF, WebP
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
