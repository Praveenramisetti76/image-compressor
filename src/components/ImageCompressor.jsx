import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null); // Store the compressed file

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      setSelectedImage(URL.createObjectURL(imageFile));

      const options = {
        maxSizeMB: 1, // Max size of compressed image
        maxWidthOrHeight: 1024, // Resize image dimensions
        useWebWorker: true, // Optimize performance
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);
        setCompressedFile(compressedFile); // Store compressed file
        setCompressedImage(URL.createObjectURL(compressedFile)); // Create preview URL
      } catch (error) {
        console.error("Compression error:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>React Image Compressor</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {selectedImage && (
          <div>
            <h4>Original Image:</h4>
            <img src={selectedImage} alt="Original" width="300" style={{ borderRadius: "10px" }} />
          </div>
        )}
        {compressedImage && (
          <div>
            <h4>Compressed Image:</h4>
            <img src={compressedImage} alt="Compressed" width="300" style={{ borderRadius: "10px" }} />
            <br />
            <a
              href={compressedImage}
              download="compressed-image.jpg" // File name for download
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              Download Compressed Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
