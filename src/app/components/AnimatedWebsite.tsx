import React from 'react';

interface ImageData {
  id: number;
  url: string;
  alt: string;
}

const AnimatedWebsite: React.FC = () => {
  // Sample image data - replace with your actual images
  const images: ImageData[] = [
    { id: 1, url: "/api/placeholder/200/150", alt: "Image 1" },
    { id: 2, url: "/api/placeholder/200/150", alt: "Image 2" },
    { id: 3, url: "/api/placeholder/200/150", alt: "Image 3" },
    { id: 4, url: "/api/placeholder/200/150", alt: "Image 4" },
    { id: 5, url: "/api/placeholder/200/150", alt: "Image 5" },
  ];

  // Duplicate images for seamless loop
  const allImages: ImageData[] = [...images, ...images.map(img => ({ ...img, id: img.id + images.length }))];

  return (
    <div className="min-h-screen animated-bg">
      <div className="w-full h-40 relative overflow-hidden backdrop-blur-sm bg-white/10">
        <div className="absolute flex animate-slide">
          {allImages.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className="w-[200px] h-[150px] object-cover"
            />
          ))}
        </div>
      </div>
      <div className="p-8 text-center text-white">
        <h1 className="text-5xl mb-4">wassup</h1>
        <p className="text-xl max-w-2xl mx-auto">
          This is a low effort typescript react website
        </p>
      </div>
    </div>
  );
};

export default AnimatedWebsite;