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
    const files = Array.from(event.target.files || []); // Ensure files is an array
    if (onDrop) {
      onDrop(files); // Call the onDrop prop function with the selected files
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`w-full border-2 p-4 cursor-pointer transition-all ${
        isDragging ? "border-blue-500" : "border-gray-400"
      }`}
      style={{ borderStyle: "dashed" }}
    >
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {isDragging ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}

      <div
        className={`w-full bg-gray-200 opacity-65  rounded-lg transition-all ease-in-out duration-300 ${
          isDragging ? "h-32" : "h-0"
        }`}
      ></div>
    </div>
  );
};

export default DragDrop;
