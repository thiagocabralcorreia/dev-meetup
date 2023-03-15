import React, { useState } from "react";

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileName =
    selectedFile && selectedFile.name.length > 50
      ? selectedFile.name.slice(0, 50) + "..."
      : selectedFile && selectedFile.name;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      className="h-11 rounded-3xl appearance-none w-full mb-4
      flex items-center gap-x-4 content-center bg-white placeholder-gray-600 text-gray-800 border border-gray-300 sm:text-sm"
    >
      <label
        className={`h-11 max-md:w-full transition duration-150 ease-out hover:ease-in rounded-3xl py-[10px] px-8
       content-center justify-center text-center ${
         selectedFile ? "bg-tertiary" : "bg-light-sky"
       } hover:bg-dark-sky cursor-pointer`}
      >
        <span className="max-sm:text-sm text-md text-white font-bold">
          {selectedFile ? "Image Uploaded" : "Upload an Image"}
        </span>
        <input
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg"
          onChange={handleFileSelect}
          required
        />
      </label>
      <span className="max-md:hidden py-2 text-sm font-medium text-gray-700">
        {selectedFile ? fileName : "No image chosen"}
      </span>
    </div>
  );
};

export default FileInput;
